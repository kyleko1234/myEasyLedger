import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Alert, Modal, ModalHeader, ModalBody, ModalFooter, TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import { API_BASE_URL } from '../../utils/constants.js';
import { PageSettings } from '../../config/page-settings.js';
import Select from 'react-select';
import SweetAlert from 'react-bootstrap-sweetalert';
import { chartOfAccountsText } from '../../utils/i18n/chart-of-accounts-text.js';
import ToggleMobileSidebarButton from '../../components/sidebar/toggle-mobile-sidebar-button';



class Accounts extends React.Component {
    /** Renders a Chart of Accounts. This component uses pills tabs for the different account types. The url param this.props.match.params.activeTabId indicates the current open tab, in order for tab history to be preserved.
     *  this.props.match.params.activeTabId should always match the accountType.id of the accountType being currently viewed. 
    */
    static contextType = PageSettings;

    constructor(props) {
        super(props);
        this.state = {
            accounts: [],
            accountGroups: [],
            accountTypes: [],

            editAccountGroupModal: false,
            accountGroupNameAlert: false,
            selectedAccountGroupId: null,
            accountGroupNameInput: '',
            editAccountGroup: false, //when true, editAccountGroupModal will have 'edit' in title instead of 'create new'

            accountTypeOptions: [], //for react-select; accountTypes are formatted as {value: accountType.id, label: accountType.name, object: accountType}
            disableChangeAccountType: false, // disables the react-select field for changing an account group's account type

            selectedAccountTypeOption: null,

            deleteAccountGroupAlert: false,
            cannotDeleteAccountGroupAlert: false,

            addAnAccountModal: false,
            accountNameAlert: false,
            accountNameInput: ''
        };

        this.handleChangeAccountTypeOption = this.handleChangeAccountTypeOption.bind(this);

        this.handleConfirmDeleteAccountGroupButton = this.handleConfirmDeleteAccountGroupButton.bind(this);
        this.toggleDeleteAccountGroupAlert = this.toggleDeleteAccountGroupAlert.bind(this);
        this.toggleCannotDeleteAccountGroupAlert = this.toggleCannotDeleteAccountGroupAlert.bind(this);
        this.setEditAccountGroupFalse = this.setEditAccountGroupFalse.bind(this);

    }

    componentDidMount() {
        this.fetchData();
    }

    componentDidUpdate(prevProps) {
        if (this.props.match.params.activeTabId !== prevProps.match.params.activeTabId) {
            this.setState({ selectedAccountTypeOption: this.state.accountTypeOptions.find(accountTypeOption => accountTypeOption.value == this.props.match.params.activeTabId) })
        }
    }

    fetchData() {
        axios.get(`${API_BASE_URL}/accountType`).then(response => {
            let assetsAndLiabilitiesAccountTypeIds = [1, 2];
            let assetsAndLiabilitiesAccountTypes = response.data.filter(accountType => assetsAndLiabilitiesAccountTypeIds.includes(accountType.id));
            this.setState({ accountTypes: assetsAndLiabilitiesAccountTypes });
            if (response.data) {
                let formattedAccountTypes = assetsAndLiabilitiesAccountTypes.map(accountType => ({ value: accountType.id, label: chartOfAccountsText[this.context.locale][accountType.name], object: accountType }))
                this.setState({ accountTypeOptions: formattedAccountTypes, selectedAccountTypeOption: formattedAccountTypes.find(formattedAccountType => formattedAccountType.object.id == this.props.match.params.activeTabId) })
            }
        })
        axios.get(`${API_BASE_URL}/organization/${this.context.currentOrganizationId}/accountGroup`).then(response => {
            this.setState({ accountGroups: response.data });
        })
        axios.get(`${API_BASE_URL}/organization/${this.context.currentOrganizationId}/account`).then(response => {
            this.setState({ accounts: response.data });
        }).catch(console.log);
    }

