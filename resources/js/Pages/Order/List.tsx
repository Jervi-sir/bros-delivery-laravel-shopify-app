import OrdersTable from "./OrdersTable";
import React from 'react';
import { AppProvider } from "@shopify/polaris";
import enTranslations from '@shopify/polaris/locales/en.json'

const List = ({ orders }) => {
    return (
        <AppProvider i18n={enTranslations}>
            <OrdersTable orders={orders} />
        </AppProvider>
    )
}
export default List;
