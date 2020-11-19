import React from 'react';
import axios from 'axios';
import { Alert } from 'reactstrap';
import {Link} from 'react-router-dom';
import {PageSettings} from '../../config/page-settings.js';
import {API_BASE_URL} from '../../utils/constants.js';


function RegisterV3Render(props) {
    //required props: history

    const [firstNameInput, setFirstNameInput] = React.useState('');
    const [lastNameInput, setLastNameInput] = React.useState('');
    const [emailInput, setEmailInput] = React.useState('');
    const [reEnterEmailInput, setReEnterEmailInput] = React.useState('');
    const [passwordInput, setPasswordInput] = React.useState('');
    const [reEnterPasswordInput, setReEnterPasswordInput] = React.useState('');
    const [agreeInput, setAgreeInput] = React.useState(false);

    const [emailMatchAlert, setEmailMatchAlert] = React.useState(false);
    const [emailTakenAlert, setEmailTakenAlert] = React.useState(false);
    const [passwordMatchAlert, setPasswordMatchAlert] = React.useState(false);
    const [agreeAlert, setAgreeAlert] = React.useState(false);

    const appContext = React.useContext(PageSettings);

    const handleSubmit = event => {
        event.preventDefault();
        setEmailMatchAlert(false);
        setEmailTakenAlert(false);
        setPasswordMatchAlert(false);
        setAgreeAlert(false);

        if (emailInput !== reEnterEmailInput) {
            setEmailMatchAlert(true);
            return;
        }

        if (passwordInput !== reEnterPasswordInput) {
            setPasswordMatchAlert(true);
            return;
        }

        if (!agreeInput) {
            setAgreeAlert(true);
            return;
        }

        let requestBody = {
            firstName: firstNameInput,
            lastName: lastNameInput,
            email: emailInput,
            password: passwordInput
        }

        axios.post(`${API_BASE_URL}/auth/signup`, requestBody).then(response => {
             props.history.push('/user/registration-successful')  
        }).catch(response => {
            if (response && response.response.data.message == "Email is already taken!") {
                setEmailTakenAlert(true);
            }
        })
        
    }

    return (
        <div className="register register-with-news-feed">
            <div className="news-feed">
                <div className="news-image" style={{ backgroundImage: 'url(/assets/img/login-bg/login-bg-9.jpg)' }}></div>
                <div className="news-caption">
                    <h4 className="caption-title"><b>Easy</b> Ledger App</h4>
                    <p>
                        As a Color Admin app administrator, you use the Color Admin console to manage your organization’s account, such as add new users, manage security settings, and turn on the services you want your team to access.
                    </p>
                </div>
            </div>
            <div className="right-content">
                <h1 className="register-header">
                    Sign Up
                    <small>Create your Easy Ledger Account. It’s free (for now).</small>
                </h1>
                <div className="register-content">
                    <form className="margin-bottom-0" onSubmit={event => handleSubmit(event)}>
                        <label className="control-label">Name <span className="text-danger">*</span></label>
                        <div className="row row-space-10">
                            <div className="col-md-6 m-b-15">
                                <input type="text" className="form-control" placeholder="First name" required value={firstNameInput} onChange={event => setFirstNameInput(event.target.value)} />
                            </div>
                            <div className="col-md-6 m-b-15">
                                <input type="text" className="form-control" placeholder="Last name" required value={lastNameInput} onChange={event => setLastNameInput(event.target.value)}/>
                            </div>
                        </div>
                        <label className="control-label">Email <span className="text-danger">*</span></label>
                        <div className="row m-b-15">
                            <div className="col-md-12">
                                <input type="email" className="form-control" placeholder="Email address" required value={emailInput} onChange={event => setEmailInput(event.target.value)}/>
                            </div>
                        </div>
                        {emailTakenAlert? <Alert color="danger">Email is already taken.</Alert> : null}
                        <label className="control-label">Re-enter Email <span className="text-danger">*</span></label>
                        <div className="row m-b-15">
                            <div className="col-md-12">
                                <input type="email" className="form-control" placeholder="Re-enter email address" required value={reEnterEmailInput} onChange={event => setReEnterEmailInput(event.target.value)}/>
                            </div>
                        </div>
                        {emailMatchAlert ? <Alert color="danger">Email does not match.</Alert> : null}
                        <label className="control-label">Password <span className="text-danger">*</span></label>
                        <div className="row m-b-15">
                            <div className="col-md-12">
                                <input type="password" className="form-control" placeholder="Password" required value={passwordInput} onChange={event => setPasswordInput(event.target.value)}/>
                            </div>
                        </div>
                        <label className="control-label">Re-enter Password <span className="text-danger">*</span></label>
                        <div className="row m-b-15">
                            <div className="col-md-12">
                                <input type="password" className="form-control" placeholder="Password" required value={reEnterPasswordInput} onChange={event => setReEnterPasswordInput(event.target.value)}/>
                            </div>
                        </div>
                        {passwordMatchAlert ? <Alert color="danger">Password does not match.</Alert> : null}
                        <div className="checkbox checkbox-css m-b-30">
                            <div className="checkbox checkbox-css m-b-30">
                                <input type="checkbox" id="agreement_checkbox" value={agreeInput} onChange={() => setAgreeInput(!agreeInput)} />
                                <label htmlFor="agreement_checkbox">
                                    By clicking Sign Up, you agree to our <Link to="#">Terms</Link> and that you have read our <Link to="#">Data Policy</Link>, including our <Link to="#">Cookie Use</Link>.
                                    {/** TODO: terms and conditions lol */}
                                </label> 
                            </div>
                        </div>
                        {agreeAlert ? <Alert color="danger">Please agree.</Alert> : null}
                        <div className="register-buttons">
                            <button type="submit" className="btn btn-primary btn-block btn-lg">Sign Up</button>
                        </div>
                        <div className="m-t-20 m-b-40 p-b-40 text-inverse">
                            Already a member? Click <Link to="/user/login-v3">here</Link> to login.
                        </div>
                        <hr />
                        <p className="text-center">
                            &copy; Color Admin All Right Reserved 2020
                        </p>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default RegisterV3Render;