    /** Utility functions for adding/editing account group */
    handleAddAnAccountGroupButton() { //adding a fresh account group uses the default empty fields for all inputs
        this.toggleEditAccountGroupModal();
    }

    handleEditAccountGroupButton(accountGroup) {
        //editing an account group prepopulates form fields with data for the selected account group, and disables the field for editing account type.
        //this function should only be called when opening the modal form for editing an account group. the modal should be closed by resetting all fields using toggleEditAccountGroupModal()
        this.setState(state => (
            {
                selectedAccountGroupId: accountGroup.accountGroupId,
                accountGroupNameInput: accountGroup.accountGroupName,
                selectedAccountTypeOption: state.accountTypeOptions.find(accountTypeOption => accountTypeOption.object.id == accountGroup.accountTypeId),
                disableChangeAccountType: true,
                accountGroupNameAlert: false,
                editAccountGroupModal: true,
                editAccountGroup: true
            }
        ))
    }

    toggleEditAccountGroupModal() { //toggling the modal for adding/editing account groups resets all input fields for the form.
        this.setState(state => (
            {
                selectedAccountGroupId: null, //this field is used in more than one operation so it is imperative to nullify selectedAccountGroupId on toggle
                accountGroupNameInput: "",
                selectedAccountTypeOption: state.accountTypeOptions.find(accountTypeOption => accountTypeOption.object.id == this.props.match.params.activeTabId),
                disableChangeAccountType: false,
                accountGroupNameAlert: false,
                editAccountGroupModal: !state.editAccountGroupModal,
            }));
    }

    setEditAccountGroupFalse() { //called after modal transitions out. ensures that title does not change until modal is done transitioning.
        this.setState(state => (
            {editAccountGroup: false}
        ))
    }

    handleChangeAccountTypeOption(selectedAccountTypeOption) {
        this.setState({ selectedAccountTypeOption: selectedAccountTypeOption });
    }

    async handleSaveAnAccountGroupButton() {
        if (!this.state.accountGroupNameInput) {
            this.setState({ accountGroupNameAlert: true });
        }

        if (this.state.accountGroupNameInput) {
            if (!this.state.selectedAccountGroupId) {
                let postedObject = {
                    accountGroupName: this.state.accountGroupNameInput,
                    accountSubtypeId: this.state.selectedAccountTypeOption.value == 1 ? 5 : 15, //hardcode; for single-entry (personal) organizations, we shove all asset account groups into 'other current assets' and all liabilities into 'other current liabilities'
                    organizationId: this.context.currentOrganizationId
                };
                await this.postAccountGroup(postedObject);
                this.toggleEditAccountGroupModal();
            } else {
                let putObject = {
                    accountGroupId: this.state.selectedAccountGroupId,
                    accountGroupName: this.state.accountGroupNameInput,
                    accountSubtypeId: this.state.selectedAccountTypeOption.value == 1 ? 5 : 15,
                    organizationId: this.context.currentOrganizationId
                };
                await this.putAccountGroup(this.state.selectedAccountGroupId, putObject);
                this.toggleEditAccountGroupModal();
            }
        }
    }
    /** End utility functions for adding/editing account group */

    /** Utility functions for deleting account group */
    toggleDeleteAccountGroupAlert() {
        this.setState(state => ({ deleteAccountGroupAlert: !state.deleteAccountGroupAlert }));
    }

    toggleCannotDeleteAccountGroupAlert() {
        this.setState(state => ({ cannotDeleteAccountGroupAlert: !state.cannotDeleteAccountGroupAlert }))
    }

    handleDeleteAccountGroupButton(accountGroup) {
        this.setState(state => ({ selectedAccountGroupId: accountGroup.accountGroupId }));
        this.toggleDeleteAccountGroupAlert();
    }

    async handleConfirmDeleteAccountGroupButton() {
        if (this.state.accounts.filter(account => account.accountGroupId == this.state.selectedAccountGroupId).length !== 0) {
            this.toggleDeleteAccountGroupAlert();
            this.toggleCannotDeleteAccountGroupAlert();
        } else {
            await this.deleteAccountGroup(this.state.selectedAccountGroupId);
            this.toggleDeleteAccountGroupAlert();
        }
    }
    /** End utility functions for deleting account group */

