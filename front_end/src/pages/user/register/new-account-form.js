import React from 'react';
import {PageSettings} from '../../../config/page-settings.js';
import {API_BASE_URL} from '../../../utils/constants.js';
import {registerV3Text} from '../../../utils/i18n/register-v3-text';
import {Alert} from 'reactstrap';
import LoadingSpinner from '../../../components/misc/loading-spinner.js';


function NewAccountForm(props) {
    //required props: firstNameInput, setFirstNameInput, lastNameInput, setLastNameInput, emailInput, setEmailInput,
    //  reEnterEmailInput, setReEnterEmailInput, passwordInput, setPasswordInput, reEnterPasswordInput, setReEnterPasswordInput,
    //  setStepNumber, axiosInstance, handleChangeLocale
    const appContext = React.useContext(PageSettings);

    const [emailMatchAlert, setEmailMatchAlert] = React.useState(false);
    const [emailTakenAlert, setEmailTakenAlert] = React.useState(false);
    const [invalidPasswordAlert, setInvalidPasswordAlert] = React.useState(false);
    const [passwordMatchAlert, setPasswordMatchAlert] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    const validateForm = event => {
        event.preventDefault();
        setLoading(true);
        setEmailMatchAlert(false);
        setEmailTakenAlert(false);
        setPasswordMatchAlert(false);

        if (props.emailInput !== props.reEnterEmailInput) {
            setEmailMatchAlert(true);
            setLoading(false);
            return;
        }

        if (props.passwordInput.length < 8 || props.passwordInput.length > 32) {
            setInvalidPasswordAlert(true);
            setLoading(false);
            return;
        }

        if (props.passwordInput !== props.reEnterPasswordInput) {
            setPasswordMatchAlert(true);
            setLoading(false);
            return;
        }

        let requestBody = {
            email: props.emailInput
        }
        props.axiosInstance.post(`${API_BASE_URL}/auth/checkForAvailableEmail`, requestBody).then(response => {
            console.log(response);
            setLoading(false);
            props.setStepNumber(2);
        }).catch(error => {
            if (error.response) {
                console.log(error.response);
                setLoading(false);
                setEmailTakenAlert(true);
            }
            setLoading(false);
        });
    }


    return (
        <div>
            <h1>
                {registerV3Text[appContext.locale]["Sign Up"]}
            </h1>
            <h2 className="h5 font-weight-normal mb-2">{registerV3Text[appContext.locale]["Create your myEasyLedger Account."]}</h2>
            <div className="login-content">
                <form className="mb-0" onSubmit={event => validateForm(event)}>
                    <label className="control-label">{registerV3Text[appContext.locale]["Name"]} <span className="text-danger">*</span></label>
                    <div className="row mb-2">
                        <div className="col-6 pr-1">
                            <input type="text" className="form-control" placeholder={registerV3Text[appContext.locale]["First name"]} required value={props.firstNameInput} onChange={event => props.setFirstNameInput(event.target.value)} />
                        </div>
                        <div className="col-6 pl-1">
                            <input type="text" className="form-control" placeholder={registerV3Text[appContext.locale]["Last name"]} required value={props.lastNameInput} onChange={event => props.setLastNameInput(event.target.value)}/>
                        </div>
                    </div>
                    <label className="control-label">{registerV3Text[appContext.locale]["Email"]} <span className="text-danger">*</span></label>
                    <div className="row mb-2">
                        <div className="col-12">
                            <input type="email" className="form-control" placeholder={registerV3Text[appContext.locale]["Email address"]} required value={props.emailInput} onChange={event => props.setEmailInput(event.target.value)}/>
                        </div>
                    </div>
                    <Alert isOpen={emailTakenAlert} color="danger">{registerV3Text[appContext.locale]["Email is already taken."]}</Alert>
                    <label className="control-label">{registerV3Text[appContext.locale]["Re-enter Email"]} <span className="text-danger">*</span></label>
                    <div className="row mb-2">
                        <div className="col-12">
                            <input type="email" className="form-control" placeholder={registerV3Text[appContext.locale]["Re-enter email address"]} required value={props.reEnterEmailInput} onChange={event => props.setReEnterEmailInput(event.target.value)}/>
                        </div>
                    </div>
                    <Alert isOpen={emailMatchAlert} color="danger">{registerV3Text[appContext.locale]["Email does not match."]}</Alert>
                    <label className="control-label">{registerV3Text[appContext.locale]["Password"]} <span className="text-danger">*</span></label>
                    <div className="row mb-2">
                        <div className="col-12">
                            <input type="password" className="form-control" placeholder={registerV3Text[appContext.locale]["Password" ]} required value={props.passwordInput} onChange={event => props.setPasswordInput(event.target.value)}/>
                        </div>
                    </div>
                    <Alert isOpen={invalidPasswordAlert} color="danger">{registerV3Text[appContext.locale]["Password must be 8-32 characters long."]}</Alert>
                    <label className="control-label">{registerV3Text[appContext.locale]["Re-enter Password"]} <span className="text-danger">*</span></label>
                    <div className="row mb-3">
                        <div className="col-12">
                            <input type="password" className="form-control" placeholder={registerV3Text[appContext.locale]["Password"]} required value={props.reEnterPasswordInput} onChange={event => props.setReEnterPasswordInput(event.target.value)}/>
                        </div>
                    </div>
                    <Alert isOpen={passwordMatchAlert} color="danger">{registerV3Text[appContext.locale]["Password does not match."]}</Alert>
                    <div className="mb-2">
                        <button type="submit" className="btn btn-primary btn-block btn-lg">
                            {loading
                                ? <LoadingSpinner />
                                : registerV3Text[appContext.locale]["Next"]
                            }
                        </button>
                    </div>
                    <div className="mb-3">
                        {registerV3Text[appContext.locale]["Already a member"]}
                    </div>
                </form>
            </div>
        </div>

    )
}

export default NewAccountForm;