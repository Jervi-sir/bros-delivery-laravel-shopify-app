import { Card, Badge, Text, Layout, TextContainer, InlineStack, InlineGrid, FormLayout, Divider } from '@shopify/polaris';
import React, { useEffect, useState } from 'react';
import useAxios from '../../hooks/useAxios';

const AnalysisMain = () => {
    const { axios } = useAxios();
    const [plan, setPlan] = useState({
        plan_type: 'Pro Plan',
        payment_status: 'Paid',
        next_payment_date: '2023-01-15'
    })
    const [todayAnalysis, setTodayAnalysis] = useState({
        today_orders_left: '4',
        today_orders_shipped: '20',
        today_total_sale: '200000 DA'
    })

    useEffect(() => {
        axios.get('/shop-status').then(response => {
            const result = response.data;
            setPlan({
                plan_type: result.plan_type,
                payment_status: result.payment_status,
                next_payment_date: result.next_payment_date
            });
            setTodayAnalysis({
                today_orders_left: result.today_orders_left,
                today_orders_shipped: result.today_orders_shipped,
                today_total_sale: result.today_total_sale
            });
        }).catch(error => {

        })
    }, []);

    return (
        <Layout>
            <Layout.Section>
                <FormLayout>
                    <InlineGrid gap="400" columns={3}>
                        <InfoCard title="Plan" content={plan.plan_type} />
                        <InfoCard title="Payment Status" content={plan.payment_status ? "Paid" : "Pending"} badgeStatus={plan.payment_status ? "success" : "warning"} />
                        <InfoCard title="Next Payment Date" content={plan.next_payment_date} />
                    </InlineGrid>
                    <Divider borderColor="border" />
                    <InlineGrid gap="400" columns={3}>
                        <InfoCard title="Today Orders Left" content={todayAnalysis.today_orders_left} />
                        <InfoCard title="Today Orders Shippied" content={todayAnalysis.today_orders_shipped} />
                        <InfoCard title="Today Sales DA" content={todayAnalysis.today_total_sale} />
                    </InlineGrid>
                </FormLayout>
            </Layout.Section>
            {/* Add more rows as needed */}
        </Layout>
    );
}

const InfoCard = ({ title, content, badgeStatus = null }) => {
    return (
        <Card >
            <Text tone='subdued'>{title}</Text>
            {badgeStatus ? <Badge tone={badgeStatus}>{content}</Badge> : content}
        </Card>
    );
};

export default AnalysisMain;
