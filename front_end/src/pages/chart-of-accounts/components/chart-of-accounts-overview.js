import React from 'react';
import { Link } from 'react-router-dom';
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import classnames from 'classnames';
import { PageSettings } from '../../../config/page-settings';

class ChartOfAccountsOverview extends React.Component {
    //required props: accounts, accountGroups, accountTypes, parentPath, utils

    //required utils: setSelectedAccountSubtypeId, toggleAddAnAccountFromSubtypeModal, setSelectedAccountTypeId, toggleAddAnAccountSubtypeModal,
    //    toggleAddAnAccountWithoutSubtypeModal, setSelectedAccountId
    
    static contextType = PageSettings;

    constructor(props) {
        super(props);
        this.state = {
            activeTab: '1'
        };
    }

    toggleTab(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }

    renderAddNewAccountGroupButton() {
        switch (this.state.activeTab) {
            case '1':
                return (
                    <button 
                        className="btn btn-sm btn-primary my-1"
                        onClick={() => {
                            this.props.utils.setSelectedAccountTypeId(1);
                            this.props.utils.toggleAddAnAccountGroupModal();
                        }}
                    > Create an asset account group </button>
                )
            case '2':
                return (
                    <button
                        className="btn btn-sm btn-primary my-1"
                        onClick={() => {
                            this.props.utils.setSelectedAccountTypeId(2);
                            this.props.utils.toggleAddAnAccountGroupModal();
                        }}
                    > Create a liability account group </button>
                )
            case '3':
                return (
                    <button
                        className="btn btn-sm btn-primary my-1"
                        onClick={() => {
                            this.props.utils.setSelectedAccountTypeId(3);
                            this.props.utils.toggleAddAnAccountGroupModal();
                        }}
                    > Create an equity account group </button>
                )
            case '4':
                return(
                    <button
                        className="btn btn-sm btn-primary my-1"
                        onClick={() => {
                            this.props.utils.setSelectedAccountTypeId(4);
                            this.props.utils.toggleAddAnAccountGroupModal();
                        }}
                    > Create an income account group </button>
                )
            case '5':
                return (
                    <button
                        className="btn btn-sm btn-primary my-1"
                        onClick={() => {
                            this.props.utils.setSelectedAccountTypeId(5);
                            this.props.utils.toggleAddAnAccountGroupModal();
                        }}
                    > Create an expense account group </button>
                )
            
        }
    }

    render() {
        return (
            <div>
                <ol className="breadcrumb float-xl-right">
                    <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                    <li className="breadcrumb-item active">Chart of Accounts</li>
                </ol>

                <h1 className="page-header">Chart of Accounts </h1>

                <div >
                    <Nav pills className="d-flex justify-content-between px-3 mb-3"> {/* Strangely, using a forEach loop to save space here causes React to refuse to render tabs */}
                        <div className="row">
                            <NavItem>
                                <NavLink
                                    className={classnames({ active: this.state.activeTab === '1' })}
                                    onClick={() => { this.toggleTab('1') }}
                                >
                                    <span className="d-sm-block px-3">Assets</span>
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink
                                    className={classnames({ active: this.state.activeTab === '2' })}
                                    onClick={() => { this.toggleTab('2'); }}
                                >
                                    <span className="d-sm-block px-3">Liabilities</span>
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink
                                    className={classnames({ active: this.state.activeTab === '3' })}
                                    onClick={() => { this.toggleTab('3'); }}
                                >
                                    <span className="d-sm-block px-3">Equity</span>
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink
                                    className={classnames({ active: this.state.activeTab === '4' })}
                                    onClick={() => { this.toggleTab('4'); }}
                                >
                                    <span className="d-sm-block px-3">Income</span>
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink
                                    className={classnames({ active: this.state.activeTab === '5' })}
                                    onClick={() => { this.toggleTab('5'); }}
                                >
                                    <span className="d-sm-block px-3">Expenses</span>
                                </NavLink>
                            </NavItem>
                        </div>
                        <div>                        
                            {this.renderAddNewAccountGroupButton()}
                        </div>
                    </Nav>
                    <TabContent activeTab={this.state.activeTab} className="rounded-0">
                        <TabPane tabId="1"> {/* tabId for a tab must be the same as AccountTypeId for that tab */}
                            {this.props.accountGroups.slice()
                                .filter((accountGroup => accountGroup.accountTypeId === 1))
                                .map((accountGroup) => {
                                    return (
                                        <div key={accountGroup.accountGroupId}>
                                                <Link
                                                    to={`${this.props.parentPath}/accountGroupDetails/${accountGroup.accountGroupId}`} 
                                                    className="row rounded bg-light py-1 px-2 border text-decoration-none"
                                                >
                                                    <h5 className="my-0">{accountGroup.accountGroupName}</h5>
                                                </Link>
                                            <div className="px-1">
                                                {this.props.accounts.slice()
                                                    .filter(account => account.accountGroupId === accountGroup.accountGroupId) //careful of === here, may cause problems in the future. if for some reason subtypes refuse to render, try casting both sides to strings first!
                                                    .map(account => {
                                                        return (
                                                                <Link 
                                                                    to={`${this.props.parentPath}/accountDetails/${account.accountId}`}
                                                                    className={"row bg-white d-flex justify-content-between py-1 px-1 border-bottom text-decoration-none"}
                                                                    key={account.accountId}
                                                                >
                                                                    <span>{account.accountName}</span>
                                                                    <span className={account.debitTotal < account.creditTotal ? "text-red" : ""}>
                                                                        {new Intl.NumberFormat(this.context.locale, { style: 'currency', currency: this.context.currency }).format(account.debitTotal - account.creditTotal)}
                                                                    </span>
                                                                    {/* For each account in this subtype, render a row. Each row is clickable, and includes the account name and the account balance (red if negative asset balance, black if positive)
                                                                        Clicking the row will send the user to the account-details component, where they can view and edit details for the selected account. */}
                                                                </Link>
                                                        )
                                                    })}

                                                    {/* Add an Account button. Will open a modal to add a new account in this account group.
                                                        Renders at the bottom of the list of accounts for every subtype. */}
                                                    <button 
                                                        className="btn btn-block btn-xs btn-default border-0 font-weight-normal my-1"
                                                        onClick={() => {
                                                            this.props.utils.setSelectedAccountGroupId(accountGroup.accountGroupId);
                                                            this.props.utils.toggleAddAnAccountModal();
                                                            }}
                                                        >
                                                        <i className="ion ion-md-add fa-fw fa-lg"></i>Add a new account
                                                    </button>
                                            </div>
                                        </div>
                                    )
                                })}
                        </TabPane>
                    </TabContent>
                </div>
            </div>
        )
    }
}

export default ChartOfAccountsOverview;