    /** Utility functions for adding account to account group */
    toggleAddAnAccountModal() {
        this.setState(state => ({ addAnAccountModal: !state.addAnAccountModal, accountNameInput: '', accountNameAlert: false }))
    }

    handleAddAnAccountToAccountGroupButton(accountGroup) {
        this.setState(state => ({ selectedAccountGroupId: accountGroup.accountGroupId }));
        this.toggleAddAnAccountModal();
    }

    async handleSaveNewAccount() {
        let postedObject = {
            accountName: this.state.accountNameInput,
            accountGroupId: this.state.selectedAccountGroupId,
            initialDebitAmount: 0,
            initialCreditAmount: 0
        }
        await this.postAccount(postedObject);
        this.toggleAddAnAccountModal();
    }

    /** End utility functions for adding account to account group */


    /** api calls for posting/putting/deleting objects to server */
    async postAccountGroup(accountGroup) {
        axios.post(`${API_BASE_URL}/accountGroup`, accountGroup).then(response => {
            console.log(response);
            this.fetchData();
        }).catch(error => {
            console.log(error);
        });
    }

    async putAccountGroup(accountGroupId, accountGroup) {
        axios.put(`${API_BASE_URL}/accountGroup/${accountGroupId}`, accountGroup).then(response => {
            console.log(response);
            this.fetchData();
        }).catch(error => {
            console.log(error);
        });
    }

    async deleteAccountGroup(accountGroupId) {
        axios.delete(`${API_BASE_URL}/accountGroup/${accountGroupId}`).then(response => {
            console.log(response);
            this.fetchData();
        }).catch(error => {
            console.log(error);
        });
    }

    async postAccount(account) {
        axios.post(`${API_BASE_URL}/account`, account).then(response => {
            console.log(response);
            this.fetchData();
        }).catch(error => {
            console.log(error);
        });
    }
    /** End api calls */

