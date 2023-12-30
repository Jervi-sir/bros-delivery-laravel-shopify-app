import React, { Suspense, startTransition } from "react";
import { LegacyCard, LegacyTabs, Tabs } from '@shopify/polaris';
import { useState, useCallback } from 'react';

const AllCustomersPage = () => <div>All Customers Content</div>;
const AllOrders = React.lazy(() => import('./Orders/OrdersTable'));
//const FakeDataCreator = React.lazy(() => import('../components/FakeDataCreator'));
const SettingsSection = React.lazy(() => import('./Settings/SettingsMain'))
const AnalysisSection = React.lazy(() => import('./Analysis/AnalysisMain'));

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
            content: 'Settings',
            panelID: 'repeat-customers-content-1',
        },
        {
            id: 'prospects-1',
            content: 'Analysis',
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
        case 2:
            content = <SettingsSection />;
            break;
        case 3:
            content = <AnalysisSection />;
            break;

        default:
            content = <div>No content available</div>;
    }

    return (
        <>
            <Tabs tabs={tabs} selected={selected} onSelect={handleTabChange} fitted >
                <LegacyCard.Section>
                    {content}
                </LegacyCard.Section>
            </Tabs>
        </>
    );
}

export default Main;
