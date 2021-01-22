import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { API_BASE_URL} from '../../../utils/constants';
import { PageSettings } from '../../../config/page-settings';

function BalanceSheetRender() {
    const appContext = React.useContext(PageSettings);

    const today = new Date();
    const [endDate, setEndDate] = React.useState(today.toISOString().split('T')[0]);
    const [previousPeriodEndDate, setPreviousPeriodEndDate] = React.useState(today.getFullYear - 1 + "-12-31");
    const [currentPeriodStartDate, setCurrentPeriodStartDate] = React.useState(today.getFullYear + "-01-01");
    const [loading, setLoading] = React.useState(true);
    const [accountBalances, setAccountBalances] = React.useState([]);
    const [previousPeriodAccountBalances, setPreviousPeriodAccountBalances] = React.useState([]);
    const [currentPeriodAccountBalances, setCurrentPeriodAccountBalances] = React.useState([]);
    const [accountGroups, setAccountGroups] = React.useState([]);
    const [accountSubtypes, setAccountSubtypes] = React.useState([]);
    
    const handleChangeDate = date => {
        setEndDate(date);
        setCurrentPeriodStartDate(date.slice(0, 4) + "-01-01");
        setPreviousPeriodEndDate(parseInt(date.slice(0, 4)) - 1 + "-12-31");
    }

    const numberAsCurrency = (number) => {
        if (number == 0) {
            return new Intl.NumberFormat(appContext.locale, { style: 'currency', currency: appContext.currency }).format(0);
        }
        return new Intl.NumberFormat(appContext.locale, { style: 'currency', currency: appContext.currency }).format(number)
    }

    
    const totalDebitsMinusCreditsForType = (accountTypeId) => {
        let debitTotal = 0;
        let creditTotal = 0;
        accountBalances.filter(accountBalance => accountBalance.accountTypeId === accountTypeId).forEach(accountBalance => {
            debitTotal += accountBalance.debitTotal;
            creditTotal += accountBalance.creditTotal;
        })
        return debitTotal - creditTotal;
    }


    React.useEffect(() => {
        async function fetchData() {
            setLoading(true);
            await axios.get(`${API_BASE_URL}/organization/${appContext.currentOrganization}/accountBalance/${endDate}`).then(response => {
                if (response.data) {
                    setAccountBalances(response.data);
                }
            }).catch(error => {
                console.log(error);
            })
            await axios.get(`${API_BASE_URL}/organization/${appContext.currentOrganization}/accountSubtype`).then(response => {
                if (response.data) {
                    setAccountSubtypes(response.data);
                }
            }).catch(error => {
                console.log(error);
            })
            setLoading(false);
        }
        fetchData();
    }, [endDate])

    return (
        <div className="widget widget-rounded m-b-30">
            <div className="widget-header bg-light border-bottom">
                <h4 className="widget-header-title width-half">Balance Sheet</h4>
                <span className="widget-header-title d-flex flex-row justify-content-end">
                         <label className="col-form-label px-2 width-125 text-right">As of: </label>
                         <input type="date" className="form-control form-control-sm align-self-center width-125" value={endDate} onChange={event => handleChangeDate(event.target.value)}/>
                </span>
            </div>
            <div className="px-2">
                {loading? "Loading..." : 
                /* <div>
                    <table className="table m-b-30">
                        <thead>
                            <tr>
                                <th>Assets</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="p-l-30">
                                    {accountSubtypes.filter(accountSubtype => accountSubtype.accountTypeId === 1).map(accountSubtype => {
                                        return (
                                            <table className="table table-nested" key={accountSubtype.accountSubtypeId}>
                                                <thead>
                                                    <tr>
                                                        <th>{accountSubtype.accountSubtypeName}</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {accountBalances.filter(accountBalance => accountBalance.accountSubtypeId === accountSubtype.accountSubtypeId).map(accountBalance => {
                                                        return (
                                                            <tr key={accountBalance.accountId}>
                                                                <td className="d-flex justify-content-between p-l-30">
                                                                    <span>{accountBalance.accountName}</span>
                                                                    <span>{numberAsCurrency(accountBalance.debitTotal - accountBalance.creditTotal)}</span>
                                                                </td>
                                                            </tr>
                                                        )
                                                    })}
                                                </tbody>
                                                <tfoot>
                                                    <tr>
                                                        <td className="d-flex justify-content-between">
                                                            <span>{"Total " + accountSubtype.accountSubtypeName} </span>
                                                            <span>{numberAsCurrency(totalDebitsMinusCreditsForSubtype(accountSubtype.accountSubtypeId))}</span>
                                                        </td>
                                                    </tr>
                                                </tfoot>
                                            </table>
                                        )
                                    })}
                                </td>
                            </tr>
                        </tbody>
                        <tfoot>
                            <tr>
                                <td className="d-flex justify-content-between border-top">
                                    <span>Total Assets</span>
                                    <span>{numberAsCurrency(totalDebitsMinusCreditsForType(1))}</span>
                                </td>
                            </tr>
                        </tfoot>
                    </table>
                    <table className="table m-b-30">
                        <thead>
                            <tr>
                                <th>Liabilities</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="p-l-30">
                                    {accountSubtypes.filter(accountSubtype => accountSubtype.accountTypeId === 2).map(accountSubtype => {
                                        return (
                                            <table className="table table-nested" key={accountSubtype.accountSubtypeId}>
                                                <thead>
                                                    <tr>
                                                        <th>{accountSubtype.accountSubtypeName}</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {accountBalances.filter(accountBalance => accountBalance.accountSubtypeId === accountSubtype.accountSubtypeId).map(accountBalance => {
                                                        return (
                                                            <tr key={accountBalance.accountId}>
                                                                <td className="d-flex justify-content-between p-l-30">
                                                                    <span>{accountBalance.accountName}</span>
                                                                    <span>{numberAsCurrency(accountBalance.creditTotal - accountBalance.debitTotal)}</span>
                                                                </td>
                                                            </tr>
                                                        )
                                                    })}
                                                </tbody>
                                                <tfoot>
                                                    <tr>
                                                        <td className="d-flex justify-content-between">
                                                            <span>{"Total " + accountSubtype.accountSubtypeName} </span>
                                                            <span>{numberAsCurrency(totalDebitsMinusCreditsForSubtype(accountSubtype.accountSubtypeId) * -1)}</span>
                                                        </td>
                                                    </tr>
                                                </tfoot>
                                            </table>
                                        )
                                    })}
                                </td>
                            </tr>
                        </tbody>
                        <tfoot>
                            <tr>
                                <td className="d-flex justify-content-between border-top">
                                    <span>Total Liabilities</span>
                                    <span>{numberAsCurrency(totalDebitsMinusCreditsForType(2) * -1)}</span>
                                </td>
                            </tr>
                        </tfoot>
                    </table>
                    <table className="table m-b-30">
                        <thead>
                            <tr>
                                <th>Equity</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="p-l-30">
                                    {accountSubtypes.filter(accountSubtype => accountSubtype.accountTypeId === 3).map(accountSubtype => {
                                        return (
                                            <table className="table table-nested" key={accountSubtype.accountSubtypeId}>
                                                <thead>
                                                    <tr>
                                                        <th>{accountSubtype.accountSubtypeName}</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {accountBalances.filter(accountBalance => accountBalance.accountSubtypeId === accountSubtype.accountSubtypeId).map(accountBalance => {
                                                        return (
                                                            <tr key={accountBalance.accountId}>
                                                                <td className="d-flex justify-content-between p-l-30">
                                                                    <span>{accountBalance.accountName}</span>
                                                                    <span>{numberAsCurrency(accountBalance.creditTotal - accountBalance.debitTotal)}</span>
                                                                </td>
                                                            </tr>
                                                        )
                                                    })}
                                                </tbody>
                                                <tfoot>
                                                    <tr>
                                                        <td className="d-flex justify-content-between">
                                                            <span>{"Total " + accountSubtype.accountSubtypeName} </span>
                                                            <span>{numberAsCurrency(totalDebitsMinusCreditsForSubtype(accountSubtype.accountSubtypeId) * -1)}</span>
                                                        </td>
                                                    </tr>
                                                </tfoot>
                                            </table>
                                        )
                                    })}
                                </td>
                            </tr>
                        </tbody>
                        <tfoot>
                            <tr>
                                <td className="d-flex justify-content-between border-top">
                                    <span>Total Equity</span>
                                    <span>{numberAsCurrency(totalDebitsMinusCreditsForType(3) * -1)}</span>
                                </td>
                            </tr>
                        </tfoot>
                    </table>

                </div> */ "Coming soon"
                }
            </div>
        </div>


    )
}

export default BalanceSheetRender;