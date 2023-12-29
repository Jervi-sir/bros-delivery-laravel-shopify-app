<?php

namespace App\Http\Controllers\curl;

use App\Http\Controllers\Controller;
use App\Providers\ShopifyService;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    protected $shopify;

    public function __construct(ShopifyService $shopify)
    {
        $this->shopify = $shopify;
    }

    public function index()
    {
        $orders = $this->shopify->getOrders();
        dd($orders);
        // Do something with $orders
        return view('orders.index', compact('orders'));
    }

}
