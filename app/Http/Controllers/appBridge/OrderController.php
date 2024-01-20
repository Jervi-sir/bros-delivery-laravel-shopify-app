<?php

namespace App\Http\Controllers\appBridge;

use App\Models\User;
use App\Models\Order;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Http;

class OrderController extends Controller
{
    public function getNewOrders(Request $request)
    {
        $request->validate([
            'page_info' => 'nullable',
        ]);

        $fields = '
            browser_ip, order_number, currency, created_at,
            note_attributes, 
            fulfillment_status,
            financial_status, payment_gateway_names, 
            line_items,
            shipping_lines, shipping_address,
            subtotal_price, total_price, total_shipping_price_set
         ';
        $shop = $request->user();

        $response = $shop->api()->rest('GET', '/admin/api/orders.json', [
            'query' => [
                //'fulfillment_status' => 'unfulfilled',
                //'financial_status' => 'pending',
                'page_info' => $request->page_info,
                'fields' => $fields,
                'limit' => 50 // optional, set the number of items per page (default is usually 50)
            ]
        ]);

        $results = $response['body']['orders'];

        $data['orders'] = [];
        foreach ($results as $key => $order) {
            $data['orders'][$key] = [
                //order
                'id'    => $order['order_number']   ?? 'Unknown ID',
                'order' => $order['order_number']   ?? 'Unknown Order Number',
                //date
                'created_at' => $order['created_at']  ?? 'Unknown Created_at',
                //customer
                'customer' => [
                    'first_name'=> isset($order['shipping_address']) ?  $order['shipping_address']['first_name']    : 'Unknown first_name',
                    'last_name' => isset($order['shipping_address']) ?  $order['shipping_address']['last_name']     : 'Unknown last_name',
                    'name'      => isset($order['shipping_address']) ?  $order['shipping_address']['name']          : 'Unknown name',
                    'phone'     => isset($order['shipping_address']) ?  $order['shipping_address']['phone']         : 'Unknown phone',
                ],
                //payment
                'paymentStatus'  => $order['financial_status']   ?? 'Unknown Status',
                'total_price'    => $order['total_price']        ?? '0.00',
                'subtotal_price' => $order['subtotal_price']     ?? '0.00',
                'shipping_price' => $order['total_shipping_price_set']['shop_money']['amount']    ?? '0.00',
                'currency'       => $order['currency']           ?? 'Unknown Currency',
                //fulfillment status
                'fulfillment_status' => isset($order['line_items']) ? $order['line_items'][0]['fulfillment_status']  : 'Unknown status',
                //delivery method
                'delivery_method'   => $order['payment_gateway_names'] ?? 'Unknown Method',
                'delivery_method_ar'=> $order['shipping_lines'] ?? 'Unknown Method',
                //item
                'item' => [
                    'product_id'    => isset($order['line_items']) ? $order['line_items'][0]['product_id']  : 'Unknown product_id',
                    'title'         => isset($order['line_items']) ? $order['line_items'][0]['title']       : 'Unknown title',
                    'variant_title' => isset($order['line_items']) ? $order['line_items'][0]['variant_title']        : 'Unknown product name',
                    'quantity'      => isset($order['line_items']) ? $order['line_items'][0]['quantity']       : 'Unknown grams',
                    'price'         => isset($order['line_items']) ? $order['line_items'][0]['price']       : 'Unknown price',
                    'vendor'        => isset($order['line_items']) ? $order['line_items'][0]['vendor']       : 'Unknown price',
                ],
                //shipping
                'shipping_address' => [
                    'province'  => isset($order['shipping_address']['province']) ? $order['shipping_address']['province']: 'Unknown address1',
                    'city'      => isset($order['shipping_address']['city'] ) ? $order['shipping_address']['city']       : 'Unknown city',
                ],
                //notes
                'note_attributes' => [
                    'phone_number'  => isset($order['note_attributes'][0]['value']) ? $order['note_attributes'][0]['value'] : 'Unknown address1',
                    'province'      => isset($order['note_attributes'][1]['value'] ) ? $order['note_attributes'][0]['value']: 'Unknown city',
                    'city'          => isset($order['note_attributes'][2]['value'] ) ? $order['note_attributes'][0]['value']    : 'Unknown city',
                ],
            ];
        }


        $deliveryCredentials = $shop->deliveryCredentials()->get();
        $deliveryOptions = [];
        foreach ($deliveryCredentials as $credential) {
            $deliveryOptions[] = [
                'label' => $credential->platform, // Assuming 'platform' is the field name
                'value' => $credential->platform // Convert platform name to snake_case for value
            ];
        }
    
        //$data['deliveries'] = [];

        //if ($shop->zr_express_token) {
        //    $data['deliveries'][] = ['label' => 'ZR Express', 'value' => 'zr_express'];
        //}

        // Assuming there are other conditions for other delivery options
        //if ($shop->another_delivery_condition) {
        //   $data['deliveries'][] = ['label' => 'Another Delivery', 'value' => 'another_value'];
        //}

        return response()->json([
            'next_page' => $response['link']['next'],
            'previous_page' => $response['link']['previous'],
            'orders' => $data['orders'],
            'deliveries' => $deliveryOptions,
        ]);
    }

    public function postDeliveries(Request $request)
    {

        $shop = $request->user();
        $orders = $request['orders'];

        $token = 'VOTRE TOKEN';
        $key = 'VOTRE CLE';

        $response = Http::withHeaders([
            'token' => $token,
            'key' => $key,
        ])->post('https://example.com/add_colis', [
            'Colis' => [
                [
                    'Tracking' => 'VotreTracking',
                    // ... other fields ...
                    'id_Externe' => '01',
                    // ... other fields ...
                ],
                [
                    'Tracking' => 'VotreTracking',
                    // ... other fields ...
                    'id_Externe' => '02',
                    // ... other fields ...
                ],
                // ... more parcels if needed ...
            ],
        ]);

        // Handle the response
        if ($response->successful()) {
            // Process successful response
            return $response->body();
        } else {
            // Handle errors
            return response()->json(['error' => 'API request failed'], 500);
        }

        
        return response()->json(json_decode($orders[0]['all']));

        foreach ($orders as $key => $order) {
            $new_order = new Order();
            $new_order->user_id =  $shop->id;
            $new_order->order_id =  $order['order'];
            //product
            $new_order->product_title =  $order['item_title'];
            $new_order->product_price =  $order['item_price'];
            $new_order->total =  $order['total'];
            //customer
            $new_order->customer_name =  $order['customer'];
            $new_order->customer_phone =  $order['phone'];
            //delivery
            $new_order->delivery_price =  $order['delivery_price'];
            $new_order->delivery_address =  $order['shipping_address'];
            $new_order->wilaya =  $order['wilaya'];
            $new_order->zip =  $order['zip'];
            $new_order->delivery_company = $request['delivery_company']['value'];   //{label: 'ZR Express', value: 'zr_express'}

            $new_order->save();
        }

        return response()->json($orders);
    }

    public function showShippedOrders(Request $request)
    {
        $shop = $request->user();

        $orders = $shop->orders()->orderBy('created_at', 'desc')->get();

        return response()->json($orders);
    }

}



function extractNextPageUrl($linkHeader) {
    // Regular expression to find URL for 'next' relation
    $regex = '/<([^>]+)>;\s*rel="next"/';

    // Use preg_match to find the URL in the header
    if (preg_match($regex, $linkHeader, $matches)) {
        // Return the URL if found
        return $matches[1];
    }

    // Return null if no 'next' URL is found
    return null;
}