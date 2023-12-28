import { Page, Layout, RangeSlider, Button, FormLayout } from "@shopify/polaris";
import React, { useCallback, useState } from 'react';
import useAxios from "../hooks/axios";

const SliderRange = () => {
    const { axios } = useAxios();
    const [options, setOptions] = useState({count: 5});

    const handleRangeSliderChange = useCallback(
        value => setOptions(prevOptions => ({...prevOptions, count: value})),
        []
    );

    const fetchData = useCallback( () => {
        axios.post('/products', options).then(response => {
            console.log(response)
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
                        >Add { options.count } product</Button>
                    </FormLayout>
                </Layout.Section>
            </Layout>
    )
}

export default SliderRange;
