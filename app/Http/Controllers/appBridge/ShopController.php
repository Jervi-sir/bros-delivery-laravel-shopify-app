<?php

namespace App\Http\Controllers\appBridge;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class ShopController extends Controller
{
    public function getShopStatus (Request $request)
    {
        $shop = $request->user();


        return response()->json([
            'plan_type' => 'Pro Plan',
            'payment_status' => 'Paid',
            'next_payment_date' => '2023-01-15',
            'today_orders_left' => '4',
            'today_orders_shipped' => '20',
            'today_total_sale' => '200000 DA',
        ]);

    }
}
