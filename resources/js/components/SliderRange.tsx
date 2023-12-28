import { Page, Layout, RangeSlider, Button, FormLayout, Frame } from "@shopify/polaris";
import React, { useCallback, useState } from 'react';
import useAxios from "../hooks/axios";
import ValidationErrorBanner from './ValidationErrorBanner'
import DeleteFakeDataButton from "./DeleteFakeDataButton";
import { Toast } from "@shopify/polaris";

const SliderRange = () => {
    const { axios } = useAxios();
    const [options, setOptions] = useState({count: 5});
    const [errors, setErrors] = useState([]);
    const [creatingProducts, setCreatingProducts] = useState(false);
    const [toastMessage, setToastMessage] = useState('');

    const handleRangeSliderChange = useCallback(
        value => setOptions(prevOptions => ({...prevOptions, count: value})),
        []
    );

    const fetchData = useCallback( () => {
        setCreatingProducts(true)
        axios.post('/products', options).then(response => {
            setCreatingProducts(false)
            setErrors([])
            setToastMessage('Generated Fake Data');
            //console.log(response)
        }).catch(error => {
            setCreatingProducts(false)
            if(error.response.status === 422) {
                setErrors(Object.values(error.response.data.errors || {}).flatMap(errors => errors))
            }
        })
    }, [options]);

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
                                value={options.count}
                                onChange={handleRangeSliderChange}
                            />
                            <Button
                                onClick={fetchData}
                                loading={creatingProducts}
                            >Add { options.count } product</Button>
                            {
                                toastMessage && <Toast content={ toastMessage } onDismiss={ () => setToastMessage('') } />
                            }

                            {
                                errors.length &&
                                <ValidationErrorBanner title={'failed'} errors={errors} onDismiss={() => setErrors([])}  />
                            }
                        </FormLayout>
                    </Layout.Section>
                </Layout>
            </Page>
        </Frame>
    )

}

export default SliderRange;
