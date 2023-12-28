import React, { useState } from "react"
import { Provider } from '@shopify/app-bridge-react';
import { AppProvider, Page } from "@shopify/polaris";
import enTranslations from '@shopify/polaris/locales/en.json'
import MissingApiKey from "./components/MissingApiKey";
import SliderRange from "./components/SliderRange";
import useAxios from "./hooks/axios";

const App = () => {

    const [appBridgeConfig] = useState(() => {
        const host = new URLSearchParams(location.search).get('host') || window.__SHOPIFY_HOST;
        window.__SHOPIFY_HOST = host

        return {
            host,
            apiKey: import.meta.env.VITE_SHOPIFY_API_KEY,
            forceRedirect: true,
            scopes: ['read_products,write_products,read_orders,write_orders'],
        }
    })

    if(! appBridgeConfig.apiKey) {
        return (
        <AppProvider i18n={enTranslations}>
            <MissingApiKey />
        </AppProvider>
        )
    }
    return (
        <AppProvider i18n={enTranslations}>
            <Provider config={ appBridgeConfig }>
                <Page>
                    <SliderRange />
                </Page>
            </Provider>
        </AppProvider>
    );
}

export default App;
