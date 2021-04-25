import React from 'react';
import {Link} from 'react-router-dom';
import { PageSettings } from '../../config/page-settings';
import { loginV3Text } from '../../utils/i18n/login-v3-text';

function ResetSuccess(props) {
    //optional props: className

    const appContext = React.useContext(PageSettings);
    return(
        <div className="slide-in">
            <h2>{loginV3Text[appContext.locale]["Password Reset Successful!"]}</h2>
            <div className="m-b-40 p-b-40">
                <Link className="text-primary" to="/user/login/form">
                    {loginV3Text[appContext.locale]["Please click here to log in."]}
                </Link>
            </div>
        </div>
    )
}

export default ResetSuccess;