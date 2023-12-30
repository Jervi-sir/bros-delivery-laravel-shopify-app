import React, { useState, useCallback, useEffect } from 'react';
import { Page, Layout, Form, TextField, Button, Card, FormLayout, Toast, Spinner } from '@shopify/polaris';
import useAxios from '../../hooks/useAxios';

const SettingsMain = () => {
    const { axios } = useAxios();
    const [isLoading, setIsLoading] = useState(true);
    const [isFetching, setIsFetching] = useState(false);
    const [toastMessage, setToastMessage] = useState('')

    const [zrExpress, setZrExpress] = useState('');
    const [displayCredential, setDisplayCredential] = useState('');

    const [isEditable, setIsEditable] = useState(false);

    const handleSave = useCallback(() => {
        setIsEditable(false);
        setIsFetching(true)
        axios.post('/update-settings', {
            zr_express_token: zrExpress
        }).then(response => {
            setIsFetching(false)
            setToastMessage('Token Updated Successfully')
        }).catch(error => {

        })
    }, [zrExpress]);

    const handleEdit = useCallback(() => {
        setIsEditable(true);
    }, []);

    const handlezrExpressChange = useCallback((value) => {
        setZrExpress(value);
        const masked = maskCredential(value);
        setDisplayCredential(masked);
    }, []);

    const maskCredential = (credential) => {
        // Adjust the logic based on how you want to mask the credential
        const visibleChars = 3;
        const maskedLength = credential.length > visibleChars * 2 ? credential.length - visibleChars * 2 : 0;
        return credential.substring(0, visibleChars) + '*'.repeat(maskedLength) + credential.slice(-visibleChars);
    };

    useEffect(() => {

        axios.get('/get-settings').then(response => {
            console.log(response.data)
            const zr_express_token = response.data.zr_express;
            setZrExpress(zr_express_token);
            handlezrExpressChange(zr_express_token)
            setIsLoading(false)
        }).catch(error => {
            setIsLoading(false)

        })
    }, [])

    return (
        <>
            {
                isLoading &&
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Spinner accessibilityLabel="Spinner example" size="large" />
                </div>
            }
            <div hidden={isLoading}>
                <Layout>
                    <Layout.Section>
                        <Card sectioned>
                            <Form onSubmit={handleSave}>
                                <FormLayout>
                                    <TextField
                                        label="ZR Express"
                                        value={isEditable ? zrExpress : displayCredential}

                                        onChange={handlezrExpressChange}
                                        disabled={!isEditable}
                                        autoComplete="off"
                                    //type={!isEditable ? 'password' : 'text'}
                                    />
                                    <>
                                        <Button submit variant="primary" tone='critical' disabled={!isEditable} loading={isFetching}>
                                            Save
                                        </Button>
                                        <Button onClick={handleEdit} disabled={isEditable}>
                                            Edit
                                        </Button>
                                    </>
                                </FormLayout>
                            </Form>
                        </Card>
                    </Layout.Section>
                </Layout>
            </div>
            {toastMessage &&
                <Toast content={toastMessage} onDismiss={() => { setToastMessage('') }} />}
        </>
    );

}

export default SettingsMain;
