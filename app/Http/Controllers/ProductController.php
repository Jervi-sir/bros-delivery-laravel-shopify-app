<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateProductRequest;
use App\Models\FakeProduct;
use Illuminate\Contracts\Routing\ResponseFactory;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class ProductController extends Controller
{

    public function __construct(private readonly ResponseFactory $responseFactory)
    {

    }

    public function store(CreateProductRequest $request): Response
     {
        $data = $request->validated();

        $shop = $request->user();

        $count = $data['count'];

        $products = [];

        for($i = 0; $i < $count; $i++) {
            $productResources = [
                'body_html' => 'Product Description',
                'title' => 'Title '  . $i
            ];

            $response = $shop->api()->rest('POST', '/admin/api/2024-01/products.json', ["product" => $productResources]);

            if(! empty($response['errors'])) {
                throw $response['exception'];
            }

            $products[] = [
                'shopify_id' => $response['body']['product']['id'],
            ];
        }

        $shop->fakeProducts()->createMany($products);

        return $this->responseFactory->noContent();
    }

    public function destroy(Request $request): Response
    {
        $shop = $request->user();

        $shop->fakeProducts()->each(function(FakeProduct $fakeProduct) use($shop) {
            $response = $shop->api()->rest('DELETE', '/admin/api/2024-01/products/' . $fakeProduct->shopify_id . '.json');

            if(empty($response['errors']) || $response['status'] === 404) {
                $fakeProduct->delete();
            } else {
                report($response['exception']);
            }

        });

        return $this->responseFactory->noContent();
    }

}
