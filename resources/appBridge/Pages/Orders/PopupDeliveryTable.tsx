import { Badge, BlockStack, Button, DataTable, Divider, Frame, IndexTable, Modal, Text, TextContainer, useBreakpoints } from '@shopify/polaris';
import axios from 'axios';
import { useState, useCallback, useEffect } from 'react';
import React from 'react';

const PopupDeliveryTable = ({ orders, delivery_method }) => {
    const [selectedOrders, setSelectedOrders] = useState([]);
    const [active, setActive] = useState(false);

    const handleCancel = useCallback(() => setActive(!active), [active]);
    const handleChange = useCallback(() => setActive(!active), [active]);
    const handleScrollBottom = useCallback(() => alert('Scrolled to bottom'), []);
    const activator = <Button onClick={handleChange} disabled={orders.length == 0}>Run Delivery</Button>;

    const postOrdersToLaravel = async () => {
        try {
            const response = await axios.post('/fetch-deliveries', {
                orders: orders
            });
            console.log('Response:', response.data);
        } catch (error) {
            console.error('Error posting orders:', error);
        }
    };

    const rows = [
        ['Emerald Silk Gown', '$875.00', 124689, 140, '$122,500.00'],
        ['Mauve Cashmere Scarf', '$230.00', 124533, 83, '$19,090.00'],
        [
          'Navy Merino Wool Blazer with khaki chinos and yellow belt',
          '$445.00',
          124518,
          32,
          '$14,240.00',
        ],
    ];

    useEffect(() => {
        const structuredRows = orders.map(order => [
            order.id, order.customer, order.phone, order.item_title,
            `${order.total}`, order.delivery_method, order.shipping_address,
            order.wilaya, order.zip
        ]);
        setSelectedOrders(structuredRows);
        console.log(orders)
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
                                'text','text','text','text','text','text','text','text','text', //'numeric',
                            ]}
                            headings={[
                                'Order', 'Customer', 'Phone', 'Item', 'Total Price', 'Delivery method', 'Address', 'Wilaya', 'Zip Code',
                            ]}
                            rows={selectedOrders}
                            totals={['', '', '','3 Items','$155,830.00','','', '', '']}
                            showTotalsInFooter

                        />
                    </Modal.Section>
                }
            </Modal>
        </>
    )
}

export default PopupDeliveryTable;
