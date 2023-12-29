import { Button, Toast } from "@shopify/polaris";
import React, { useState } from "react";
import useAxios from "../hooks/axios";
const DeleteFakeDataButton = () => {
    const {axios} = useAxios();
    const [loading, setLoading] = useState(false);
    const [toastMessage, setToastMessage] = useState('');

    const deleteFakeDataButton = () => {
        setLoading(true);
        axios.delete('/fake-data').then(() => {
            setLoading(false);

            setToastMessage('Deleting Fake Data');
        }).catch(() => {
            setLoading(false);
        })

    }
    return (
        <>
            <Button
                onClick={deleteFakeDataButton}
                loading={loading}
            > Delete fake data</Button>
            {
                toastMessage && <Toast content={ toastMessage } onDismiss={ () => setToastMessage('') } />
            }
        </>
    )
}

export default DeleteFakeDataButton;
