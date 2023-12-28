import { Page, Layout, RangeSlider, Button, FormLayout } from "@shopify/polaris";
import React, { useCallback, useState } from 'react';
import useAxios from "../hooks/axios";
import ValidationErrorBanner from './ValidationErrorBanner'

const SliderRange = () => {
    const { axios } = useAxios();
    const [options, setOptions] = useState({count: 5});
    const [errors, setErrors] = useState([]);
    const [creatingProducts, setCreatingProducts] = useState(false)
    const handleRangeSliderChange = useCallback(
        value => setOptions(prevOptions => ({...prevOptions, count: value})),
        []
    );

    const fetchData = useCallback( () => {
        setCreatingProducts(true)
        axios.post('/products', options).then(response => {
            setCreatingProducts(false)
            setErrors([])
            console.log(response)
        }).catch(error => {
            setCreatingProducts(false)
            if(error.response.status === 422) {
                setErrors(Object.values(error.response.data.errors || {}).flatMap(errors => errors))
            }
        })
    }, [options]);

    return (
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
                            errors.length &&
                            <ValidationErrorBanner title={'failed'} errors={errors} onDismiss={() => setErrors([])}  />
                        }
                    </FormLayout>
                </Layout.Section>
            </Layout>
    )
}

export default SliderRange;
