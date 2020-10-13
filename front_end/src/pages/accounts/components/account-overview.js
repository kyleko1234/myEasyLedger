import React from 'react';
import { Link, Route } from 'react-router-dom';
import axios from 'axios';
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import classnames from 'classnames';

class AccountOverview extends React.Component {
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

    render() {
        return (
            <div>
                <ol className="breadcrumb float-xl-right">
                    <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                    <li className="breadcrumb-item active">Accounts</li>
                </ol>

                <h1 className="page-header">Accounts </h1>

                <div className="rounded bg-light" style={{ backgroundColor: "#e4e4e4", border: "0.5px solid silver" }}>
                    <Nav tabs className="d-flex px-2"> {/* Strangely, using a forEach loop to save space here causes React to refuse to render tabs */}
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
                    </Nav>
                    <TabContent activeTab={this.state.activeTab} className="rounded-0">
                        <TabPane tabId="1"> {/* tabId for a tab must be the same as AccountTypeId for that tab */}
                            {this.props.accountSubtypes.slice()
                                .filter((accountSubtype => accountSubtype.accountTypeId === 1))
                                .map((accountSubtype) => {
                                    return (
                                        <div key={accountSubtype.accountSubtypeId}>
                                            <div className="row bg-light my-2 py-1 px-2 border">
                                                <h5 className="my-0">{accountSubtype.accountSubtypeName}</h5>
                                            </div>
                                            <div>
                                                {this.props.accounts.slice()
                                                    .filter(account => account.accountSubtypeId === accountSubtype.accountSubtypeId)
                                                    .map(account => {
                                                        return (
                                                                <Link 
                                                                    onClick={() => this.props.utils.setSelectedAccountId(account.accountId)}
                                                                    to={`${this.props.parentUrl}/accountDetails`}
                                                                    className={"d-flex justify-content-between border-bottom py-1"}
                                                                    key={account.accountId}
                                                                >
                                                                    <span>{account.accountName}</span>
                                                                    <span className={account.debitTotal < account.creditTotal ? "text-red" : ""}>
                                                                        {new Intl.NumberFormat(this.props.context.localization.locale, { style: 'currency', currency: this.props.context.localization.currency }).format(account.debitTotal - account.creditTotal)}
                                                                    </span>

                                                                </Link>
                                                        )
                                                    })}
                                            </div>
                                        </div>
                                    )
                                })}
                        </TabPane>
                        <TabPane tabId="2"> {/* tabId for a tab must be the same as AccountTypeId for that tab */}
                            {this.props.accountSubtypes.slice()
                                .filter((accountSubtype => accountSubtype.accountTypeId === 2))
                                .map((accountSubtype) => {
                                    return (
                                        <div key={accountSubtype.accountSubtypeId}>
                                            <div className="row bg-light my-2 py-1 px-2 border">
                                                <h5 className="my-0">{accountSubtype.accountSubtypeName}</h5>
                                            </div>
                                            <div>
                                                {this.props.accounts.slice()
                                                    .filter(account => account.accountSubtypeId === accountSubtype.accountSubtypeId)
                                                    .map(account => {
                                                        return (
                                                            <div className={"d-flex justify-content-between border-bottom"} key={account.accountId}>
                                                                <span>{account.accountName}</span>
                                                                <span className={account.debitTotal < account.creditTotal ? "text-red" : ""}>
                                                                    {new Intl.NumberFormat(this.props.context.localization.locale, { style: 'currency', currency: this.props.context.localization.currency }).format(account.creditTotal - account.debitTotal)}
                                                                </span>
                                                            </div>
                                                        )
                                                    })}
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
                                            <div className="row bg-light my-2 py-1 px-2 border">
                                                <h5 className="my-0">{accountSubtype.accountSubtypeName}</h5>
                                            </div>
                                            <div>
                                                {this.props.accounts.slice()
                                                    .filter(account => account.accountSubtypeId === accountSubtype.accountSubtypeId)
                                                    .map(account => {
                                                        return (
                                                            <div className={"d-flex justify-content-between border-bottom"} key={account.accountId}>
                                                                <span>{account.accountName}</span>
                                                                <span className={account.debitTotal < account.creditTotal ? "text-red" : ""}>
                                                                    {new Intl.NumberFormat(this.props.context.localization.locale, { style: 'currency', currency: this.props.context.localization.currency }).format(account.creditTotal - account.debitTotal)}
                                                                </span>
                                                            </div>
                                                        )
                                                    })}
                                            </div>
                                        </div>
                                    )
                                })}
                        </TabPane>
                        <TabPane tabId="4"> {/* tabId for a tab must be the same as AccountTypeId for that tab */}
                            {this.props.accounts.slice()
                                .filter((account => account.accountTypeId === 4))
                                .map((account) => {
                                    return (
                                        <div key={account.accountId}>
                                            <div className="row bg-light my-2 py-1 px-2 border">
                                                <h5 className="my-0">{account.accountName}</h5>
                                            </div>
                                            <div>
                                                {this.props.categories.slice()
                                                    .filter(category => category.accountId === account.accountId)
                                                    .map(category => {
                                                        return (
                                                            <div className={"d-flex justify-content-between border-bottom"} key={category.categoryId}>
                                                                <span>{category.categoryName}</span>
                                                                <span className={category.debitTotal < category.creditTotal ? "text-red" : ""}>
                                                                    {new Intl.NumberFormat(this.props.context.localization.locale, { style: 'currency', currency: this.props.context.localization.currency }).format(category.creditTotal - category.debitTotal)}
                                                                </span>
                                                            </div>
                                                        )
                                                    })}
                                            </div>
                                        </div>
                                    )
                                })}
                        </TabPane>
                        <TabPane tabId="5"> {/* tabId for a tab must be the same as AccountTypeId for that tab */}
                            {this.props.accounts.slice()
                                .filter((account => account.accountTypeId === 5))
                                .map((account) => {
                                    return (
                                        <div key={account.accountId}>
                                            <div className="row bg-light my-2 py-1 px-2 border">
                                                <h5 className="my-0">{account.accountName}</h5>
                                            </div>
                                            <div>
                                                {this.props.categories.slice()
                                                    .filter(category => category.accountId === account.accountId)
                                                    .map(category => {
                                                        return (
                                                            <div className={"d-flex justify-content-between border-bottom"} key={category.categoryId}>
                                                                <span>{category.categoryName}</span>
                                                                <span className={category.debitTotal < category.creditTotal ? "text-red" : ""}>
                                                                    {new Intl.NumberFormat(this.props.context.localization.locale, { style: 'currency', currency: this.props.context.localization.currency }).format(category.debitTotal - category.creditTotal)}
                                                                </span>
                                                            </div>
                                                        )
                                                    })}
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

export default AccountOverview;