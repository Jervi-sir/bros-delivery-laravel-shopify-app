import { Badge, BlockStack, Button, DataTable, Divider, Frame, IndexTable, LegacyCard, Modal, Page, Text, TextContainer, useBreakpoints } from '@shopify/polaris';
import axios from 'axios';
import { useState, useCallback, useEffect } from 'react';
import React from 'react';

const PopupDeliveryTable = ({ orders, delivery_method }) => {
    const [selectedOrders, setSelectedOrders] = useState([]);
    const [isFetching, setIsFetching] = useState(false);
    const [active, setActive] = useState(false);
    const [totalPrice, setTotalPrice] = useState('');
    const [totalItems, setTotalItems] = useState('');

    const handleCancel = useCallback(() => setActive(!active), [active]);
    const handleChange = useCallback(() => setActive(!active), [active]);
    const handleScrollBottom = useCallback(() => alert('Scrolled to bottom'), []);
    const activator = <Button onClick={handleChange} disabled={orders.length == 0} variant='primary' >Process Delivery</Button>;

    const postOrdersToLaravel = async () => {
        try {
            setIsFetching(true);
            const response = await axios.post('/fetch-deliveries', {
                orders: orders,
                delivery_company: delivery_method //{label: 'ZR Express', value: 'zr_express'}
            }).then((response) => {
                setIsFetching(false);
                console.log('Response:', response.data);
            });
        } catch (error) {
            setIsFetching(false);
            console.error('Error posting orders:', error);
        }
    };

    useEffect(() => {
        const structuredRows = orders.map(order => [
            order.id, order.customer, order.phone, order.item_title,
            `${order.total}`, order.delivery_method, order.shipping_address,
            order.wilaya, order.zip
        ]);

        const totalItems = orders.length;
        const totalPrice = orders.reduce((sum, order) => sum + parseFloat(order.total), 0).toFixed(2);

        setSelectedOrders(structuredRows);
        setTotalItems(totalItems + (totalItems != 1 ? ' Items' : ' Item'));
        setTotalPrice(totalPrice+ ' DA');
    }, [orders]);

    return (
        <>
            <Modal
                activator={activator}
                open={active}
                title="Scrollable content"
                onClose={handleChange}
                onScrolledToBottom={handleScrollBottom}
                noScroll
                primaryAction={{
                    content: 'Deliver with ' + delivery_method.label,
                    onAction: postOrdersToLaravel,
                    loading: isFetching
                }}
                secondaryActions={[
                    {
                        content: 'Cancel',
                        onAction: handleCancel,
                    },
                ]}
            >
                {
                    <Modal.Section >
                        <DataTable
                            columnContentTypes={[
                                'text','text','text','text','numeric','text','text','text','numeric', //'numeric',
                            ]}
                            headings={[
                                'Order', 'Customer', 'Phone', 'Item', 'Total Price', 'Delivery method', 'Address', 'Wilaya', 'Zip Code',
                            ]}
                            rows={selectedOrders}
                            totals={['', '', '', totalItems, totalPrice,'','', '', '']}
                            showTotalsInFooter
                            hideScrollIndicator
                            hoverable
                            stickyHeader
                            fixedFirstColumns={true}
                        />
                    </Modal.Section>
                }
            </Modal>
        </>
    )
}

export default PopupDeliveryTable;
