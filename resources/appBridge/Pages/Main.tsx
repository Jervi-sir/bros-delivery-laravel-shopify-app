import React, { Suspense, startTransition } from "react";
import { LegacyCard, Tabs } from '@shopify/polaris';
import { useState, useCallback } from 'react';

const AllCustomersPage = () => <div>All Customers Content</div>;
const AllOrders = React.lazy(() => import('./Orders/OrdersTable'));

const Main = () => {
    const [selected, setSelected] = useState(0);

    const handleTabChange = useCallback(
        (selectedTabIndex) => {
            startTransition(() => {
                setSelected(selectedTabIndex);
            });
        },
        [],
    );

    const tabs = [
        {
            id: 'accepts-marketing-1',
            content: 'Accepts marketing',
            panelID: 'accepts-marketing-content-1',
        },
        {
            id: 'all-customers-1',
            content: 'Orders',
            accessibilityLabel: 'Orders',
            panelID: 'all-customers-content-1',
        },
        {
            id: 'repeat-customers-1',
            content: 'Repeat customers',
            panelID: 'repeat-customers-content-1',
        },
        {
            id: 'prospects-1',
            content: 'Prospects',
            panelID: 'prospects-content-1',
        },
    ];

    let content;
    switch (selected) {
        case 0:
            content = <AllCustomersPage />;
            break;
        case 1:
            content = <AllOrders />;
            break;
        default:
            content = <div>No content available</div>;
    }

    return (
        <>
            <LegacyCard>
                <Tabs tabs={tabs} selected={selected} onSelect={handleTabChange}>
                    <LegacyCard.Section title={tabs[selected].content}>
                        {content}
                    </LegacyCard.Section>
                </Tabs>
            </LegacyCard>
        </>
    );
}

export default Main;
