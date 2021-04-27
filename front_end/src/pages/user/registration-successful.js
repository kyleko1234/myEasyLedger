import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import {PageSettings} from '../../config/page-settings.js';
import { registerV3Text } from '../../utils/i18n/register-v3-text.js';

function RegistrationSuccessful (props) {
	const appContext = React.useContext(PageSettings);
	  
    return (
        <div className="slide-in">
            <h1 className="register-header">
                Registration Successful!
            </h1>
            <div className="register-content">
                    <div className="m-t-20 m-b-40 p-b-40 text-inverse">
                        <p>A verification email is on its way to your inbox.</p>
                        <Link to="/user/login/form" className="text-primary">Return to login page.</Link>
                    </div>
                    <hr />
                    <p className="text-center">
                        {registerV3Text[appContext.locale]["Copyright text"]}
                    </p>
            </div>
        </div>
    )
}

export default RegistrationSuccessful;