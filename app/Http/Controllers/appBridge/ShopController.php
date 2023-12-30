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

    public function showSettings(Request $request)
    {
        $shop = $request->user();
        $tokens = $shop->deliveryTokens;
        $data['tokens'] = [];

        foreach ($tokens as $key => $token) {
            $data['tokens'][$token->deliveryCompany->code_name] = [
                'label' => $token->deliveryCompany->name,
                'code' => $token->deliveryCompany->code_name,
                'token' => $token->access_token,
                'last_update' => $token->updated_at,
            ];
        }

        return response()->json([
            'zr_express' => isset($data['tokens']['zr_express']) ? $data['tokens']['zr_express'] : [] ,
        ]);

    }

}
