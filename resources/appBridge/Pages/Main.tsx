import React, { Suspense, startTransition } from "react";
import { Frame, LegacyCard, LegacyTabs, Tabs } from '@shopify/polaris';
import { useState, useCallback } from 'react';

const ShippedOrders = React.lazy(() => import('./Orders/ShippedTable'));
const AllOrders = React.lazy(() => import('./Orders/OrdersTable'));
//const FakeDataCreator = React.lazy(() => import('../components/FakeDataCreator'));
const SettingsSection = React.lazy(() => import('./Settings/SettingsMain'))
const DashboardSection = React.lazy(() => import('./Analysis/AnalysisMain'));

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

    const goToSettings = () => {
        startTransition(() => {
            setSelected(3); // Assuming 3 is the index of the Settings tab
        });
    };

    const tabs = [
        {
            id: 'accepts-marketing-1',
            content: 'Dashboard',
            panelID: 'accepts-marketing-content-1',

        },
        {
            id: 'all-customers-1',
            content: 'New orders',
            accessibilityLabel: 'Orders',
            panelID: 'all-customers-content-1',
        },
        {
            id: 'repeat-customers-1',
            content: 'Shipped orders',
            panelID: 'repeat-customers-content-1',
        },
        {
            id: 'prospects-1',
            content: 'Settings',
            panelID: 'prospects-content-1',
        },
    ];

    let content;
    switch (selected) {
        case 0:
            content = <DashboardSection />;
            break;
        case 1:
            content = <AllOrders />;
            break;
        case 2:
            content = <ShippedOrders />;
            break;

        case 3:
            content = <SettingsSection />;
            break;
        default:
            content = <div>No content available</div>;
    }

    return (
        <Frame>
            <LegacyCard>
                <Tabs tabs={tabs} selected={selected} onSelect={handleTabChange} fitted >
                    <LegacyCard.Section>
                        {React.cloneElement(content, { goToSettings })}
                    </LegacyCard.Section>
                </Tabs>
            </LegacyCard>
        </Frame>
    );
}

export default Main;
