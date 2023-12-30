import { ContextualSaveBar, FormLayout, Layout, LegacyCard, Page, TextField, Toast } from "@shopify/polaris";
import { useCallback, useRef, useState } from "react";


const actualPageMarkup = () => {
    const defaultState = useRef({
        emailFieldValue: 'dharma@jadedpixel.com',
        nameFieldValue: 'Jaded Pixel',
    });

    const [isDirty, setIsDirty] = useState(false);
    const [toastActive, setToastActive] = useState(false);
    const skipToContentRef = useRef<HTMLAnchorElement>(null);
    const [nameFieldValue, setNameFieldValue] = useState(
        defaultState.current.nameFieldValue,
    );
    const [storeName, setStoreName] = useState(
        defaultState.current.nameFieldValue,
    );
    const skipToContentTarget = (
        <a id="SkipToContentTarget" ref={skipToContentRef} tabIndex={-1} />
    );

    const handleNameFieldChange = useCallback((value: string) => {
        setNameFieldValue(value);
        value && setIsDirty(true);
    }, []);

    const handleEmailFieldChange = useCallback((value: string) => {
        setEmailFieldValue(value);
        value && setIsDirty(true);
    }, []);

    const [emailFieldValue, setEmailFieldValue] = useState(
        defaultState.current.emailFieldValue,
    );

    const handleSave = useCallback(() => {
        defaultState.current.nameFieldValue = nameFieldValue;
        defaultState.current.emailFieldValue = emailFieldValue;

        setIsDirty(false);
        setToastActive(true);
        setStoreName(defaultState.current.nameFieldValue);
    }, [emailFieldValue, nameFieldValue]);

    const handleDiscard = useCallback(() => {
        setEmailFieldValue(defaultState.current.emailFieldValue);
        setNameFieldValue(defaultState.current.nameFieldValue);
        setIsDirty(false);
    }, []);

    const contextualSaveBarMarkup = isDirty ? (
        <ContextualSaveBar
            message="Unsaved changes"
            saveAction={{
                onAction: handleSave,
            }}
            discardAction={{
                onAction: handleDiscard,
            }}
        />
    ) : null;
    const toggleToastActive = useCallback(
        () => setToastActive((toastActive) => !toastActive),
        [],
    );

    const toastMarkup = toastActive ? (
        <Toast onDismiss={toggleToastActive} content="Changes saved" />
    ) : null;

    return (
        <Page title="Account">
            <Layout>
                {skipToContentTarget}
                <Layout.AnnotatedSection
                    title="Account details"
                    description="Jaded Pixel will use this as your account information."
                >
                    <LegacyCard sectioned>
                        <FormLayout>
                            <TextField
                                label="Full name"
                                value={nameFieldValue}
                                onChange={handleNameFieldChange}
                                autoComplete="name"
                            />
                            <TextField
                                type="email"
                                label="Email"
                                value={emailFieldValue}
                                onChange={handleEmailFieldChange}
                                autoComplete="email"
                            />
                        </FormLayout>
                    </LegacyCard>
                </Layout.AnnotatedSection>
            </Layout>
        </Page>
    );
}

export default actualPageMarkup;