    render() {
        return (
            <div>
                <ol className="breadcrumb float-xl-right">
                    <li className="breadcrumb-item"><Link to="/">{chartOfAccountsText[this.context.locale]["Home"]}</Link></li>
                    <li className="breadcrumb-item active">{chartOfAccountsText[this.context.locale]["Accounts"]}</li>
                </ol>
                <h1 className="page-header">
                    {chartOfAccountsText[this.context.locale]["Accounts"]}
                    <ToggleMobileSidebarButton className="d-md-none float-right " />
                </h1>
                <Nav pills justified className="d-block">
                    {!this.state.accountTypes ? <div className="d-flex justify-content-center fa-3x py-3"><i className="fas fa-circle-notch fa-spin"></i></div> :
                        <div className="d-flex justify-content-between px-3 mb-3">
                            <div className="row ">
                                {this.state.accountTypes.map(accountType => { //render a pills navlink for each accountType returned by the server, with the active accountType being the one that has an id that matches the url param.
                                    return (
                                        <NavItem key={accountType.id}>
                                            <NavLink
                                                className={this.props.match.params.activeTabId == accountType.id ? "active" : "cursor-pointer"}
                                                onClick={() => this.props.history.push(`/accounts/${accountType.id}`)}
                                            >
                                                <span className="d-sm-block px-3">{chartOfAccountsText[this.context.locale][accountType.name]}</span>
                                            </NavLink>
                                        </NavItem>
                                    );
                                })}

                            </div>
                            <button
                                className="btn btn-primary my-1 ml-3"
                                onClick={() => {
                                    this.handleAddAnAccountGroupButton();
                                }}
                            > {chartOfAccountsText[this.context.locale]["Create an account group"]} </button>
                        </div>
                    }
                </Nav>
                <TabContent activeTab={this.props.match.params.activeTabId} className="widget widget-rounded widget-list widget-list-rounded m-b-30"> {/** active tab is the tab with an activeTabId that matches the url path parameter*/}
                    {!this.state.accountTypes ? <div className="d-flex justify-content-center fa-3x py-3"><i className="fas fa-circle-notch fa-spin"></i></div> :
                        this.state.accountTypes.map(accountType => {
                            return (
                                <TabPane tabId={accountType.id.toString()} key={accountType.id.toString()}>
                                    {this.state.accountGroups.filter(accountGroup => accountGroup.accountTypeId == accountType.id).map(accountGroup => { // render a bg-light accountgroup widget list item for each accountGroup in this accountType, then render all of the accounts for at accountGroup
                                        return (
                                            <React.Fragment key={accountGroup.accountGroupId}>
                                                <div className="widget-list-item bg-light">
                                                    <div className="widget-list-content d-flex justify-content-between align-items-center">
                                                        <h4 className="widget-list-title">{accountGroup.accountGroupName}</h4>
                                                        <div>
                                                            <Link replace className="icon-link-text-muted m-l-15" to="#" onClick={() => this.handleAddAnAccountToAccountGroupButton(accountGroup)}>
                                                                <i className="fa fa-plus"></i>
                                                            </Link>
                                                            <Link replace className="icon-link-text-muted m-l-15" to="#" onClick={() => this.handleEditAccountGroupButton(accountGroup)}>
                                                                <i className="fa fa-edit"></i>
                                                            </Link>
                                                            <Link replace className="icon-link-text-muted m-l-15" to="#" onClick={() => this.handleDeleteAccountGroupButton(accountGroup)}>
                                                                <i className="fa fa-trash-alt"></i>
                                                            </Link>
                                                        </div>


                                                    </div>
                                                </div>
                                                {!this.state.accounts ? null : this.state.accounts.filter(account => account.accountGroupId == accountGroup.accountGroupId).map(account => {
                                                    return (
                                                        <Link className="widget-list-item bg-white" to={`/account-details/${account.accountId}`} key={account.accountId.toString()}>
                                                            <div className="widget-list-content p-l-30">
                                                                <div className="widget-list-title">{account.accountName}</div>
                                                            </div>
                                                            <div className="m-r-10 widget-list-action text-right">
                                                                <i className="fa fa-angle-right fa-lg text-muted"></i>
                                                            </div>
                                                        </Link>
                                                    );
                                                })}
                                            </React.Fragment>
                                        );
                                    })}
                                </TabPane>
                            );
                        })
                    }
                </TabContent>

                <Modal isOpen={this.state.editAccountGroupModal} toggle={() => this.toggleEditAccountGroupModal()} centered={true} onClosed={this.setEditAccountGroupFalse}>
                    <ModalHeader> {this.state.editAccountGroup? chartOfAccountsText[this.context.locale]["Edit Account Group Details"] : chartOfAccountsText[this.context.locale]["Create a New Account Group"]} </ModalHeader>
                    <ModalBody>
                        {this.state.accountGroupNameAlert ? <Alert color="danger">{chartOfAccountsText[this.context.locale]["Please provide a name for your account group."]}</Alert> : null}
                        <form onSubmit={event => { event.preventDefault(); this.handleSaveAnAccountGroupButton() }}>
                            <div className="form-group row">
                                <label className="col-md-4 col-form-label">
                                    {chartOfAccountsText[this.context.locale]["Account Group Name"]}
                                </label>
                                <div className="col-md-8">
                                    <input type="text" className="form-control"
                                        value={this.state.accountGroupNameInput}
                                        onChange={event => this.setState({ accountGroupNameInput: event.target.value })}
                                    />
                                </div>
                            </div>
                        </form>
                        <div className="form-group row">
                            <label className="col-md-4 col-form-label">
                                {chartOfAccountsText[this.context.locale]["Account Type"]}
                            </label>
                            {!this.state.selectedAccountTypeOption ? <div className="d-flex justify-content-center fa-3x py-3"><i className="fas fa-circle-notch fa-spin"></i></div> :
                                <div className="col-md-8">
                                    <Select
                                        options={this.state.accountTypeOptions}
                                        value={this.state.selectedAccountTypeOption}
                                        isSearchable={true}
                                        isDisabled={this.state.disableChangeAccountType}
                                        onChange={this.handleChangeAccountTypeOption}
                                    />
                                    {/**TODO: style the SELECT components to match form-control */}
                                </div>
                            }
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <button className="btn btn-primary width-10ch" onClick={() => this.handleSaveAnAccountGroupButton()}>
                            {chartOfAccountsText[this.context.locale]["Save"]}
                        </button>
                        <button className="btn btn-white width-10ch" onClick={() => this.toggleEditAccountGroupModal()}>
                            {chartOfAccountsText[this.context.locale]["Cancel"]}
                        </button>
                    </ModalFooter>
                </Modal>

                {this.state.deleteAccountGroupAlert ?
                    <SweetAlert primary showCancel
                        confirmBtnText={chartOfAccountsText[this.context.locale]["Yes, delete it!"]}
                        confirmBtnBsStyle="primary"
                        cancelBtnText={chartOfAccountsText[this.context.locale]["Cancel"]}
                        cancelBtnBsStyle="default"
                        title={chartOfAccountsText[this.context.locale]["Are you sure?"]}
                        onConfirm={this.handleConfirmDeleteAccountGroupButton}
                        onCancel={this.toggleDeleteAccountGroupAlert}
                    >
                        {chartOfAccountsText[this.context.locale]["Are you sure you want to delete this account group?"]}
                    </SweetAlert>
                    : null}
                {this.state.cannotDeleteAccountGroupAlert ?
                    <SweetAlert danger showConfirm={false} showCancel={true}
                        cancelBtnBsStyle="default"
                        cancelBtnText={chartOfAccountsText[this.context.locale]["Cancel"]}
                        title={chartOfAccountsText[this.context.locale]["Cannot delete this account group."]}
                        onConfirm={this.toggleCannotDeleteAccountGroupAlert}
                        onCancel={this.toggleCannotDeleteAccountGroupAlert}
                    >
                        {chartOfAccountsText[this.context.locale]["Cannot delete this account group. Please delete all accounts in this account group and try again."]}
                    </SweetAlert>
                    : null}

                <Modal isOpen={this.state.addAnAccountModal} toggle={() => this.toggleAddAnAccountModal()} centered={true}>
                    <ModalHeader> {chartOfAccountsText[this.context.locale]["Add an Account"]} </ModalHeader>
                    <ModalBody>
                        {
                            this.state.accountNameAlert ?
                                <Alert color="danger">
                                    {chartOfAccountsText[this.context.locale]["Please provide a name for your account."]}
                                </Alert>
                                : null
                        }
                        <form onSubmit={event => { event.preventDefault(); this.handleSaveNewAccount() }}>
                            <div className="form-group row">
                                <label className="col-form-label col-md-3">
                                    {chartOfAccountsText[this.context.locale]["Account Name"]}
                                </label>
                                <div className="col-md-9">
                                    <input
                                        className="form-control"
                                        value={this.state.accountNameInput}
                                        onChange={event => {
                                            this.setState({ accountNameInput: event.target.value });
                                        }}
                                    />
                                </div>
                            </div>
                        </form>
                    </ModalBody>
                    <ModalFooter>
                        <button
                            className="btn btn-primary width-10ch"
                            onClick={() => this.handleSaveNewAccount()}
                        >
                            {chartOfAccountsText[this.context.locale]["Save"]}
                        </button>
                        <button
                            className="btn btn-white width-10ch"
                            onClick={() => {
                                this.toggleAddAnAccountModal();
                            }}
                        >
                            {chartOfAccountsText[this.context.locale]["Cancel"]}
                        </button>
                    </ModalFooter>
                </Modal>
            </div>

        )
    }
}

export default Accounts;