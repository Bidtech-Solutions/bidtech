<?php

namespace App\Models;

use App\Enums\DomainStatus;
use App\Enums\OrderStatus;
use App\Enums\WebsiteStatus;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class OrderStatusHistory extends Model
{
    use HasFactory;

    protected $fillable = [
        'order_id',
        'user_id',
        'type',
        'status_from',
        'status_to',
        'notes',
    ];

    public function order(): BelongsTo
    {
        return $this->belongsTo(Order::class);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Label representasi jenis update
     */
    public function typeLabel(): string
    {
        return match ($this->type) {
            'domain' => 'Status Domain',
            'website' => 'Status Website',
            'order' => 'Status Pesanan',
            default => 'Pembaruan Proyek',
        };
    }

    /**
     * Label manusiawi untuk status_to
     */
    public function statusToLabel(): string
    {
        if ($this->type === 'domain') {
            return match ($this->status_to) {
                DomainStatus::PendingRegistration->value => 'Domain Diproses',
                DomainStatus::Registered->value => 'Domain Aktif',
                default => ucfirst(str_replace('_', ' ', $this->status_to)),
            };
        }

        if ($this->type === 'website') {
            return match ($this->status_to) {
                WebsiteStatus::InProgress->value => 'Website Dikerjakan',
                WebsiteStatus::Deployed->value => 'Website Live',
                WebsiteStatus::Maintenance->value => 'Perbaikan Sementara',
                default => ucfirst(str_replace('_', ' ', $this->status_to)),
            };
        }

        if ($this->type === 'order') {
            return match ($this->status_to) {
                OrderStatus::Paid->value => 'Lunas',
                OrderStatus::Unpaid->value => 'Menunggu Bayar',
                OrderStatus::Invalid->value => 'Batal / Kedaluwarsa',
                default => ucfirst(str_replace('_', ' ', $this->status_to)),
            };
        }

        return ucfirst(str_replace('_', ' ', $this->status_to));
    }

    /**
     * Icon Lucide yang representatif
     */
    public function icon(): string
    {
        if ($this->type === 'domain') {
            return $this->status_to === DomainStatus::Registered->value ? 'check-circle' : 'globe';
        }

        if ($this->type === 'website') {
            return match ($this->status_to) {
                WebsiteStatus::Deployed->value => 'rocket',
                WebsiteStatus::Maintenance->value => 'wrench',
                default => 'code-2',
            };
        }

        return 'milestone';
    }

    /**
     * Kelas warna badge
     */
    public function badgeClasses(): string
    {
        if ($this->status_to === 'deployed' || $this->status_to === 'registered' || $this->status_to === 'paid') {
            return 'bg-emerald-50 text-emerald-800 border-emerald-200';
        }

        if ($this->status_to === 'in_progress') {
            return 'bg-blue-50 text-blue-800 border-blue-200';
        }

        if ($this->status_to === 'maintenance') {
            return 'bg-amber-50 text-amber-800 border-amber-200';
        }

        return 'bg-slate-100 text-slate-800 border-slate-200';
    }
}
