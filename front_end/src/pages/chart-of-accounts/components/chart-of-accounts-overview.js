import React from 'react';
import { Link } from 'react-router-dom';
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import classnames from 'classnames';

class ChartOfAccountsOverview extends React.Component {
    //required props: accounts, accountSubtypes, categories, context, parentPath, utils

    //required utils: setSelectedAccountSubtypeId, toggleAddAnAccountFromSubtypeModal, setSelectedAccountTypeId, toggleAddAnAccountSubtypeModal,
    //    toggleAddAnAccountWithoutSubtypeModal
    

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

    renderNewSubtypeOrAccountButton() {
        switch (this.state.activeTab) {
            case '1':
                return (
                    <button 
                        className="btn btn-sm btn-primary my-1"
                        onClick={() => {
                            this.props.utils.setSelectedAccountTypeId(1);
                            this.props.utils.toggleAddAnAccountSubtypeModal();
                        }}
                    > Create an asset subtype </button>
                )
            case '2':
                return (
                    <button
                        className="btn btn-sm btn-primary my-1"
                        onClick={() => {
                            this.props.utils.setSelectedAccountTypeId(2);
                            this.props.utils.toggleAddAnAccountSubtypeModal();
                        }}
                    > Create a liability subtype </button>
                )
            case '3':
                return (
                    <button
                        className="btn btn-sm btn-primary my-1"
                        onClick={() => {
                            this.props.utils.setSelectedAccountTypeId(3);
                            this.props.utils.toggleAddAnAccountSubtypeModal();
                        }}
                    > Create an equity subtype </button>
                )
            case '4':
                return(
                    <button
                        className="btn btn-sm btn-primary my-1"
                        onClick={() => {
                            this.props.utils.setSelectedAccountTypeId(4);
                            this.props.utils.toggleAddAnAccountWithoutSubtypeModal();
                        }}
                    > Create an income account </button>
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

                <div className="rounded bg-light" style={{ backgroundColor: "#e4e4e4", border: "0.5px solid silver" }}>
                    <Nav tabs className="d-flex justify-content-between px-3"> {/* Strangely, using a forEach loop to save space here causes React to refuse to render tabs */}
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
                            {this.renderNewSubtypeOrAccountButton()}
                        </div>
                    </Nav>
                    <TabContent activeTab={this.state.activeTab} className="rounded-0">
                        <TabPane tabId="1"> {/* tabId for a tab must be the same as AccountTypeId for that tab */}
                            {this.props.accountSubtypes.slice()
                                .filter((accountSubtype => accountSubtype.accountTypeId === 1))
                                .map((accountSubtype) => {
                                    return (
                                        <div key={accountSubtype.accountSubtypeId}>
                                                <Link
                                                    to={`${this.props.parentPath}/accountSubtypeDetails/${accountSubtype.accountSubtypeId}`} 
                                                    className="row bg-light py-1 px-2 border text-decoration-none"
                                                >
                                                    <h5 className="my-0">{accountSubtype.accountSubtypeName}</h5>
                                                </Link>
                                            <div className="px-1">
                                                {this.props.accounts.slice()
                                                    .filter(account => account.accountSubtypeId === accountSubtype.accountSubtypeId) //careful of === here, may cause problems in the future. if for some reason subtypes refuse to render, try casting both sides to strings first!
                                                    .map(account => {
                                                        return (
                                                                <Link 
                                                                    to={`${this.props.parentPath}/accountDetails/${account.accountId}`}
                                                                    className={"row bg-white d-flex justify-content-between py-1 px-1 border-bottom text-decoration-none"}
                                                                    key={account.accountId}
                                                                >
                                                                    <span>{account.accountName}</span>
                                                                    <span className={account.debitTotal < account.creditTotal ? "text-red" : ""}>
                                                                        {new Intl.NumberFormat(this.props.context.localization.locale, { style: 'currency', currency: this.props.context.localization.currency }).format(account.debitTotal - account.creditTotal)}
                                                                    </span>
                                                                    {/* For each account in this subtype, render a row. Each row is clickable, and includes the account name and the account balance (red if negative asset balance, black if positive)
                                                                        Clicking the row will send the user to the account-details component, where they can view and edit details for the selected account. */}
                                
                                                                </Link>
                                                        )
                                                    })}

                                                    {/* Add an Account [from subtype] button. Will open a modal to add a new account of this subtype.
                                                        Renders at the bottom of the list of accounts for every subtype. */}
                                                    <button 
                                                        className="btn btn-block btn-xs btn-default border-0 font-weight-normal my-1"
                                                        onClick={() => {
                                                            this.props.utils.setSelectedAccountSubtypeId(accountSubtype.accountSubtypeId);
                                                            this.props.utils.toggleAddAnAccountFromSubtypeModal();
                                                            }}
                                                        >
                                                        <i className="ion ion-md-add fa-fw fa-lg"></i>Add a new account
                                                    </button>
                                            </div>
                                        </div>
                                    )
                                })}
                        </TabPane>
                        <TabPane tabId="2">
                            {this.props.accountSubtypes.slice()
                                .filter((accountSubtype => accountSubtype.accountTypeId === 2))
                                .map((accountSubtype) => {
                                    return (
                                        <div key={accountSubtype.accountSubtypeId}>
                                                <Link
                                                    to={`${this.props.parentPath}/accountSubtypeDetails/${accountSubtype.accountSubtypeId}`} 
                                                    className="row bg-light py-1 px-2 border text-decoration-none"
                                                >
                                                    <h5 className="my-0">{accountSubtype.accountSubtypeName}</h5>
                                                </Link>
                                            <div className="px-1">
                                                {this.props.accounts.slice()
                                                    .filter(account => account.accountSubtypeId === accountSubtype.accountSubtypeId)
                                                    .map(account => {
                                                        return (
                                                                <Link 
                                                                    to={`${this.props.parentPath}/accountDetails/${account.accountId}`}
                                                                    className={"row bg-white d-flex justify-content-between py-1 px-1 border-bottom text-decoration-none"}
                                                                    key={account.accountId}
                                                                >
                                                                    <span>{account.accountName}</span>
                                                                    <span className={account.debitTotal < account.creditTotal ? "text-red" : ""}>
                                                                        {new Intl.NumberFormat(this.props.context.localization.locale, { style: 'currency', currency: this.props.context.localization.currency }).format(account.creditTotal - account.debitTotal)}
                                                                    </span>
                                                                    {/* For each account in this subtype, render a row. Each row is clickable, and includes the account name and the account balance. Liabilities are increased by credits and decreased by debits. Render red for positive liabilities, black for zero or negative.
                                                                        Clicking the row will send the user to the account-details component, where they can view and edit details for the selected account. */}
                                
                                                                </Link>
                                                        )
                                                    })}

                                                    {/* Add an Account [from subtype] button. Will open a modal to add a new account of this subtype.
                                                        Renders at the bottom of the list of accounts for every subtype. */}
                                                    <button 
                                                        className="btn btn-block btn-xs btn-default border-0 font-weight-normal my-1"
                                                        onClick={() => {
                                                            this.props.utils.setSelectedAccountSubtypeId(accountSubtype.accountSubtypeId);
                                                            this.props.utils.toggleAddAnAccountFromSubtypeModal();
                                                            }}
                                                        >
                                                        <i className="ion ion-md-add fa-fw fa-lg"></i>Add a new account
                                                    </button>
                                            </div>
                                        </div>
                                    )
                                })}
                        </TabPane>
                        <TabPane tabId="3"> {/* tabId for a tab must be the same as AccountTypeId for that tab */}
                            {this.props.accountSubtypes.slice()
                                .filter((accountSubtype => accountSubtype.accountTypeId === 3))
                                .map((accountSubtype) => {
                                    return (
                                        <div key={accountSubtype.accountSubtypeId}>
                                                <Link
                                                    to={`${this.props.parentPath}/accountSubtypeDetails/${accountSubtype.accountSubtypeId}`} 
                                                    className="row bg-light py-1 px-2 border text-decoration-none"
                                                >
                                                    <h5 className="my-0">{accountSubtype.accountSubtypeName}</h5>
                                                </Link>
                                            <div className="px-1">
                                                {this.props.accounts.slice()
                                                    .filter(account => account.accountSubtypeId === accountSubtype.accountSubtypeId)
                                                    .map(account => {
                                                        return (
                                                                <Link 
                                                                    to={`${this.props.parentPath}/accountDetails/${account.accountId}`}
                                                                    className={"row bg-white d-flex justify-content-between py-1 px-1 border-bottom text-decoration-none"}
                                                                    key={account.accountId}
                                                                >
                                                                    <span>{account.accountName}</span>
                                                                    <span> {/** TODO: figure out when to render red text for equity accounts */}
                                                                        {new Intl.NumberFormat(this.props.context.localization.locale, { style: 'currency', currency: this.props.context.localization.currency }).format(account.creditTotal - account.debitTotal)}
                                                                    </span>
                                                                    {/* For each account in this subtype, render a row. Each row is clickable, and includes the account name and the account balance.
                                                                        Clicking the row will send the user to the account-details component, where they can view and edit details for the selected account. */}
                                
                                                                </Link>
                                                        )
                                                    })}

                                                    {/* Add an Account [from subtype] button. Will open a modal to add a new account of this subtype.
                                                        Renders at the bottom of the list of accounts for every subtype. */}
                                                    <button 
                                                        className="btn btn-block btn-xs btn-default border-0 font-weight-normal my-1"
                                                        onClick={() => {
                                                            this.props.utils.setSelectedAccountSubtypeId(accountSubtype.accountSubtypeId);
                                                            this.props.utils.toggleAddAnAccountFromSubtypeModal();
                                                            }}
                                                        >
                                                        <i className="ion ion-md-add fa-fw fa-lg"></i>Add a new account
                                                    </button>
                                            </div>
                                        </div>
                                    )
                                })}
                        </TabPane>
                        <TabPane tabId="4"> 
                            {this.props.accounts.slice()
                                .filter((account => account.accountTypeId === 4))
                                .map((account) => {
                                    return (
                                        <div key={account.accountId}>
                                                <Link
                                                    to={`${this.props.parentPath}/accountDetails/${account.accountId}`} 
                                                    className="row bg-light py-1 px-2 border text-decoration-none"
                                                >
                                                    <h5 className="my-0">{account.accountName}</h5>
                                                </Link>
                                            <div className="px-1">
                                                {this.props.categories.slice()
                                                    .filter(category => category.accountId === account.accountId)
                                                    .map(category => {
                                                        return (
                                                                <Link 
                                                                    to={`${this.props.parentPath}/categoryDetails/${category.categoryId}`}
                                                                    className={"row bg-white d-flex justify-content-between py-1 px-1 border-bottom text-decoration-none"}
                                                                    key={category.categoryId}
                                                                >
                                                                    <span>{category.categoryName}</span>
                                                                    <span className={category.debitTotal > category.creditTotal ? "text-red" : ""}> {/** Income categories use black for excess credits and red for excess debits */}
                                                                        {new Intl.NumberFormat(this.props.context.localization.locale, { style: 'currency', currency: this.props.context.localization.currency }).format(account.creditTotal - account.debitTotal)}
                                                                    </span>
                                                                    {/* For each account in this subtype, render a row. Each row is clickable, and includes the account name and the account balance.
                                                                        Clicking the row will send the user to the account-details component, where they can view and edit details for the selected account. */}
        
                                                                </Link>
                                                        )
                                                    })}

                                                    {/* Add an Account [from subtype] button. Will open a modal to add a new account of this subtype.
                                                        Renders at the bottom of the list of accounts for every subtype. */}
                                                    {/* <button 
                                                        className="btn btn-block btn-xs btn-default border-0 font-weight-normal my-1"
                                                        onClick={() => {
                                                            this.props.utils.setSelectedAccountSubtypeId(accountSubtype.accountSubtypeId);
                                                            this.props.utils.toggleAddAnAccountFromSubtypeModal();
                                                            }}
                                                        >
                                                        <i className="ion ion-md-add fa-fw fa-lg"></i>Add a new account
                                                    </button> */}
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