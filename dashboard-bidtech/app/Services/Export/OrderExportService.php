<?php

namespace App\Services\Export;

use App\Enums\DomainStatus;
use App\Enums\OrderStatus;
use App\Enums\WebsiteStatus;
use App\Models\Order;
use App\Models\User;
use Carbon\Carbon;
use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Style\Alignment;
use PhpOffice\PhpSpreadsheet\Style\Border;
use PhpOffice\PhpSpreadsheet\Style\Fill;
use PhpOffice\PhpSpreadsheet\Style\NumberFormat;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;
use Symfony\Component\HttpFoundation\StreamedResponse;

class OrderExportService
{
    /**
     * Nama-nama bulan dalam bahasa Indonesia.
     */
    protected array $monthsMap = [
        1 => 'Januari', 2 => 'Februari', 3 => 'Maret', 4 => 'April',
        5 => 'Mei', 6 => 'Juni', 7 => 'Juli', 8 => 'Agustus',
        9 => 'September', 10 => 'Oktober', 11 => 'November', 12 => 'Desember',
    ];

    /**
     * Buat dan unduh file Excel laporan penjualan berdasarkan filter yang diberikan.
     */
    public function download(array $filters, ?User $admin = null): StreamedResponse
    {
        $spreadsheet = $this->buildSpreadsheet($filters, $admin);

        $periodText = $this->getPeriodLabel($filters);
        $cleanPeriod = preg_replace('/[^a-zA-Z0-9_\-]/', '_', $periodText);
        $filename = "Laporan_Penjualan_Bidtech_{$cleanPeriod}_" . date('Ymd_His') . ".xlsx";

        return new StreamedResponse(function () use ($spreadsheet) {
            $writer = new Xlsx($spreadsheet);
            $writer->save('php://output');
        }, 200, [
            'Content-Type' => 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            'Content-Disposition' => "attachment; filename=\"{$filename}\"",
            'Cache-Control' => 'max-age=0',
        ]);
    }

