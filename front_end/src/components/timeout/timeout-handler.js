import React from 'react';
import axios from 'axios';
import TimeoutSweetAlert from './timeout-sweetalert';



function TimeoutHandler() {
    const [isOpen, setIsOpen] = React.useState(false);
    const toggle = () => {
        setIsOpen(!isOpen);
    }

    axios.interceptors.response.use((response) => {
        return response;
    }, async function (error) {
        if (error.code) {
            if (error.code === "ECONNABORTED") { //if request times out
                setIsOpen(true);
            }
        }
    
        return Promise.reject(error);
    })

    return (
        <TimeoutSweetAlert 
            toggle={toggle}
            isOpen={isOpen}
        />
    )
}

export default TimeoutHandler;