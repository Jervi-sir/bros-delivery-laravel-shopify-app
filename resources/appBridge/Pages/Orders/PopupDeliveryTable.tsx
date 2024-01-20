import { Badge, BlockStack, Button, DataTable, Divider, Frame, IndexTable, LegacyCard, Modal, Page, Text, TextContainer, Toast, useBreakpoints } from '@shopify/polaris';
import axios from 'axios';
import { useState, useCallback, useEffect } from 'react';
import React from 'react';

const PopupDeliveryTable = ({ orders, delivery_method, onSuccessfulDelivery }) => {
    const [selectedOrders, setSelectedOrders] = useState([]);
    const [isFetching, setIsFetching] = useState(false);
    const [modalIsActive, setModalActive] = useState(false);
    const [totalPrice, setTotalPrice] = useState('');
    const [totalItems, setTotalItems] = useState('');

    const [toastMessage, setToastMessage] = useState('');

    const handleCancel = useCallback(() => setModalActive(!modalIsActive), [modalIsActive]);
    const handleChange = useCallback(() => setModalActive(!modalIsActive), [modalIsActive]);
    const handleScrollBottom = useCallback(() => alert('Scrolled to bottom'), []);
    const activator = <Button onClick={handleChange} disabled={orders.length == 0 || delivery_method } variant='primary' >Process Delivery</Button>;

    const postOrdersToLaravel = async () => {
        try {
            setIsFetching(true);
            await axios.post('/fetch-deliveries', {
                orders: orders,
                delivery_company: delivery_method //{label: 'ZR Express', value: 'zr_express'}
            }).then((response) => {
                setIsFetching(false);
                console.log('Response:', response.data);
                //setToastMessage('Products passed to delivery process ...')
                //setModalActive(false);
                //onSuccessfulDelivery(); // Call the callback function
            });
        } catch (error) {
            setIsFetching(false);
            console.error('Error posting orders:', error);
        }
    };

    useEffect(() => {
        const structuredRows = orders.map(order => [
            order.id, order.customer_name, order.customer_phone, order.item_title,
            `${order.total_price}`, order.delivery_method_ar, order.city,
            order.province
        ]);

        const totalItems = orders.length;
        const totalPrice = orders.reduce((sum, order) => sum + parseFloat(order.total_price), 0).toFixed(2);

        setSelectedOrders(structuredRows);
        setTotalItems(totalItems + (totalItems != 1 ? ' Items' : ' Item'));
        setTotalPrice(totalPrice+ ' DA');
    }, [orders]);

    return (
        <>
            <Modal
                activator={activator}
                open={modalIsActive}
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
                                'text','text','text','text','numeric','text','text','text',//'numeric',
                            ]}
                            headings={[
                                'Order', 'Customer', 'Phone', 'Item', 'Total Price', 'Delivery method', 'Address', 'Wilaya', 
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
            {toastMessage &&
                <Toast content={toastMessage} onDismiss={() => { setToastMessage('') }} />}
        </>
    )
}

export default PopupDeliveryTable;
