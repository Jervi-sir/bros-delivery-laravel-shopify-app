<?php

namespace App\Http\Controllers\curl;

use App\Http\Controllers\Controller;
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

    public function getOrders()
    {
        $orders = $this->shopify->getOrders();
        //dd($orders);
        // Do something with $orders
        return Inertia::render('Order/List',[
            'orders' => $orders
        ]);
    }

}
