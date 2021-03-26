import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import axios from 'axios';
import { Alert, Modal, ModalHeader, ModalBody, ModalFooter, TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import { API_BASE_URL } from '../../utils/constants.js';
import { PageSettings } from '../../config/page-settings.js';
import Select from 'react-select';
import SweetAlert from 'react-bootstrap-sweetalert';
import { chartOfAccountsText } from '../../utils/i18n/chart-of-accounts-text.js';
import ToggleMobileSidebarButton from '../../components/sidebar/toggle-mobile-sidebar-button';



class ChartOfAccounts extends React.Component {
    /** Renders a Chart of Accounts. This component uses pills tabs for the different account types. The url param this.props.match.params.activeTabId indicates the current open tab, in order for tab history to be preserved.
     *  this.props.match.params.activeTabId should always match the accountType.id of the accountType being currently viewed. 
    */
    static contextType = PageSettings;

    constructor(props) {
        super(props);
        this.state = {
            accounts: [],
            accountTypes: [],

            accountSubtypeRequiredAlert: false,

            accountTypeOptions: [], //for react-select; accountTypes are formatted as {value: accountType.id, label: accountType.name, object: accountType}
            accountSubtypeOptions: [], //for react-select; accountSubtypes are formatted as {value: accountSubtypeId, label: accountSubtypeName, object: accountSubtype}
            disableChangeAccountType: false, // disables the react-select field for changing an account group's account type

            selectedAccountSubtypeOption: null,
            selectedAccountTypeOption: null,

            editAccountModal: false,
            editAccount: false,
            accountNameAlert: false,


            addAnAccountModal: false,
            accountNameInput: '',
            initialDebitValueInput: 0,
            initialCreditValueInput: 0,
        };
        this.toggleEditAccountModal = this.toggleEditAccountModal.bind(this);
        this.handleSaveAnAccountButton = this.handleSaveAnAccountButton.bind(this);
        this.modalOnClosed = this.modalOnClosed.bind(this);

        this.handleChangeAccountSubtypeOption = this.handleChangeAccountSubtypeOption.bind(this);
        this.handleChangeAccountTypeOption = this.handleChangeAccountTypeOption.bind(this);

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
            this.setState({ accountTypes: response.data });
            if (response.data) {
                let formattedAccountTypes = response.data.map(accountType => ({ value: accountType.id, label: chartOfAccountsText[this.context.locale][accountType.name], object: accountType }))
                this.setState({ accountTypeOptions: formattedAccountTypes, selectedAccountTypeOption: formattedAccountTypes.find(formattedAccountType => formattedAccountType.object.id == this.props.match.params.activeTabId) })
            }
        })
        axios.get(`${API_BASE_URL}/organization/${this.context.currentOrganizationId}/account`).then(response => {
            this.setState({ accounts: response.data });
        }).catch(console.log);
        axios.get(`${API_BASE_URL}/accountSubtype`).then(response => {
            if (response.data) {
                let formattedAccountSubtypes = response.data.map(accountSubtype => ({ value: accountSubtype.id, label: chartOfAccountsText[this.context.locale][accountSubtype.name], object: accountSubtype }));
                this.setState({ accountSubtypeOptions: formattedAccountSubtypes });
            }
        }).catch(console.log);

    }

    /** Utility functions for adding/editing account */
    handleAddAnAccountButton() {
        //TODO
    }

    toggleEditAccountModal() {
        //TODO
    }

    handleAddAChildAccountButton(parentAccount) {
        //TODO
    }

    handleEditAccountButton(parentAccount) {
        //TODO
    }

    handleDeleteAccountButton(parentAccount) {
        //TODO
    }

    handleSaveAnAccountButton() {
        //TODO
    }

    handleChangeAccountSubtypeOption(selectedAccountSubtypeOption) {
        this.setState({ selectedAccountSubtypeOption: selectedAccountSubtypeOption });
    }

    handleChangeAccountTypeOption(selectedAccountTypeOption) {
        this.setState({ selectedAccountTypeOption: selectedAccountTypeOption, selectedAccountSubtypeOption: null });
    }

    modalOnClosed() {
        //TODO
    }
    /**End utility functions for adding/editing account */

    /** api calls for posting/putting/deleting objects to server */

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
                    <li className="breadcrumb-item active">{chartOfAccountsText[this.context.locale]["Chart of Accounts"]}</li>
                </ol>
                <h1 className="page-header">
                    {chartOfAccountsText[this.context.locale]["Chart of Accounts"]}
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
                                                onClick={() => this.props.history.push(`/chart-of-accounts/${accountType.id}`)}
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
                                    this.handleAddAnAccountButton();
                                }}
                            > {chartOfAccountsText[this.context.locale]["Create an account"]} </button>
                        </div>
                    }
                </Nav>
                <TabContent activeTab={this.props.match.params.activeTabId} className="widget widget-rounded widget-list widget-list-rounded m-b-30"> {/** active tab is the tab with an activeTabId that matches the url path parameter*/}
                    {!this.state.accountTypes ? <div className="d-flex justify-content-center fa-3x py-3"><i className="fas fa-circle-notch fa-spin"></i></div> :
                        this.state.accountTypes.map(accountType => {
                            return (
                                <TabPane tabId={accountType.id.toString()} key={accountType.id.toString()}>
                                    {this.state.accounts.filter(account => account.accountTypeId == accountType.id && !account.parentAccountId).map(account => { // render a bg-light accountgroup widget list item for each accountGroup in this accountType, then render all of the accounts for at accountGroup
                                        return (
                                            <React.Fragment key={account.accountId}>
                                                <div className="widget-list-item bg-light">
                                                    <div className="widget-list-content d-flex justify-content-between align-items-center">
                                                        <h4 className="widget-list-title">{account.accountName}</h4>
                                                        <div>
                                                            <Link replace className="icon-link-text-muted m-l-15" to="#" onClick={() => this.handleAddAChildAccountButton(account)}>
                                                                <i className="fa fa-plus"></i>
                                                            </Link>
                                                            <Link replace className="icon-link-text-muted m-l-15" to="#" onClick={() => this.handleEditAccountButton(account)}>
                                                                <i className="fa fa-edit"></i>
                                                            </Link>
                                                            <Link replace className="icon-link-text-muted m-l-15" to="#" onClick={() => this.handleDeleteAccountButton(account)}>
                                                                <i className="fa fa-trash-alt"></i>
                                                            </Link>
                                                        </div>


                                                    </div>
                                                </div>
                                                {!this.state.accounts ? null : this.state.accounts.filter(childAccount => childAccount.parentAccountId == account.accountId).map(childAccount => {
                                                    return (
                                                        <Link className="widget-list-item bg-white" to={`/account-details/${childAccount.accountId}`} key={childAccount.accountId.toString()}>
                                                            <div className="widget-list-content p-l-30">
                                                                <div className="widget-list-title">{childAccount.accountName}</div>
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
                    <Modal isOpen={this.state.editAccountModal} toggle = {this.toggleEditAccountModal} centered={true} onClosed={this.modalOnClosed}>
                        <ModalHeader>{this.state.editAccount? chartOfAccountsText[this.context.locale]["Edit Account Details"]: chartOfAccountsText[this.context.locale]["Create a New Account"]}</ModalHeader>
                        <ModalBody>

                        </ModalBody>
                        <ModalFooter>
                            <button className="btn btn-primary width-10ch" onClick={this.handleSaveAnAccountButton}>
                                {chartOfAccountsText[this.context.locale]["Save"]}
                            </button>
                            <button className="btn btn-white width-10ch" onClick={this.toggleEditAccountModal}>
                                {chartOfAccountsText[this.context.locale]["Cancel"]}
                            </button>
                        </ModalFooter>
                    </Modal>








                <Modal isOpen={this.state.editAccountModal} toggle={() => this.toggleEditAccountModal()} centered={true} onClosed={(state) => this.setState({editAccount: false})}>
                    <ModalHeader> {this.state.editAccount? chartOfAccountsText[this.context.locale]["Edit Account Details"]: chartOfAccountsText[this.context.locale]["Create a New Account"]} </ModalHeader>
                    <ModalBody>
                        {this.state.accountNameAlert ? <Alert color="danger">{chartOfAccountsText[this.context.locale]["Please provide a name for your account."]}</Alert> : null}
                        {this.state.accountSubtypeRequiredAlert ? <Alert color="danger">{chartOfAccountsText[this.context.locale]["Please provide an account subtype for your account."]}</Alert> : null}
                        <form onSubmit={event => { event.preventDefault(); this.handleSaveAnAccountButton() }}>
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
                        <div className="form-group row">
                            <label className="col-md-4 col-form-label">
                                {chartOfAccountsText[this.context.locale]["Account Subtype"]}
                            </label>
                            {!this.state.selectedAccountTypeOption ? <div className="d-flex justify-content-center fa-3x py-3"><i className="fas fa-circle-notch fa-spin"></i></div> :
                                <div className="col-md-8">
                                    <Select
                                        options={this.state.accountSubtypeOptions.filter(accountSubtypeOption => accountSubtypeOption.object.accountType.id == this.state.selectedAccountTypeOption.object.id)}
                                        value={this.state.selectedAccountSubtypeOption}
                                        isSearchable={true}
                                        onChange={this.handleChangeAccountSubtypeOption}
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
                                        type="text"
                                        className="form-control"
                                        value={this.state.accountNameInput}
                                        onChange={event => {
                                            this.setState({ accountNameInput: event.target.value });
                                        }}
                                    />
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-form-label col-md-3">
                                    {chartOfAccountsText[this.context.locale]["Initial Debit Value"]}
                                </label>
                                <div className="col-md-9">
                                    <input
                                        type="number"
                                        className="form-control"
                                        value={this.state.initialDebitValueInput}
                                        onChange={event => {
                                            this.setState({ initialDebitValueInput: event.target.value });
                                        }}
                                    />
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-form-label col-md-3">
                                    {chartOfAccountsText[this.context.locale]["Initial Credit Value"]}
                                </label>
                                <div className="col-md-9">
                                    <input
                                        type="number"
                                        className="form-control"
                                        value={this.state.initialCreditValueInput}
                                        onChange={event => {
                                            this.setState({ initialCreditValueInput: event.target.value });
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

export default ChartOfAccounts;