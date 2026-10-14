<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('orders', function (Blueprint $table) {
            $table->boolean('is_own_domain')->default(false)->after('domain_price_per_year');
        });

        // Order lama: domain milik sendiri selama ini hanya terlihat dari harga domain Rp0.
        DB::table('orders')->where('domain_price', 0)->update(['is_own_domain' => true]);
    }

    public function down(): void
    {
        Schema::table('orders', function (Blueprint $table) {
            $table->dropColumn('is_own_domain');
        });
    }
};
