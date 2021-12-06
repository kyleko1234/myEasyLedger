import axios from 'axios';
import React from 'react';
import { Alert } from 'reactstrap';
import LoadingSpinner from '../../../components/misc/loading-spinner';
import { PageSettings } from '../../../config/page-settings';
import { API_BASE_URL } from '../../../utils/constants';
import { registerV3Text } from '../../../utils/i18n/register-v3-text';

function AcceptInvitationForm({token, setCompleted}) {
    const appContext = React.useContext(PageSettings);
    const axiosInstance = axios.create();
    const [firstNameInput, setFirstNameInput] = React.useState('');
    const [lastNameInput, setLastNameInput] = React.useState('');
    const [passwordInput, setPasswordInput] = React.useState('');
    const [reEnterPasswordInput, setReEnterPasswordInput] = React.useState('');
    const [invalidPasswordAlert, setInvalidPasswordAlert] = React.useState(false);
    const [passwordMatchAlert, setPasswordMatchAlert] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    const validateForm = event => {
        event.preventDefault();
        let mounted = true;

        if (mounted) {
            setLoading(true);
            setInvalidPasswordAlert(false);
            setPasswordMatchAlert(false);

            if (passwordInput.length < 8 || passwordInput.length > 32) {
                setInvalidPasswordAlert(true);
                setLoading(false);
                return;
            }

            if (passwordInput !== reEnterPasswordInput) {
                setPasswordMatchAlert(true);
                setLoading(false);
                return;
            }
        }

        let requestBody = {
            firstName: firstNameInput,
            lastName: lastNameInput,
            password: passwordInput,
            reEnterPassword: reEnterPasswordInput,
            locale: appContext.locale,
            agree: true
        }
    }

    return (
        <div className="mb-4">
            <h1>
                {registerV3Text[appContext.locale]["Sign Up"]}
            </h1>
            <h2 className="h5 font-weight-normal mb-2">{registerV3Text[appContext.locale]["Finish setting up your account."]}</h2>
            <div className="login-content">
                <form className="mb-0" onSubmit={event => validateForm(event)}>
                    <label className="control-label">{registerV3Text[appContext.locale]["Name"]} <span className="text-danger">*</span></label>
                    <div className="row mb-2">
                        <div className="col-6 pr-1">
                            <input type="text" className="form-control" placeholder={registerV3Text[appContext.locale]["First name"]} required value={firstNameInput} onChange={event => setFirstNameInput(event.target.value)} />
                        </div>
                        <div className="col-6 pl-1">
                            <input type="text" className="form-control" placeholder={registerV3Text[appContext.locale]["Last name"]} required value={lastNameInput} onChange={event => setLastNameInput(event.target.value)}/>
                        </div>
                    </div>
                    <label className="control-label">{registerV3Text[appContext.locale]["Password"]} <span className="text-danger">*</span></label>
                    <div className="row mb-2">
                        <div className="col-12">
                            <input type="password" className="form-control" placeholder={registerV3Text[appContext.locale]["Password" ]} required value={passwordInput} onChange={event => setPasswordInput(event.target.value)}/>
                        </div>
                    </div>
                    {invalidPasswordAlert ? <Alert color="danger">{registerV3Text[appContext.locale]["Password must be 8-32 characters long."]}</Alert> : null}
                    <label className="control-label">{registerV3Text[appContext.locale]["Re-enter Password"]} <span className="text-danger">*</span></label>
                    <div className="row mb-3">
                        <div className="col-12">
                            <input type="password" className="form-control" placeholder={registerV3Text[appContext.locale]["Password"]} required value={reEnterPasswordInput} onChange={event => setReEnterPasswordInput(event.target.value)}/>
                        </div>
                    </div>
                    {passwordMatchAlert ? <Alert color="danger">{registerV3Text[appContext.locale]["Password does not match."]}</Alert> : null}
                    <div className="mb-2">
                        <button type="submit" className="btn btn-primary btn-block btn-lg">
                            {loading
                                ? <LoadingSpinner /> 
                                : registerV3Text[appContext.locale]["Finish"]
                            }
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )

}

export default AcceptInvitationForm;