import React from 'react';
import {Link, Redirect} from 'react-router-dom';
import {PageSettings} from '../../config/page-settings.js';
import {ACCESS_TOKEN, API_BASE_URL, REFRESH_TOKEN, LOCALE_OPTIONS} from '../../utils/constants.js';
import axios from 'axios';
import {Alert} from 'reactstrap';
import {loginV3Text} from '../../utils/i18n/login-v3-text.js'

function LoginV3Render(props) {
    //required props: history
    const [emailInput, setEmailInput] = React.useState('');
    const [passwordInput, setPasswordInput] = React.useState('');
    const [loginAlert, setLoginAlert] = React.useState(false);
    const [accountDisabledAlert, setAccountDisabledAlert] = React.useState(false);
    const [lastAttemptedEmail, setLastAttemptedEmail] = React.useState('');
    const [verificationSentAlert, setVerificationSentAlert] = React.useState(false);

    const appContext = React.useContext(PageSettings);
    const axiosLoginInstance = axios.create();


    const handleSubmit = event => {
        event.preventDefault();
        setLoginAlert(false);
        setAccountDisabledAlert(false);
        setVerificationSentAlert(false);
        setLastAttemptedEmail(emailInput.slice());

        let requestBody = {
            email: emailInput,
            password: passwordInput
        }

        axiosLoginInstance.post(`${API_BASE_URL}/auth/signin`, requestBody).then( response => {
            localStorage.setItem(ACCESS_TOKEN, response.data.accessToken);
            localStorage.setItem(REFRESH_TOKEN, response.data.refreshToken);
            appContext.checkForAuthentication();
            props.history.push('/');
        }).catch( error => {
            if (error.response.data.message == "User is disabled") {
                setAccountDisabledAlert(true);
            } else {
                setLoginAlert(true);
            }
        });

    }

    const handleResendEmail = () => {
        axiosLoginInstance.get(`${API_BASE_URL}/verification/resend/${lastAttemptedEmail}`).then( response => {
            setAccountDisabledAlert(false);
            setVerificationSentAlert(true);
        }).catch(console.log);
    }



    return (
        <div className="login login-with-news-feed">
            <div className="news-feed">
                <div className="news-image" style={{backgroundImage: 'url(/assets/img/login-bg/login-bg-11.jpg)'}}></div>
                <div className="news-caption">
                    <h4 className="caption-title"><b>Easy</b> Ledger App</h4>
                    <p>
                        {loginV3Text[appContext.locale]["App description 1"]}
                    </p>
                </div>
            </div>
            <div className="right-content">
                <div className="login-header">
                    <div className="brand">
                        <span className="logo"></span> <b>Easy</b> Ledger
                    </div>
                    <div className="icon">
                        <i className="fa fa-sign-in"></i>
                    </div>
                </div>
                <div className="login-content">
                    {loginAlert? <Alert color="danger">{loginV3Text[appContext.locale]["Invalid email or password."]}</Alert> : null}
                    {accountDisabledAlert? 
                        <Alert color="danger">
                            {loginV3Text[appContext.locale]["Email not verified"]}
                            &nbsp;<Link to="#" onClick={() => handleResendEmail()} className="alert-link">{loginV3Text[appContext.locale]["Click here to send a new verification email."]}</Link>
                        </Alert> 
                    : null}
                    {verificationSentAlert? <Alert color="success">{loginV3Text[appContext.locale]["Verification email sent!"]}</Alert> : null}
                    <form className="margin-bottom-0" onSubmit={event => handleSubmit(event)}>
                        <div className="form-group m-b-15">
                            <input type="email" className="form-control form-control-lg" placeholder={loginV3Text[appContext.locale]["Email Address"]} required value={emailInput} onChange={event => setEmailInput(event.target.value)}/>
                        </div>
                        <div className="form-group m-b-15">
                            <input type="password" className="form-control form-control-lg" placeholder={loginV3Text[appContext.locale]["Password"]} required value={passwordInput} onChange={event => setPasswordInput(event.target.value)} />
                        </div>
                        <div className="login-buttons">
                            <button type="submit" className="btn btn-success btn-block btn-lg">{loginV3Text[appContext.locale]["Sign me in"]}</button>
                        </div>
                        <div className="m-t-20 m-b-40 p-b-40 text-inverse">
                            {loginV3Text[appContext.locale]["Not a member"]}
                        </div>
                        <div>
                            {LOCALE_OPTIONS.map(localeOption => {
                                return (
                                    appContext.locale == localeOption.value ?
                                        <b className="mr-3 font-weight-600">{localeOption.label}</b> :
                                        <Link replace to="#" onClick={() => appContext.handleSetLocale(localeOption.value)} className="mr-3">{localeOption.label}</Link>
                                )
                            })}
                        </div>
                        <hr />
                        <p className="text-center text-grey-darker">
                            {loginV3Text[appContext.locale]["Copyright text"]}
                        </p>
                    </form>
                </div>
            </div>
        </div>
    )

}

export default LoginV3Render;