import React from 'react';
import {Link, useHistory} from 'react-router-dom';
import { PageSettings } from '../../../config/page-settings';
import { API_BASE_URL } from '../../../utils/constants';
import {loginV3Text} from '../../../utils/i18n/login-v3-text';
import {Alert} from 'reactstrap';
import LoadingSpinner from '../../../components/misc/loading-spinner';


function VerifyEmail(props) {
    //required props: userEmail, resetPasswordCode, setResetPasswordCode, axiosInstance;
    //optional props: className

    const appContext = React.useContext(PageSettings);
    const [errorAlert, setErrorAlert] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState("");
    const [successAlert, setSuccessAlert] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const history = useHistory();

    const handleSubmit = event => {
        event.preventDefault();
        setLoading(true);
        setErrorAlert(false);
        setSuccessAlert(false);
        let requestBody = {
            email: props.userEmail,
            token: props.resetPasswordCode
        }
        props.axiosInstance.post(`${API_BASE_URL}/auth/verifyResetPasswordCode`, requestBody).then(response => {
            console.log(response);
            setLoading(false);
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
            setLoading(false);
        })
    }

    const resendCode = () => {
        setSuccessAlert(false);
        setLoading(true);
        let requestBody = {
            email: props.userEmail
        }
        props.axiosInstance.post(`${API_BASE_URL}/auth/forgotPassword`, requestBody).then(response => {
            console.log(response);
            setSuccessAlert(true);
            setLoading(false);
        }).catch(error => {
            console.log(error);
            setLoading(false);
        });
    }

    return(
        <div className="slide-in mb-5 pb-5">
            <h1>{loginV3Text[appContext.locale]["Verify Your Email"]}</h1>
            <h3>{props.userEmail}</h3>
            <p>
                {loginV3Text[appContext.locale]["Please enter the six-digit code we have sent to your email."]}
                <br/>
                <Link replace className="text-primary" to="#" onClick={resendCode}>{loginV3Text[appContext.locale]["Click here to send a new code."]}</Link>
            </p>
            <Alert isOpen={errorAlert} color="danger">{loginV3Text[appContext.locale][errorMessage]}</Alert>
            <Alert isOpen={successAlert} color="success">{loginV3Text[appContext.locale]["A new code has been sent to your email!"]}</Alert>
            <form onSubmit={event => handleSubmit(event)} className="mb-5 pb-5">
                <div className="mb-3">
                    <input type="text" required className="form-control-lg form-control" placeholder={loginV3Text[appContext.locale]["Reset Password Code"]} value={props.resetPasswordCode} onChange={event => props.setResetPasswordCode(event.target.value)}/>
                </div>
                <div className="d-flex justify-content-between">
                    <button className="btn btn-lg btn-white width-175" type="button" onClick={() => history.push("/user/login/form")}>
                        {loginV3Text[appContext.locale]["Go Back"]}
                    </button>
                    <button className="btn btn-lg btn-primary width-175" type="submit" onClick={handleSubmit}>
                        {loading
                            ? <LoadingSpinner />
                            : loginV3Text[appContext.locale]["Submit"]
                        }
                    </button>
                </div>
            </form>
        </div>
    )
}

export default VerifyEmail;