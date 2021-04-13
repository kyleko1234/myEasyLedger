import React from 'react';
import {useHistory} from 'react-router-dom'
import { Modal, ModalHeader, ModalBody, ModalFooter, Alert } from 'reactstrap';
import axios from 'axios';
import { PageSettings } from '../../config/page-settings';
import { settingsText } from '../../utils/i18n/settings-text';
import { API_BASE_URL, ACCESS_TOKEN } from '../../utils/constants';
import SweetAlert from 'react-bootstrap-sweetalert';

function ChangePasswordModal(props) {
//required props: isOpen, toggle
    const appContext = React.useContext(PageSettings);
    const history = useHistory();
    const [currentPasswordInput, setCurrentPasswordInput] = React.useState('');
    const [newPasswordInput, setNewPasswordInput] = React.useState('');
    const [confirmNewPasswordInput, setConfirmNewPasswordInput] = React.useState('');
    const [matchingPasswordAlert, setMatchingPasswordAlert] = React.useState(false);
    const [incorrectPasswordAlert, setIncorrectPasswordAlert] = React.useState(false);
    const [loginAlert, setLoginAlert] = React.useState(false);

    const axiosChangePasswordInstance = axios.create(
        {headers: {'Authorization': "Bearer " + localStorage.getItem(ACCESS_TOKEN)}}
    ); //must use a new instance of axios to avoid being logged out when you provide an incorrect password

    const handleSaveButton = async () => {
        setMatchingPasswordAlert(false);
        setIncorrectPasswordAlert(false);
        if (newPasswordInput !== confirmNewPasswordInput) {
            setMatchingPasswordAlert(true);
            return;
        }
        let requestBody = {
            currentPassword: currentPasswordInput,
            newPassword: newPasswordInput,
            confirmNewPassword: confirmNewPasswordInput
        }
        await axiosChangePasswordInstance.patch(`${API_BASE_URL}/person/password`, requestBody).then(response => {
            console.log(response);
            setLoginAlert(true);
        }).catch(error => {
            if (error.response) {
                if (error.response.status === 401) {
                    setIncorrectPasswordAlert(true);
                } else if (error.response.status === 409) {
                    setMatchingPasswordAlert(true);
                }
            }
            console.log(error);
        })
    }

    const onModalClosed = () => {
        setCurrentPasswordInput('');
        setNewPasswordInput('');
        setConfirmNewPasswordInput('');
        setMatchingPasswordAlert(false);
        setIncorrectPasswordAlert(false);
    }

    return(
        <>
            <Modal isOpen={props.isOpen} toggle={props.toggle} centered={true} onClosed={onModalClosed}>
                <ModalHeader className="bg-light">
                    {settingsText[appContext.locale]["Change Password"]}
                </ModalHeader>
                <ModalBody>
                    {matchingPasswordAlert
                        ? <Alert color="danger">{settingsText[appContext.locale]["Passwords do not match."]}</Alert>
                        : null}
                    {incorrectPasswordAlert
                        ? <Alert color="danger">{settingsText[appContext.locale]["Current password is incorrect."]}</Alert>
                        : null}
                    <form className="px-3 py-3" onSubmit={event => {event.preventDefault(); handleSaveButton();}}>
                        <div className="form-group row">
                            <label className="col-md-4 col-form-label">
                                {settingsText[appContext.locale]["Current Password"]}
                            </label>
                            <input className="form-control col-md-7 m-l-5" type="password" value={currentPasswordInput} onChange={event => setCurrentPasswordInput(event.target.value)}/>
                        </div>
                        <div className="form-group row">
                            <label className="col-md-4 col-form-label">
                                {settingsText[appContext.locale]["New Password"]}
                            </label>
                            <input className="form-control col-md-7 m-l-5" type="password" value={newPasswordInput} onChange={event => setNewPasswordInput(event.target.value)}/>
                        </div>
                        <label className="form-group row">
                            <div className="col-md-4 col-form-label">
                                {settingsText[appContext.locale]["Confirm New Password"]}
                            </div>
                            <input className="form-control col-md-7 m-l-5" type="password" value={confirmNewPasswordInput} onChange={event => setConfirmNewPasswordInput(event.target.value)}/>
                        </label>
                        <button style={{display: "none"}}>{/* A hacky solution to force the form to submit when the enter key is pressed. */}</button>
                    </form>
                </ModalBody>
                <ModalFooter className="bg-light">
                    <button className="btn btn-primary width-10ch" onClick={handleSaveButton}>{settingsText[appContext.locale]["Save"]}</button>
                    <button className="btn btn-white width-10ch" onClick={props.toggle}>{settingsText[appContext.locale]["Cancel"]}</button>
                </ModalFooter>
            </Modal>
            {loginAlert ?
                <SweetAlert showConfirm 
                    confirmBtnText={settingsText[appContext.locale]["Take me to the login page!"]}
                    confirmBtnBsStyle="primary"
                    title={settingsText[appContext.locale]["Password successfully changed."]}
                    onConfirm={() => history.push("/user/logout")}
                    allowEscape={false}
                    closeOnClickOutside={false}
                >
                    {settingsText[appContext.locale]["Please log in again."]}
                </SweetAlert>
                : null}
        </>
    )
}

export default ChangePasswordModal;

