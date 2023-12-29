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
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained();
            $table->string('order_id')->nullable();

            //product
            $table->string('product_title')->nullable();
            $table->string('product_price')->nullable();
            $table->string('total')->nullable();

            //customer
            $table->string('customer_name')->nullable();
            $table->string('customer_phone')->nullable();

            //delivery
            $table->string('delivery_price')->nullable();
            $table->string('delivery_address')->nullable();
            $table->string('wilaya')->nullable();
            $table->string('zip')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
