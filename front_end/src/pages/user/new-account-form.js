import React from 'react';
import {PageSettings} from '../../config/page-settings.js';
import {API_BASE_URL, LOCALE_OPTIONS} from '../../utils/constants.js';
import {registerV3Text} from '../../utils/i18n/register-v3-text';
import {Alert} from 'reactstrap';
import {Link} from 'react-router-dom';


function NewAccountForm(props) {
    //required props: firstNameInput, setFirstNameInput, lastNameInput, setLastNameInput, emailInput, setEmailInput,
    //  reEnterEmailInput, setReEnterEmailInput, passwordInput, setPasswordInput, reEnterPasswordInput, setReEnterPasswordInput,
    //  setStepNumber, axiosInstance
    const appContext = React.useContext(PageSettings);

    const [emailMatchAlert, setEmailMatchAlert] = React.useState(false);
    const [emailTakenAlert, setEmailTakenAlert] = React.useState(false);
    const [passwordMatchAlert, setPasswordMatchAlert] = React.useState(false);

    const validateForm = event => {
        event.preventDefault();
        setEmailMatchAlert(false);
        setEmailTakenAlert(false);
        setPasswordMatchAlert(false);

        if (props.emailInput !== props.reEnterEmailInput) {
            setEmailMatchAlert(true);
            return;
        }

        if (props.passwordInput !== props.reEnterPasswordInput) {
            setPasswordMatchAlert(true);
            return;
        }

        let requestBody = {
            email: props.emailInput
        }
        props.axiosInstance.post(`${API_BASE_URL}/auth/checkForAvailableEmail`, requestBody).then(response => {
            console.log(response);
            props.setStepNumber(2);
        }).catch(error => {
            if (error.response) {
                console.log(error.response);
                setEmailTakenAlert(true);
            }
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
                    {emailTakenAlert? <Alert color="danger">{registerV3Text[appContext.locale]["Email is already taken."]}</Alert> : null}
                    <label className="control-label">{registerV3Text[appContext.locale]["Re-enter Email"]} <span className="text-danger">*</span></label>
                    <div className="row mb-2">
                        <div className="col-12">
                            <input type="email" className="form-control" placeholder={registerV3Text[appContext.locale]["Re-enter email address"]} required value={props.reEnterEmailInput} onChange={event => props.setReEnterEmailInput(event.target.value)}/>
                        </div>
                    </div>
                    {emailMatchAlert ? <Alert color="danger">{registerV3Text[appContext.locale]["Email does not match."]}</Alert> : null}
                    <label className="control-label">{registerV3Text[appContext.locale]["Password"]} <span className="text-danger">*</span></label>
                    <div className="row mb-2">
                        <div className="col-12">
                            <input type="password" className="form-control" placeholder={registerV3Text[appContext.locale]["Password" ]} required value={props.passwordInput} onChange={event => props.setPasswordInput(event.target.value)}/>
                        </div>
                    </div>
                    <label className="control-label">{registerV3Text[appContext.locale]["Re-enter Password"]} <span className="text-danger">*</span></label>
                    <div className="row mb-3">
                        <div className="col-12">
                            <input type="password" className="form-control" placeholder={registerV3Text[appContext.locale]["Password"]} required value={props.reEnterPasswordInput} onChange={event => props.setReEnterPasswordInput(event.target.value)}/>
                        </div>
                    </div>
                    {passwordMatchAlert ? <Alert color="danger">{registerV3Text[appContext.locale]["Password does not match."]}</Alert> : null}
                    <div className="mb-2">
                        <button type="submit" className="btn btn-primary btn-block btn-lg">{registerV3Text[appContext.locale]["Next"]}</button>
                    </div>
                    <div className="mb-3">
                        {registerV3Text[appContext.locale]["Already a member"]}
                    </div>
                    <div>
                        {LOCALE_OPTIONS.map(localeOption => {
                            return(
                                appContext.locale == localeOption.value? 
                                <b key={localeOption.value} className="mr-3 font-weight-600">{localeOption.label}</b> : 
                                <Link key={localeOption.value} replace to="#" onClick={() => appContext.handleSetLocale(localeOption.value)} className="mr-3">{localeOption.label}</Link>
                            )
                        })}
                    </div>
                    <hr />
                    <p className="text-center mb-0">
                        {registerV3Text[appContext.locale]["Copyright text"]}
                    </p>
                </form>
            </div>
        </div>

    )
}

export default NewAccountForm;