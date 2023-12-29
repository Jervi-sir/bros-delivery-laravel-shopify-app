<?php

namespace App\Providers;
//namespace App\Services;

use Illuminate\Support\ServiceProvider;

use GuzzleHttp\Client;

class ShopifyService extends ServiceProvider
{
    protected $client;

    public function __construct()
    {
        $this->client = new Client([
            'base_uri' => 'https://' . env('SHOPIFY_STORE_URL') . '/admin/api/2023-10/',
            'headers' => [
                'X-Shopify-Access-Token' => env('SHOPIFY_ACCESS_TOKEN')
            ]
        ]);
    }

    public function getOrders()
    {
        $fields = 'line_items,name,billing_address,customer,total_price,fulfillment_status';
        $response = $this->client->request('GET', 'orders.json', [
            'query' => [
                'status' => 'any',
                'fields' => $fields
            ]
        ]);
        return json_decode($response->getBody(), true);
    }

}
