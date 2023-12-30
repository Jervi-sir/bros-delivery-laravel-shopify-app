import { BlockStack, Button, Divider, Frame, Modal, TextContainer } from '@shopify/polaris';
import axios from 'axios';
import { useState, useCallback } from 'react';
import React from 'react';

const PopupDelivery = ({ orders, delivery_method }) => {
    const [active, setActive] = useState(false);
    const [loading, setLoading] = useState(false);

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

    return (
        <>
            <Modal
                activator={activator}
                open={active}
                title="Scrollable content"
                onClose={handleChange}
                onScrolledToBottom={handleScrollBottom}
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
                {orders.map((item, index) => (
                    <Modal.Section key={index}>
                        <>
                            <strong>#{item.id}</strong> :
                            <strong>{item.customer}</strong> :
                            <strong>{item.phone}</strong> :
                            <strong>{item.shipping_address}</strong> :
                            <strong>{item.wilaya}</strong> :
                            <strong>{item.total}</strong> :
                        </>
                    </Modal.Section>
                ))}
            </Modal>
        </>
    )
}

export default PopupDelivery;
