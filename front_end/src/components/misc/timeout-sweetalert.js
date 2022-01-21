import React from 'react';
import SweetAlert from 'react-bootstrap-sweetalert';
import { PageSettings } from '../../config/page-settings';
import timeoutSweetalertText from '../../utils/i18n/timeout-sweetalert-text';

//required props: isOpen, toggle
function TimeoutSweetAlert(props) {
    const appContext = React.useContext(PageSettings);

    if (props.isOpen) {
        return(
            <SweetAlert 
                danger
                showConfirm={false} 
                showCancel={false}
                title={timeoutSweetalertText[appContext.locale]["Your request timed out."]}
                onCancel={props.toggle}
            >
                {timeoutSweetalertText[appContext.locale]["We took too long to process this request. Please try again later."]}
            </SweetAlert>
        )
    } else {
        return null;
    }

}

export default TimeoutSweetAlert;