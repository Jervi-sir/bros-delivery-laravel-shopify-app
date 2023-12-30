import React, { useState, useCallback, useEffect } from 'react';
import { Page, Layout, Form, TextField, Button, Card, FormLayout } from '@shopify/polaris';


const SettingsMain = () => {
    const [field1, setField1] = useState('asdasdsdd');
    const [displayCredential, setDisplayCredential] = useState('');

    const [isEditable, setIsEditable] = useState(false);

    const handleSave = useCallback(() => {
        setIsEditable(false);
        // Add logic to handle saving data
    }, [field1]);

    const handleEdit = useCallback(() => {
        setIsEditable(true);
    }, []);


    const handleField1Change = useCallback((value) => {
        setField1(value);
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
        handleField1Change(field1)
    }, [])

    return (
        <Page >
            <Layout>
                <Layout.Section>
                    <Card sectioned>
                        <Form onSubmit={handleSave}>
                            <FormLayout>
                            <TextField
                                label="ZR Express"
                                value={field1}
                                value={isEditable ? field1 : displayCredential}

                                onChange={handleField1Change}
                                disabled={!isEditable}
                                autoComplete="off"
                                //type={!isEditable ? 'password' : 'text'}
                            />
                            <>
                                <Button submit variant="primary" tone='critical' disabled={!isEditable}>
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
        </Page>
    );

}

export default SettingsMain;
