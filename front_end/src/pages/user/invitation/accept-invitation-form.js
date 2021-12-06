import React from 'react';
import { PageSettings } from '../../../config/page-settings';
import { registerV3Text } from '../../../utils/i18n/register-v3-text';

function AcceptInvitationForm({token, setCompleted}) {
    const appContext = React.useContext(PageSettings);
    return null;
    /*return (
        <div>
            <h1>
                {registerV3Text[appContext.locale]["Sign Up"]}
            </h1>
            <h2 className="h5 font-weight-normal mb-2">{registerV3Text[appContext.locale]["Finish setting up your myEasyLedger account."]}</h2>
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
                    {invalidPasswordAlert ? <Alert color="danger">{registerV3Text[appContext.locale]["Password must be 8-32 characters long."]}</Alert> : null}
                    <label className="control-label">{registerV3Text[appContext.locale]["Re-enter Password"]} <span className="text-danger">*</span></label>
                    <div className="row mb-3">
                        <div className="col-12">
                            <input type="password" className="form-control" placeholder={registerV3Text[appContext.locale]["Password"]} required value={props.reEnterPasswordInput} onChange={event => props.setReEnterPasswordInput(event.target.value)}/>
                        </div>
                    </div>
                    {passwordMatchAlert ? <Alert color="danger">{registerV3Text[appContext.locale]["Password does not match."]}</Alert> : null}
                    <div className="mb-2">
                        <button type="submit" className="btn btn-primary btn-block btn-lg">
                            {loading
                                ? <i className="fas fa-circle-notch fa-spin"></i> 
                                : registerV3Text[appContext.locale]["Next"]
                            }
                        </button>
                    </div>
                </form>
            </div>
        </div>

    ) */

}

export default AcceptInvitationForm;