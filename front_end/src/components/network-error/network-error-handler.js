import React from 'react';
import axios from 'axios';
import NetworkErrorSweetAlert from './network-error-sweetalert';
import TimeoutSweetAlert from './timeout-sweetalert';


//optional props: axiosInstance
function NetworkErrorHandler(props) {
    const [networkError, setNetworkError] = React.useState(false);
    const toggleNetworkError = () => {
        setNetworkError(!networkError);
    }
    const [timeoutError, setTimeoutError] = React.useState(false);
    const toggleTimeoutError = () => {
        setTimeoutError(!timeoutError);
    }

    if (props.axiosInstance) {
        props.axiosInstance.interceptors.response.use((response) => {
            return response;
        }, async function (error) {
            if (!error.response && !error.status && !error.code) { //if request times out
                setNetworkError(true);
            } else if (error.code === "ECONNABORTED") {
                setTimeoutError(true);
            }
            return Promise.reject(error);
        })
    } else {
        axios.interceptors.response.use((response) => {
            return response;
        }, async function (error) {
            if (!error.response && !error.status && !error.code) { //if request times out
                setNetworkError(true);
            } else if (error.code === "ECONNABORTED") {
                setTimeoutError(true);
            }
        
            return Promise.reject(error);
        })
    }

    return (
        <>
            <NetworkErrorSweetAlert 
                toggle={toggleNetworkError}
                isOpen={networkError}
            />
            <TimeoutSweetAlert
                toggle={toggleTimeoutError}
                isOpen={timeoutError}
            />
        </>
    )
}

export default NetworkErrorHandler;