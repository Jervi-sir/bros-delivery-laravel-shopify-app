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

        /** What i need
         *  name, email, financial_status, fulfillment_status, currency, subtotal_price, shipping_lines(price, code), tax_lines(price), total_price, created_at, line_items(title, quantity, id, price, name)
        */
        $fields = '
            browser_ip, order_number, email, currency, created_at,
            subtotal_price, total_price, financial_status,
            line_items,shipping_address, payment_gateway_names
        ';
        //tax_lines, fulfillment_status, shipping_lines, customer,

        $response = $this->client->request('GET', 'orders.json', [
            'query' => [
                'status' => 'any',
                'fields' => $fields
            ]
        ]);

        $results = json_decode($response->getBody(), true);

        $data['orders'] = [];
        foreach ($results['orders'] as $key => $order) {
            $data['orders'][$key] = [
                'id'    => $order['order_number']   ?? 'Unknown ID',
                'order' => ($order['order_number']  ?? 'Unknown Order Number'),
                'created_at' => ($order['created_at']  ?? 'Unknown Created_at'),

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
                    'wilaya'    => isset($order['shipping_address']) ? $order['shipping_address']['address1']   : 'Unknown address1',
                    'wilaya2'   => isset($order['shipping_address']) ? $order['shipping_address']['city']       : 'Unknown city',
                    'zip'       => isset($order['shipping_address']) ? $order['shipping_address']['zip']        : 'Unknown zip',
                    'address1'  => isset($order['shipping_address']) ? $order['shipping_address']['address1']   : 'Unknown address1',
                    'address2'  => isset($order['shipping_address']) ? $order['shipping_address']['address2']   : 'Unknown address2',
                    'company'   => isset($order['shipping_address']) ? $order['shipping_address']['company']    : 'Unknown company',
                ]
            ];
        }

        return $data['orders'];
    }

}



/*---- Response is like this
 0 => array:11 [▼
      "browser_ip" => "41.97.186.159"
      "financial_status" => "paid"
      "fulfillment_status" => null
      "order_number" => 1004
      "subtotal_price" => "785.95"
      "tax_lines" => []
      "total_price" => "785.95"
      "customer" => array:22 [▼
        "id" => 6632099086383
        "email" => "ayumu.hirano@example.com"
        "accepts_marketing" => false
        "created_at" => "2023-12-17T12:59:37-05:00"
        "updated_at" => "2023-12-29T12:47:01-05:00"
        "first_name" => "Ayumu"
        "last_name" => "Hirano"
        "state" => "disabled"
        "note" => null
        "verified_email" => true
        "multipass_identifier" => null
        "tax_exempt" => false
        "phone" => "+213558054300"
        "email_marketing_consent" => array:3 [▶]
        "sms_marketing_consent" => array:4 [▶]
        "tags" => ""
        "currency" => "EUR"
        "accepts_marketing_updated_at" => "2023-12-17T12:59:37-05:00"
        "marketing_opt_in_level" => null
        "tax_exemptions" => []
        "admin_graphql_api_id" => "gid://shopify/Customer/6632099086383"
        "default_address" => array:17 [▶]
      ]
      "line_items" => array:1 [▼
        0 => array:27 [▼
          "id" => 12938273357871
          "admin_graphql_api_id" => "gid://shopify/LineItem/12938273357871"
          "fulfillable_quantity" => 1
          "fulfillment_service" => "manual"
          "fulfillment_status" => null
          "gift_card" => false
          "grams" => 0
          "name" => "The Compare at Price Snowboard"
          "price" => "785.95"
          "price_set" => array:2 [▶]
          "product_exists" => true
          "product_id" => 7384837980207
          "properties" => []
          "quantity" => 1
          "requires_shipping" => true
          "sku" => ""
          "taxable" => true
          "title" => "The Compare at Price Snowboard"
          "total_discount" => "0.00"
          "total_discount_set" => array:2 [▶]
          "variant_id" => 41953173798959
          "variant_inventory_management" => "shopify"
          "variant_title" => null
          "vendor" => "Quickstart (7953edcc)"
          "tax_lines" => []
          "duties" => []
          "discount_allocations" => []
        ]
      ]
      "shipping_address" => array:15 [▼
        "first_name" => "Jervi"
        "address1" => "Ain Temouchent"
        "phone" => "+213 558 05 43 00"
        "city" => "Ain Temouchent"
        "zip" => "46011"
        "province" => null
        "country" => "Algeria"
        "last_name" => "Sir"
        "address2" => "Chaabat el Lehamm"
        "company" => "Ain Temouchent"
        "latitude" => null
        "longitude" => null
        "name" => "Jervi Sir"
        "country_code" => "DZ"
        "province_code" => null
      ]
      "shipping_lines" => []
    ]
    ---*/
