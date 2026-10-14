<?php

namespace App\Services;

use App\Enums\OrderStatus;
use App\Enums\Role;
use App\Models\Coupon;
use App\Models\Order;
use App\Models\Partner;
use App\Models\User;
use Illuminate\Support\Facades\DB;

class PromoService
{
    // ---- Coupon administration ----

    public function list(array $filters = []): array
    {
        $query = Coupon::with('partner.user')->withCount('orders');
        $filled = fn (string $key) => isset($filters[$key]) && $filters[$key] !== '';

        if ($filled('search')) {
            $search = $filters['search'];
            $query->where(function ($q) use ($search) {
                $q->where('code', 'like', "%{$search}%")
                    ->orWhere('name', 'like', "%{$search}%")
                    ->orWhereHas('partner.user', fn ($u) => $u->where('name', 'like', "%{$search}%"));
            });
        }
        if ($filled('is_partner') && $filters['is_partner'] !== 'all') {
            $filters['is_partner'] === '1' ? $query->whereNotNull('partner_id') : $query->whereNull('partner_id');
        }
        if ($filled('is_active') && $filters['is_active'] !== 'all') {
            $query->where('is_active', $filters['is_active'] === '1');
        }
        if ($filled('discount_mode') && $filters['discount_mode'] !== 'all') {
            $query->where('discount_mode', $filters['discount_mode']);
        }

        return [
            'promos' => $query->orderBy('id', 'desc')->paginate(15)->withQueryString(),
            'stats' => [
                'total' => Coupon::count(),
                'active' => Coupon::where('is_active', true)->count(),
                'partner' => Coupon::whereNotNull('partner_id')->count(),
                'expired' => Coupon::where('valid_until', '<', now())->count(),
            ],
        ];
    }

    public function create(array $data): Coupon
    {
        return Coupon::create($data);
    }

    public function update(Coupon $promo, array $data): Coupon
    {
        $promo->update($data);

        return $promo;
    }

    public function delete(Coupon $promo): bool
    {
        if ($promo->orders()->exists()) {
            return false;
        }
        $promo->delete();

        return true;
    }

    public function toggleActive(Coupon $promo): Coupon
    {
        $promo->is_active = ! $promo->is_active;
        $promo->save();

        return $promo;
    }

    public function partnersList()
    {
        return Partner::with('user')->get();
    }

    // ---- Reporting ----

    public function usages(Coupon $promo, array $filters = []): array
    {
        $query = $promo->orders()->with('template');

        if (! empty($filters['search'])) {
            $search = trim($filters['search']);
            $query->where(function ($q) use ($search) {
                $q->where('email', 'like', "%{$search}%")
                    ->orWhere('order_number', 'like', "%{$search}%");
            });
        }

        if (! empty($filters['status']) && $filters['status'] !== 'all') {
            $query->where('status', $filters['status']);
        }

        return [
            'promo' => $promo,
            'usages' => $query->orderByDesc('id')->paginate(20)->withQueryString(),
            'totalDiscount' => $promo->orders()->sum('discount_amount'),
            'totalCommission' => $promo->orders()->where('status', OrderStatus::Paid)->sum('partner_commission_amount'),
            'filters' => $filters,
        ];
    }

    public function allUsages(?int $promoId = null, ?string $search = null, ?string $status = null): array
    {
        $query = Order::with(['coupon.partner.user', 'template'])->whereNotNull('coupon_id');
        if ($promoId) {
            $query->where('coupon_id', $promoId);
        }
        if ($search !== null && $search !== '') {
            $query->where(function ($q) use ($search) {
                $q->where('email', 'like', "%{$search}%")
                    ->orWhere('order_number', 'like', "%{$search}%")
                    ->orWhereHas('coupon', fn ($c) => $c->where('code', 'like', "%{$search}%"));
            });
        }
        if ($status !== null && $status !== '' && $status !== 'all') {
            $query->where('status', $status);
        }

        $base = Order::whereNotNull('coupon_id');

        return [
            'usages' => $query->orderByDesc('id')->paginate(20)->withQueryString(),
            'promos' => Coupon::orderBy('code')->get(),
            'stats' => [
                'total_redeem' => (clone $base)->count(),
                'total_discount' => (clone $base)->sum('discount_amount'),
                'total_commission' => (clone $base)->where('status', OrderStatus::Paid)->sum('partner_commission_amount'),
                'unique_users' => (clone $base)->distinct('email')->count('email'),
            ],
            'filters' => [
                'promo_id' => $promoId,
                'search' => $search,
                'status' => $status,
            ],
        ];
    }

    public function createPartner(array $userData, array $partnerData): Partner
    {
        return DB::transaction(function () use ($userData, $partnerData) {
            $user = User::create([
                'name'     => $userData['name'],
                'email'    => strtolower(trim($userData['email'])),
                'whatsapp' => ! empty($userData['whatsapp']) ? trim($userData['whatsapp']) : null,
                'role'     => Role::Mitra,
                'password' => $userData['password'],
            ]);

            return Partner::create([
                'user_id'           => $user->id,
                'type_commission'   => $partnerData['type_commission'],
                'amount_commission' => (int) $partnerData['amount_commission'],
                'is_active'         => true,
            ]);
        });
    }

