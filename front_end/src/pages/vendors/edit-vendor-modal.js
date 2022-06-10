import React from 'react';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { PageSettings } from '../../config/page-settings';

function EditVendorModal({
    isOpen, toggle, modalOnClose, 
    selectedVendorId,
    vendorNameInput, setVendorNameInput,
    contactNameInput, setContactNameInput,
    emailInput, setEmailInput
}) {
    const appContext = React.useContext(PageSettings);
    const handleSaveButton = () => {

    };
    const handleDeleteButton = () => {

    }
    const handleCancelButton = () => {
        
    }

    return(
        <Modal 
            isOpen={isOpen} 
            toggle={toggle} 
            onClosed={modalOnClose} 
            centered={true} 
            className="very-rounded"
        >
            <ModalHeader>
                Edit Vendor
            </ModalHeader>
            <ModalBody>
                <form onSubmit={event => { event.preventDefault(); handleSaveButton() }}>
                    <div className="mb-3 row">
                        <label className="col-form-label col-md-4">
                            Vendor Name
                        </label>
                        <div className="col-md-8">
                            <input
                                disabled={appContext.currentPermissionTypeId < 2 ? true : false}
                                className="form-control"
                                value={vendorNameInput}
                                onChange={event => {
                                    setVendorNameInput(event.target.value);
                                }}
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
                            <button className="btn btn-danger width-10ch" onClick={handleDeleteButton} disabled={appContext.currentPermissionTypeId < 2 ? true : false}>
                                {accountDetailsEditorText[appContext.locale]["Delete"]}
                            </button>
                        </div>
                    }
                </div>
                <div>
                    <div id="save-button" className="d-inline-block">
                        <button className="btn btn-primary width-10ch" onClick={handleSaveButton} disabled={appContext.currentPermissionTypeId < 2 ? true : false}>
                            {accountDetailsEditorText[appContext.locale]["Save"]}
                        </button>
                    </div>
                    <button className="btn btn-white width-10ch ms-2" onClick={handleCancelButton}>{accountDetailsEditorText[appContext.locale]["Cancel"]}</button>
                </div>
            </ModalFooter>
        </Modal>
    )
}

export default EditVendorModal;