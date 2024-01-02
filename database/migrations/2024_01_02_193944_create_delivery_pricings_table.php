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
        Schema::create('delivery_pricings', function (Blueprint $table) {
            $table->id();
            $table->string('wilaya');
            $table->string('wilaya_number')->nullable();
            $table->string('zr_express')->nullable();   //{ domicile:, stopdesk:, retour: }
            $table->string('zr_express_stopdesks')->nullable();   //{ domicile:, stopdesk:, retour: }
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('delivery_pricings');
    }
};
