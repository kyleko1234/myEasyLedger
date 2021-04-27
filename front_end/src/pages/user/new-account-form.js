import React from 'react';
import {PageSettings} from '../../config/page-settings.js';
import {LOCALE_OPTIONS} from '../../utils/constants.js';
import {registerV3Text} from '../../utils/i18n/register-v3-text';

function NewAccountForm(props) {
    //required props: firstNameInput, setFirstNameInput, lastNameInput, setLastNameInput, emailInput, setEmailInput,
    //  reEnterEmailInput, setReEnterEmailInput, passwordInput, setPasswordInput, reEnterPasswordInput, setReEnterPasswordInput,
    //  agreeInput, setAgreeInput, setStepNumber, axiosInstance
    const appContext = React.useContext(PageSettings);

    const [emailMatchAlert, setEmailMatchAlert] = React.useState(false);
    const [emailTakenAlert, setEmailTakenAlert] = React.useState(false);
    const [passwordMatchAlert, setPasswordMatchAlert] = React.useState(false);
    const [agreeAlert, setAgreeAlert] = React.useState(false);

    const validateForm = event => {
        event.preventDefault();
    }

    return (
        <div>
            <h1 className="register-header">
                {registerV3Text[appContext.locale]["Sign Up"]}
                <small>{registerV3Text[appContext.locale]["Create your myEasyLedger Account."]}</small>
            </h1>
            <div className="register-content">
                <form className="margin-bottom-0" onSubmit={event => validateForm(event)}>
                    <label className="control-label">{registerV3Text[appContext.locale]["Name"]} <span className="text-danger">*</span></label>
                    <div className="row row-space-10">
                        <div className="col-md-6 m-b-15">
                            <input type="text" className="form-control" placeholder={registerV3Text[appContext.locale]["First name"]} required value={firstNameInput} onChange={event => setFirstNameInput(event.target.value)} />
                        </div>
                        <div className="col-md-6 m-b-15">
                            <input type="text" className="form-control" placeholder={registerV3Text[appContext.locale]["Last name"]} required value={lastNameInput} onChange={event => setLastNameInput(event.target.value)}/>
                        </div>
                    </div>
                    <label className="control-label">{registerV3Text[appContext.locale]["Email"]} <span className="text-danger">*</span></label>
                    <div className="row m-b-15">
                        <div className="col-md-12">
                            <input type="email" className="form-control" placeholder={registerV3Text[appContext.locale]["Email address"]} required value={emailInput} onChange={event => setEmailInput(event.target.value)}/>
                        </div>
                    </div>
                    {emailTakenAlert? <Alert color="danger">{registerV3Text[appContext.locale]["Email is already taken."]}</Alert> : null}
                    <label className="control-label">{registerV3Text[appContext.locale]["Re-enter Email"]} <span className="text-danger">*</span></label>
                    <div className="row m-b-15">
                        <div className="col-md-12">
                            <input type="email" className="form-control" placeholder={registerV3Text[appContext.locale]["Re-enter email address"]} required value={reEnterEmailInput} onChange={event => setReEnterEmailInput(event.target.value)}/>
                        </div>
                    </div>
                    {emailMatchAlert ? <Alert color="danger">{registerV3Text[appContext.locale]["Email does not match."]}</Alert> : null}
                    <label className="control-label">{registerV3Text[appContext.locale]["Password"]} <span className="text-danger">*</span></label>
                    <div className="row m-b-15">
                        <div className="col-md-12">
                            <input type="password" className="form-control" placeholder={registerV3Text[appContext.locale]["Password" ]} required value={passwordInput} onChange={event => setPasswordInput(event.target.value)}/>
                        </div>
                    </div>
                    <label className="control-label">{registerV3Text[appContext.locale]["Re-enter Password"]} <span className="text-danger">*</span></label>
                    <div className="row m-b-15">
                        <div className="col-md-12">
                            <input type="password" className="form-control" placeholder={registerV3Text[appContext.locale]["Password"]} required value={reEnterPasswordInput} onChange={event => setReEnterPasswordInput(event.target.value)}/>
                        </div>
                    </div>
                    {passwordMatchAlert ? <Alert color="danger">{registerV3Text[appContext.locale]["Password does not match."]}</Alert> : null}
                    <div className="checkbox checkbox-css m-b-30">
                        <div className="checkbox checkbox-css m-b-30">
                            <input type="checkbox" id="agreement_checkbox" value={agreeInput} onChange={() => setAgreeInput(!agreeInput)} />
                            <label htmlFor="agreement_checkbox">
                                {registerV3Text[appContext.locale]["Agreement text"]}
                                {/** TODO: terms and conditions lol */}
                            </label> 
                        </div>
                    </div>
                    {agreeAlert ? <Alert color="danger">{registerV3Text[appContext.locale]["Please agree."]}</Alert> : null}
                    <div className="register-buttons">
                        <button type="submit" className="btn btn-primary btn-block btn-lg">{registerV3Text[appContext.locale]["Sign Up"]}</button>
                    </div>
                    <div className="m-t-20 p-b-40 text-inverse">
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
                    <p className="text-center">
                        {registerV3Text[appContext.locale]["Copyright text"]}
                    </p>
                </form>
            </div>
        </div>

    )
}

export default NewAccountForm;