    /**
     * Rakit objek Spreadsheet beserta styling, data, dan rumusnya.
     */
    public function buildSpreadsheet(array $filters, ?User $admin = null): Spreadsheet
    {
        $orders = $this->queryOrders($filters);
        $spreadsheet = new Spreadsheet();
        $sheet = $spreadsheet->getActiveSheet();
        $sheet->setTitle('Laporan Penjualan');

        // Nonaktifkan gridlines default jika diinginkan atau aktifkan eksplisit
        $sheet->setShowGridLines(true);

        // ==========================================
        // 1. HEADER METADATA LAPORAN
        // ==========================================
        $sheet->setCellValue('A1', 'LAPORAN PENJUALAN & TRANSAKSI BIDTECH');
        $sheet->getStyle('A1')->getFont()->setBold(true)->setSize(16)->setColor(new \PhpOffice\PhpSpreadsheet\Style\Color('0E3B2E'));

        $periodLabel = $this->getPeriodLabel($filters);
        $statusLabel = match ($filters['status'] ?? 'all') {
            'paid' => 'Hanya Lunas (Paid)',
            'unpaid' => 'Menunggu Pembayaran (Unpaid)',
            'invalid' => 'Kedaluwarsa / Batal (Invalid)',
            default => 'Semua Status Transaksi',
        };

        $sheet->setCellValue('A2', 'Periode Laporan');
        $sheet->setCellValue('B2', ': ' . $periodLabel);
        $sheet->setCellValue('A3', 'Filter Status');
        $sheet->setCellValue('B3', ': ' . $statusLabel);
        $sheet->setCellValue('A4', 'Tanggal Ekspor');
        $sheet->setCellValue('B4', ': ' . now()->locale('id')->isoFormat('D MMMM Y, HH:mm') . ' WIB');
        $sheet->setCellValue('A5', 'Dicetak Oleh');
        $sheet->setCellValue('B5', ': ' . ($admin?->name ?? 'Administrator'));

        $sheet->getStyle('A2:A5')->getFont()->setBold(true)->setSize(10)->setColor(new \PhpOffice\PhpSpreadsheet\Style\Color('555555'));
        $sheet->getStyle('B2:B5')->getFont()->setSize(10);

        // ==========================================
        // 2. HEADER TABEL TRANSAKSI
        // ==========================================
        $headerRow = 7;
        $headers = [
            'A' => 'NO',
            'B' => 'NO. ORDER / INVOICE',
            'C' => 'TANGGAL ORDER',
            'D' => 'TANGGAL LUNAS',
            'E' => 'NAMA KLIEN',
            'F' => 'EMAIL KLIEN',
            'G' => 'NO. WHATSAPP',
            'H' => 'PAKET / TEMPLATE',
            'I' => 'NAMA DOMAIN',
            'J' => 'DURASI (THN)',
            'K' => 'HARGA TEMPLATE (RP)',
            'L' => 'HARGA DOMAIN (RP)',
            'M' => 'BIAYA SERVER (RP)',
            'N' => 'BIAYA LAYANAN (RP)',
            'O' => 'KODE PROMO',
            'P' => 'DISKON (RP)',
            'Q' => 'TOTAL BAYAR (RP)',
            'R' => 'STATUS ORDER',
            'S' => 'STATUS DOMAIN',
            'T' => 'DOMAIN AKTIF',
            'U' => 'STATUS WEBSITE',
            'V' => 'MITRA / AFILIASI',
            'W' => 'KOMISI MITRA (RP)',
        ];

        foreach ($headers as $col => $title) {
            $sheet->setCellValue("{$col}{$headerRow}", $title);
        }

        // Style Table Header (Bidtech Dark Forest Green #0E3B2E)
        $headerRange = "A{$headerRow}:W{$headerRow}";
        $sheet->getStyle($headerRange)->applyFromArray([
            'font' => [
                'bold' => true,
                'color' => ['rgb' => 'FFFFFF'],
                'size' => 10,
            ],
            'fill' => [
                'fillType' => Fill::FILL_SOLID,
                'startColor' => ['rgb' => '0E3B2E'],
            ],
            'alignment' => [
                'horizontal' => Alignment::HORIZONTAL_CENTER,
                'vertical' => Alignment::VERTICAL_CENTER,
                'wrapText' => true,
            ],
            'borders' => [
                'allBorders' => [
                    'borderStyle' => Border::BORDER_THIN,
                    'color' => ['rgb' => '0B2D23'],
                ],
            ],
        ]);
        $sheet->getRowDimension($headerRow)->setRowHeight(28);

        // ==========================================
        // 3. DATA ROWS
        // ==========================================
        $currentRow = $headerRow + 1;
        $startDataRow = $currentRow;

        foreach ($orders as $index => $order) {
            $breakdown = $order->priceBreakdown();

            $statusText = match ($order->status) {
                OrderStatus::Paid => 'Lunas',
                OrderStatus::Unpaid => 'Menunggu Bayar',
                OrderStatus::Invalid => 'Kedaluwarsa',
                default => (string) $order->status?->value,
            };

            $domainStatusText = $order->isPaid() ? match ($order->domain_status) {
                DomainStatus::Registered => 'Terdaftar',
                DomainStatus::PendingRegistration => 'Pending',
                default => (string) $order->domain_status?->value,
            } : '-';

            $websiteStatusText = $order->isPaid() ? match ($order->website_status) {
                WebsiteStatus::Deployed => 'Deployed',
                WebsiteStatus::InProgress => 'Dalam Pengerjaan',
                WebsiteStatus::Maintenance => 'Maintenance',
                default => (string) $order->website_status?->value,
            } : '-';

            $sheet->setCellValue("A{$currentRow}", $index + 1);
            $sheet->setCellValueExplicit("B{$currentRow}", $order->order_number, \PhpOffice\PhpSpreadsheet\Cell\DataType::TYPE_STRING);
            $sheet->setCellValue("C{$currentRow}", $order->created_at ? $order->created_at->format('d/m/Y H:i') : '-');
            $sheet->setCellValue("D{$currentRow}", $order->paid_at ? $order->paid_at->format('d/m/Y H:i') : '-');
            $sheet->setCellValue("E{$currentRow}", $order->full_name);
            $sheet->setCellValue("F{$currentRow}", $order->email);
            $sheet->setCellValueExplicit("G{$currentRow}", $order->whatsapp, \PhpOffice\PhpSpreadsheet\Cell\DataType::TYPE_STRING);
            $sheet->setCellValue("H{$currentRow}", $order->template?->name ?? '-');
            $sheet->setCellValue("I{$currentRow}", $order->domain_name ?? '-');
            $sheet->setCellValue("J{$currentRow}", (int) ($order->domain_duration ?? 1));

            // Nominal Uang
            $sheet->setCellValue("K{$currentRow}", $breakdown['templatePrice']);
            $sheet->setCellValue("L{$currentRow}", $breakdown['domainPrice']);
            $sheet->setCellValue("M{$currentRow}", $breakdown['serverPrice']);
            $sheet->setCellValue("N{$currentRow}", $breakdown['servicePrice']);
            $sheet->setCellValue("O{$currentRow}", $order->coupon_code ?: '-');
            $sheet->setCellValue("P{$currentRow}", $breakdown['discountAmount']);
            $sheet->setCellValue("Q{$currentRow}", $breakdown['totalPrice']);

            // Status
            $sheet->setCellValue("R{$currentRow}", $statusText);
            $sheet->setCellValue("S{$currentRow}", $domainStatusText);
            $sheet->setCellValue("T{$currentRow}", $order->domain_final ?: '-');
            $sheet->setCellValue("U{$currentRow}", $websiteStatusText);
            $sheet->setCellValue("V{$currentRow}", $order->partner_name ?: '-');
            $sheet->setCellValue("W{$currentRow}", (int) ($order->partner_commission_amount ?? 0));

            // Styling zebra striping baris
            $rowRange = "A{$currentRow}:W{$currentRow}";
            if ($index % 2 === 1) {
                $sheet->getStyle($rowRange)->getFill()->setFillType(Fill::FILL_SOLID)->getStartColor()->setRGB('F8FAF9');
            }

            // Border tipis pada baris data
            $sheet->getStyle($rowRange)->getBorders()->getAllBorders()->setBorderStyle(Border::BORDER_THIN)->setColor(new \PhpOffice\PhpSpreadsheet\Style\Color('E2E8F0'));

            $sheet->getRowDimension($currentRow)->setRowHeight(20);
            $currentRow++;
        }

        $endDataRow = max($startDataRow, $currentRow - 1);
        $summaryRow = $orders->isNotEmpty() ? $currentRow : $endDataRow;

        // ==========================================
        // 4. NUMBER FORMATTING & ALIGNMENT
        // ==========================================
        // Kolom mata uang (K, L, M, N, P, Q, W)
        $currencyFormat = '#,##0';
        foreach (['K', 'L', 'M', 'N', 'P', 'Q', 'W'] as $col) {
            $sheet->getStyle("{$col}{$startDataRow}:{$col}{$summaryRow}")
                ->getNumberFormat()->setFormatCode($currencyFormat);
            $sheet->getStyle("{$col}{$startDataRow}:{$col}{$summaryRow}")
                ->getAlignment()->setHorizontal(Alignment::HORIZONTAL_RIGHT);
        }

        // Alignment kolom tengah
        foreach (['A', 'C', 'D', 'J', 'R', 'S', 'U'] as $col) {
            $sheet->getStyle("{$col}{$startDataRow}:{$col}{$endDataRow}")
                ->getAlignment()->setHorizontal(Alignment::HORIZONTAL_CENTER);
        }

        // ==========================================
        // 5. BARIS SUMMARY / TOTAL (REKAPITULASI)
        // ==========================================
        if ($orders->isNotEmpty()) {
            $summaryRow = $currentRow;

            $sheet->mergeCells("A{$summaryRow}:J{$summaryRow}");
            $sheet->setCellValue("A{$summaryRow}", "TOTAL KESELURUHAN ({$orders->count()} TRANSAKSI)");

            // Formula SUM untuk kolom nominal
            $sheet->setCellValue("K{$summaryRow}", "=SUM(K{$startDataRow}:K{$endDataRow})");
            $sheet->setCellValue("L{$summaryRow}", "=SUM(L{$startDataRow}:L{$endDataRow})");
            $sheet->setCellValue("M{$summaryRow}", "=SUM(M{$startDataRow}:M{$endDataRow})");
            $sheet->setCellValue("N{$summaryRow}", "=SUM(N{$startDataRow}:N{$endDataRow})");
            $sheet->setCellValue("P{$summaryRow}", "=SUM(P{$startDataRow}:P{$endDataRow})");
            $sheet->setCellValue("Q{$summaryRow}", "=SUM(Q{$startDataRow}:Q{$endDataRow})");
            $sheet->setCellValue("W{$summaryRow}", "=SUM(W{$startDataRow}:W{$endDataRow})");

            $summaryRange = "A{$summaryRow}:W{$summaryRow}";
            $sheet->getStyle($summaryRange)->applyFromArray([
                'font' => [
                    'bold' => true,
                    'size' => 10,
                    'color' => ['rgb' => '0E3B2E'],
                ],
                'fill' => [
                    'fillType' => Fill::FILL_SOLID,
                    'startColor' => ['rgb' => 'EBFBD9'], // Bidtech light mint green
                ],
                'alignment' => [
                    'vertical' => Alignment::VERTICAL_CENTER,
                ],
                'borders' => [
                    'top' => [
                        'borderStyle' => Border::BORDER_THIN,
                        'color' => ['rgb' => '1E7A53'],
                    ],
                    'bottom' => [
                        'borderStyle' => Border::BORDER_DOUBLE, // Akuntansi double bottom border
                        'color' => ['rgb' => '1E7A53'],
                    ],
                    'allBorders' => [
                        'borderStyle' => Border::BORDER_THIN,
                        'color' => ['rgb' => 'CBD5E1'],
                    ],
                ],
            ]);
            $sheet->getStyle("A{$summaryRow}")->getAlignment()->setHorizontal(Alignment::HORIZONTAL_RIGHT);
            $sheet->getRowDimension($summaryRow)->setRowHeight(24);
        }

        // ==========================================
        // 6. AUTO-SIZE COLUMN WIDTHS
        // ==========================================
        foreach (range('A', 'W') as $col) {
            $sheet->getColumnDimension($col)->setAutoSize(true);
        }

        return $spreadsheet;
    }

