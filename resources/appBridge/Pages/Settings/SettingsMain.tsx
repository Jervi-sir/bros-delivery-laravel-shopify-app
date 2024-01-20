import React, { useState, useCallback, useEffect } from 'react';
import { Page, Layout, Form, TextField, Button, Card, FormLayout, Toast, Spinner, Link, Text } from '@shopify/polaris';
import useAxios from '../../hooks/useAxios';

const SettingsMain = () => {
    const { axios } = useAxios();
    const [isLoading, setIsLoading] = useState(true);
    const [isFetching, setIsFetching] = useState(false);
    const [toastMessage, setToastMessage] = useState('')

    const [platform, setPlatform] = useState('');
    const [token1, setToken1] = useState('');
    const [token2, setToken2] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [displayCredentialToken1, setDisplayCredentialToken1] = useState('');
    const [displayCredentialToken2, setDisplayCredentialToken2] = useState('');

    const [isEditable, setIsEditable] = useState(false);

    const handleSave = useCallback(() => {
        setIsEditable(false);
        setIsFetching(true)
        axios.post('/update-settings', {
            platform: platform,
            token_1: token1,
            token_2: token2,
            phone_number: phoneNumber,
        }).then(response => {
            console.log(response.data)
            setIsFetching(false)
            setToastMessage('Token Updated Successfully')
        }).catch(error => {
            setIsFetching(false)
        })
    }, [token1, token2, phoneNumber]);

    const handleEdit = useCallback(() => {
        setIsEditable(true);
    }, []);

    const handleToken1Change = useCallback((value) => {
        setToken1(value);
        const masked = maskCredential(value);
        setDisplayCredentialToken1(masked);
    }, []);

    const handleToken2Change = useCallback((value) => {
        setToken2(value);
        const masked = maskCredential(value);
        setDisplayCredentialToken2(masked);
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
            const zr_express = response.data.deliveryCredential;
            setToken1(zr_express.token_1);
            setToken2(zr_express.token_2);
            setPhoneNumber(zr_express.phone_number);
            handleToken1Change(zr_express.token_1);
            handleToken2Change(zr_express.token_2);
            
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
                        <div style={{marginLeft: 15}}>
                            <Text variant="headingLg" as="p" >ZR Express</Text>
                        </div>
                        <Card sectioned>
                            <Form onSubmit={handleSave}>
                                <FormLayout>
                                    <div style={{display: 'flex', flexDirection: 'row', gap: 10}}>
                                        <p>To find these Credentials, go to</p>
                                        <Link url='https://zrexpress.com/ZR_WEB/FR/Developpement.awp' target='_blank'>ZR Express Dev Dashboard</Link>
                                    </div>
                                    <TextField
                                        label="Token"
                                        value={isEditable ? token1 : displayCredentialToken1}
                                        onChange={handleToken1Change}
                                        disabled={!isEditable}
                                        autoComplete="off"
                                    //type={!isEditable ? 'password' : 'text'}
                                    />
                                    <TextField
                                        label="Key"
                                        value={isEditable ? token2 : displayCredentialToken2}
                                        onChange={handleToken2Change}
                                        disabled={!isEditable}
                                        autoComplete="off"
                                    //type={!isEditable ? 'password' : 'text'}
                                    />
                                    <TextField
                                        label="Phone Number"
                                        value={phoneNumber}
                                        onChange={e => setPhoneNumber(e)}
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
