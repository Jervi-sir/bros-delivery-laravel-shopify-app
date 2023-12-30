<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateFakeDataRequest;
use App\Models\FakeCustomer;
use App\Models\FakeProduct;
use Faker\Factory;
use Illuminate\Contracts\Routing\ResponseFactory;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class FakerController extends Controller
{

    public function __construct(private readonly ResponseFactory $responseFactory)
    {

    }

    public function store(CreateFakeDataRequest $request): Response
     {
        $data = $request->validated();
        $productsCount = $data['productsCount'] ?? 0;
        $customersCount = $data['customersCount'] ?? 0;
        $user = $request->user();

        if($productsCount > 0) {
            $this->createProducts($productsCount, $user);
        }

        if($user->plan->price > 0 && $customersCount > 0) {
            $this->createCustomers($customersCount, $user);
        }

        return $this->responseFactory->noContent();
    }

    public function destroy(Request $request): Response
    {
        $user = $request->user();

        $this->deleteProducts($user);

        if ($user->plan?->price > 0) {
            $this->deleteCustomers($user);
        }

        return $this->responseFactory->noContent();
    }


/*-------------------------------------------------*/
    function createProducts($count, $shop) {
        $products = [];
        for($i = 0; $i < $count; $i++) {
            $productResources = [
                'body_html' => 'Product Description',
                'title' => 'Title '  . $i
            ];
            $response = $shop->api()->rest('POST', '/admin/api/products.json', ["product" => $productResources]);
            if(! empty($response['errors'])) {
                throw $response['exception'];
            }
            $products[] = [
                'shopify_id' => $response['body']['product']['id'],
            ];
        }
        $shop->fakeProducts()->createMany($products);
    }

    function createCustomers($count, $shop) {
        $customers = [];
        $faker = Factory::create();

        for($i = 0; $i < $count; $i++) {
            $customerResources = [
                'first_name' => $faker->firstName,
                'last_name' => $faker->lastName
            ];
            $response = $shop->api()->rest('POST', '/admin/api/customers.json', ["customer" => $customerResources]);
            if(! empty($response['errors'])) {
                throw $response['exception'];
            }
            $customers[] = [
                'shopify_id' => $response['body']['customer']['id'],
            ];
        }
        $shop->fakeCustomers()->createMany($customers);
    }

    function deleteProducts($shop) {
        $shop->fakeProducts()->each(function(FakeProduct $fakeProduct) use($shop) {
            $response = $shop->api()->rest('DELETE', '/admin/api/products/' . $fakeProduct->shopify_id . '.json');

            if(empty($response['errors']) || $response['status'] === 404) {
                $fakeProduct->delete();
            } else {
                report($response['exception']);
            }

        });
    }

    function deleteCustomers($shop) {
        $shop->fakeCustomers()->each(function(FakeCustomer $fakeCustomer) use($shop) {
            $response = $shop->api()->rest('DELETE', '/admin/api/customers/' . $fakeCustomer->shopify_id . '.json');

            if(empty($response['errors']) || $response['status'] === 404) {
                $fakeCustomer->delete();
            } else {
                report($response['exception']);
            }

        });
    }

}


