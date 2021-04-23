import axios from 'axios';
import React from 'react';
import { Router, Route, withRouter} from 'react-router';
import { PageSettings } from '../../config/page-settings';
import FindEmail from './find-email';
import VerifyEmail from './verify-email';


function ForgotPassword(props) {
    const appContext = React.useContext(PageSettings);

    const [emailInput, setEmailInput] = React.useState("");
    const [userEmail, setUserEmail] = React.useState("");
    const [resetPasswordCode, setResetPasswordCode] = React.useState("");
    const [newPassword, setNewPassword] = React.useState("");
    const forgotPasswordAxiosInstance = axios.create();

    return(
        <>
            <Route path={props.match.path + "/find-email"}>
                <FindEmail emailInput={emailInput} setEmailInput={setEmailInput} setUserEmail={setUserEmail} axiosInstance={forgotPasswordAxiosInstance}/>
            </Route>
            <Route path={props.match.path + "/verify-email"}>
                <VerifyEmail resetPasswordCode={resetPasswordCode} setResetPasswordCode={setResetPasswordCode} userEmail={userEmail} axiosInstance={forgotPasswordAxiosInstance}/>
            </Route>

            <Route path={props.match.path + "/reset-password"}>
            </Route>

        </>
    )
}

export default withRouter(ForgotPassword);