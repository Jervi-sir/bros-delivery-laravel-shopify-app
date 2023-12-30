import { AppProvider,FormLayout,Frame,Layout,Loading,Modal,Navigation,Page,TextField,TopBar } from '@shopify/polaris';
import { HomeMinor, OrdersMinor, ConversationMinor, ShipmentMajor } from '@shopify/polaris-icons';
import { useState, useCallback, PropsWithChildren } from 'react';
import SupportPopup from './SupportPopup';
import { usePage } from '@inertiajs/react';

export default function ShopifyScelaton({ title = null, children }: PropsWithChildren<{title: string}>) {
    const { url: currentUrl } = usePage();

    const [isLoading, setIsLoading] = useState(false);
    const [userMenuActive, setUserMenuActive] = useState(false);
    const [mobileNavigationActive, setMobileNavigationActive] = useState(false);
    const [showContactSupport, setShowContactSupport] = useState(false);

    const toggleUserMenuActive = useCallback(
        () => setUserMenuActive((userMenuActive) => !userMenuActive),
        [],
    );
    const toggleMobileNavigationActive = useCallback(
        () =>
            setMobileNavigationActive(
                (mobileNavigationActive) => !mobileNavigationActive,
            ),
        [],
    );


    const userMenuActions = [
        {
            items: [{ content: 'Community forums' }, { content: 'Community forums2' }],
        },
    ];

    const isActive = (navUrl) => currentUrl === navUrl;

    const toggleIsLoading = useCallback(
        (navUrl) => {
            if (currentUrl !== navUrl) {
                setIsLoading((isLoading) => !isLoading);
            }
        },
        [currentUrl, setIsLoading],
    );


    const getNavigationUrl = (navUrl) => {
        return currentUrl === navUrl ? '#' : navUrl;
    };

    const userMenuMarkup = (
        <TopBar.UserMenu
            actions={userMenuActions}
            name="Dharma"
            //detail={storeName}
            initials="D"
            open={userMenuActive}
            onToggle={toggleUserMenuActive}
        />
    );

    const topBarMarkup = (
        <TopBar
            showNavigationToggle
            userMenu={userMenuMarkup}
            onNavigationToggle={toggleMobileNavigationActive}
        />
    );

    const navigationMarkup = (
        <Navigation location="/">
            <Navigation.Section
                separator
                title="Bros Delivery App"
                items={[
                    {
                        url: getNavigationUrl('/'),
                        label: 'Dashboard',
                        icon: HomeMinor,
                        onClick: () => toggleIsLoading('/'),
                        selected: isActive('/')
                    },
                    {
                        url: getNavigationUrl('/orders'),
                        label: 'Upcoming Orders',
                        icon: OrdersMinor,
                        onClick: () => toggleIsLoading('/orders'),
                        selected: isActive('/orders')
                    },
                    {
                        url: getNavigationUrl('/shipped-items'),
                        label: 'Shipped Items',
                        icon: ShipmentMajor,
                        onClick: () => toggleIsLoading('/shipped-items'),
                        selected: isActive('/shipped-items')
                    },
                ]}

                /*
                action={{
                    icon: , ConversationMinor,
                    accessibilityLabel: 'Contact support',
                    onClick: () => setShowContactSupport(true),
                }}*/
            />
        </Navigation>
    );

    const loadingMarkup = isLoading ? <Loading /> : null;

    const logo = {
        width: 175,
        topBarSource:
            '/logo_bros.png',
        contextualSaveBarSource:
            '/logo_bros.png',
        accessibilityLabel: 'Bros Delivery',
    };

    return (
        <div style={{ height: '500px' }}>
            <AppProvider
                i18n={{
                    Polaris: {
                        Avatar: {
                            label: 'Avatar',
                            labelWithInitials: 'Avatar with initials {initials}',
                        },
                        ContextualSaveBar: {
                            save: 'Save',
                            discard: 'Discard',
                        },
                        TextField: {
                            characterCount: '{count} characters',
                        },
                        TopBar: {
                            toggleMenuLabel: 'Toggle menu',

                            SearchField: {
                                clearButtonLabel: 'Clear',
                                search: 'Search',
                            },
                        },
                        Modal: {
                            iFrameTitle: 'body markup',
                        },
                        Frame: {
                            skipToContent: 'Skip to content',
                            navigationLabel: 'Navigation',
                            Navigation: {
                                closeMobileNavigationLabel: 'Close navigation',
                            },
                        },
                    },
                }}
            >
                <Frame
                    logo={logo}
                    topBar={topBarMarkup}
                    navigation={navigationMarkup}
                    showMobileNavigation={mobileNavigationActive}
                    onNavigationDismiss={toggleMobileNavigationActive}
                >
                        {loadingMarkup}
                        { children }
                        {/* <SupportPopup isActive={showContactSupport} /> */}
                </Frame>
            </AppProvider>
        </div>
    );
}
