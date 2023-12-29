import React, { useState } from "react"
import { Provider } from '@shopify/app-bridge-react';
import { AppProvider, Page } from "@shopify/polaris";
import enTranslations from '@shopify/polaris/locales/en.json'
import useAxios from "./hooks/useAxios";

const App = () => {

    return (
        <AppProvider i18n={enTranslations}>
                <h1>dsds</h1>
        </AppProvider>
    );
}

export default App;
