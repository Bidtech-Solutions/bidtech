<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('orders', function (Blueprint $table) {
            $table->timestamp('domain_wa_sent_at')->nullable()->after('paid_email_sent_at');
            $table->timestamp('website_wa_sent_at')->nullable()->after('domain_wa_sent_at');
            $table->timestamp('admin_paid_wa_sent_at')->nullable()->after('website_wa_sent_at');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('orders', function (Blueprint $table) {
            $table->dropColumn(['domain_wa_sent_at', 'website_wa_sent_at', 'admin_paid_wa_sent_at']);
        });
    }
};
