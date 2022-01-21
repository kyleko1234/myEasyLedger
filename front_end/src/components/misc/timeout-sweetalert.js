import React from 'react';
import SweetAlert from 'react-bootstrap-sweetalert';

//required props: isOpen, toggle
function TimeoutSweetAlert(props) {
    if (props.isOpen) {
        return(
            <SweetAlert 
                danger
                showConfirm={false} 
                showCancel={true}
                cancelBtnBsStyle="default"
                cancelBtnText="Okay!"
                title="Your request timed out."
                onCancel={props.toggle}
            >
                We took too long to process this request. Please try again later.
            </SweetAlert>
        )
    } else {
        return null;
    }

}

export default TimeoutSweetAlert;