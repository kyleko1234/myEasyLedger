import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import {PageSettings} from '../../config/page-settings.js';
import { registerV3Text } from '../../utils/i18n/register-v3-text.js';

function RegistrationSuccessful (props) {
	const appContext = React.useContext(PageSettings);
	  
    return (
        <div className="slide-in">
            <h1>
                {registerV3Text[appContext.locale]["Registration Successful!"]}
            </h1>
            <div className="login-content">
                    <div className="mt-5 mb-5 pb-5 text-inverse">
                        <p>{registerV3Text[appContext.locale]["A verification email is on its way to your inbox."]}</p>
                        <Link to="/user/login/form" className="text-primary">{registerV3Text[appContext.locale]["Return to login page."]}</Link>
                    </div>
                    <hr />
                    <p className="text-center mb-0">
                        {registerV3Text[appContext.locale]["Copyright text"]}
                    </p>
            </div>
        </div>
    )
}

export default RegistrationSuccessful;