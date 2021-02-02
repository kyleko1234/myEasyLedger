import React from 'react';
import { PageSettings } from '../../../config/page-settings';
import {Link, useHistory} from 'react-router-dom';
import { Modal, ModalHeader, ModalBody, ModalFooter, Alert } from 'reactstrap';
import SweetAlert from 'react-bootstrap-sweetalert';
import Select from 'react-select';
import axios from 'axios';
import {API_BASE_URL} from '../../../utils/constants';
import {accountDetailsSidebarText} from '../../../utils/i18n/account-details-sidebar-text.js';

function AccountDetailsSidebar(props) {
    /*  required props: accountId, accountName, accountGroupId, accountGroupName, debitTotal, creditTotal, accountTypeName, 
        accountGroupOptions, refreshAccountData, elementCount
        If spreading an accountBalance object from the api into props, you'll need {...account}, accountGroupOptions, refreshAccountData, elementCount */

    const appContext = React.useContext(PageSettings);
    const history = useHistory();

    const [accountNameInput, setAccountNameInput] = React.useState(props.accountName);
    const [selectedAccountGroupOption, setSelectedAccountGroupOption] = React.useState(props.accountGroupOptions.find(accountGroupOption => accountGroupOption.object.accountGroupId == props.accountGroupId));
    
    const [editAccountModal, setEditAccountModal] = React.useState(false);
    const [noAccountNameAlert, setNoAccountNameAlert] = React.useState(false);
    
    const [deleteAccountAlert, setDeleteAccountAlert] = React.useState(false);
    const toggleDeleteAccountAlert = () => {
        setDeleteAccountAlert(!deleteAccountAlert);
    }
    const [cannotDeleteAccountAlert, setCannotDeleteAccountAlert] = React.useState(false);
    const toggleCannotDeleteAccountAlert = () => {
        setCannotDeleteAccountAlert(!cannotDeleteAccountAlert);
    }


    /** Begin utils for 'edit account' form */
    const toggleEditAccountModal = () => {
        setEditAccountModal(!editAccountModal);
        setAccountNameInput(props.accountName)
        setSelectedAccountGroupOption(props.accountGroupOptions.find(accountGroupOption => accountGroupOption.object.accountGroupId == props.accountGroupId));
        setNoAccountNameAlert(false);
    }

    const handleChangeAccountGroupOption = (selectedOption) => {
        setSelectedAccountGroupOption(selectedOption);
    }

    const handleSaveEditAccount = async () => {
        if (!accountNameInput) {
            setNoAccountNameAlert(true);
        }
        let postedObject = {
            accountId: props.accountId,
            accountName: accountNameInput,
            accountGroupId: selectedAccountGroupOption.object.accountGroupId
        }
        if (accountNameInput) {
            await putAccount(postedObject);
            await props.refreshAccountData();
            toggleEditAccountModal();
        }
    }
    /** End utils for 'edit account' form */


    /** Begin utils for deleting account */
    const handleConfirmDeleteAccountButton = async () => {
        if (props.elementCount != 0) {
            toggleDeleteAccountAlert();
            toggleCannotDeleteAccountAlert();
        } else {
            deleteAccount(props.accountId);
        }
    }
    /** End utils for deleting account */


    /** Begin API calls */
    const putAccount = async (account) => {
        axios.put(`${API_BASE_URL}/account/${account.accountId}`, account).then(response => {
            console.log(response);
        }).catch(console.log);
    }

    const deleteAccount = async (accountId) => {
        axios.delete(`${API_BASE_URL}/account/${accountId}`).then(response => {
            console.log(response);
            history.push("/chart-of-accounts");
        }).catch(console.log);
    } 
    /** End API calls */

    
    const formatCurrency = number => {
        return new Intl.NumberFormat(appContext.locale, { style: 'currency', currency: appContext.currency }).format(number);
    }

    return (
        <div className="widget widget-rounded mb-3">
            <div className="widget-header bg-light border-bottom">
                <h4 className="widget-header-title">{accountDetailsSidebarText[appContext.locale]["Account Details"]}</h4>
                <div className="widget-header-icon">
                    <Link replace to="#" onClick={toggleEditAccountModal} className="icon-link-text-muted"><i className="fas fa-fw fa-edit"></i></Link>
                </div>
                <div className="widget-header-icon">
                    <Link replace to="#" onClick={toggleDeleteAccountAlert} className="icon-link-text-muted"><i className="fas fa-fw fa-trash-alt"></i></Link>
                </div>

            </div>
            <div className="px-2">
                <table className="table table-nested">
                    <tbody>
                        <tr>
                            <td>{accountDetailsSidebarText[appContext.locale]["Account Name:"]}</td>
                            <td>{props.accountName}</td>
                        </tr>
                        <tr>
                            <td>{accountDetailsSidebarText[appContext.locale]["Account Group:"]}</td>
                            <td>{props.accountGroupName}</td>
                        </tr>
                        <tr>
                            <td>{accountDetailsSidebarText[appContext.locale]["Account Type:"]}</td>
                            <td>{props.accountTypeName}</td>
                        </tr>
                        <tr>
                            <td>{accountDetailsSidebarText[appContext.locale]["Total Debit Amount:"]}</td>
                            <td>{formatCurrency(props.debitTotal)}</td>
                        </tr>
                        <tr>
                            <td>{accountDetailsSidebarText[appContext.locale]["Total Credit Amount:"]}</td>
                            <td>{formatCurrency(props.creditTotal)}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <Modal isOpen={editAccountModal} toggle={toggleEditAccountModal} centered={true}>
                <ModalHeader>{accountDetailsSidebarText[appContext.locale]["Edit Account Details"]}</ModalHeader>
                <ModalBody>
                    {
                        noAccountNameAlert ?
                            <Alert color="danger">
                                {accountDetailsSidebarText[appContext.locale]["Please provide a name for your account."]}
                            </Alert>
                            : null
                    }
                    <form onSubmit={event => { event.preventDefault(); handleSaveEditAccount() }}>
                        <div className="form-group row">
                            <label className="col-form-label col-md-3">
                                {accountDetailsSidebarText[appContext.locale]["Account Name"]}
                            </label>
                            <div className="col-md-9">
                                <input
                                    className="form-control"
                                    value={accountNameInput}
                                    onChange={event => {
                                        setAccountNameInput(event.target.value);
                                    }}
                                />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="col-form-label col-md-3">
                                {accountDetailsSidebarText[appContext.locale]["Account Group"]}
                            </label>
                            <div className="col-md-9">
                                <Select
                                    options={props.accountGroupOptions}
                                    value={selectedAccountGroupOption}
                                    isSearchable={true}
                                    onChange={handleChangeAccountGroupOption}
                                />
                            </div>
                        </div>
                    </form>
                </ModalBody>
                <ModalFooter>
                    <button
                        className="btn btn-primary width-10ch"
                        onClick={handleSaveEditAccount}
                    >
                        {accountDetailsSidebarText[appContext.locale]["Save"]}
                    </button>
                    <button
                        className="btn btn-white width-10ch"
                        onClick={toggleEditAccountModal}
                    >
                        {accountDetailsSidebarText[appContext.locale]["Cancel"]}
                    </button>
                </ModalFooter>
            </Modal>

            {deleteAccountAlert ? 
                <SweetAlert primary showCancel
                    confirmBtnText={accountDetailsSidebarText[appContext.locale]["Yes, delete it!"]}
                    confirmBtnBsStyle="primary"
                    cancelBtnBsStyle="default"
                    cancelBtnText={accountDetailsSidebarText[appContext.locale]["Cancel"]}
                    title={accountDetailsSidebarText[appContext.locale]["Are you sure?"]}
                    onConfirm={() => handleConfirmDeleteAccountButton()}
                    onCancel={() => toggleDeleteAccountAlert()}
                >
                    {accountDetailsSidebarText[appContext.locale]["Are you sure you want to delete this account?"]}
                </SweetAlert> 
            : null}
            {cannotDeleteAccountAlert ? 
                <SweetAlert danger showConfirm={false} showCancel={true}
                    cancelBtnBsStyle="default"
                    cancelBtnText={accountDetailsSidebarText[appContext.locale]["Cancel"]}
                    title={accountDetailsSidebarText[appContext.locale]["Cannot delete this account."]}
                    onConfirm={() => toggleCannotDeleteAccountAlert()}
                    onCancel={() => toggleCannotDeleteAccountAlert()}
                >
                    {accountDetailsSidebarText[appContext.locale]["Please remove all line items from this account and try again."]}
                </SweetAlert> 
            : null}

        </div>
    )
}

export default AccountDetailsSidebar