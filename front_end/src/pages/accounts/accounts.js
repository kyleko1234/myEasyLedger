import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import classnames from 'classnames';



const API_URL = 'http://localhost:8080/v0.1';
const ORGANIZATION_ID = 1;
const PERSON_ID = 1;
const localization = {
    locale: 'en-US',
    currency: 'USD'
}
const accountTypes = [
    { id: 1, name: "Assets" },
    { id: 2, name: "Liabilities" },
    { id: 3, name: "Owner's Equity" },
    { id: 4, name: "Income" },
    { id: 5, name: "Expenses" },
]

class Accounts extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            accounts: [],
            accountSubtypes: [],
            categories: [],
            activeTab: '1'
        };
    }

    componentDidMount() {
        const url = `${API_URL}/organization/${ORGANIZATION_ID}/accountBalance`;
        axios.get(url).then(response => {
            this.setState({ accounts: response.data });
        });
        axios.get(`${API_URL}/organization/${ORGANIZATION_ID}/categoryBalance`).then(response => {
            this.setState({ categories: response.data });
        })
        axios.get(`${API_URL}/organization/${ORGANIZATION_ID}/accountSubtype`).then(response => {
            this.setState({ accountSubtypes: response.data });
        })

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

                <div className="rounded" style={{ backgroundColor: "#e4e4e4", border: "0.5px solid silver" }}>
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
                            {this.state.accountSubtypes.slice()
                                .filter((accountSubtype => accountSubtype.accountTypeId === 1))
                                .map((accountSubtype) => {
                                    return (
                                        <div key={accountSubtype.accountSubtypeId}>
                                            <div className="row bg-light my-2 py-1 px-2 border">
                                                <h5 className="my-0">{accountSubtype.accountSubtypeName}</h5>
                                            </div>
                                            <div>
                                                {this.state.accounts.slice()
                                                    .filter(account => account.accountSubtypeId === accountSubtype.accountSubtypeId)
                                                    .map(account => {
                                                        return (
                                                            <div className={"d-flex justify-content-between border-bottom"} key={account.accountId}>
                                                                <span>{account.accountName}</span>
                                                                <span className={account.debitTotal < account.creditTotal ? "text-red" : ""}>
                                                                    {new Intl.NumberFormat(localization.locale, { style: 'currency', currency: localization.currency }).format(account.debitTotal - account.creditTotal)}
                                                                </span>
                                                            </div>
                                                        )
                                                    })}
                                            </div>
                                        </div>
                                    )
                                })}
                        </TabPane>
                        <TabPane tabId="2"> {/* tabId for a tab must be the same as AccountTypeId for that tab */}
                            {this.state.accountSubtypes.slice()
                                .filter((accountSubtype => accountSubtype.accountTypeId === 2))
                                .map((accountSubtype) => {
                                    return (
                                        <div key={accountSubtype.accountSubtypeId}>
                                            <div className="row bg-light my-2 py-1 px-2 border">
                                                <h5 className="my-0">{accountSubtype.accountSubtypeName}</h5>
                                            </div>
                                            <div>
                                                {this.state.accounts.slice()
                                                    .filter(account => account.accountSubtypeId === accountSubtype.accountSubtypeId)
                                                    .map(account => {
                                                        return (
                                                            <div className={"d-flex justify-content-between border-bottom"} key={account.accountId}>
                                                                <span>{account.accountName}</span>
                                                                <span className={account.debitTotal < account.creditTotal ? "text-red" : ""}>
                                                                    {new Intl.NumberFormat(localization.locale, { style: 'currency', currency: localization.currency }).format(account.creditTotal - account.debitTotal)}
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
                            {this.state.accountSubtypes.slice()
                                .filter((accountSubtype => accountSubtype.accountTypeId === 3))
                                .map((accountSubtype) => {
                                    return (
                                        <div key={accountSubtype.accountSubtypeId}>
                                            <div className="row bg-light my-2 py-1 px-2 border">
                                                <h5 className="my-0">{accountSubtype.accountSubtypeName}</h5>
                                            </div>
                                            <div>
                                                {this.state.accounts.slice()
                                                    .filter(account => account.accountSubtypeId === accountSubtype.accountSubtypeId)
                                                    .map(account => {
                                                        return (
                                                            <div className={"d-flex justify-content-between border-bottom"} key={account.accountId}>
                                                                <span>{account.accountName}</span>
                                                                <span className={account.debitTotal < account.creditTotal ? "text-red" : ""}>
                                                                    {new Intl.NumberFormat(localization.locale, { style: 'currency', currency: localization.currency }).format(account.creditTotal - account.debitTotal)}
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
                            {this.state.accounts.slice()
                                .filter((account => account.accountTypeId === 4))
                                .map((account) => {
                                    return (
                                        <div key={account.accountId}>
                                            <div className="row bg-light my-2 py-1 px-2 border">
                                                <h5 className="my-0">{account.accountName}</h5>
                                            </div>
                                            <div>
                                                {this.state.categories.slice()
                                                    .filter(category => category.accountId === account.accountId)
                                                    .map(category => {
                                                        return (
                                                            <div className={"d-flex justify-content-between border-bottom"} key={category.categoryId}>
                                                                <span>{category.categoryName}</span>
                                                                <span className={category.debitTotal < category.creditTotal ? "text-red" : ""}>
                                                                    {new Intl.NumberFormat(localization.locale, { style: 'currency', currency: localization.currency }).format(category.creditTotal - category.debitTotal)}
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
                            {this.state.accounts.slice()
                                .filter((account => account.accountTypeId === 5))
                                .map((account) => {
                                    return (
                                        <div key={account.accountId}>
                                            <div className="row bg-light my-2 py-1 px-2 border">
                                                <h5 className="my-0">{account.accountName}</h5>
                                            </div>
                                            <div>
                                                {this.state.categories.slice()
                                                    .filter(category => category.accountId === account.accountId)
                                                    .map(category => {
                                                        return (
                                                            <div className={"d-flex justify-content-between border-bottom"} key={category.categoryId}>
                                                                <span>{category.categoryName}</span>
                                                                <span className={category.debitTotal < category.creditTotal ? "text-red" : ""}>
                                                                    {new Intl.NumberFormat(localization.locale, { style: 'currency', currency: localization.currency }).format(category.debitTotal - category.creditTotal)}
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

export default Accounts;