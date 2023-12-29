import {
    IndexTable,
    useIndexResourceState,
    Text,
    Badge,
    useBreakpoints,
    Button
} from '@shopify/polaris';
import React, { useEffect, useState } from 'react';

const OrdersTable = ({ orders }) => {
    const [orderSamples, setOrderSamples] = useState([]);
    const structureOrders = (laravelData) => {
        return laravelData.map(order => ({
            id: order.id,
            order: `#${order.order}`,

            customer: `${order.customer.name}`,
            phone: `${order.customer.phone}`,

            item_title: `${order.item.title}`,
            item_price: `${order.item.price}`,
            delivery_price: `${order.subtotal_price} DA`,
            total: `${order.total_price} DA`,
            delivery_method: `${order.delivery_method}`,

            shipping_address: `${order.shipping_address.address1} - ${order.shipping_address.address2}`,
            wilaya:  `${order.shipping_address.wilaya}`,
            zip: `${order.shipping_address.zip}`,
        }));
    };

    useEffect(() => {
        console.log(orders)
        setOrderSamples(structureOrders(orders));
    }, []);

    const resourceName = {
        singular: 'order',
        plural: 'orders',
    };

    const { selectedResources, allResourcesSelected, handleSelectionChange } =
        useIndexResourceState(orderSamples);

    const rowMarkup = orderSamples.map(
        (
            { id, order, customer, phone, item_title, item_price, delivery_price, total, delivery_method, shipping_address, wilaya, zip },
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
          <IndexTable
            condensed={useBreakpoints().smDown}
            resourceName={resourceName}
            itemCount={orderSamples.length}
            selectedItemsCount={
              allResourcesSelected ? 'All' : selectedResources.length
            }
            onSelectionChange={handleSelectionChange}
            headings={[
              {title: 'Order'},
              {title: 'Customer'},
              {title: 'Phone'},
              {title: 'Item', alignment: 'start'},
              {title: 'Delivery Price'},
              {title: 'Price'},
              {title: 'Total Price'},
              {title: 'Delivery method'},
              {title: 'Address'},
              {title: 'Wilaya'},
              {title: 'Zip Code'},
            ]}
          >
            {rowMarkup}
          </IndexTable>
      );

}

export default OrdersTable;
