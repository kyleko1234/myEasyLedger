import axios from 'axios';
import React from 'react';
import { Route, withRouter} from 'react-router';
import NetworkErrorHandler from '../../../components/error/network-error/network-error-handler';
import { PageSettings } from '../../../config/page-settings';
import FindEmail from './find-email';
import ResetPassword from './reset-password';
import ResetSuccess from './reset-success';
import VerifyEmail from './verify-email';


function ForgotPassword(props) {
    const appContext = React.useContext(PageSettings);

    const [emailInput, setEmailInput] = React.useState("");
    const [userEmail, setUserEmail] = React.useState("");
    const [resetPasswordCode, setResetPasswordCode] = React.useState("");
    const [newPassword, setNewPassword] = React.useState("");
    const forgotPasswordAxiosInstance = axios.create();
    const [stepNumber, setStepNumber] = React.useState(1);

    return(
        <>
            <Route path={props.match.path + "/find-email"}>
                <FindEmail emailInput={emailInput} setEmailInput={setEmailInput} setUserEmail={setUserEmail} axiosInstance={forgotPasswordAxiosInstance}/>
            </Route>
            <Route path={props.match.path + "/verify-email"}>
                <VerifyEmail resetPasswordCode={resetPasswordCode} setResetPasswordCode={setResetPasswordCode} userEmail={userEmail} axiosInstance={forgotPasswordAxiosInstance}/>
            </Route>
            <Route path={props.match.path + "/reset-password"}>
                <ResetPassword  userEmail={userEmail} resetPasswordCode={resetPasswordCode} newPassword={newPassword} setNewPassword={setNewPassword} axiosInstance={forgotPasswordAxiosInstance}/>
            </Route>
            <Route path={props.match.path + "/reset-success"}>
                <ResetSuccess/>
            </Route>
            <NetworkErrorHandler axiosInstance={forgotPasswordAxiosInstance} />
        </>
    )
}

export default withRouter(ForgotPassword);