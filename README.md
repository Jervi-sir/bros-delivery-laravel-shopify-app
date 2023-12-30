
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
    SHOPIFY_WEBHOOK_1_TOPIC=APP_UNINSTALLED
    SHOPIFY_WEBHOOK_1_ADDRESS=https://ngrok url/webhook/app-uninstalled


### what made in the `Curl` version
- [x] consume the orders of the api token
- [x] show orders in Polaris table
- [x] handle bulk selection
- [x] send selected orders that should get delivered, to laravel backend
- [x] save these sent orders in DB in case we need them for analysis
### What s next

- [x] sidebar with (orders list, delivered list)
- [ ] login page
- [ ] add credential page
- [ ] manage credentials

### Polaris squelaton used
- https://polaris.shopify.com/components/utilities/frame
- https://polaris.shopify.com/components/navigation/navigation?example=navigation-default
- 

### To Add a billing plan
```
INSERT INTO plans (`type`,`name`,`price`,`interval`,`capped_amount`,`terms`,`trial_days`,`test`,`on_install`,`created_at`,`updated_at`) VALUES
('RECURRING','Test Plan',5.00,'EVERY_30_DAYS',10.00,'Test terms',7,FALSE,1,NULL,NULL);
```

## Acknowledgements

 - [Shopify Polaris](https://polaris.shopify.com)
 - [Shopify REST API](https://shopify.dev/docs/api/admin-rest)
 - [Laracast Course for App Bridge](https://laracasts.com/series/build-shopify-apps-with-laravel)

