import React from 'react';
import { useHistory, withRouter } from 'react-router';
import { PageSettings } from '../../config/page-settings';
import {loginV3Text} from '../../utils/i18n/login-v3-text';

function FindEmail(props) {
    //required props: emailInput, setEmailInput, setUserEmail;
    const appContext = React.useContext(PageSettings);
    const history = useHistory();

    const handleSubmit = event => {
        event.preventDefault();

    };
    return(
        <>
            <h2>Find Your Account</h2>
            <p>Please enter your email to search for your account.</p>
            <form onSubmit={event => handleSubmit(event)}>
                <div className="form-group m-b-15">
                    <input type="email" className="form-control form-control-lg" placeholder={loginV3Text[appContext.locale]["Email Address"]} required value={props.emailInput} onChange={event => props.setEmailInput(event.target.value)}/>
                </div>
            </form>
        </>
    )
}

export default withRouter(FindEmail);