<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateProductRequest;
use Illuminate\Contracts\Routing\ResponseFactory;
use Illuminate\Http\Request;

class ProductController extends Controller
{

    public function __construct(private readonly ResponseFactory $responseFactory)
    {

    }

    public function store(CreateProductRequest $request) {
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

            $id = $response['body']['product']['id'];
            $title = $response['body']['product']['title'];

            $products[] = ['id' => $id, 'title' => $title];
        }


        return $this->responseFactory->json($products);
    }
}