    public function updatePartner(Partner $partner, array $userData, array $partnerData): Partner
    {
        return DB::transaction(function () use ($partner, $userData, $partnerData) {
            $updateUser = [
                'name'     => $userData['name'],
                'email'    => strtolower(trim($userData['email'])),
                'whatsapp' => ! empty($userData['whatsapp']) ? trim($userData['whatsapp']) : null,
            ];

            if (! empty($userData['password'])) {
                $updateUser['password'] = $userData['password'];
            }

            $partner->user->update($updateUser);

            $partner->update([
                'type_commission'   => $partnerData['type_commission'],
                'amount_commission' => (int) $partnerData['amount_commission'],
            ]);

            return $partner->fresh(['user', 'coupons']);
        });
    }

    public function toggleActivePartner(Partner $partner): Partner
    {
        $partner->is_active = ! $partner->is_active;
        $partner->save();

        return $partner;
    }

    public function deletePartner(Partner $partner): array
    {
        $couponIds = $partner->coupons()->pluck('id');
        $hasOrders = Order::whereIn('coupon_id', $couponIds)->exists();

        if ($hasOrders) {
            return [
                'success' => false,
                'message' => "Mitra '{$partner->user->name}' tidak dapat dihapus karena sudah memiliki riwayat transaksi/order. Silakan nonaktifkan status mitra saja.",
            ];
        }

        $partnerName = $partner->user?->name ?? 'Mitra';

        DB::transaction(function () use ($partner) {
            $user = $partner->user;
            $partner->coupons()->delete();
            $partner->delete();

            if ($user && $user->role === Role::Mitra && ! $user->orders()->exists()) {
                $user->delete();
            }
        });

        return [
            'success' => true,
            'message' => "Mitra '{$partnerName}' berhasil dihapus dari sistem.",
        ];
    }

    public function partners(array $filters = []): array
    {
        $allPartners = Partner::with(['user', 'coupons' => fn ($q) => $q->withCount('orders')])->get();

        $query = Partner::with(['user', 'coupons' => fn ($q) => $q->withCount('orders')]);

        if (! empty($filters['search'])) {
            $search = trim($filters['search']);
            $query->whereHas('user', function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                    ->orWhere('email', 'like', "%{$search}%")
                    ->orWhere('whatsapp', 'like', "%{$search}%");
            });
        }

        if (isset($filters['status']) && $filters['status'] !== '' && $filters['status'] !== 'all') {
            $isActive = $filters['status'] === 'active' || $filters['status'] === '1';
            $query->where('is_active', $isActive);
        }

        if (! empty($filters['commission_type']) && $filters['commission_type'] !== 'all') {
            $query->where('type_commission', $filters['commission_type']);
        }

        if (! empty($filters['has_promo']) && $filters['has_promo'] !== 'all') {
            if ($filters['has_promo'] === 'yes') {
                $query->has('coupons');
            } elseif ($filters['has_promo'] === 'no') {
                $query->doesntHave('coupons');
            }
        }

        // Agregasi pesanan per kupon dalam 1 query tunggal untuk mencegah N+1 query loop
        $orderStatsByCoupon = Order::query()
            ->whereNotNull('coupon_id')
            ->selectRaw('
                coupon_id,
                COUNT(*) as total_redeem,
                SUM(discount_amount) as total_discount,
                SUM(CASE WHEN status = ? THEN partner_commission_amount ELSE 0 END) as total_commission
            ', [OrderStatus::Paid->value])
            ->groupBy('coupon_id')
            ->get()
            ->keyBy('coupon_id');

        $partners = $query->get()->map(function (Partner $partner) use ($orderStatsByCoupon) {
            $redeem = 0;
            $discount = 0;
            $commission = 0;
            foreach ($partner->coupons as $coupon) {
                if ($stat = $orderStatsByCoupon->get($coupon->id)) {
                    $redeem += (int) $stat->total_redeem;
                    $discount += (int) $stat->total_discount;
                    $commission += (int) $stat->total_commission;
                }
            }

            return [
                'partner' => $partner,
                'coupons' => $partner->coupons,
                'total_redeem' => $redeem,
                'total_discount' => $discount,
                'total_commission' => $commission,
            ];
        });

        $sort = $filters['sort'] ?? 'latest';
        $partners = match ($sort) {
            'name_asc' => $partners->sortBy(fn ($r) => strtolower($r['partner']->user->name ?? ''))->values(),
            'commission_desc' => $partners->sortByDesc('total_commission')->values(),
            'redeem_desc' => $partners->sortByDesc('total_redeem')->values(),
            default => $partners->sortByDesc(fn ($r) => $r['partner']->id)->values(),
        };

        $totalRedeemAll = 0;
        $totalCommissionAll = 0;
        foreach ($allPartners as $p) {
            foreach ($p->coupons as $coupon) {
                if ($stat = $orderStatsByCoupon->get($coupon->id)) {
                    $totalRedeemAll += (int) $stat->total_redeem;
                    $totalCommissionAll += (int) $stat->total_commission;
                }
            }
        }

        return [
            'partnersGrouped' => $partners,
            'stats' => [
                'total_partners'    => $allPartners->count(),
                'active_partners'   => $allPartners->where('is_active', true)->count(),
                'inactive_partners' => $allPartners->where('is_active', false)->count(),
                'total_promos'      => $allPartners->sum(fn ($p) => $p->coupons->count()),
                'total_redeem'      => $totalRedeemAll,
                'total_commission'  => $totalCommissionAll,
            ],
            'filters' => $filters,
        ];
    }
}
