<?php

namespace App\Http\Controllers;

use App\Services\OrderService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\View\View;

class DashboardController extends Controller
{
    /**
     * Ringkasan dashboard sesuai peran: admin (KPI) atau klien (stepper progres).
     * Media tidak punya order, jadi diarahkan ke Kelola Artikel.
     */
    public function view(
        Request $request,
        OrderService $orders,
    ): View|RedirectResponse {
        $user = $request->user();

        if ($user->isMedia()) {
            return redirect()->route('dashboard.articles.index');
        }

        if ($user->isMarketing()) {
            return view('pages.dashboard', $orders->dashboardMarketing($user));
        }

        $data = $user->isAdmin() ? $orders->dashboardAdmin($user) : $orders->dashboardClient($user);

        return view('pages.dashboard', $data);
    }
}
