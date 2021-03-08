import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Alert } from 'reactstrap'
import axios from 'axios';
import { PageSettings } from '../../../config/page-settings';
import { API_BASE_URL } from '../../../utils/constants.js';
import Select from 'react-select';
import SweetAlert from 'react-bootstrap-sweetalert';
import { accountDetailsEditorText } from '../../../utils/i18n/account-details-editor-text.js';
import { useHistory } from 'react-router-dom';



function AccountDetailsEditor(props) {
    //required props: isOpen, toggle, selectedAccountId, fetchData, elementCount
    const appContext = React.useContext(PageSettings);
    const history = useHistory();

    const [accountNameInput, setAccountNameInput] = React.useState('');
    const [accountGroupOptions, setAccountGroupOptions] = React.useState([]);
    const [selectedAccountGroupId, setSelectedAccountGroupId] = React.useState(null);
    const [accountTypeId, setAccountTypeId] = React.useState(null);
    const [initialDebitValueInput, setInitialDebitValueInput] = React.useState(null);
    const [initialCreditValueInput, setInitialCreditValueInput] = React.useState(null);
    const [noAccountNameAlert, setNoAccountNameAlert] = React.useState(false);
    const [deleteAccountAlert, setDeleteAccountAlert] = React.useState(false);
    const [cannotDeleteAccountAlert, setCannotDeleteAccountAlert] = React.useState(false);
    const toggleDeleteAccountAlert = () => {
        setDeleteAccountAlert(!deleteAccountAlert);
    }
    const toggleCannotDeleteAccountAlert = () => {
        setCannotDeleteAccountAlert(!cannotDeleteAccountAlert);
    }

    React.useEffect(() => {
        async function fetchAccountData() {
            await axios.get(`${API_BASE_URL}/account/${props.selectedAccountId}`).then(response => {
                if (response.data) {
                    setAccountNameInput(response.data.accountName);
                    setAccountTypeId(response.data.accountTypeId);
                    setSelectedAccountGroupId(response.data.accountGroupId);
                    setInitialDebitValueInput(response.data.initialDebitAmount);
                    setInitialCreditValueInput(response.data.initialCreditAmount);
                }
            }).catch(console.log);
            await axios.get(`${API_BASE_URL}/organization/${appContext.currentOrganizationId}/accountGroup`).then(response => {
                if (response.data) {
                    setAccountGroupOptions(response.data.map(accountGroup => {
                        return ({
                            value: accountGroup.accountGroupId,
                            label: accountGroup.accountGroupName,
                            object: accountGroup
                        });
                    }));
                }
            })
        }
        fetchAccountData();
    }, [props.selectedAccountId, props.isOpen])

    const modalOnClose = () => {
        setNoAccountNameAlert(false);
    }
    const handleSaveButton = () => {
        let requestBody = {
            accountId: props.selectedAccountId,
            accountName: accountNameInput,
            accountGroupId: selectedAccountGroupId,
            initialDebitAmount: Number(initialDebitValueInput),
            initialCreditAmount: Number(initialCreditValueInput)
        }
        if (!accountNameInput) {
            setNoAccountNameAlert(true);
        } else {
            putAccountToServer(requestBody);
        }
    }
    const handleDeleteButton = () => {
        props.toggle();
        setDeleteAccountAlert(true);
    }
    const handleCancelButton = () => {
        props.toggle();
    }
    const handleConfirmDeleteAccountButton = () => {
        if (props.elementCount != 0) {
            toggleDeleteAccountAlert();
            toggleCannotDeleteAccountAlert();
        } else {
            axios.delete(`${API_BASE_URL}/account/${props.selectedAccountId}`).then(response => {
                console.log(response);
                if (appContext.isEnterprise) {
                    history.push("/chart-of-accounts");
                } else {
                    history.push("/accounts");
                }
            }).catch(console.log);
        }
    }
    const handleChangeAccountGroupOption = selectedOption => {
        setSelectedAccountGroupId(selectedOption.object.accountGroupId);
    }

    const putAccountToServer = (requestBody) => {
        axios.put(`${API_BASE_URL}/account/${props.selectedAccountId}`, requestBody).then(response => {
            console.log(response);
            props.fetchData();
            props.toggle();
        }).catch(console.log);
    }



    return (
        <>
            <Modal isOpen={props.isOpen} toggle={props.toggle} onClosed={modalOnClose} centered={true} >
                <ModalHeader className="bg-light">
                    {accountDetailsEditorText[appContext.locale]["Edit Account Details"]}
                </ModalHeader>
                <ModalBody>
                    {noAccountNameAlert ?
                        <Alert color="danger">
                            {accountDetailsEditorText[appContext.locale]["Please provide a name for your account."]}
                        </Alert>
                        : null}

                    <form onSubmit={event => { event.preventDefault(); handleSaveButton() }}>
                        <div className="form-group row">
                            <label className="col-form-label col-md-4">
                                {accountDetailsEditorText[appContext.locale]["Account Name"]}
                            </label>
                            <div className="col-md-8">
                                <input
                                    className="form-control"
                                    value={accountNameInput}
                                    onChange={event => {
                                        setAccountNameInput(event.target.value);
                                    }}
                                />
                            </div>
                        </div>
                    </form>
                    <div className="form-group row">
                        <label className="col-form-label col-md-4">
                            {accountDetailsEditorText[appContext.locale]["Account Group"]}
                        </label>
                        <div className="col-md-8">
                            <Select
                                options={accountGroupOptions.filter(accountGroupOption => accountGroupOption.object.accountTypeId == accountTypeId)}
                                value={accountGroupOptions.find(accountGroup => accountGroup.object.accountGroupId == selectedAccountGroupId)}
                                isSearchable={true}
                                onChange={handleChangeAccountGroupOption}
                            />
                        </div>
                    </div>
                    {appContext.isEnterprise? 
                    <form onSubmit={event => { event.preventDefault(); handleSaveButton() }}>
                        <div className="form-group row">
                            <label className="col-form-label col-md-4">
                                {accountDetailsEditorText[appContext.locale]["Initial Debit Value"]}
                            </label>
                            <div className="col-md-8">
                                <input
                                    type="number"
                                    className="form-control"
                                    value={initialDebitValueInput}
                                    onChange={event => {
                                        setInitialDebitValueInput(event.target.value);
                                    }}
                                />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="col-form-label col-md-4">
                                {accountDetailsEditorText[appContext.locale]["Initial Credit Value"]}
                            </label>
                            <div className="col-md-8">
                                <input
                                    type="number"
                                    className="form-control"
                                    value={initialCreditValueInput}
                                    onChange={event => {
                                        setInitialCreditValueInput(event.target.value);
                                    }}
                                />
                            </div>
                        </div>
                    </form> : null}
                </ModalBody>
                <ModalFooter className="bg-light justify-content-between">
                    <div>
                        <button className="btn btn-danger width-10ch" onClick={handleDeleteButton}>{accountDetailsEditorText[appContext.locale]["Delete"]}</button>
                    </div>
                    <div>
                        <button className="btn btn-primary width-10ch" onClick={handleSaveButton}>{accountDetailsEditorText[appContext.locale]["Save"]}</button>
                        <button className="btn btn-white width-10ch m-l-10" onClick={handleCancelButton}>{accountDetailsEditorText[appContext.locale]["Cancel"]}</button>
                    </div>
                </ModalFooter>
            </Modal>

            {deleteAccountAlert ?
                <SweetAlert primary showCancel
                    confirmBtnText={accountDetailsEditorText[appContext.locale]["Yes, delete it!"]}
                    confirmBtnBsStyle="primary"
                    cancelBtnBsStyle="default"
                    cancelBtnText={accountDetailsEditorText[appContext.locale]["Cancel"]}
                    title={accountDetailsEditorText[appContext.locale]["Are you sure?"]}
                    onConfirm={handleConfirmDeleteAccountButton}
                    onCancel={toggleDeleteAccountAlert}
                >
                    {accountDetailsEditorText[appContext.locale]["Are you sure you want to delete this account?"]}
                </SweetAlert>
                : null}
            {cannotDeleteAccountAlert ?
                <SweetAlert danger showConfirm={false} showCancel={true}
                    cancelBtnBsStyle="default"
                    cancelBtnText={accountDetailsEditorText[appContext.locale]["Cancel"]}
                    title={accountDetailsEditorText[appContext.locale]["Cannot delete this account."]}
                    onConfirm={toggleCannotDeleteAccountAlert}
                    onCancel={toggleCannotDeleteAccountAlert}
                >
                    {accountDetailsEditorText[appContext.locale]["Please remove all line items from this account and try again."]}
                </SweetAlert>
                : null}

        </>
    )
}

export default AccountDetailsEditor;