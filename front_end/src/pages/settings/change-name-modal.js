import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Alert } from 'reactstrap';
import axios from 'axios';
import { PageSettings } from '../../config/page-settings';
import { settingsText } from '../../utils/i18n/settings-text';
import { API_BASE_URL } from '../../utils/constants';

function ChangeNameModal(props) {
//required props: isOpen, toggle
    const appContext = React.useContext(PageSettings);
    const [firstNameInput, setFirstNameInput] = React.useState(appContext.firstName);
    const [lastNameInput, setLastNameInput] = React.useState(appContext.lastName);
    const [noNameAlert, setNoNameAlert] = React.useState(false);

    const handleSaveButton = async () => {
        setNoNameAlert(false);
        if (!firstNameInput && !lastNameInput) {
            setNoNameAlert(true);
            return;
        }
        let requestBody = {
            firstName: firstNameInput,
            lastName: lastNameInput,
        }
        await axios.patch(`${API_BASE_URL}/person/${appContext.personId}`, requestBody).then(response => {
            console.log(response);
        }).catch(console.log);
        await appContext.fetchUserInfo(appContext.personId);
        props.toggle();
    }

    const onModalClosed = () => {
        setFirstNameInput(appContext.firstName);
        setLastNameInput(appContext.lastName);
        setNoNameAlert(false);
    }

    return(
        <>
            <Modal isOpen={props.isOpen} toggle={props.toggle} centered={true} onClosed={onModalClosed}>
                <ModalHeader>
                    {settingsText[appContext.locale]["Change Name"]}
                </ModalHeader>
                <ModalBody>
                    {noNameAlert
                        ? <Alert color="danger">{settingsText[appContext.locale]["Please provide a first and last name."]}</Alert>
                        : null}
                    <form className="px-3 py-3" onSubmit={event => {event.preventDefault(); handleSaveButton();}}>
                        <div className="mb-3 row align-items-center">
                            <label className="col-4 mb-0">
                                {settingsText[appContext.locale]["First name"]}
                            </label>
                            <input className="form-control col-8" type="text" value={firstNameInput} onChange={event => setFirstNameInput(event.target.value)}/>
                        </div>
                        <div className="mb-3 row align-items-center">
                            <label className="col-4 mb-0">
                                {settingsText[appContext.locale]["Last name"]}
                            </label>
                            <input className="form-control col-8 " type="text" value={lastNameInput} onChange={event => setLastNameInput(event.target.value)}/>
                        </div>
                        <button style={{display: "none"}}>{/* A hacky solution to force the form to submit when the enter key is pressed. */}</button>
                    </form>
                </ModalBody>
                <ModalFooter>
                    <button className="btn btn-primary width-10ch" onClick={handleSaveButton}>{settingsText[appContext.locale]["Save"]}</button>
                    <button className="btn btn-white width-10ch" onClick={props.toggle}>{settingsText[appContext.locale]["Cancel"]}</button>
                </ModalFooter>
            </Modal>
        </>
    )
}

export default ChangeNameModal;

