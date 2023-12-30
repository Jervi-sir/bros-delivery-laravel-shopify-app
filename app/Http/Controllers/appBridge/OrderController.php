<?php

namespace App\Http\Controllers\appBridge;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\User;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    public function getNewOrders(Request $request)
    {
        $fields = '
            browser_ip, order_number, email, currency, created_at, fulfillment_status,
            subtotal_price, total_price, financial_status,
            line_items,shipping_address, payment_gateway_names
        ';
        $shop = $request->user();
        $response = $shop->api()->rest('GET', '/admin/api/orders.json', [
            'query' => [
                'fulfillment_status' => 'unfulfilled',
                //'financial_status' => 'pending',
                'fields' => $fields
            ]
        ]);

        $results = $response['body']['orders'];

        $data['orders'] = [];
        foreach ($results as $key => $order) {
            $data['orders'][$key] = [
                'id'    => $order['order_number']   ?? 'Unknown ID',
                'order' => ($order['order_number']  ?? 'Unknown Order Number'),
                'created_at' => ($order['created_at']  ?? 'Unknown Created_at'),
                'fulfillment_status' => isset($order['line_items']) ? $order['line_items'][0]['fulfillment_status']  : 'Unknown status',

                'paymentStatus'     => $order['financial_status']   ?? 'Unknown Status',
                'currency'          => $order['currency']           ?? 'Unknown Currency',
                'total_price'       => ($order['total_price']       ?? '0.00'),
                'subtotal_price'    => ($order['subtotal_price']    ?? '0.00'),

                'delivery_method' => $order['payment_gateway_names'] ?? 'Unknown Item',

                'customer' => [
                    'first_name'    => isset($order['shipping_address']) ?  $order['shipping_address']['first_name']    : 'Unknown first_name',
                    'last_name'     => isset($order['shipping_address']) ?  $order['shipping_address']['last_name']     : 'Unknown last_name',
                    'name'          => isset($order['shipping_address']) ?  $order['shipping_address']['name']          : 'Unknown name',
                    'phone'         => isset($order['shipping_address']) ?  $order['shipping_address']['phone']         : 'Unknown phone',
                    'email'         => $order['email'] ?? 'Unknown email',
                ],
                'item' => [
                    'product_id'    => isset($order['line_items']) ? $order['line_items'][0]['product_id']  : 'Unknown product_id',
                    'name'          => isset($order['line_items']) ? $order['line_items'][0]['name']        : 'Unknown product name',
                    'title'         => isset($order['line_items']) ? $order['line_items'][0]['title']       : 'Unknown title',
                    'grams'         => isset($order['line_items']) ? $order['line_items'][0]['grams']       : 'Unknown grams',
                    'price'         => isset($order['line_items']) ? $order['line_items'][0]['price']       : 'Unknown price',
                    'sku'           => isset($order['line_items']) ? $order['line_items'][0]['sku']         : 'Unknown sku',
                ],
                'shipping_address' => [
                    'wilaya'    => isset($order['shipping_address']['address1']) ? $order['shipping_address']['address1']   : 'Unknown address1',
                    'wilaya2'   => isset($order['shipping_address']['city'] ) ? $order['shipping_address']['city']       : 'Unknown city',
                    'zip'       => isset($order['shipping_address']['zip']) ? $order['shipping_address']['zip']        : 'Unknown zip',
                    'address1'  => isset($order['shipping_address']['address1']) ? $order['shipping_address']['address1']   : 'Unknown address1',
                    'address2'  => isset($order['shipping_address']['address2']) ? $order['shipping_address']['address2']   : 'Unknown address2',
                    'company'   => isset($order['shipping_address']['company']) ? $order['shipping_address']['company']    : 'Unknown company',
                ]
            ];
        }

        $data['deliveries'] = [];

        if ($shop->zr_express_token) {
            $data['deliveries'][] = ['label' => 'ZR Express', 'value' => 'zr_express'];
        }

        // Assuming there are other conditions for other delivery options
        //if ($shop->another_delivery_condition) {
        //   $data['deliveries'][] = ['label' => 'Another Delivery', 'value' => 'another_value'];
        //}

        return response()->json([
            'orders' => $data['orders'],
            'deliveries' => $data['deliveries'],
        ]);
    }

    public function postDeliveries(Request $request)
    {
        $shop = $request->user();
        $orders = $request['orders'];

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
