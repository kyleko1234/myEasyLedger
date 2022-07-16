import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, CardBody, Tooltip } from 'reactstrap';
import { API_BASE_URL, ACCOUNT_TYPE_OPTIONS} from '../../utils/constants.js';
import { PageSettings } from '../../config/page-settings.js';
import { chartOfAccountsText } from '../../utils/i18n/chart-of-accounts-text.js';
import AccountDetailsEditor from './components/account-details-editor.js';
import Select from 'react-select';



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

            selectedAccountId: null,
            selectedParentAccount: null,
            editAccountModal: false,
            createMode: true,

            addAnAccountModal: false,
            createAnAccountButtonTooltip: false
        };

        this.toggleCreateAnAccountButtonTooltip = this.toggleCreateAnAccountButtonTooltip.bind(this);
        this.toggleEditAccountModal = this.toggleEditAccountModal.bind(this);
        this.fetchData = this.fetchData.bind(this);

    }

    componentDidMount() {
        this.fetchData();
    }

    fetchData() {
        axios.get(`${API_BASE_URL}/accountType`).then(response => {
            this.setState({ accountTypes: response.data });
        })
        axios.get(`${API_BASE_URL}/organization/${this.context.currentOrganizationId}/account`).then(response => {
            this.setState({ accounts: response.data });
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

    handleEditAccountButton(event, account) {
        event.stopPropagation();
        this.setState(state => ({
            createMode: false,
            selectedAccountId: account.accountId
        }), () => {
            this.setState({editAccountModal: true});
        })
    }
    /**End utility functions for adding/editing account */

    toggleCreateAnAccountButtonTooltip() {
        this.setState(state => ({
            createAnAccountButtonTooltip: !state.createAnAccountButtonTooltip
        }));
    }

    canAddChildren(account) {
        if (account.parentAccountId != null) {
            return false;
        } else if (account.debitTotal != 0 || account.creditTotal != 0) {
            if (account.hasChildren) {
                return true;
            } else {
                return false;
            }
        }
        return true;
    }

    renderAccountTypeSelect() {
        const accountTypeOptions = ACCOUNT_TYPE_OPTIONS(this.context.locale);
        return(
            <Select
                classNamePrefix="form-control"
                options={accountTypeOptions}
                value={accountTypeOptions.find(accountTypeOption => accountTypeOption.value == this.props.match.params.activeTabId)}
                onChange={selectedOption => this.props.history.push(`/chart-of-accounts/${selectedOption.value}`)}

            />
        )
    }
    render() {
        return (
            <div>
                <h1 className="">
                    {chartOfAccountsText[this.context.locale]["Chart of Accounts"]}
                </h1>
                <Card className="very-rounded my-4 shadow-sm bg-light">
                    <CardBody>
                        <Nav pills justified className="">
                            {!this.state.accountTypes ? <div className="d-flex justify-content-center fa-3x py-3"><i className="fas fa-circle-notch fa-spin"></i></div> :
                                <div className="d-flex w-100 justify-content-between align-items-center">
                                    <div className="d-none d-lg-flex">
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
                                    <div className="d-lg-none w-50">
                                        {this.renderAccountTypeSelect()}
                                    </div>
                                    <div id="create-an-account-button">
                                        <button
                                            className="btn font-size-standard btn-primary ms-3 "
                                            onClick={() => {
                                                this.handleAddAnAccountButton();
                                            }}
                                            disabled={this.context.currentPermissionTypeId < 2}
                                        > 
                                            {chartOfAccountsText[this.context.locale]["Create an account"]}
                                        </button>
                                    </div>
                                </div>
                            }
                        </Nav>
                    </CardBody>
                </Card>

                <Card className="very-rounded shadow-sm">
                    <CardBody>
                        <TabContent activeTab={this.props.match.params.activeTabId} className=""> {/** active tab is the tab with an activeTabId that matches the url path parameter*/}
                            {!this.state.accountTypes ? <div className="d-flex justify-content-center fa-3x py-3"><i className="fas fa-circle-notch fa-spin"></i></div> :
                                this.state.accountTypes.map(accountType => {
                                    return (
                                        <TabPane tabId={accountType.id.toString()} key={accountType.id.toString()}>
                                            {this.state.accounts
                                                .filter(account => account.accountTypeId == accountType.id && !account.parentAccountId)
                                                .map(account => { // render a bg-light accountgroup widget list item for each accountGroup in this accountType, then render all of the accounts for at accountGroup
                                                    return (
                                                        <React.Fragment key={account.accountId}>
                                                            {account.hasChildren ?
                                                                <div className="pseudo-tr d-flex justify-content-between align-items-center">
                                                                    <div className="pseudo-td fw-semibold">
                                                                        {account.accountCode? account.accountCode + " - " + account.accountName: account.accountName}
                                                                    </div>
                                                                    <div className="pseudo-td py-0 d-flex align-items-center">
                                                                        <button 
                                                                            className="btn btn-sm btn-white border-0 text-muted" 
                                                                            onClick={event => this.handleEditAccountButton(event, account)}
                                                                        >
                                                                            <i className="fas fa-edit font-size-compact"></i>
                                                                        </button>
                                                                        <i className="fas fa-angle-right text-muted invisible"></i>
                                                                    </div>
                                                                </div>
                                                            :
                                                                <div 
                                                                    className="clickable pseudo-tr d-flex justify-content-between align-items-center " 
                                                                    onClick={() => this.props.history.push(`/account-details/${account.accountId}`)}
                                                                >
                                                                    <div className="pseudo-td fw-semibold">
                                                                        {account.accountCode? account.accountCode + " - " + account.accountName: account.accountName}
                                                                    </div>
                                                                    <div className="pseudo-td py-0 d-flex align-items-center">
                                                                        <button 
                                                                            className=" btn btn-sm btn-white border-0 text-muted"
                                                                            onClick={event => this.handleEditAccountButton(event, account)}
                                                                        >
                                                                            <i className="fas fa-edit font-size-compact"></i>
                                                                        </button>
                                                                        <i className=" fas fa-angle-right text-muted"></i>
                                                                    </div>
                                                                </div>
                                                            }
                                                            {!this.state.accounts 
                                                                ? null 
                                                                : this.state.accounts
                                                                    .filter(childAccount => childAccount.parentAccountId == account.accountId)
                                                                    .map(childAccount => {
                                                                        return (
                                                                            <div 
                                                                                key={childAccount.accountId} 
                                                                                className="clickable pseudo-tr d-flex justify-content-between align-items-center " 
                                                                                onClick={() => this.props.history.push(`/account-details/${childAccount.accountId}`)}
                                                                            >
                                                                                <div className="pseudo-td indent">{childAccount.accountCode? childAccount.accountCode + " - " + childAccount.accountName : childAccount.accountName}</div>
                                                                                <div className="pseudo-td py-0 d-flex align-items-center">
                                                                                <button 
                                                                                    className=" btn btn-sm btn-white border-0 text-muted"
                                                                                    onClick={event => this.handleEditAccountButton(event, childAccount)}
                                                                                >
                                                                                    <i className="fas fa-edit font-size-compact"></i>
                                                                                </button>
                                                                                    <i className="fas fa-angle-right text-muted"></i>
                                                                                </div>
                                                                            </div>
                                                                        );
                                                            })}
                                                            {(this.canAddChildren(account) && this.context.currentPermissionTypeId >= 2) ? 
                                                                <div 
                                                                    className="clickable pseudo-tr d-flex justify-content-between align-items-center" 
                                                                    onClick={() => this.handleAddAChildAccountButton(account)}
                                                                >
                                                                    <div className="pseudo-td indent">
                                                                        <em>{chartOfAccountsText[this.context.locale]["Add a new child account..."]}</em>
                                                                    </div>
                                                                    <div className="pseudo-td"></div>
                                                                </div>
                                                            : null}
                                                        </React.Fragment>
                                                    );
                                            })}
                                        </TabPane>
                                    );
                                })
                            }
                        </TabContent>
                    </CardBody>          
                </Card>

                <AccountDetailsEditor isOpen={this.state.editAccountModal} toggle={this.toggleEditAccountModal} selectedAccountId={this.state.selectedAccountId} fetchData={this.fetchData} createMode={this.state.createMode} accountTypeId={this.props.match.params.activeTabId} selectedParentAccount={this.state.selectedParentAccount}/>
                
                {this.context.currentPermissionTypeId < 2
                    ? <Tooltip
                        target="create-an-account-button"
                        fade={false}
                        isOpen={this.state.createAnAccountButtonTooltip}
                        toggle={this.toggleCreateAnAccountButtonTooltip}
                    >
                        {chartOfAccountsText[this.context.locale]["This action requires EDIT permissions for this ledger."]}
                    </Tooltip>
                    : null
                }
            </div>

        )
    }
}

export default ChartOfAccounts;