import React from 'react';
import axios from 'axios';
import TimeoutSweetAlert from './network-error-sweetalert';


//optional props: axiosInstance
function NetworkErrorHandler(props) {
    const [isOpen, setIsOpen] = React.useState(false);
    const toggle = () => {
        setIsOpen(!isOpen);
    }
    if (props.axiosInstance) {
        props.axiosInstance.interceptors.response.use((response) => {
            return response;
        }, async function (error) {
            if (!error.status || error.code === "ECONNABORTED") { //if request times out
                setIsOpen(true);
            }
        
            return Promise.reject(error);
        })
    } else {
        axios.interceptors.response.use((response) => {
            return response;
        }, async function (error) {
            if (!error.status || error.code === "ECONNABORTED") { //if request times out
                setIsOpen(true);
            }
        
            return Promise.reject(error);
        })
    }

    return (
        <TimeoutSweetAlert 
            toggle={toggle}
            isOpen={isOpen}
        />
    )
}

export default NetworkErrorHandler;