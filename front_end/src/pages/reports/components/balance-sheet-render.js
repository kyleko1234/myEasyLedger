import React from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../../../utils/constants';
import { PageSettings } from '../../../config/page-settings';
import { balanceSheetRenderText } from '../../../utils/i18n/balance-sheet-render-text.js';
import { Card, CardBody } from 'reactstrap';

function BalanceSheetRender() {
    const appContext = React.useContext(PageSettings);

    const today = new Date();
    const [endDate, setEndDate] = React.useState(today.toISOString().split('T')[0]);
    const [loading, setLoading] = React.useState(true);

    const [detailedView, setDetailedView] = React.useState(false);
    const toggleDetailedView = () => setDetailedView(!detailedView);

    const [asOfDate, setAsOfDate] = React.useState("");
    const [prevPeriodEndDate, setPrevPeriodEndDate] = React.useState("");
    const [currPeriodStartDate, setCurrPeriodStartDate] = React.useState("");
    const [balanceSheetAssets, setBalanceSheetAssets] = React.useState(null);
    const [balanceSheetLiabilities, setBalanceSheetLiabilities] = React.useState(null);
    const [balanceSheetEquity, setBalanceSheetEquity] = React.useState(null);


    const [accountBalances, setAccountBalances] = React.useState([]);

    const handleChangeDate = date => {
        setEndDate(date);
    }

    const numberAsCurrency = (number) => {
        if (number == 0) {
            return new Intl.NumberFormat(appContext.locale, { style: 'currency', currency: appContext.currency }).format(0);
        }
        return new Intl.NumberFormat(appContext.locale, { style: 'currency', currency: appContext.currency }).format(number)
    }


    React.useEffect(() => {
        async function fetchData() {
            setLoading(true);
            await axios.get(`${API_BASE_URL}/organization/${appContext.currentOrganizationId}/reports/balanceSheet/${endDate}`).then(response => {
                if (response.data) {
                    setAsOfDate(response.data.asOfDate);
                    setPrevPeriodEndDate(response.data.prevPeriodEndDate);
                    setCurrPeriodStartDate(response.data.currPeriodStartDate);
                    setBalanceSheetAssets(response.data.balanceSheetAssets);
                    setBalanceSheetLiabilities(response.data.balanceSheetLiabilities);
                    setBalanceSheetEquity(response.data.balanceSheetEquity);
                    setAccountBalances(response.data.accountBalances);
                }
            }).catch(error => {
                console.log(error);
            })
            setLoading(false);
        }
        fetchData();
    }, [endDate])

    return (
        <>
            <Card className="bg-light shadow-sm very-rounded my-4">
                <CardBody>
                    <h2 className="h5">{balanceSheetRenderText[appContext.locale]["Options"]}</h2>
                    <div className="d-flex mb-2 align-items-center">
                        <div className="d-flex align-items-center">
                            <label className="col-3 px-0">{balanceSheetRenderText[appContext.locale]["As of:"]} </label>
                            <input type="date" className="form-control form-control-sm align-self-center width-150" value={endDate} onChange={event => handleChangeDate(event.target.value)} />
                        </div>
                    </div>
                    <div className="custom-control custom-switch">
                        <input type="checkbox" id="detailedViewCheckbox" className="custom-control-input" value={detailedView} onChange={toggleDetailedView} />
                        <label htmlFor="detailedViewCheckbox" className="my-0 custom-control-label">{balanceSheetRenderText[appContext.locale]["Detailed View"]}</label>
                    </div>
                </CardBody>
            </Card>
            <div>
                {loading ? <div className="d-flex justify-content-center fa-3x py-3"><i className="fas fa-circle-notch fa-spin"></i></div> :
                    <>
                        <div className="striped-row font-weight-600">{balanceSheetRenderText[appContext.locale]["Assets"]}</div>
                        <div className="striped-row font-weight-600 indent">{balanceSheetRenderText[appContext.locale]["Current assets"]}</div>
                        {balanceSheetAssets.currentAssetsSubtypeBalances.map(subtypeBalance => {
                            return (
                                <React.Fragment key={subtypeBalance.accountSubtypeId}>
                                    <div className="striped-row justify-content-between indent-2">
                                        <div>{balanceSheetRenderText[appContext.locale][subtypeBalance.accountSubtypeName]}</div>
                                        <div>{numberAsCurrency(subtypeBalance.debitsMinusCredits)}</div>
                                    </div>
                                    {detailedView ?
                                        accountBalances
                                            .filter(account => account.accountSubtypeId === subtypeBalance.accountSubtypeId)
                                            .map(account => {
                                                return (
                                                    <React.Fragment key={account.accountId}>
                                                        <div className="striped-row justify-content-between indent-3">
                                                            <div>{account.accountName}</div><div>{account.hasChildren ? null : numberAsCurrency(account.debitsMinusCredits)}</div>
                                                        </div>
                                                        {accountBalances
                                                            .filter(childAccount => childAccount.parentAccountId === account.accountId)
                                                            .map(childAccount => {
                                                                return (
                                                                    <div className="striped-row justify-content-between indent-4" key={childAccount.accountId}>
                                                                        <div>{childAccount.accountName}</div><div>{numberAsCurrency(childAccount.debitsMinusCredits)}</div>
                                                                    </div>
                                                                )
                                                            })
                                                        }
                                                    </React.Fragment>
                                                )
                                            })
                                        : null}
                                </React.Fragment>
                            )
                        })}
                        <div className="striped-row font-weight-600 indent-3 justify-content-between">
                            <div>{balanceSheetRenderText[appContext.locale]["Total current assets"]}</div><div>{numberAsCurrency(balanceSheetAssets.totalCurrentAssets)}</div>
                        </div>
                        <div className="striped-row font-weight-600 indent">{balanceSheetRenderText[appContext.locale]["Non-current assets"]}</div>
                        {balanceSheetAssets.nonCurrentAssetsSubtypeBalances.map(subtypeBalance => {
                            return (
                                <React.Fragment key={subtypeBalance.accountSubtypeId}>
                                    <div className="striped-row justify-content-between indent-2">
                                        <div>{balanceSheetRenderText[appContext.locale][subtypeBalance.accountSubtypeName]}</div><div>{numberAsCurrency(subtypeBalance.debitsMinusCredits)}</div>
                                    </div>
                                    {detailedView ?
                                        accountBalances
                                            .filter(account => account.accountSubtypeId === subtypeBalance.accountSubtypeId)
                                            .map(account => {
                                                return (
                                                    <React.Fragment key={account.accountId}>
                                                        <div className="striped-row justify-content-between indent-3">
                                                            <div>{account.accountName}</div><div>{account.hasChildren ? null : numberAsCurrency(account.debitsMinusCredits)}</div>
                                                        </div>
                                                        {accountBalances
                                                            .filter(childAccount => childAccount.parentAccountId === account.accountId)
                                                            .map(childAccount => {
                                                                return (
                                                                    <div key={childAccount.accountId} className="striped-row justify-content-between indent-4">
                                                                        <div>{childAccount.accountName}</div><div>{numberAsCurrency(childAccount.debitsMinusCredits)}</div>
                                                                    </div>
                                                                )
                                                            })
                                                        }
                                                    </React.Fragment>
                                                )
                                            })
                                        : null}
                                </React.Fragment>
                            )
                        })}
                        <div className="striped-row justify-content-between font-weight-600 indent">
                            <div>{balanceSheetRenderText[appContext.locale]["Total non-current assets"]}</div><div>{numberAsCurrency(balanceSheetAssets.totalNonCurrentAssets)}</div>
                        </div>
                        <div className="striped-row justify-content-between font-weight-600">
                            <div>{balanceSheetRenderText[appContext.locale]["Total assets"]}</div><div>{numberAsCurrency(balanceSheetAssets.totalAssets)}</div>
                        </div>
                    </>
                }
                <div className="striped-row"><div className="invisible">{/*empty row */}empty row</div></div>
                {loading ? <div className="d-flex justify-content-center fa-3x py-3"><i className="fas fa-circle-notch fa-spin"></i></div> :
                    <>
                        <div className="striped-row font-weight-600">{balanceSheetRenderText[appContext.locale]["Liabilities"]}</div>
                        <div className="striped-row font-weight-600 indent">{balanceSheetRenderText[appContext.locale]["Current liabilities"]}</div>
                        {balanceSheetLiabilities.currentLiabilitiesSubtypeBalances.map(subtypeBalance => {
                            return (
                                <React.Fragment key={subtypeBalance.accountSubtypeId}>
                                    <div className="striped-row justify-content-between indent-2">
                                        <div>{balanceSheetRenderText[appContext.locale][subtypeBalance.accountSubtypeName]}</div>
                                        <div>{numberAsCurrency(subtypeBalance.debitsMinusCredits * -1)}</div>
                                    </div>
                                    {detailedView ?
                                        accountBalances
                                            .filter(account => account.accountSubtypeId === subtypeBalance.accountSubtypeId)
                                            .map(account => {
                                                return (
                                                    <React.Fragment key={account.accountId}>
                                                        <div className="striped-row justify-content-between indent-3">
                                                            <div>{account.accountName}</div><div>{account.hasChildren ? null : numberAsCurrency(account.debitsMinusCredits * -1)}</div>
                                                        </div>
                                                        {accountBalances
                                                            .filter(childAccount => childAccount.parentAccountId === account.accountId)
                                                            .map(childAccount => {
                                                                return (
                                                                    <div className="striped-row justify-content-between indent-4" key={childAccount.accountId}>
                                                                        <div>{childAccount.accountName}</div><div>{numberAsCurrency(childAccount.debitsMinusCredits * -1)}</div>
                                                                    </div>
                                                                )
                                                            })
                                                        }
                                                    </React.Fragment>
                                                )
                                            })
                                        : null}
                                </React.Fragment>
                            )
                        })}
                        <div className="striped-row font-weight-600 indent-3 justify-content-between">
                            <div>{balanceSheetRenderText[appContext.locale]["Total current liabilities"]}</div><div>{numberAsCurrency(balanceSheetLiabilities.totalCurrentLiabilities)}</div>
                        </div>
                        <div className="striped-row font-weight-600 indent">{balanceSheetRenderText[appContext.locale]["Non-current liabilities"]}</div>
                        {balanceSheetLiabilities.nonCurrentLiabilitiesSubtypeBalances.map(subtypeBalance => {
                            return (
                                <React.Fragment key={subtypeBalance.accountSubtypeId}>
                                    <div className="striped-row justify-content-between indent-2">
                                        <div>{balanceSheetRenderText[appContext.locale][subtypeBalance.accountSubtypeName]}</div><div>{numberAsCurrency(subtypeBalance.debitsMinusCredits * -1)}</div>
                                    </div>
                                    {detailedView ?
                                        accountBalances
                                            .filter(account => account.accountSubtypeId === subtypeBalance.accountSubtypeId)
                                            .map(account => {
                                                return (
                                                    <React.Fragment key={account.accountId}>
                                                        <div className="striped-row justify-content-between indent-3">
                                                            <div>{account.accountName}</div><div>{account.hasChildren ? null : numberAsCurrency(account.debitsMinusCredits * -1)}</div>
                                                        </div>
                                                        {accountBalances
                                                            .filter(childAccount => childAccount.parentAccountId === account.accountId)
                                                            .map(childAccount => {
                                                                return (
                                                                    <div key={childAccount.accountId} className="striped-row justify-content-between indent-4">
                                                                        <div>{childAccount.accountName}</div><div>{numberAsCurrency(childAccount.debitsMinusCredits * -1)}</div>
                                                                    </div>
                                                                )
                                                            })
                                                        }
                                                    </React.Fragment>
                                                )
                                            })
                                        : null}
                                </React.Fragment>
                            )
                        })}
                        <div className="striped-row justify-content-between font-weight-600 indent">
                            <div>{balanceSheetRenderText[appContext.locale]["Total non-current liabilities"]}</div><div>{numberAsCurrency(balanceSheetLiabilities.totalNonCurrentLiabilities)}</div>
                        </div>
                        <div className="striped-row justify-content-between font-weight-600">
                            <div>{balanceSheetRenderText[appContext.locale]["Total liabilities"]}</div><div>{numberAsCurrency(balanceSheetLiabilities.totalLiabilities)}</div>
                        </div>
                    </>
                }
                <div className="striped-row"><div className="invisible">{/*empty row */}empty row</div></div>
                {loading ? <div className="d-flex justify-content-center fa-3x py-3"><i className="fas fa-circle-notch fa-spin"></i></div> :
                    <>
                        <div className="striped-row font-weight-600">{balanceSheetRenderText[appContext.locale]["Equity"]}</div>
                        {balanceSheetEquity.equityItemsSubtypeBalances.map(subtypeBalance => {
                            return (
                                <React.Fragment key={subtypeBalance.accountSubtypeId}>
                                    <div className="striped-row justify-content-between indent">
                                        <div>{balanceSheetRenderText[appContext.locale][subtypeBalance.accountSubtypeName]}</div><div>{numberAsCurrency(subtypeBalance.debitsMinusCredits * -1)}</div>
                                    </div>
                                    {detailedView ?
                                        accountBalances
                                            .filter(account => account.accountSubtypeId === subtypeBalance.accountSubtypeId)
                                            .map(account => {
                                                return (
                                                    <React.Fragment key={account.accountId}>
                                                        <div className="striped-row justify-content-between indent-2">
                                                            <div>{account.accountName}</div><div>{account.hasChildren ? null : numberAsCurrency(account.debitsMinusCredits * -1)}</div>
                                                        </div>
                                                        {accountBalances
                                                            .filter(childAccount => childAccount.parentAccountId === account.accountId)
                                                            .map(childAccount => {
                                                                return (
                                                                    <div key={childAccount.accountId} className="striped-row justify-content-between indent-3">
                                                                        <div>{childAccount.accountName}</div><div>{numberAsCurrency(childAccount.debitsMinusCredits * -1)}</div>
                                                                    </div>
                                                                )
                                                            })
                                                        }
                                                    </React.Fragment>
                                                )
                                            })
                                        : null}
                                    <div className="striped-row indent font-weight-600">{balanceSheetRenderText[appContext.locale]["Retained Earnings"]}</div>
                                    <div className="striped-row justify-content-between indent-2">
                                        <div>{balanceSheetRenderText[appContext.locale]["Beginning balances"](prevPeriodEndDate)}</div><div>{numberAsCurrency(balanceSheetEquity.prevPeriodRetainedEarnings)}</div>
                                    </div>
                                    <div className="striped-row justify-content-between indent-2">
                                        <div>{balanceSheetRenderText[appContext.locale]["Net income for current period"](currPeriodStartDate, asOfDate)}</div><div>{numberAsCurrency(balanceSheetEquity.currPeriodNetIncome)}</div>
                                    </div>
                                    <div className="striped-row justify-content-between indent-2">
                                        <div>{balanceSheetRenderText[appContext.locale]["Dividends for current period"](currPeriodStartDate, asOfDate)}</div><div>{numberAsCurrency(balanceSheetEquity.currPeriodDividendsAndEquivalents)}</div>
                                    </div>
                                    <div className="striped-row justify-content-between indent-3 font-weight-600">
                                        <div>{balanceSheetRenderText[appContext.locale]["Ending balances of retained earnings"]}</div><div>{numberAsCurrency(balanceSheetEquity.totalRetainedEarnings)}</div>
                                    </div>
                                    <div className="striped-row font-weight-600 justify-content-between">
                                        <div>{balanceSheetRenderText[appContext.locale]["Total equity"]}</div><div>{numberAsCurrency(balanceSheetEquity.totalEquity)}</div>
                                    </div>
                                </React.Fragment>
                            )
                        })}
                    </>
                }
            </div>
        </>


    )
}

export default BalanceSheetRender;