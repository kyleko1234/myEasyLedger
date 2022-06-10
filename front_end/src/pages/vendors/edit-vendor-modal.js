import axios from 'axios';
import React from 'react';
import SweetAlert from 'react-bootstrap-sweetalert';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { PageSettings } from '../../config/page-settings';
import { API_BASE_URL } from '../../utils/constants';
import { accountDetailsEditorText } from '../../utils/i18n/account-details-editor-text';

function EditVendorModal({
    isOpen, toggle, modalOnClose, 
    selectedVendorId,
    vendorNameInput, setVendorNameInput,
    contactNameInput, setContactNameInput,
    emailInput, setEmailInput,
    fetchData
}) {
    const appContext = React.useContext(PageSettings);
    const [saveButtonTooltip, setSaveButtonTooltip] = React.useState(false);
    const [deleteButtonTooltip, setDeleteButtonTooltip] = React.useState(false);
    const [deleteVendorAlert, setDeleteVendorAlert] = React.useState(false);
    const [cannotDeleteVendorAlert, setCannotDeleteVendorAlert] = React.useState(false);
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
            email: emailInput
        }
        /* if (selectedVendorId === null) {
            postVendorToServer(requestBody);
        } else {
            putVendorToServer(requestBody);
        } */
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
            toggle();
        }).catch(() => {
            toggleDeleteAccountAlert();
            toggleCannotDeleteAccountAlert();
        });
    }
    
    const postVendorToServer = (requestBody) => {
        axios.post(`${API_BASE_URL}/vendor`, requestBody).then(response => {
            fetchData();
            toggle();
        });
    }
    const putVendorToServer = (requestBody) => {
        axios.put(`${API_BASE_URL}/vendor/${selectedVendorId}`, requestBody).then(response => {
            fetchData();
            toggle();
        });
    }

    return(
        <>
            <Modal 
                isOpen={isOpen} 
                toggle={toggle} 
                onClosed={modalOnClose} 
                centered={true} 
                className="very-rounded"
            >
                <ModalHeader>
                    Edit Vendor Details
                </ModalHeader>
                <ModalBody>
                    <form onSubmit={event => { event.preventDefault(); handleSaveButton() }}>
                        <div className="mb-3 row">
                            <label className="col-form-label col-md-4">
                                Vendor Name <span className="text-red">*</span>
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
                                Contact Name
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
                                Email
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
                    </form>
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
                            <button type="submit" className="btn btn-primary width-10ch" onClick={handleSaveButton} disabled={appContext.currentPermissionTypeId < 2 ? true : false}>
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
            </Modal>
            {deleteVendorAlert ?
                <SweetAlert primary showCancel
                    confirmBtnText={accountDetailsEditorText[appContext.locale]["Yes, delete it!"]}
                    confirmBtnBsStyle="danger"
                    cancelBtnBsStyle="default"
                    cancelBtnText={accountDetailsEditorText[appContext.locale]["Cancel"]}
                    title={accountDetailsEditorText[appContext.locale]["Are you sure?"]}
                    onConfirm={handleConfirmDeleteVendorButton}
                    onCancel={toggleDeleteVendorAlert}
                >
                    Are you sure you want to delete this vendor?
                </SweetAlert>
                : null}
            {cannotDeleteVendorAlert ?
                <SweetAlert danger showConfirm={false} showCancel={true}
                    cancelBtnBsStyle="default"
                    cancelBtnText={accountDetailsEditorText[appContext.locale]["Cancel"]}
                    title="Cannot delete this vendor."
                    onConfirm={toggleCannotDeleteVendorAlert}
                    onCancel={toggleCannotDeleteVendorAlert}
                >
                    Please remove all journal entries associated with this vendor and try again.
                </SweetAlert>
                : null}

        </>
    )
}

export default EditVendorModal;