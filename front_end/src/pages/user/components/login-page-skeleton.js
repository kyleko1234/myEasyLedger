import React from 'react';
import { Link } from 'react-router-dom';
import { PageSettings } from '../../../config/page-settings';
import { LOGIN_BG_URL } from '../../../utils/constants';
import { loginV3Text } from '../../../utils/i18n/login-v3-text';
import LoginPageFooter from './login-page-footer';

//optional props: backgroundImage, children
function LoginPageSkeleton(props) {
    const appContext = React.useContext(PageSettings);
    return (
        <div className="login-page" style={{ backgroundImage: props.backgroundImage }}>
            <div className="login-left">
                <div className="login-left-caption">
                    <div className="login-left-caption-title">my<b>Easy</b>Ledger</div>
                    <p>
                        {loginV3Text[appContext.locale]["App description"]}
                    </p>
                </div>
            </div>
            <div className="login-right overflow-auto">
                {props.children}
                <LoginPageFooter />
            </div>
        </div>
    );
}

export default LoginPageSkeleton;

LoginPageSkeleton.defaultProps = {
    backgroundImage: LOGIN_BG_URL
}