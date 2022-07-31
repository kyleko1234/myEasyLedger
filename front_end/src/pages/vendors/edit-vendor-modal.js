import axios from 'axios';
import React from 'react';
import SweetAlert from 'react-bootstrap-sweetalert';
import { Modal, ModalBody, ModalFooter, ModalHeader, Tooltip, Alert} from 'reactstrap';
import { PageSettings } from '../../config/page-settings';
import { API_BASE_URL } from '../../utils/constants';
import { accountDetailsEditorText } from '../../utils/i18n/account-details-editor-text';
import { vendorsText } from '../../utils/i18n/vendors-text';

function EditVendorModal({
    isOpen, toggle, 
    selectedVendorId,
    vendorNameInput, setVendorNameInput,
    contactNameInput, setContactNameInput,
    emailInput, setEmailInput,
    phoneNumberInput, setPhoneNumberInput,
    fetchData
}) {
    const appContext = React.useContext(PageSettings);
    const [saveButtonTooltip, setSaveButtonTooltip] = React.useState(false);
    const [deleteButtonTooltip, setDeleteButtonTooltip] = React.useState(false);
    const [deleteVendorAlert, setDeleteVendorAlert] = React.useState(false);
    const [cannotDeleteVendorAlert, setCannotDeleteVendorAlert] = React.useState(false);
    const [noVendorNameAlert, setNoVendorNameAlert] = React.useState(false);
    const [duplicateVendorNameAlert, setDuplicateVendorNameAlert] = React.useState(false);
    const toggleDeleteVendorAlert = () => {
        setDeleteVendorAlert(!deleteVendorAlert);
    }
    const toggleCannotDeleteVendorAlert = () => {
        setCannotDeleteVendorAlert(!cannotDeleteVendorAlert);
    }
    const toggleSaveButtonTooltip = () => {
        setSaveButtonTooltip(!saveButtonTooltip);
    }
    const toggleDeleteButtonTooltip = () => {
        setDeleteButtonTooltip(!deleteButtonTooltip);
    }

    const handleSaveButton = () => {
        let requestBody = {
            vendorId: selectedVendorId,
            vendorName: vendorNameInput,
            contactName: contactNameInput,
            email: emailInput,
            phoneNumber: phoneNumberInput,
            organizationId: appContext.currentOrganizationId
        }
        if (!vendorNameInput) {
            setNoVendorNameAlert(true);
        } else {
            if (selectedVendorId === null) {
                postVendorToServer(requestBody);
            } else {
                putVendorToServer(requestBody);
            }
        }
    }

    const handleDeleteButton = () => {
        toggle();
        setDeleteVendorAlert(true);
    }
    const handleCancelButton = () => {
        toggle();
    }
    const handleConfirmDeleteVendorButton = () => {
        axios.delete(`${API_BASE_URL}/vendor/${selectedVendorId}`).then(response => {
            console.log(response);
            fetchData();
            toggleDeleteVendorAlert();
        }).catch(() => {
            toggleDeleteVendorAlert();
            toggleCannotDeleteVendorAlert();
        });
    }
    
    const postVendorToServer = (requestBody) => {
        axios.post(`${API_BASE_URL}/vendor`, requestBody).then(response => {
            fetchData();
            toggle();
        }).catch(error => {
            if (error.response) {
                console.log(error.response);
                if (error.response.status === 409) {
                    if (error.response.data.message = "Duplicate vendor name.") {
                        setDuplicateVendorNameAlert(true);
                    }
                }
            }
        });
    }
    const putVendorToServer = (requestBody) => {
        axios.put(`${API_BASE_URL}/vendor/${selectedVendorId}`, requestBody).then(response => {
            fetchData();
            toggle();
        }).catch(error => {
            if (error.response) {
                console.log(error.response);
                if (error.response.status === 409) {
                    if (error.response.data.message = "Duplicate vendor name.") {
                        setDuplicateVendorNameAlert(true);
                    }
                }
            }
        });
    }

    const modalOnClosed = () => {
        setNoVendorNameAlert(false);
        setDuplicateVendorNameAlert(false);
    }

    return(
        <>
            <Modal 
                isOpen={isOpen} 
                toggle={toggle} 
                centered={true} 
                className="very-rounded"
                onClosed={modalOnClosed}
            >
                <form onSubmit={event => { event.preventDefault(); handleSaveButton() }}>
                <ModalHeader>
                    {selectedVendorId ? vendorsText[appContext.locale]["Edit Vendor Details"] : vendorsText[appContext.locale]["Add a Vendor"]}
                </ModalHeader>
                <ModalBody>
                    <Alert color="danger" isOpen={noVendorNameAlert}>
                        {vendorsText[appContext.locale]["Please provide a vendor name."]}
                    </Alert>
                    <Alert color="danger" isOpen={duplicateVendorNameAlert}>
                        {vendorsText[appContext.locale]["A vendor with this name already exists in this ledger."]}
                    </Alert>
                    <div>
                        <div className="mb-3 row">
                            <label className="col-form-label col-md-4">
                                {vendorsText[appContext.locale]["Vendor Name"]}<span className="text-danger">*</span>
                            </label>
                            <div className="col-md-8">
                                <input
                                    disabled={appContext.currentPermissionTypeId < 2 ? true : false}
                                    className="form-control"
                                    value={vendorNameInput}
                                    onChange={event => {
                                        setVendorNameInput(event.target.value);
                                    }}
                                    required
                                />
                            </div>
                        </div>
                        <div className="mb-3 row">
                            <label className="col-form-label col-md-4">
                                {vendorsText[appContext.locale]["Contact Name"]}
                            </label>
                            <div className="col-md-8">
                                <input
                                    disabled={appContext.currentPermissionTypeId < 2 ? true : false}
                                    className="form-control"
                                    value={contactNameInput}
                                    onChange={event => {
                                        setContactNameInput(event.target.value);
                                    }}
                                />
                            </div>
                        </div>
                        <div className="mb-3 row">
                            <label className="col-form-label col-md-4">
                                {vendorsText[appContext.locale]["Email"]}
                            </label>
                            <div className="col-md-8">
                                <input
                                    disabled={appContext.currentPermissionTypeId < 2 ? true : false}
                                    className="form-control"
                                    value={emailInput}
                                    onChange={event => {
                                        setEmailInput(event.target.value);
                                    }}
                                />
                            </div>
                        </div>
                        <div className=" row">
                            <label className="col-form-label col-md-4">
                                {vendorsText[appContext.locale]["Phone Number"]}
                            </label>
                            <div className="col-md-8">
                                <input
                                    disabled={appContext.currentPermissionTypeId < 2 ? true : false}
                                    className="form-control"
                                    value={phoneNumberInput}
                                    onChange={event => {
                                        setPhoneNumberInput(event.target.value);
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter className="justify-content-between">
                    <div id="delete-button">
                        {!selectedVendorId
                            ? null 
                            : <div>
                                <button type="button" className="btn btn-danger width-10ch" onClick={handleDeleteButton} disabled={appContext.currentPermissionTypeId < 2 ? true : false}>
                                    {accountDetailsEditorText[appContext.locale]["Delete"]}
                                </button>
                            </div>
                        }
                    </div>
                    <div>
                        <div id="save-button" className="d-inline-block">
                            <button type="submit" className="btn btn-primary width-10ch" disabled={appContext.currentPermissionTypeId < 2 ? true : false}>
                                {accountDetailsEditorText[appContext.locale]["Save"]}
                            </button>
                        </div>
                        <button type="button" className="btn btn-white width-10ch ms-2" onClick={handleCancelButton}>
                            {accountDetailsEditorText[appContext.locale]["Cancel"]}
                        </button>
                    </div>
                    {/** Tooltip component must be placed inside the modal component, otherwise react will render the tooltip before the targets and the app will crash.*/}
                    {appContext.currentPermissionTypeId < 2
                        ? <Tooltip 
                            target="delete-button" 
                            isOpen={deleteButtonTooltip} 
                            toggle={toggleDeleteButtonTooltip}
                            fade={false}
                        >
                            {accountDetailsEditorText[appContext.locale]["This action requires EDIT permissions for this ledger."]}
                        </Tooltip>
                        : null
                    }
                    {appContext.currentPermissionTypeId < 2
                        ? <Tooltip 
                            target="save-button" 
                            isOpen={saveButtonTooltip} 
                            toggle={toggleSaveButtonTooltip}
                            fade={false}
                        >
                            {accountDetailsEditorText[appContext.locale]["This action requires EDIT permissions for this ledger."]}
                        </Tooltip>
                        : null
                    }
                </ModalFooter>
                </form>
            </Modal>
            {deleteVendorAlert 
                ? <SweetAlert primary showCancel
                    confirmBtnText={accountDetailsEditorText[appContext.locale]["Yes, delete it!"]}
                    confirmBtnBsStyle="danger"
                    cancelBtnBsStyle="default"
                    cancelBtnText={accountDetailsEditorText[appContext.locale]["Cancel"]}
                    title={accountDetailsEditorText[appContext.locale]["Are you sure?"]}
                    onConfirm={handleConfirmDeleteVendorButton}
                    onCancel={toggleDeleteVendorAlert}
                >
                    {vendorsText[appContext.locale]["Are you sure you want to delete this vendor?"]}
                </SweetAlert>
                : null
            }
            {cannotDeleteVendorAlert 
                ? <SweetAlert danger showConfirm={false} showCancel={true}
                    cancelBtnBsStyle="default"
                    cancelBtnText={accountDetailsEditorText[appContext.locale]["Cancel"]}
                    title={vendorsText[appContext.locale]["Cannot delete this vendor."]}
                    onConfirm={toggleCannotDeleteVendorAlert}
                    onCancel={toggleCannotDeleteVendorAlert}
                >
                    {vendorsText[appContext.locale]["Please remove all journal entries associated with this vendor and try again."]}
                </SweetAlert>
                : null
            }

        </>
    )
}

export default EditVendorModal;