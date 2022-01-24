import React from 'react';
import axios from 'axios';
import TimeoutSweetAlert from './timeout-sweetalert';

function TimeoutHandler() {
    const [isOpen, setIsOpen] = React.useState(true);
    const toggle = () => {
        setIsOpen(!isOpen);
    }


    return (
        <TimeoutSweetAlert 
            toggle={toggle}
            isOpen={isOpen}
        />
    )
}

export default TimeoutHandler;