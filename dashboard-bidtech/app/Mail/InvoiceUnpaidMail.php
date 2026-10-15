<?php

namespace App\Mail;

use App\Models\Order;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Address;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class InvoiceUnpaidMail extends Mailable
{
    use Queueable, SerializesModels;

    public Order $order;

    /**
     * Create a new message instance.
     */
    public function __construct(Order $order)
    {
        $this->order = $order->loadMissing('template');
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            from: new Address(
                config('mail.from.address', 'billing@bidtech.co.id'),
                config('mail.from.name', 'Bidtech')
            ),
            subject: "[Menunggu Pembayaran] Tagihan Invoice #{$this->order->order_number} - Bidtech",
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        $paymentService = app(\App\Services\PaymentService::class);
        $pricingStructure = $paymentService->buildPricingStructure(
            $this->order->priceBreakdown(),
            $this->order->coupon,
            (int) ($this->order->discount_amount ?? 0),
            (int) ($this->order->domain_duration ?: 1),
            (bool) $this->order->is_own_domain
        );

        return new Content(
            view: 'emails.unpaid-invoice',
            with: [
                'order'            => $this->order,
                'template'         => $this->order->template,
                'pricingStructure' => $pricingStructure,
                'bayarUrl'         => route('checkout.bayar', [
                    'template' => $this->order->template_id,
                    'order'    => $this->order->order_number,
                ]),
                'pdfUrl'           => route('checkout.invoice.download', $this->order),
            ],
        );
    }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array
    {
        return [];
    }
}
