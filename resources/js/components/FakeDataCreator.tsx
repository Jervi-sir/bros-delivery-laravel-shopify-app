import { Page, Layout, RangeSlider, Button, FormLayout, Frame } from "@shopify/polaris";
import React, { useCallback, useState } from 'react';
import useAxios from "../hooks/axios";
import ValidationErrorBanner from './ValidationErrorBanner'
import DeleteFakeDataButton from "./DeleteFakeDataButton";
import { Toast } from "@shopify/polaris";
import useGenerateFakeData from "../hooks/useGenerateFakeData";

const FakeDataCreator = () => {
    const [options, setOptions] = useState({productsCount: 0, customersCount: 0});
    const {
        fetchData,
        loading: creatingProducts,
        toastMessage,
        errors,
        dismissToast,
        dismissErrors
    } = useGenerateFakeData();
    const handleCountChange = useCallback(
        (value, name) => setOptions(prevOptions => ({...prevOptions, [name]: value})),
        []
    );



    return (
        <Frame>
            <Page title="generate fake data" primaryAction={<DeleteFakeDataButton />}>
                <Layout>
                    <Layout.Section>
                        <FormLayout>
                            <RangeSlider
                                output
                                label="logo offset"
                                min={0}
                                max={20}
                                step={5}
                                value={options.productsCount}
                                onChange={handleCountChange}
                                id="productsCount"
                            />

                            <RangeSlider
                                output
                                label="logo offset"
                                min={0}
                                max={20}
                                step={5}
                                value={options.customersCount}
                                onChange={handleCountChange}
                                id="customersCount"
                            />

                            <Button
                                onClick={() => fetchData(options)}
                                loading={creatingProducts}
                            >Add { options.productsCount } product and { options.customersCount } product</Button>
                            {
                                toastMessage && <Toast content={ toastMessage } onDismiss={ dismissToast } />
                            }

                            {
                                errors.length &&
                                <ValidationErrorBanner title={'failed'} errors={errors} onDismiss={ dismissErrors }  />
                            }
                        </FormLayout>
                    </Layout.Section>
                </Layout>
            </Page>
        </Frame>
    )

}

export default FakeDataCreator;
