import React from 'react';
import SweetAlert from 'react-bootstrap-sweetalert';
import { PageSettings } from '../../config/page-settings';
import { timeoutSweetAlertText } from '../../utils/i18n/timeout-sweetalert-text';

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
                title={timeoutSweetAlertText[appContext.locale]["Our system is under maintenance."]}
                onCancel={props.toggle}
            >
                {timeoutSweetAlertText[appContext.locale]["Please try again later."]}
            </SweetAlert>
        )
    } else {
        return null;
    }

}

export default TimeoutSweetAlert;