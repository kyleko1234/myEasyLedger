import React from 'react';
import { Card, CardBody } from 'reactstrap';
import { PageSettings } from '../../../config/page-settings';
import axios from 'axios';
import {API_BASE_URL} from '../../../utils/constants.js';
import {cashFlowReportText} from '../../../utils/i18n/cash-flow-report-text.js';

function CashFlowRender() {
    const appContext = React.useContext(PageSettings);

    const today = new Date();
    const [startDate, setStartDate] = React.useState(today.getFullYear() + "-01-01");
    const [endDate, setEndDate] = React.useState(today.toISOString().split('T')[0]);
    const [loading, setLoading] = React.useState(true);

    const [cashFlowJson, setCashFlowJson] = React.useState(null);
    const [hasAdjustmentsInOperatingIncome, setHasAdjustmentsInOperatingIncome] = React.useState(false);
    const [hasChangesInOperatingAssetsLiabilities, setHasChangesInOperatingAssetsLiabilities] = React.useState(false);
    const [cashBeginningBalances, setCashBeginningBalances] = React.useState(0);
    const [cashEndingBalances, setCashEndingBalances] = React.useState(0);

    const handleChangeStartDate = date => {
        setStartDate(date);
    }
    const handleChangeEndDate = date => {
        setEndDate(date);
    }

    const numberAsCurrency = (number) => {
        if (number == 0) {
            return new Intl.NumberFormat(appContext.locale, { style: 'currency', currency: appContext.currency }).format(0);
        } else if (number > 0) {
            return new Intl.NumberFormat(appContext.locale, { style: 'currency', currency: appContext.currency }).format(number)
        } else if (number < 0) {
            return "(" + new Intl.NumberFormat(appContext.locale, { style: 'currency', currency: appContext.currency }).format(number * -1) + ")";
        }
    }

    React.useEffect(() => {
        async function fetchData() {
            setLoading(true);
            await axios.get(`${API_BASE_URL}/organization/${appContext.currentOrganizationId}/reports/cashFlow/${startDate}/${endDate}`).then(response => {
                if (response.data) {
                    setCashFlowJson(response.data);
                    if (response.data.depreciationAndAmortization || response.data.deferredTax || response.data.shareBasedCompensation || response.data.nonOperatingIncome) {
                        setHasAdjustmentsInOperatingIncome(true);
                    } else {
                        setHasAdjustmentsInOperatingIncome(false);
                    }
                    if (response.data.receivables || response.data.payables || response.data.inventory || response.data.deferredRevenue || response.data.otherAssets || response.data.otherLiabilities) {
                        setHasChangesInOperatingAssetsLiabilities(true);
                    } else {
                        setHasChangesInOperatingAssetsLiabilities(false);
                    }
                    let beginningCashSubtype = response.data.beginningAccountSubtypeBalances.find(accountSubtype => accountSubtype.accountSubtypeId == response.data.cashAndCashEquivalentsSubtypeId);
                    if (beginningCashSubtype) {
                        setCashBeginningBalances(beginningCashSubtype.debitsMinusCredits);
                    }
                    let endingCashSubtype = response.data.endingAccountSubtypeBalances.find(accountSubtype => accountSubtype.accountSubtypeId == response.data.cashAndCashEquivalentsSubtypeId);
                    if (endingCashSubtype) {
                        setCashEndingBalances(endingCashSubtype.debitsMinusCredits);
                    }
                }
            }).catch(error => {
                console.log(error);
            });
            setLoading(false);
        }
        fetchData();
    }, [startDate, endDate, appContext.currentOrganizationId])

    return (
        <>
            <Card className="bg-light very-rounded shadow-sm my-4">
                <CardBody>
                    <h2 className="h5">{cashFlowReportText[appContext.locale]["Options"]}</h2>
                    <div className="d-sm-flex align-items-center">
                        <div className="d-flex align-items-center mr-3 mb-2 mb-sm-0">
                            <label className="col-3 px-0 mb-0">{cashFlowReportText[appContext.locale]["From:"]}  </label>
                            <input type="date" className="form-control form-control-sm width-150" value={startDate} onChange={event => handleChangeStartDate(event.target.value)} />
                        </div>
                        <div className="d-flex align-items-center mr-3">
                            <label className="col-3 px-0 mb-0">{cashFlowReportText[appContext.locale]["To:"]}</label>
                            <input type="date" className="form-control form-control-sm width-150" value={endDate} onChange={event => handleChangeEndDate(event.target.value)} />
                        </div>
                    </div> 
                </CardBody>
            </Card>
            <div >
                    {loading? <div className="d-flex justify-content-center fa-3x py-3"><i className="fas fa-circle-notch fa-spin"></i></div> : 
                    <div>
                        <div>
                            <div className="striped-row justify-content-between font-weight-600"><div>{cashFlowReportText[appContext.locale]["Cash and cash equivalents, beginning of period"]}</div><div>{numberAsCurrency(cashBeginningBalances)}</div></div>
                            <div className="striped-row"><div className="invisible">spacer</div> {/*spacer row*/}</div>
                            <div className="striped-row font-weight-600">{cashFlowReportText[appContext.locale]["Operating activities"]}</div>
                            <div className="striped-row justify-content-between indent"><div>{cashFlowReportText[appContext.locale]["Net Income"]}</div><div>{numberAsCurrency(cashFlowJson.netIncome)}</div></div>
                            {!hasAdjustmentsInOperatingIncome? null : <div className="striped-row indentfont-weight-600">{cashFlowReportText[appContext.locale]["Adjustments to reconcile operating income to cash generated by operating activities"]}</div>}
                            {!cashFlowJson.depreciationAndAmortization? null : <div className="striped-row justify-content-between indent-2"><div>{cashFlowReportText[appContext.locale]["Depreciation and amortization"]}</div><div>{numberAsCurrency(cashFlowJson.depreciationAndAmortization)}</div></div>}
                            {!cashFlowJson.deferredTax? null : <div className="striped-row justify-content-between indent-2"><div>{cashFlowReportText[appContext.locale]["Increase (decrease) in deferred taxes"]}</div><div>{numberAsCurrency(cashFlowJson.deferredTax)}</div></div>}
                            {!cashFlowJson.shareBasedCompensation? null : <div className="striped-row justify-content-between indent-2"><div>{cashFlowReportText[appContext.locale]["Share-based compensation"]}</div><div>{numberAsCurrency(cashFlowJson.shareBasedCompensation)}</div></div>}
                            {!cashFlowJson.nonOperatingIncome? null : <div className="striped-row justify-content-between indent-2"><div>{cashFlowReportText[appContext.locale]["Adjustment for non-operating loss (income)"]}</div><div>{numberAsCurrency(cashFlowJson.nonOperatingIncome * -1)}</div></div>}
                            {!hasChangesInOperatingAssetsLiabilities? null : <div className="striped-row font-weight-600 indent">{cashFlowReportText[appContext.locale]["Changes in operating assets and liabilities"]}</div>}
                            {!cashFlowJson.receivables? null : <div className="striped-row justify-content-between indent-2"><div>{cashFlowReportText[appContext.locale]["Decrease (increase) in receivables"]}</div><div>{numberAsCurrency(cashFlowJson.receivables * -1)}</div></div>}
                            {!cashFlowJson.payables? null : <div className="striped-row justify-content-between indent-2"><div>{cashFlowReportText[appContext.locale]["Increase (decrease) in payables"]}</div><div>{numberAsCurrency(cashFlowJson.payables)}</div></div>}
                            {!cashFlowJson.inventory? null : <div className="striped-row justify-content-between indent-2"><div>{cashFlowReportText[appContext.locale]["Decrease (increase) in inventory"]}</div><div>{numberAsCurrency(cashFlowJson.inventory * -1)}</div></div>}
                            {!cashFlowJson.deferredRevenue? null : <div className="striped-row justify-content-between indent-2"><div>{cashFlowReportText[appContext.locale]["Increase (decrease) in deferred revenue"]}</div><div>{numberAsCurrency(cashFlowJson.deferredRevenue)}</div></div>}
                            {!cashFlowJson.otherAssets? null : <div className="striped-row justify-content-between indent-2"><div>{cashFlowReportText[appContext.locale]["Decrease (increase) in other assets"]}</div><div>{numberAsCurrency(cashFlowJson.otherAssets * -1)}</div></div>}
                            {!cashFlowJson.otherLiabilities? null : <div className="striped-row justify-content-between indent-2"><div>{cashFlowReportText[appContext.locale]["Increase (decrease) in other liabilities"]}</div><div>{numberAsCurrency(cashFlowJson.otherLiabilities)}</div></div>}
                            <div className="striped-row justify-content-between font-weight-600"><div>{cashFlowReportText[appContext.locale]["Cash flow from operations"]}</div><div>{numberAsCurrency(cashFlowJson.cashFlowFromOperations)}</div></div>
                            <div className="striped-row"><div className="invisible">spacer</div> {/*spacer row*/}</div>
                            <div className="striped-row font-weight-600">{cashFlowReportText[appContext.locale]["Investing activities"]}</div>
                            {!cashFlowJson.netIncomeFromInvesting? null : <div className="striped-row justify-content-between indent"><div>{cashFlowReportText[appContext.locale]["Income (loss) from investing, net"]}</div><div>{numberAsCurrency(cashFlowJson.netIncomeFromInvesting)}</div></div>}
                            {!cashFlowJson.marketableSecurities? null : <div className="striped-row justify-content-between indent"><div>{cashFlowReportText[appContext.locale]["Decrease (increase) in marketable securities"]}</div><div>{numberAsCurrency(cashFlowJson.marketableSecurities * -1)}</div></div>}
                            {!cashFlowJson.propertyPlantAndEquipment? null : <div className="striped-row justify-content-between indent"><div>{cashFlowReportText[appContext.locale]["Decrease (increase) in property, plant, and equipment"]}</div><div>{numberAsCurrency(cashFlowJson.propertyPlantAndEquipment * -1)}</div></div>}
                            <div className="striped-row justify-content-between font-weight-600"><div>{cashFlowReportText[appContext.locale]["Cash flow from investing"]}</div><div>{numberAsCurrency(cashFlowJson.cashFlowFromInvesting)}</div></div>
                            <div className="striped-row"><div className="invisible">spacer</div> {/*spacer row*/}</div>
                            <div className="striped-row font-weight-600">{cashFlowReportText[appContext.locale]["Financing activities"]}</div>
                            {!cashFlowJson.netIncomeFromFinancing? null : <div className="striped-row justify-content-between indent"><div>{cashFlowReportText[appContext.locale]["Income (loss) from financing activities, net"]}</div><div>{numberAsCurrency(cashFlowJson.netIncomeFromFinancing * -1)}</div></div>}
                            {!cashFlowJson.paidInCapital? null : <div className="striped-row justify-content-between indent"><div>{cashFlowReportText[appContext.locale]["Increase (decrease) in paid-in capital"]}</div><div>{numberAsCurrency(cashFlowJson.paidInCapital)}</div></div>}
                            {!cashFlowJson.otherEquity? null : <div className="striped-row justify-content-between indent"><div>{cashFlowReportText[appContext.locale]["Increase (decrease) in other equity"]}</div><div>{numberAsCurrency(cashFlowJson.otherEquity)}</div></div>}
                            {!cashFlowJson.dividendPayments? null : <div className="striped-row justify-content-between indent"><div>{cashFlowReportText[appContext.locale]["Payments for dividends and equivalents"]}</div><div>{numberAsCurrency(cashFlowJson.dividendPayments * -1)}</div></div>}
                            {!cashFlowJson.debt? null : <div className="striped-row justify-content-between indent"><div>{cashFlowReportText[appContext.locale]["Increase (decrease) in debt"]}</div><div>{numberAsCurrency(cashFlowJson.debt)}</div></div>}
                            <div className="striped-row justify-content-between font-weight-600"><div>{cashFlowReportText[appContext.locale]["Cash flow from financing"]}</div><div>{numberAsCurrency(cashFlowJson.cashFlowFromFinancing)}</div></div>
                            <div className="striped-row"><div className="invisible">spacer</div> {/*spacer row*/}</div>
                            <div className="striped-row justify-content-between font-weight-600"><div>{cashFlowReportText[appContext.locale]["Increase (decrease) in cash and equivalents"]}</div><div>{numberAsCurrency(cashFlowJson.cashFlow)}</div></div>
                            <div className="striped-row justify-content-between font-weight-600"><div>{cashFlowReportText[appContext.locale]["Cash and cash equivalents, end of period"]}</div><div>{numberAsCurrency(cashEndingBalances)}</div></div>
                        </div>
                    </div>
                    }
            </div>

        </>
    )
}

export default CashFlowRender;