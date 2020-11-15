import React from 'react';
import {Link, Redirect} from 'react-router-dom';
import {PageSettings} from '../../config/page-settings.js';
import {ACCESS_TOKEN, API_BASE_URL} from '../../utils/constants.js';
import axios from 'axios';
import {Alert} from 'reactstrap';

function LoginV3Render(props) {
    //required props: history
    const [emailInput, setEmailInput] = React.useState('');
    const [passwordInput, setPasswordInput] = React.useState('');
    const [rememberMe, setRememberMe] = React.useState(true);
    const [loginAlert, setLoginAlert] = React.useState(false);

    const appContext = React.useContext(PageSettings);



    const handleSubmit = event => {
        event.preventDefault();
        setLoginAlert(false);

        let requestBody = {
            email: emailInput,
            password: passwordInput
        }

        axios.post(`${API_BASE_URL}/auth/signin`, requestBody).then( response => {
            localStorage.setItem(ACCESS_TOKEN, response.data.accessToken);
            appContext.handleSetRememberMe(rememberMe);
            appContext.checkForAuthentication();
            props.history.push('/');
        }).catch( response => {
            console.log(response);
            setLoginAlert(true);
        });

    }



    return (
        <div className="login login-with-news-feed">
            <div className="news-feed">
                <div className="news-image" style={{backgroundImage: 'url(/assets/img/login-bg/login-bg-11.jpg)'}}></div>
                <div className="news-caption">
                    <h4 className="caption-title"><b>Easy</b> Ledger App</h4>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </p>
                </div>
            </div>
            <div className="right-content">
                <div className="login-header">
                    <div className="brand">
                        <span className="logo"></span> <b>Easy</b> Ledger
                        <small>responsive bootstrap 4 admin template</small>
                    </div>
                    <div className="icon">
                        <i className="fa fa-sign-in"></i>
                    </div>
                </div>
                <div className="login-content">
                    {loginAlert? <Alert color="danger">Invalid email or password.</Alert> : null}
                    <form className="margin-bottom-0" onSubmit={event => handleSubmit(event)}>
                        <div className="form-group m-b-15">
                            <input type="email" className="form-control form-control-lg" placeholder="Email Address" required value={emailInput} onChange={event => setEmailInput(event.target.value)}/>
                        </div>
                        <div className="form-group m-b-15">
                            <input type="password" className="form-control form-control-lg" placeholder="Password" required value={passwordInput} onChange={event => setPasswordInput(event.target.value)} />
                        </div>
                        <div className="checkbox checkbox-css m-b-30">
                            <input type="checkbox" id="remember_me_checkbox" checked={rememberMe} onChange={() => setRememberMe(!rememberMe)} />
                            <label htmlFor="remember_me_checkbox">
                                Remember Me
                            </label>
                        </div>
                        <div className="login-buttons">
                            <button type="submit" className="btn btn-success btn-block btn-lg">Sign me in</button>
                        </div>
                        <div className="m-t-20 m-b-40 p-b-40 text-inverse">
                            Not a member yet? Click <Link to="/user/register-v3" className="text-success">here</Link> to register.
                        </div>
                        <hr />
                        <p className="text-center text-grey-darker">
                            &copy; Color Admin All Right Reserved 2020
                        </p>
                    </form>
                </div>
            </div>
        </div>
    )

}

export default LoginV3Render;