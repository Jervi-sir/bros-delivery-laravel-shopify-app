import { useState } from "react";
import useAxios from "./useAxios"

const useGenerateFakeData = () => {
    const {axios} = useAxios();
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState([]);
    const [toastMessage, setToastMessage] = useState('');

    const fetchData = options => {
        setLoading(true)
        axios.post('/fake-data', options).then(response => {
            setLoading(false)
            setErrors([])
            setToastMessage('Generated Fake Data');
            //console.log(response)
        }).catch(error => {
            setLoading(false)
            if(error.response.status === 422) {
                setErrors(Object.values(error.response.data.errors || {}).flatMap(errors => errors))
            } else {
                setErrors(['Try later'])
            }
        })
    }

    const dismissToast = () => setToastMessage('');
    const dismissErrors = () => setErrors([]);

    return {
        fetchData,
        loading,
        toastMessage,
        errors,
        dismissToast,
        dismissErrors
    }
}

export default useGenerateFakeData;
