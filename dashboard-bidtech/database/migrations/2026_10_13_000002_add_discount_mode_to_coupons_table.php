<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('coupons', function (Blueprint $table) {
            $table->string('discount_mode', 30)->default('SUBTOTAL_DOMAIN')->after('min_order_amount');
        });

        // Backfill data: jika memiliki diskon spesifik komponen tanpa diskon subtotal, tandai sebagai PER_COMPONENT
        DB::table('coupons')
            ->whereNull('subtotal_discount_type')
            ->where(function ($query) {
                $query->whereNotNull('service_discount_type')
                    ->orWhereNotNull('template_discount_type')
                    ->orWhereNotNull('server_discount_type')
                    ->orWhereNotNull('domain_discount_type');
            })
            ->update(['discount_mode' => 'PER_COMPONENT']);
    }

    public function down(): void
    {
        Schema::table('coupons', function (Blueprint $table) {
            $table->dropColumn('discount_mode');
        });
    }
};
