import React, { useEffect, useState } from "react";
import useAxios from "../../hooks/useAxios";
import { Badge, IndexTable, LegacyCard, Spinner, Text, useBreakpoints } from "@shopify/polaris";

const ShippedTable = () => {
    const { axios } = useAxios();
    const [isLoading, setIsLoading] = useState(true);
    const [orderSamples, setOrderSamples] = useState([]);

    const structureOrders = (laravelData) => {
        const reformated = laravelData.map(order => ({
            id: order.id,
            order: `${order.order_id}`,
            is_delivered: order.delivery_status != 'pending' ? <Badge progress="complete" tone="success">Yes</Badge> : <Badge progress="incomplete">No</Badge>,

            customer: `${order.customer_name}`,
            phone: `${order.customer_phone}`,

            item_title: `${order.product_title}`,
            item_price: `${order.product_price}`,
            delivery_price: `${order.delivery_price} DA`,
            total: `${order.total} DA`,
            delivery_method: `${order.delivery_company}`,

            shipping_address: `${order.delivery_address}`,
            wilaya: `${order.wilaya}`,
            zip: `${order.zip}`,
            //all: `${order}`,
        }));
        return reformated;
    };

    useEffect(() => {
        axios.get('/get-deliveries').then(response => {
            console.log(response.data)
            setOrderSamples(structureOrders(response.data));
            setIsLoading(false)
        }).catch(error => {
            setIsLoading(false)

        })
    }, []);


    const rowMarkup = orderSamples.map(
        (
            { id, order, is_delivered, customer, phone, item_title, item_price, delivery_price, total, delivery_method, shipping_address, wilaya, zip },
            index,
        ) => (
            <IndexTable.Row
                id={id}
                key={id}
                position={index}
            >
                <IndexTable.Cell>
                    <Text variant="bodyMd" fontWeight="bold" as="span">
                        {order}
                    </Text>
                </IndexTable.Cell>
                <IndexTable.Cell>{is_delivered}</IndexTable.Cell>
                <IndexTable.Cell>{customer}</IndexTable.Cell>
                <IndexTable.Cell>{phone}</IndexTable.Cell>
                <IndexTable.Cell>
                    <Text as="span" alignment="start" numeric>
                        {item_title}
                    </Text>
                </IndexTable.Cell>
                <IndexTable.Cell>{item_price}</IndexTable.Cell>
                <IndexTable.Cell>{delivery_price}</IndexTable.Cell>
                <IndexTable.Cell>{total}</IndexTable.Cell>
                <IndexTable.Cell>{delivery_method}</IndexTable.Cell>
                <IndexTable.Cell>{shipping_address}</IndexTable.Cell>
                <IndexTable.Cell><Badge tone="info-strong">{wilaya}</Badge></IndexTable.Cell>
                <IndexTable.Cell>{zip}</IndexTable.Cell>
            </IndexTable.Row>
        ),
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
            <LegacyCard>
                <IndexTable
                    condensed={useBreakpoints().smDown}
                    itemCount={orderSamples.length}
                    headings={[
                        { title: 'Order' },
                        { title: 'Delivered ?' },
                        { title: 'Customer' },
                        { title: 'Phone' },
                        { title: 'Item', alignment: 'start' },
                        { title: 'Delivery Price' },
                        { title: 'Price' },
                        { title: 'Total Price' },
                        { title: 'Delivery method' },
                        { title: 'Address' },
                        { title: 'Wilaya' },
                        { title: 'Zip Code' },
                    ]}
                >
                    {rowMarkup}
                </IndexTable>
            </LegacyCard>
            </div>
        </>
    )
}

export default ShippedTable;
