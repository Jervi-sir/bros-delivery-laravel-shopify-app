import React, { useState } from "react"
import { Provider } from '@shopify/app-bridge-react';
import { AppProvider, Page } from "@shopify/polaris";
import enTranslations from '@shopify/polaris/locales/en.json'
import useAxios from "./hooks/useAxios";
import OrdersTable from "./components/OrdersTable";

const App = () => {

    return (
        <AppProvider i18n={enTranslations}>
            <OrdersTable />
        </AppProvider>
    );
}

export default App;
