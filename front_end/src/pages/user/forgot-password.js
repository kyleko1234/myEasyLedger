import React from 'react';
import { Route, withRouter} from 'react-router';
import { PageSettings } from '../../config/page-settings';
import FindEmail from './find-email';


function ForgotPassword(props) {
    const appContext = React.useContext(PageSettings);

    const [emailInput, setEmailInput] = React.useState("");
    const [userEmail, setUserEmail] = React.useState("");
    const [resetPasswordCode, setResetPasswordCode] = React.useState("");
    const [newPassword, setNewPassword] = React.useState("");


    return(
        <>
            <Route path={props.match.path + "/find-email"}>
                <FindEmail emailInput={emailInput} setEmailInput={setEmailInput} setUserEmail={setUserEmail}/>
            </Route>
        </>
    )
}

export default withRouter(ForgotPassword);