    /**
     * Query data order dengan filter yang sama persis seperti KelolaPesananController.
     */
    protected function queryOrders(array $filters)
    {
        $category = $filters['category'] ?? 'all';
        $status = $filters['status'] ?? 'all';
        $period = $filters['period'] ?? 'all';
        $month = (int) ($filters['month'] ?? date('n'));
        $year = (int) ($filters['year'] ?? date('Y'));
        $search = trim((string) ($filters['search'] ?? ''));

        $query = Order::with(['template', 'client']);

        // Filter kata kunci pencarian
        if ($search !== '') {
            $query->where(function ($q) use ($search) {
                $q->where('order_number', 'like', "%{$search}%")
                    ->orWhere('full_name', 'like', "%{$search}%")
                    ->orWhere('email', 'like', "%{$search}%")
                    ->orWhere('whatsapp', 'like', "%{$search}%")
                    ->orWhere('domain_name', 'like', "%{$search}%");
            });
        }

        // Filter kategori template
        if ($category !== 'all') {
            $query->whereHas('template', function ($q) use ($category) {
                $q->where('category', $category);
            });
        }

        // Filter status order
        if ($status !== 'all') {
            $query->where('status', $status);
        }

        // Filter periode (bulanan / tahunan)
        if ($period === 'monthly') {
            $query->whereYear('created_at', $year)
                ->whereMonth('created_at', $month);
        } elseif ($period === 'yearly') {
            $query->whereYear('created_at', $year);
        }

        return $query->latest('created_at')->get();
    }

    /**
     * Label teks deskriptif untuk periode filter yang dipilih.
     */
    protected function getPeriodLabel(array $filters): string
    {
        $period = $filters['period'] ?? 'all';
        $month = (int) ($filters['month'] ?? date('n'));
        $year = (int) ($filters['year'] ?? date('Y'));

        if ($period === 'monthly') {
            return ($this->monthsMap[$month] ?? "Bulan {$month}") . " {$year}";
        }

        if ($period === 'yearly') {
            return "Tahun {$year}";
        }

        return 'Semua Waktu';
    }
}
