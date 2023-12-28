import { Page, Layout, Banner } from "@shopify/polaris";
import React from 'react';

const MissingApiKey = () => {
    return (
        <Page>
            <Layout>
                <Layout.Section>
                    <Banner title="Shopify Api Key Is Missing" tone="critical">
                        Shopify Api KEY is Missing
                    </Banner>
                </Layout.Section>
            </Layout>
        </Page>

    )
}

export default MissingApiKey;
