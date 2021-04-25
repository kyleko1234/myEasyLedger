import React from 'react';
import {Link, useHistory} from 'react-router-dom';
import { PageSettings } from '../../config/page-settings';
import { API_BASE_URL } from '../../utils/constants';
import {loginV3Text} from '../../utils/i18n/login-v3-text';
import {Alert} from 'reactstrap';


function VerifyEmail(props) {
    //required props: userEmail, resetPasswordCode, setResetPasswordCode, axiosInstance;
    //optional props: className

    const appContext = React.useContext(PageSettings);
    const [errorAlert, setErrorAlert] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState("");
    const [successAlert, setSuccessAlert] = React.useState(false);
    const history = useHistory();

    const handleSubmit = event => {
        event.preventDefault();
        setErrorAlert(false);
        setSuccessAlert(false);
        let requestBody = {
            email: props.userEmail,
            token: props.resetPasswordCode
        }
        props.axiosInstance.post(`${API_BASE_URL}/auth/verifyResetPasswordCode`, requestBody).then(response => {
            console.log(response);
            history.push("/user/login/forgot/reset-password")
        }).catch(error => {
            if (error.response) {
                console.log(error.response);
                if (error.response.status === 409) {
                    setErrorMessage(error.response.data.message);
                } else {
                    setErrorMessage("Something went wrong. Please try again later.");
                }
                setErrorAlert(true);
            }
        })
    }

    const resendCode = () => {
        setSuccessAlert(false);
        let requestBody = {
            email: props.userEmail
        }
        props.axiosInstance.post(`${API_BASE_URL}/auth/forgotPassword`, requestBody).then(response => {
            console.log(response);
        }).catch(console.log);
        setSuccessAlert(true);
    }

    return(
        <React.Fragment className={props.className}>
            <h2>{loginV3Text[appContext.locale]["Verify Your Email"]}</h2>
            <h3>{props.userEmail}</h3>
            <p>
                {loginV3Text[appContext.locale]["Please enter the six-digit code we have sent to your email."]}
                <br/>
                <Link replace className="text-primary" to="#" onClick={resendCode}>{loginV3Text[appContext.locale]["Click here to send a new code."]}</Link>
            </p>
            {errorAlert
                ? <Alert color="danger">{loginV3Text[appContext.locale][errorMessage]}</Alert>
                : null}
            {successAlert
                ? <Alert color="success">{loginV3Text[appContext.locale]["A new code has been sent to your email!"]}</Alert>
                : null}
            <form onSubmit={event => handleSubmit(event)} className="m-b-40 p-b-40">
                <div className="form-group m-b-15">
                    <input type="text" required className="form-control form-control-lg" placeholder={loginV3Text[appContext.locale]["Reset Password Code"]} value={props.resetPasswordCode} onChange={event => props.setResetPasswordCode(event.target.value)}/>
                </div>
                <div className="d-flex justify-content-between">
                    <button className="btn btn-lg btn-white width-175" type="button" onClick={() => history.push("/user/login/form")}>
                        {loginV3Text[appContext.locale]["Go Back"]}
                    </button>
                    <button className="btn btn-lg btn-primary width-175" type="submit" onClick={handleSubmit}>
                        {loginV3Text[appContext.locale]["Submit"]}
                    </button>
                </div>
            </form>
        </React.Fragment>
    )
}

export default VerifyEmail;