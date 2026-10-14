<?php

namespace App\Http\Controllers;

use App\Enums\CommissionType;
use App\Enums\Role;
use App\Models\Article;
use App\Models\Coupon;
use App\Models\Order;
use App\Models\Partner;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\Enum;
use Illuminate\View\View;

class KelolaUserController extends Controller
{
    /**
     * Tampilkan daftar seluruh pengguna beserta statistik dan filter role.
     */
    public function index(Request $request): View
    {
        $stats = [
            'total'                    => User::count(),
            'new_this_month'           => User::where('created_at', '>=', now()->startOfMonth())->count(),
            'admin'                    => User::where('role', Role::Admin)->count(),
            'marketing'                => User::where('role', Role::Marketing)->count(),
            'klien'                    => User::where('role', Role::Klien)->count(),
            'klien_paid_orders'        => Order::where('status', 'paid')->count(),
            'klien_omzet'              => (int) (Order::where('status', 'paid')
                ->selectRaw('SUM(COALESCE(template_price, 0) + COALESCE(server_price, 0) + COALESCE(service_price, 0) + COALESCE(domain_price, 0) - COALESCE(discount_amount, 0)) as total')
                ->value('total') ?? 0),
            'mitra'                    => User::where('role', Role::Mitra)->count(),
            'mitra_commission_total'   => (int) Order::where('is_partner_order', true)->where('status', 'paid')->sum('partner_commission_amount'),
            'mitra_coupons_count'      => Coupon::whereNotNull('partner_id')->count(),
            'media'                    => User::where('role', Role::Media)->count(),
            'media_articles_published' => Article::where('status', 'published')->count(),
            'media_articles_draft'     => Article::where('status', 'draft')->count(),
        ];

        $query = User::query()
            ->withCount('orders')
            ->withCount(['orders as paid_orders_count' => fn ($q) => $q->where('status', 'paid')])
            ->withCount('articles')
            ->withCount(['articles as published_articles_count' => fn ($q) => $q->where('status', 'published')])
            ->with([
                'latestOrder',
                'orders' => fn ($q) => $q->latest()->limit(5),
                'partner.coupons',
                'articles' => fn ($q) => $q->latest()->limit(5),
            ])
            ->latest();

        // Filter Role
        $activeRole = $request->input('role');
        if ($activeRole && in_array($activeRole, array_column(Role::cases(), 'value'), true)) {
            $query->where('role', $activeRole);
        } else {
            $activeRole = null;
        }

        // Pencarian Nama, Email, WhatsApp, Author Name
        if ($request->filled('search')) {
            $search = trim($request->input('search'));
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('email', 'like', "%{$search}%")
                  ->orWhere('whatsapp', 'like', "%{$search}%")
                  ->orWhere('author_name', 'like', "%{$search}%");
            });
        }

        $users = $query->paginate(15)->withQueryString();

        return view('pages.kelola-user', [
            'users'      => $users,
            'stats'      => $stats,
            'activeRole' => $activeRole,
            'roles'      => Role::cases(),
        ]);
    }

    /**
     * Tambah user baru (Admin, Marketing, Klien, Media, Mitra).
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name'        => ['required', 'string', 'max:150'],
            'email'       => ['required', 'string', 'email', 'max:150', 'unique:users,email'],
            'whatsapp'    => ['nullable', 'string', 'max:30'],
            'role'        => ['required', new Enum(Role::class)],
            'password'    => ['required', 'string', 'min:6'],
            'author_name' => ['nullable', 'string', 'max:150'],
        ], [
            'name.required'     => 'Nama lengkap wajib diisi.',
            'email.required'    => 'Alamat email wajib diisi.',
            'email.email'       => 'Format email tidak valid.',
            'email.unique'      => 'Email ini sudah terdaftar di sistem.',
            'role.required'     => 'Role pengguna wajib dipilih.',
            'password.required' => 'Password wajib diisi.',
            'password.min'      => 'Password minimal terdiri dari 6 karakter.',
        ]);

        $user = User::create([
            'name'        => $validated['name'],
            'email'       => strtolower(trim($validated['email'])),
            'whatsapp'    => $validated['whatsapp'] ? trim($validated['whatsapp']) : null,
            'role'        => $validated['role'],
            'password'    => $validated['password'],
            'author_name' => $validated['author_name'] ? trim($validated['author_name']) : null,
        ]);

        if ($user->role === Role::Mitra && ! $user->partner()->exists()) {
            Partner::create([
                'user_id'           => $user->id,
                'type_commission'   => CommissionType::Percentage,
                'amount_commission' => 10,
                'is_active'         => true,
            ]);
        }

        return redirect()->route('dashboard.users.index')
            ->with('success', "Pengguna {$user->name} ({$user->role->value}) berhasil ditambahkan.");
    }

    /**
     * Perbarui data identitas dan role user.
     */
    public function update(Request $request, User $user): RedirectResponse
    {
        // Jika sedang mengedit akun sendiri dan role disabled di form, pastikan tetap Admin
        if ($user->id === auth()->id() && !$request->has('role')) {
            $request->merge(['role' => Role::Admin->value]);
        }

        $validated = $request->validate([
            'name'        => ['required', 'string', 'max:150'],
            'email'       => ['required', 'string', 'email', 'max:150', Rule::unique('users', 'email')->ignore($user->id)],
            'whatsapp'    => ['nullable', 'string', 'max:30'],
            'role'        => ['required', new Enum(Role::class)],
            'author_name' => ['nullable', 'string', 'max:150'],
        ], [
            'name.required'  => 'Nama lengkap wajib diisi.',
            'email.required' => 'Alamat email wajib diisi.',
            'email.email'    => 'Format email tidak valid.',
            'email.unique'   => 'Email ini sudah terdaftar pada pengguna lain.',
            'role.required'  => 'Role pengguna wajib dipilih.',
        ]);

        // Mencegah admin mendemosi akunnya sendiri jika sedang login
        if ($user->id === auth()->id() && $validated['role'] !== Role::Admin->value) {
            return back()->with('error', 'Anda tidak dapat mengubah role akun Anda sendiri saat sedang login.');
        }

        $user->update([
            'name'        => $validated['name'],
            'email'       => strtolower(trim($validated['email'])),
            'whatsapp'    => $validated['whatsapp'] ? trim($validated['whatsapp']) : null,
            'role'        => $validated['role'],
            'author_name' => $validated['author_name'] ? trim($validated['author_name']) : null,
        ]);

        if ($user->role === Role::Mitra && ! $user->partner()->exists()) {
            Partner::create([
                'user_id'           => $user->id,
                'type_commission'   => CommissionType::Percentage,
                'amount_commission' => 10,
                'is_active'         => true,
            ]);
        }

        return redirect()->route('dashboard.users.index')
            ->with('success', "Data pengguna {$user->name} berhasil diperbarui.");
    }

    /**
     * Reset password pengguna oleh Admin.
     */
    public function updatePassword(Request $request, User $user): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'string', 'min:6'],
        ], [
            'password.required' => 'Password baru wajib diisi.',
            'password.min'      => 'Password baru minimal 6 karakter.',
        ]);

        $user->update([
            'password' => $request->password,
        ]);

        return redirect()->route('dashboard.users.index')
            ->with('success', "Password untuk pengguna {$user->name} berhasil diubah.");
    }

    /**
     * Hapus akun pengguna dengan proteksi keamanan.
     */
    public function destroy(User $user): RedirectResponse
    {
        // Proteksi 1: Tidak bisa menghapus akun sendiri
        if ($user->id === auth()->id()) {
            return back()->with('error', 'Anda tidak dapat menghapus akun Anda sendiri yang sedang aktif digunakan.');
        }

        // Proteksi 2: Tidak bisa menghapus admin terakhir
        if ($user->isAdmin() && User::where('role', Role::Admin)->count() <= 1) {
            return back()->with('error', 'Tidak dapat menghapus Admin terakhir di sistem.');
        }

        // Proteksi 3: Mitra yang terhubung ke relasi partner (restrictOnDelete)
        if ($user->partner()->exists()) {
            return back()->with('error', "Pengguna {$user->name} terdaftar sebagai Mitra afiliasi aktif. Hapus terlebih dahulu data afiliasi terkait sebelum menghapus pengguna.");
        }

        $name = $user->name;
        $user->delete();

        return redirect()->route('dashboard.users.index')
            ->with('success', "Pengguna {$name} berhasil dihapus dari sistem.");
    }
}
