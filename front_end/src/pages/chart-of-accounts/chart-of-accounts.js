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
import AccountDetailsEditor from './components/account-details-editor.js';



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

            selectedAccountId: null,
            selectedParentAccount: null,
            editAccountModal: false,
            createMode: true,
            accountNameAlert: false,


            addAnAccountModal: false,
            accountNameInput: '',
            initialDebitValueInput: 0,
            initialCreditValueInput: 0,
        };
        this.toggleEditAccountModal = this.toggleEditAccountModal.bind(this);

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
    toggleEditAccountModal() {
        this.setState(state => ({editAccountModal: !state.editAccountModal}));
    }

    handleAddAnAccountButton() {
        this.setState(state => ({createMode: true, selectedAccountId: null, selectedParentAccount: null}), () => {
            this.setState({editAccountModal: true});
        });
    }

    handleAddAChildAccountButton(parentAccount) {
        this.setState(state => ({
            createMode: true, 
            selectedAccountId: null,
            selectedParentAccount: parentAccount
        }), () => {
             this.setState({editAccountModal: true});
        })
    }

    handleEditAccountButton(account) {
        this.setState(state => ({
            createMode: false,
            selectedAccountId: account.accountId
        }), () => {
            this.setState({editAccountModal: true});
        })
    }

    handleChangeAccountSubtypeOption(selectedAccountSubtypeOption) {
        this.setState({ selectedAccountSubtypeOption: selectedAccountSubtypeOption });
    }

    handleChangeAccountTypeOption(selectedAccountTypeOption) {
        this.setState({ selectedAccountTypeOption: selectedAccountTypeOption, selectedAccountSubtypeOption: null });
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
                
                <AccountDetailsEditor isOpen={this.state.editAccountModal} toggle={this.toggleEditAccountModal} selectedAccountId={this.state.selectedAccountId} fetchData={this.fetchData} createMode={this.state.createMode} accountTypeId={this.props.match.params.activeTabId} selectedParentAccount={this.state.selectedParentAccount}/>

            </div>

        )
    }
}

export default ChartOfAccounts;