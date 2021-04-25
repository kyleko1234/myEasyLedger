import React from 'react';
import { useHistory } from 'react-router-dom';
import { PageSettings } from '../../config/page-settings';
import {loginV3Text} from '../../utils/i18n/login-v3-text';
import {API_BASE_URL} from '../../utils/constants.js';
import {Alert} from 'reactstrap';

function FindEmail(props) {
    //required props: emailInput, setEmailInput, setUserEmail, axiosInstance;
    //optional props: className
    const appContext = React.useContext(PageSettings);
    const [noUserWithThisEmailAlert, setNoUserWithThisEmailAlert] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    const history = useHistory();

    const handleSubmit = async event => {
        event.preventDefault();
        setNoUserWithThisEmailAlert(false);
        setLoading(true);
        props.setUserEmail(props.emailInput);
        let requestBody = {
            email: props.emailInput
        }
        await props.axiosInstance.post(`${API_BASE_URL}/auth/forgotPassword`, requestBody).then(response => {
            console.log(response);
            history.push("/user/login/forgot/verify-email");
        }).catch(error => {
            if (error.response) {
                if (error.response.status === 404) {
                    setNoUserWithThisEmailAlert(true);
                }
            }
        })
        setLoading(false);
    };

    return(
        <React.Fragment className={props.className}>
            <h2>{loginV3Text[appContext.locale]["Find Your Account"]}</h2>
            <p>{loginV3Text[appContext.locale]["Please enter your email to search for your account."]}</p>
            {noUserWithThisEmailAlert
                ? <Alert color="danger">{loginV3Text[appContext.locale]["Could not find an account registered with this email address."]}</Alert>
                : null}
            <form onSubmit={event => handleSubmit(event)} className="m-b-40 p-b-40">
                <div className="form-group m-b-15">
                    <input type="email" required className="form-control form-control-lg" placeholder={loginV3Text[appContext.locale]["Email Address"]} value={props.emailInput} onChange={event => props.setEmailInput(event.target.value)}/>
                </div>
                <div className="d-flex justify-content-between">
                    <button className="btn btn-lg btn-white width-175" type="button" onClick={() => history.push("/user/login/form")}>
                        {loginV3Text[appContext.locale]["Go Back"]}
                    </button>
                    <button className="btn btn-lg btn-primary width-175" type="submit" onClick={handleSubmit}>
                        {loading? <i className="fas fa-circle-notch fa-spin"></i> : loginV3Text[appContext.locale]["Submit"]}
                    </button>
                </div>
            </form>
        </React.Fragment>
    )
}

export default FindEmail;