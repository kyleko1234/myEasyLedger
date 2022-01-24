import React from 'react';
import SweetAlert from 'react-bootstrap-sweetalert';
import { PageSettings } from '../../config/page-settings';
import { errorText } from '../../utils/i18n/error-text';

//required props: isOpen, toggle
function TimeoutSweetAlert(props) {
    const appContext = React.useContext(PageSettings);
    
    if (props.isOpen) {
        return(
            <SweetAlert 
                danger
                showConfirm={false} 
                showCancel={false}
                onConfirm={props.toggle}
                title={errorText[appContext.locale]["Your request has timed out."]}
                onCancel={props.toggle}
            >
                {errorText[appContext.locale]["Please try again later."]}
            </SweetAlert>
        )
    } else {
        return null;
    }

}

export default TimeoutSweetAlert;