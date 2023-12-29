<?php

namespace App\Http\Controllers\curl;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\User;
use App\Providers\ShopifyService;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Inertia\Inertia;

class OrderController extends Controller
{
    protected $shopify;

    public function __construct(ShopifyService $shopify)
    {
        $this->shopify = $shopify;
    }

    public function getOrders(Request $request)
    {
        $results = $this->shopify->getOrders();
        //dd($results);
        // Do something with $orders

        return Inertia::render('Order/List',[
            'orders' => $results
        ]);
    }

    public function postDeliveries(Request $request)
    {
        $orders = $request['orders'];

        //Save order in DB in case we need it for analysis
        foreach ($orders as $key => $order) {
            $new_order = new Order();
            $new_order->user_id =  User::first()->id;
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
            $new_order->save();
        }

        return response()->json($orders);
    }

}
