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
        //browser_ip, contact_email, email, current_total_price, subtotal_price, total_price, financial_status, fulfillment_status, order_number, order_status_url, phone
        //billing_address(first_name, last_name, address1, address2, city, zip, province, country, company, name, country_code, province_code)
        //customer(email, first_name, last_name, phone, default_address(first_name, last_name, company, address1, address2, city, country, phone, name, country_name))
        //line_items(name, price, product_id, quantity, requires_shipping, title, total_discount, )
        //shipping_address(first_name, last_name, address1, address2, phone, city, zip, province, country, company, name)
        //payment_gateway_names
        //$fields = 'line_items,title,customer.first_name,customer.last_name,customer.phone,total_price,billing_address,shipping_address';
        $fields = '
        browser_ip,
        phone,customer,contact_email,email,
        payment_gateway_names,
        order_number,order_status_url,
        current_total_price,subtotal_price,total_price,
        fulfillment_status,financial_status,line_items,
        billing_address,shipping_address
        ';
        $response = $this->client->request('GET', 'orders.json', [
            'query' => [
                'status' => 'any',
                'fields' => $fields
            ]
        ]);
        return json_decode($response->getBody(), true);
    }

}
