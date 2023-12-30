
# Bros Delivery

is a Laravel/webapp compatible with Shopify

-> I made 2 types of this app

* App Bridge, (based on Laracast couse)
* Curl consumer (since App Bridge doesn't give me permission of customer credentials such as Orders)








## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

    SHOPIFY_APPBRIDGE_VERSION=latest
    SHOPIFY_APP_NAME=bro-delivery
    SHOPIFY_API_VERSION=2024-01
    SHOPIFY_API_KEY= found in shopify partner
    VITE_SHOPIFY_API_KEY= same as previous one
    SHOPIFY_API_SECRET= found in shopify partner
    SHOPIFY_API_SCOPES=read_products,write_products,read_customers,write_customers
    SHOPIFY_FRONTEND_ENGINE=REACT

    SHOPIFY_STORE_URL=shop name.myshopify.com
    SHOPIFY_ACCESS_TOKEN=its from created dev app in shop not partner

    VITE_APP_TYPE=curl #appBridge, curl:: its to precise which one is gonna be used,especially for routing

### what made in the `Curl` version
- [x] consume the orders of the api token
- [x] show orders in Polaris table
- [x] handle bulk selection
- [x] send selected orders that should get delivered, to laravel backend
- [x] save these sent orders in DB in case we need them for analysis
### What s next

- [ ] sidebar with (orders list, delivered list)
- [ ] login page
- [ ] add credential page
- [ ] manage credentials
## Acknowledgements

 - [Shopify Polaris](https://polaris.shopify.com)
 - [Shopify REST API](https://shopify.dev/docs/api/admin-rest)
 - [Laracast Course for App Bridge](https://laracasts.com/series/build-shopify-apps-with-laravel)

