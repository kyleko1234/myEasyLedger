import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, CardBody } from 'reactstrap';
import { API_BASE_URL, ACCOUNT_TYPE_OPTIONS, CATEGORY_ACCOUNT_TYPES} from '../../utils/constants.js';
import { PageSettings } from '../../config/page-settings.js';
import { chartOfAccountsText } from '../../utils/i18n/chart-of-accounts-text.js';
import AccountDetailsEditor from '../chart-of-accounts/components/account-details-editor.js';
import Select from 'react-select';



class Categories extends React.Component {
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
            
            addAnAccountModal: false
        };

        this.toggleEditAccountModal = this.toggleEditAccountModal.bind(this);
        this.fetchData = this.fetchData.bind(this);

    }

    componentDidMount() {
        this.fetchData();
    }

    fetchData() {
        axios.get(`${API_BASE_URL}/accountType`).then(response => {
            let incomeAndExpensesAccountTypeIds = [4, 5];
            let incomeAndExpensesAccountTypes = response.data.filter(accountType => incomeAndExpensesAccountTypeIds.includes(accountType.id));
            this.setState({ accountTypes: incomeAndExpensesAccountTypes });
        })
        axios.get(`${API_BASE_URL}/organization/${this.context.currentOrganizationId}/account`).then(response => {
            this.setState({ accounts: response.data });
        }).catch(console.log);
    }

    /** Utility functions for adding/editing category */
    toggleEditAccountModal() {
        this.setState(state => ({editAccountModal: !state.editAccountModal}));
    }

    handleAddAnAccountButton() {
        this.setState(state => ({createMode: true, selectedAccountId: null, selectedParentAccount: null}), () => {
            this.setState({editAccountModal: true});
        })
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
    /** End utility functions for adding/editing category */

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
        const accountTypeOptions = ACCOUNT_TYPE_OPTIONS(this.context.locale).filter(accountTypeOption => CATEGORY_ACCOUNT_TYPES.includes(accountTypeOption.value))
        return(
            <Select
                classNamePrefix="form-control"
                options={accountTypeOptions}
                value={accountTypeOptions.find(accountTypeOption => accountTypeOption.value == this.props.match.params.activeTabId)}
                onChange={selectedOption => this.props.history.push(`/categories/${selectedOption.value}`)}
            />
        )
    }


    render() {
        return (
            <div>
                <h1 className="">
                    {chartOfAccountsText[this.context.locale]["Categories"]}
                </h1>
                <Card className="very-rounded my-4 shadow-sm bg-light">
                    <CardBody>
                        <Nav pills justified className="d-block">
                            {!this.state.accountTypes ? <div className="d-flex justify-content-center fa-3x py-3"><i className="fas fa-circle-notch fa-spin"></i></div> :
                                <div className="d-flex w-100 justify-content-between align-items-center">
                                    <div className="d-none d-sm-flex ">
                                        {this.state.accountTypes.map(accountType => { //render a pills navlink for each accountType returned by the server, with the active accountType being the one that has an id that matches the url param.
                                            return (
                                                <NavItem key={accountType.id}>
                                                    <NavLink
                                                        className={this.props.match.params.activeTabId == accountType.id ? "active" : "cursor-pointer"}
                                                        onClick={() => this.props.history.push(`/categories/${accountType.id}`)}
                                                    >
                                                        <span className="d-sm-block px-3">{chartOfAccountsText[this.context.locale][accountType.name]}</span>
                                                    </NavLink>
                                                </NavItem>
                                            );
                                        })}
                                    </div>
                                    <div className="d-sm-none w-50">
                                        {this.renderAccountTypeSelect()}
                                    </div>
                                    <button
                                        className="btn btn-primary my-1 ml-3"
                                        onClick={() => {
                                            this.handleAddAnAccountButton();
                                        }}
                                    > {chartOfAccountsText[this.context.locale]["Create a category"]} </button>
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
                                            {this.state.accounts.filter(account => account.accountTypeId == accountType.id && !account.parentAccountId).map(account => { // render a bg-light accountgroup widget list item for each accountGroup in this accountType, then render all of the accounts for at accountGroup
                                                return (
                                                    <React.Fragment key={account.accountId}>
                                                        {account.hasChildren?
                                                            <div className="tr d-flex justify-content-between align-items-center">
                                                                <div className="td font-weight-600">
                                                                    {account.accountName}
                                                                </div>
                                                                <div className="td py-0 d-flex align-items-center">
                                                                    <button className="btn btn-sm btn-white border-0 text-muted" onClick={() => this.handleEditAccountButton(account)}>
                                                                        <i className="fas fa-edit font-size-compact"></i>
                                                                    </button>
                                                                    <i className="fas fa-angle-right text-muted invisible"></i>
                                                                </div>
                                                            </div>
                                                        :
                                                        <Link className="tr d-flex justify-content-between align-items-center " to={`/category-details/${account.accountId}`}>
                                                                <div className="td font-weight-600">
                                                                    {account.accountName}
                                                                </div>
                                                                <div className="td py-0 d-flex align-items-center">
                                                                    <button className="btn btn-sm text-muted invisible">
                                                                        <i className="fas fa-edit"></i>
                                                                    </button>
                                                                    <i className="fas fa-angle-right text-muted"></i>
                                                                </div>
                                                        </Link>
                                                    }
                                                        {!this.state.accounts 
                                                            ? null 
                                                            : this.state.accounts
                                                                .filter(childAccount => childAccount.parentAccountId == account.accountId)
                                                                .map(childAccount => {
                                                                    return (
                                                                        <Link className="tr d-flex justify-content-between align-items-center " to={`/category-details/${childAccount.accountId}`} key={childAccount.accountId}>
                                                                            <div className="td indent">
                                                                                <div>{childAccount.accountName}</div>
                                                                            </div>
                                                                            <div className="td">
                                                                                <i className="fas fa-angle-right text-muted"></i>
                                                                            </div>
                                                                        </Link>
                                                                    );
                                                        })}
                                                        {this.canAddChildren(account) ? 
                                                            <Link replace className="tr d-flex justify-content-between align-items-center" to="#" onClick={() => this.handleAddAChildAccountButton(account)}>
                                                                <div className="td indent">
                                                                    <em className="widget-list-title">{chartOfAccountsText[this.context.locale]["Add a new child category..."]}</em>
                                                                </div>
                                                                <div className="td"></div>
                                                            </Link>
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

                <AccountDetailsEditor isOpen={this.state.editAccountModal} toggle={this.toggleEditAccountModal} selectedAccountId={this.state.selectedAccountId} fetchData={this.fetchData} createMode={this.state.createMode} accountTypeId={this.props.match.params.activeTabId} selectedParentAccount={this.state.selectedParentAccount} category/>

            </div>


        )
    }
}

export default Categories;