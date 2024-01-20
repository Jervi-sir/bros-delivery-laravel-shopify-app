import {
    IndexTable,
    useIndexResourceState,
    Text,
    Badge,
    useBreakpoints,
    Button,
    FormLayout,
    Select,
    Grid,
    Page,
    IndexFilters,
    ButtonGroup,
    Loading,
    Frame,
    Spinner,
    Card,
    LegacyCard,
    Popover,
    Link,
    Banner
} from '@shopify/polaris';
import React, { useCallback, useEffect, useState } from 'react';
import PopupDeliveryTable from './PopupDeliveryTable';
import useAxios from '../../hooks/useAxios';
import { InfoBannerWithUrl } from '../../components/InfoBannerWithUrl';

const OrdersTable = ({ goToSettings }) => {
    const [orderSamples, setOrderSamples] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { axios } = useAxios();
    const [deliveryOptions, setDeliveryOptions] = useState([]);
    const [nextPage, setNextPage] = useState(null);
    const [previousPage, setPreviousPage] = useState(null);
    
    const { selectedResources, allResourcesSelected, handleSelectionChange, clearSelection } = useIndexResourceState(orderSamples);

    const refreshParent = () => {
        setOrderSamples([]);
        setDeliveryOptions([]);
        setIsLoading(true);
        clearSelection();
        fetchOrders(nextPage)
    };

    const fetchOrders = (currentPage = null) => {
        axios.get('/get-not-fulfilled-orders',{
            params: {
                page_info: currentPage
            }
        }).then(response => {
            console.log(response.data.orders)
            setNextPage(response.data.next_page)
            setPreviousPage(response.data.previous_page)
            setOrderSamples(structureOrders(response.data.orders));
            setIsLoading(false)
            setDeliveryOptions(response.data.deliveries)
        }).catch(error => {
            setIsLoading(false)

        })
    }
    const goToNext = () => {
        setOrderSamples([]);
        setIsLoading(true);
        clearSelection();
        fetchOrders(nextPage)
    }
    const goToPrevious = () => {
        setOrderSamples([]);
        setIsLoading(true);
        clearSelection();
        fetchOrders(previousPage)
    }

    const structureOrders = (laravelData) => {
        return laravelData.map(order => {
            try {
                // Your mapping logic for each order
                return {
                    id: order.id,
                    order: `#${order.order}`,
                    created_at: `${order.created_at}`,
        
                    customer_name: `${order.customer.name}`,
                    customer_phone: `${order.customer.phone}`,
        
                    paymentStatus: `${order.paymentStatus}`,
                    total_price: `${order.total_price}`,
                    subtotal_price: `${order.subtotal_price}`,
                    shipping_price: `${order.shipping_price}`,
        
                    fulfillment_status: `${order.fulfillment_status}`,
        
                    delivery_method: `${order.delivery_method}`,
                    delivery_method_ar: `${order.delivery_method_ar.length === 0 ? null : order.delivery_method_ar[0].title}`,
        
                    item_title: `${order.item.title}`,
                    variant_title: `${order.item.variant_title}`,
                    quantity: `${order.item.quantity}`,
        
                    province: `${order.shipping_address.province}`,
                    city: `${order.shipping_address.city}`,
        
                    is_delivered: order.fulfillment_status ? <Badge progress="complete" tone="success">Yes</Badge> : <Badge progress="incomplete">No</Badge>,
        
                    all: `${order}`,
                };
            } catch (error) {
                // Log the error and the specific order that caused it
                console.log("Error in processing order ID:", order.id, "Error details:", error);
                // Return a default error object for the errored order
                return { error: true, message: "Error processing order", orderId: order.id };
            }
        });
    };

    
    useEffect(() => {
        fetchOrders(nextPage);
    }, []);

    const resourceName = {
        singular: 'order',
        plural: 'orders',
    };

    // Function to get the selected orders
    const getSelectedOrders = () => {
        return orderSamples.filter(order => selectedResources.includes(order.id));
    }

    const popOver = (item, index, isActive = false) => {
        const [popoverActive, setPopoverActive] = useState(true);
        const [tagValue, setTagValue] = useState('');
        const togglePopoverActive = useCallback(
            () => setPopoverActive((popoverActive) => !popoverActive),
            [],
        );
        
        const activator = (
            <Button onClick={togglePopoverActive} disclosure>
              Filter
            </Button>
          );
        return (
            <div style={{height: '280px'}}>
                <Popover
                    active={isActive}
                    activator={activator}
                    onClose={togglePopoverActive}
                    ariaHaspopup={false}
                    sectioned
                    >
                        <h1>item</h1>
                </Popover>
            </div>
        )
    }

    const rowMarkup = orderSamples.map(
        (
            { 
                id, 
                order, 
                created_at, 
                customer_name, 
                customer_phone, 
                paymentStatus, 
                total_price, 
                subtotal_price, 
                shipping_price, 
                fulfillment_status, 
                delivery_method, 
                delivery_method_ar, 
                item_title, 
                variant_title, 
                quantity,
                province,
                city,
                is_delivered,
            },
            index,
        ) => (
            <IndexTable.Row
                id={id}
                key={id}
                selected={selectedResources.includes(id)}
                position={index}
                
            >
                <IndexTable.Cell>
                    <Text variant="bodyMd" fontWeight="bold" as="span">
                        {order}
                    </Text>
                </IndexTable.Cell>
                <IndexTable.Cell>{created_at}</IndexTable.Cell>
                <IndexTable.Cell>{(customer_name)}</IndexTable.Cell>
                <IndexTable.Cell>{customer_phone}</IndexTable.Cell>
                <IndexTable.Cell>{paymentStatus}</IndexTable.Cell>
                <IndexTable.Cell>{total_price}</IndexTable.Cell>
                <IndexTable.Cell>{subtotal_price}</IndexTable.Cell>
                <IndexTable.Cell>{shipping_price}</IndexTable.Cell>
                <IndexTable.Cell>{fulfillment_status}</IndexTable.Cell>
                <IndexTable.Cell>
                    { 
                        delivery_method_ar === 'التوصيل للمكتب' 
                        ?
                        <Badge tone="info-strong">{delivery_method_ar}</Badge>
                        :    
                        (

                            delivery_method_ar === 'التوصيل للمنزل' 
                            ?
                            <Badge tone="attention-strong">{delivery_method_ar}</Badge>
                            :
                            <Badge tone="critical-strong">{delivery_method_ar}</Badge>
                        )
                    }
                </IndexTable.Cell>
                <IndexTable.Cell>
                    <Text as="span" alignment="start" numeric>
                        {item_title}
                    </Text>
                </IndexTable.Cell>
                <IndexTable.Cell>{variant_title}</IndexTable.Cell>
                <IndexTable.Cell>{quantity}</IndexTable.Cell>
                <IndexTable.Cell><Badge tone="info-strong">{province}</Badge></IndexTable.Cell>
                <IndexTable.Cell>{city}</IndexTable.Cell>
                <IndexTable.Cell>{is_delivered}</IndexTable.Cell>
                
            </IndexTable.Row>
        ),
    );

    const [selectedDelivery, setSelectedDelivery] = useState({ label: 'ZR Express', value: 'zr_express' });
    
    const handleSelectChange = useCallback(
        (value: string, label: string) => setSelectedDelivery({ value: value, label: label }),
        [],
    );

    return (
        <>
            {
                isLoading &&
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Spinner accessibilityLabel="Spinner example" size="large" />
                </div>
            }
            <div hidden={isLoading}>
            <FormLayout >
                <InfoBannerWithUrl 
                    onPress={goToSettings}
                    placeholder="Please Enter zr-express api Token"
                />
                <Card>
                
                    <ButtonGroup gap="loose">
                        {/* <Text variant="headingSm" as="h6">Deliver with : </Text> */}
                        <Select
                            label="Deliver with: "
                            labelInline
                            options={deliveryOptions}
                            onChange={handleSelectChange}
                            value={selectedDelivery.value}
                        />
                        <PopupDeliveryTable orders={getSelectedOrders()} delivery_method={selectedDelivery} onSuccessfulDelivery={refreshParent}/>
                        {
                            deliveryOptions.length === 0
                            &&
                            <p onClick={goToSettings} style={{cursor: 'pointer', textDecoration: 'underline'}}>
                                Please Enter zr-express api Token
                            </p>
                        }

                    </ButtonGroup>
                </Card>
                <LegacyCard>
                    <IndexTable
                        condensed={useBreakpoints().smDown}
                        resourceName={resourceName}
                        itemCount={orderSamples.length}
                        selectedItemsCount={
                            allResourcesSelected ? 'All' : selectedResources.length
                        }
                        onSelectionChange={handleSelectionChange}
                        headings={[
                            { title: 'Order' },
                            { title: 'Date ?' },
                            { title: 'Customer' },
                            { title: 'Phone' },
                            { title: 'Payment status' },
                            { title: 'Total price' },
                            { title: 'Price item' },
                            { title: 'Shipping' },
                            { title: 'Fulfill status' },
                            { title: 'Delivery' },
                            { title: 'Item', alignment: 'start' },
                            { title: 'Variant' },
                            { title: 'Quantity' },
                            { title: 'Wilaya' },
                            { title: 'Location' },
                            { title: 'is Delivered' },
                        ]}
                        pagination={{
                            hasPrevious: previousPage != null ? true : false,
                            hasNext: nextPage != null ? true : false,
                            onNext: goToNext,
                            onPrevious: goToPrevious,

                        }}
                  
                    >
                        {rowMarkup}
                    </IndexTable>
                </LegacyCard>
            </FormLayout>
            </div>
        </>
    );

}

export default OrdersTable;
