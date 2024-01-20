<?php

namespace App\Http\Controllers\appBridge;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class ShopController extends Controller
{
    public function getShopStatus(Request $request)
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
        $data['zr_express'] = $shop->zr_express_token;

        $platform = 'ZR Express';
        $deliveryCredential = $shop->deliveryCredentials()
                                    ->where('platform', $platform)
                                    ->first();

        if ($deliveryCredential) {
            return response()->json([
                'message' => 'Delivery Credential',
                'deliveryCredential' => $deliveryCredential
            ], 200);
        } else {
            return response()->json(['message' => 'Delivery Credential not found'], 404);
        }


        return response()->json([
            'zr_express' => $data['zr_express'],
        ]);
    }

    public function updateSettings(Request $request)
    {
        $request->validate([
            'platform' => 'nullable',
            'token_1' => 'nullable',
            'token_2' => 'nullable',
            'phone_number' => 'nullable',
        ]);

        $shop = $request->user();
        $deliveryCredentials = $shop->deliveryCredentials()->updateOrCreate(
            ['platform' => 'ZR Express'], // Criteria: 'platform' for the specific user
            [
                'token_1' => $request->token_1,
                'token_2' => $request->token_2,
                'phone_number' => $request->phone_number
            ]
        );


        return response()->json([
            'message' => 'saved successfully',
            'deliveryCredentials' => $deliveryCredentials,
        ], 200);
    }
}



/*
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
-*/
