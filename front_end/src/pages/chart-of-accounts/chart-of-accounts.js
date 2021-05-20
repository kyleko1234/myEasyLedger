import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import { API_BASE_URL } from '../../utils/constants.js';
import { PageSettings } from '../../config/page-settings.js';
import { chartOfAccountsText } from '../../utils/i18n/chart-of-accounts-text.js';
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

            selectedAccountId: null,
            selectedParentAccount: null,
            editAccountModal: false,
            createMode: true,

            addAnAccountModal: false,
        };
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

    handleEditAccountButton(account) {
        this.setState(state => ({
            createMode: false,
            selectedAccountId: account.accountId
        }), () => {
            this.setState({editAccountModal: true});
        })
    }

    /**End utility functions for adding/editing account */
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

    render() {
        return (
            <div>
                <h1 className="">
                    {chartOfAccountsText[this.context.locale]["Chart of Accounts"]}
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
                <TabContent activeTab={this.props.match.params.activeTabId} className=""> {/** active tab is the tab with an activeTabId that matches the url path parameter*/}
                    {!this.state.accountTypes ? <div className="d-flex justify-content-center fa-3x py-3"><i className="fas fa-circle-notch fa-spin"></i></div> :
                        this.state.accountTypes.map(accountType => {
                            return (
                                <TabPane tabId={accountType.id.toString()} key={accountType.id.toString()}>
                                    <table className="table table-hover">
                                        <tbody>
                                            {this.state.accounts
                                                .filter(account => account.accountTypeId == accountType.id && !account.parentAccountId)
                                                .map(account => { // render a bg-light accountgroup widget list item for each accountGroup in this accountType, then render all of the accounts for at accountGroup
                                                    return (
                                                        <React.Fragment key={account.accountId}>
                                                            {account.hasChildren ?
                                                                <tr className="bg-light">
                                                                    <td className="d-flex justify-content-between align-items-center">
                                                                        <h4 className="">
                                                                            {account.accountCode? account.accountCode + " - " + account.accountName: account.accountName}
                                                                        </h4>
                                                                        <div className="d-flex align-items-center">
                                                                            <button className="btn btn-sm btn-light text-muted" onClick={() => this.handleEditAccountButton(account)}>
                                                                                <i className="fas fa-edit"></i>
                                                                            </button>
                                                                            <i className="fas fa-angle-right fa-lg text-muted invisible"></i>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                            :
                                                                <tr>
                                                                    <td className="">
                                                                        <Link className=" d-flex justify-content-between align-items-center bg-light" to={`/account-details/${account.accountId}`}>
                                                                                <h4 className="">
                                                                                    {account.accountCode? account.accountCode + " - " + account.accountName: account.accountName}
                                                                                </h4>
                                                                                <div className="d-flex align-items-center">
                                                                                    <button className=" btn btn-sm btn-icon text-muted invisible">
                                                                                        <i className="fas fa-edit"></i>
                                                                                    </button>
                                                                                    <i className=" fas fa-angle-right fa-lg text-muted"></i>
                                                                                </div>
                                                                        </Link>
                                                                    </td>
                                                                </tr>
                                                            }
                                                            {!this.state.accounts 
                                                                ? null 
                                                                : this.state.accounts
                                                                    .filter(childAccount => childAccount.parentAccountId == account.accountId)
                                                                    .map(childAccount => {
                                                                        return (
                                                                            <tr>
                                                                                <td>
                                                                                    <Link className="d-flex justify-content-between align-items-center " to={`/account-details/${childAccount.accountId}`} key={childAccount.accountId.toString()}>
                                                                                        <div className="">
                                                                                            <div className="">{childAccount.accountCode? childAccount.accountCode + " - " + childAccount.accountName : childAccount.accountName}</div>
                                                                                        </div>
                                                                                        <div className="text-right">
                                                                                            <i className="fas fa-angle-right fa-lg text-muted"></i>
                                                                                        </div>
                                                                                    </Link>
                                                                                </td>
                                                                            </tr>
                                                                        );
                                                            })}
                                                            {this.canAddChildren(account) ? 
                                                                <tr>
                                                                    <td>
                                                                        <Link replace className="" to="#" onClick={() => this.handleAddAChildAccountButton(account)}>
                                                                            <div className="">
                                                                                <i className="">{chartOfAccountsText[this.context.locale]["Add a new child account..."]}</i>
                                                                            </div>
                                                                        </Link>
                                                                    </td>
                                                                </tr>
                                                            : null}
                                                        </React.Fragment>
                                                    );
                                            })}
                                        </tbody>
                                    </table>
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