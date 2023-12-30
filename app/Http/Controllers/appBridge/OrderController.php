<?php

namespace App\Http\Controllers\appBridge;

use App\Http\Controllers\Controller;
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
                'status' => 'any',
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

        return response()->json($data['orders']);
    }
}
