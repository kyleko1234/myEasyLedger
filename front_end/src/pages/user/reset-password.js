import React from 'react';
import { useHistory, Link } from 'react-router-dom';
import { PageSettings } from '../../config/page-settings';
import { API_BASE_URL } from '../../utils/constants';
import { loginV3Text } from '../../utils/i18n/login-v3-text';
import { Alert } from 'reactstrap';

function ResetPassword(props) {
    //required props: userEmail, resetPasswordCode, newPassword, setNewPassword, axiosInstance
    //optional props: className
    const appContext = React.useContext(PageSettings);
    const history = useHistory();
    const [confirmPassword, setConfirmPassword] = React.useState("");
    const [alertMessage, setAlertMessage] = React.useState("");
    const [errorAlert, setErrorAlert] = React.useState(false);
    const [expiredAlert, setExpiredAlert] = React.useState(false);

    const handleSubmit = event => {
        event.preventDefault();
        setErrorAlert(false);
        if (props.newPassword !== confirmPassword) {
            setAlertMessage("Passwords do not match.");
            setErrorAlert(true);
            return;
        }
        let requestBody = {
            email: props.userEmail,
            token: props.resetPasswordCode,
            newPassword: props.newPassword
        }
        props.axiosInstance.post(`${API_BASE_URL}/auth/resetPassword`, requestBody).then(response => {
            console.log(response);
            history.push("/user/login/forgot/reset-success");
        }).catch(error => {
            if (error.response) {
                if (error.response.data.message = "Expired code.") {
                    setExpiredAlert(true);
                    return;
                }
                else {
                    setAlertMessage("Something went wrong. Please try again later.");
                    setErrorAlert(true);
                }
            }
        })
    }

    return(
        <div className="slide-in mb-5 pb-5">
            <h1>{loginV3Text[appContext.locale]["Reset Your Password"]}</h1>
            <h3>{props.userEmail}</h3>
            <p>
                {loginV3Text[appContext.locale]["Please enter your new password below."]}
            </p>
            {errorAlert
                ? <Alert color="danger">{loginV3Text[appContext.locale][alertMessage]}</Alert>
                : null}
            {expiredAlert
                ?   <Alert color="danger">
                        {loginV3Text[appContext.locale]["This session has expired."]}
                        <br/>
                        <Link className="alert-link" to="/user/login/forgot/find-email">{loginV3Text[appContext.locale]["Please click here to restart this process."]}</Link>
                    </Alert>
                : null}
            <form onSubmit={event => handleSubmit(event)} className="mb-5 pb-5">
                <div className="form-group mb-3">
                    <input type="password" required className="form-control form-control-lg" placeholder={loginV3Text[appContext.locale]["Password"]} value={props.newPassword} onChange={event => props.setNewPassword(event.target.value)}/>
                </div>
                <div className="form-group mb-3">
                    <input type="password" required className="form-control form-control-lg" placeholder={loginV3Text[appContext.locale]["Confirm Password"]} value={confirmPassword} onChange={event => setConfirmPassword(event.target.value)}/>
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
        </div>
    )
}

export default ResetPassword;