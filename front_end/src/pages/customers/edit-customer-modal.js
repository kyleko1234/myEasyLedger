import axios from 'axios';
import React from 'react';
import SweetAlert from 'react-bootstrap-sweetalert';
import { Modal, ModalBody, ModalFooter, ModalHeader, Tooltip, Alert} from 'reactstrap';
import { PageSettings } from '../../config/page-settings';
import { API_BASE_URL } from '../../utils/constants';
import { accountDetailsEditorText } from '../../utils/i18n/account-details-editor-text';
import { customersText } from '../../utils/i18n/customers-text';
import { vendorsText } from '../../utils/i18n/vendors-text';

function EditCustomerModal({
    isOpen, toggle, 
    selectedCustomerId,
    customerNameInput, setCustomerNameInput,
    contactNameInput, setContactNameInput,
    emailInput, setEmailInput,
    phoneNumberInput, setPhoneNumberInput,
    fetchData
}) {
    const appContext = React.useContext(PageSettings);
    const [saveButtonTooltip, setSaveButtonTooltip] = React.useState(false);
    const [deleteButtonTooltip, setDeleteButtonTooltip] = React.useState(false);
    const [deleteCustomerAlert, setDeleteCustomerAlert] = React.useState(false);
    const [cannotDeleteCustomerAlert, setCannotDeleteCustomerAlert] = React.useState(false);
    const [noCustomerNameAlert, setNoCustomerNameAlert] = React.useState(false);
    const [duplicateCustomerNameAlert, setDuplicateCustomerNameAlert] = React.useState(false);
    const toggleDeleteCustomerAlert = () => {
        setDeleteCustomerAlert(!deleteCustomerAlert);
    }
    const toggleCannotDeleteCustomerAlert = () => {
        setCannotDeleteCustomerAlert(!cannotDeleteCustomerAlert);
    }
    const toggleSaveButtonTooltip = () => {
        setSaveButtonTooltip(!saveButtonTooltip);
    }
    const toggleDeleteButtonTooltip = () => {
        setDeleteButtonTooltip(!deleteButtonTooltip);
    }

    const handleSaveButton = () => {
        let requestBody = {
            customerId: selectedCustomerId,
            customerName: customerNameInput,
            contactName: contactNameInput,
            email: emailInput,
            phoneNumber: phoneNumberInput,
            organizationId: appContext.currentOrganizationId
        }
        if (!customerNameInput) {
            setNoCustomerNameAlert(true);
        } else {
            if (selectedCustomerId === null) {
                postCustomerToServer(requestBody);
            } else {
                putCustomerToServer(requestBody);
            }
        }
    }

    const handleDeleteButton = () => {
        setDeleteCustomerAlert(true);
    }
    const handleCancelButton = () => {
        toggle();
    }
    const handleConfirmDeleteCustomerButton = () => {
        axios.delete(`${API_BASE_URL}/customer/${selectedCustomerId}`).then(response => {
            console.log(response);
            fetchData();
            toggle();
            toggleDeleteCustomerAlert();
        }).catch(() => {
            toggleDeleteCustomerAlert();
            toggleCannotDeleteCustomerAlert();
        });
    }
    
    const postCustomerToServer = (requestBody) => {
        axios.post(`${API_BASE_URL}/customer`, requestBody).then(response => {
            fetchData();
            toggle();
        }).catch(error => {
            if (error.response) {
                console.log(error.response);
                if (error.response.status === 409) {
                    if (error.response.data.message = "Duplicate customer name.") {
                        setDuplicateCustomerNameAlert(true);
                    }
                }
            }
        });
    }
    const putCustomerToServer = (requestBody) => {
        axios.put(`${API_BASE_URL}/customer/${selectedCustomerId}`, requestBody).then(response => {
            fetchData();
            toggle();
        }).catch(error => {
            if (error.response) {
                console.log(error.response);
                if (error.response.status === 409) {
                    if (error.response.data.message = "Duplicate customer name.") {
                        setDuplicateCustomerNameAlert(true);
                    }
                }
            }
        });
    }

    const modalOnClosed = () => {
        setNoCustomerNameAlert(false);
        setDuplicateCustomerNameAlert(false);
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
                    {selectedCustomerId ? customersText[appContext.locale]["Edit Customer Details"] : customersText[appContext.locale]["Add a Customer"]}
                </ModalHeader>
                <ModalBody>
                    <Alert color="danger" isOpen={noCustomerNameAlert}>
                        {customersText[appContext.locale]["Please provide a customer name."]}
                    </Alert>
                    <Alert color="danger" isOpen={duplicateCustomerNameAlert}>
                        {customersText[appContext.locale]["A customer with this name already exists in this ledger."]}
                    </Alert>
                    <div>
                        <div className="mb-3 row">
                            <label className="col-form-label col-md-4">
                                {customersText[appContext.locale]["Customer Name"]}<span className="text-danger">*</span>
                            </label>
                            <div className="col-md-8">
                                <input
                                    disabled={appContext.currentPermissionTypeId < 2 ? true : false}
                                    className="form-control"
                                    value={customerNameInput}
                                    onChange={event => {
                                        setCustomerNameInput(event.target.value);
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
                                        console.log(emailInput);
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
                        {!selectedCustomerId
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
            <SweetAlert 
                show={deleteCustomerAlert}
                primary 
                showCancel
                confirmBtnText={accountDetailsEditorText[appContext.locale]["Yes, delete it!"]}
                confirmBtnBsStyle="danger"
                cancelBtnBsStyle="default"
                cancelBtnText={accountDetailsEditorText[appContext.locale]["Cancel"]}
                title={accountDetailsEditorText[appContext.locale]["Are you sure?"]}
                onConfirm={handleConfirmDeleteCustomerButton}
                onCancel={toggleDeleteCustomerAlert}
            >
                {customersText[appContext.locale]["Are you sure you want to delete this customer?"]}
            </SweetAlert>
            <SweetAlert 
                danger 
                show={cannotDeleteCustomerAlert}
                showConfirm={true} 
                showCancel={false}
                confirmBtnBsStyle="default"
                confirmBtnText={accountDetailsEditorText[appContext.locale]["Cancel"]}
                title={customersText[appContext.locale]["Cannot delete this customer."]}
                onConfirm={toggleCannotDeleteCustomerAlert}
                onCancel={toggleCannotDeleteCustomerAlert}
            >
                {customersText[appContext.locale]["Please remove all journal entries associated with this customer and try again."]}
            </SweetAlert>
        </>
    )
}

export default EditCustomerModal;