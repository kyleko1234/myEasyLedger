import React from 'react';
import { Widget, WidgetHeader } from '../../../components/widget/widget';
import { PageSettings } from '../../../config/page-settings';
import axios from 'axios';
import {API_BASE_URL} from '../../../utils/constants.js';

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
        <Widget>
            <WidgetHeader className="bg-light">
                <div className="align-self-center">Cash Flow Report</div>
                <div className="d-flex align-items-center">
                    <label className="ml-sm-5 px-1 m-b-0">From:  </label>
                    <input type="date" className="form-control form-control-sm width-125" value={startDate} onChange={event => handleChangeStartDate(event.target.value)} />
                    <label className="ml-sm-5 px-1 m-b-0">To:</label>
                    <input type="date" className="form-control form-control-sm width-125" value={endDate} onChange={event => handleChangeEndDate(event.target.value)} />
                </div> 
            </WidgetHeader>
                <div>
                    {loading? <div className="d-flex justify-content-center fa-3x py-3"><i className="fas fa-circle-notch fa-spin"></i></div> : 
                    <div>
                        <table className="table table-striped m-b-0">
                            <tbody>
                                <tr><td className="d-flex justify-content-between font-weight-600"><div>Cash and cash equivalents, beginning of period</div><div>{numberAsCurrency(cashBeginningBalances)}</div></td></tr>
                                <tr><td><div className="invisible">spacer</div> {/*spacer row*/}</td></tr>
                                <tr><td className="font-weight-600">Operating activities</td></tr>
                                <tr><td className="d-flex justify-content-between p-l-30"><div>Net Income</div><div>{numberAsCurrency(cashFlowJson.netIncome)}</div></td></tr>
                                {!hasAdjustmentsInOperatingIncome? null : <tr><td className="p-l-30 font-weight-600">Adjustments to reconcile operating income to cash generated by operating activities:</td></tr>}
                                {!cashFlowJson.depreciationAndAmortization? null : <tr><td className="d-flex justify-content-between p-l-60"><div>Depreciation and amortization</div><div>{numberAsCurrency(cashFlowJson.depreciationAndAmortization)}</div></td></tr>}
                                {!cashFlowJson.deferredTax? null : <tr><td className="d-flex justify-content-between p-l-60"><div>Increase (decrease) in deferred taxes</div><div>{numberAsCurrency(cashFlowJson.deferredTax)}</div></td></tr>}
                                {!cashFlowJson.shareBasedCompensation? null : <tr><td className="d-flex justify-content-between p-l-60"><div>Share-based compensation</div><div>{numberAsCurrency(cashFlowJson.shareBasedCompensation)}</div></td></tr>}
                                {!cashFlowJson.nonOperatingIncome? null : <tr><td className="d-flex justify-content-between p-l-60"><div>Adjustment for non-operating loss (income)</div><div>{numberAsCurrency(cashFlowJson.nonOperatingIncome * -1)}</div></td></tr>}
                                {!hasChangesInOperatingAssetsLiabilities? null : <tr><td className="font-weight-600 p-l-30">Changes in operating assets and liabilities</td></tr>}
                                {!cashFlowJson.receivables? null : <tr><td className="d-flex justify-content-between p-l-60"><div>Decrease (increase) in receivables</div><div>{numberAsCurrency(cashFlowJson.receivables * -1)}</div></td></tr>}
                                {!cashFlowJson.payables? null : <tr><td className="d-flex justify-content-between p-l-60"><div>Increase (decrease) in payables</div><div>{numberAsCurrency(cashFlowJson.payables)}</div></td></tr>}
                                {!cashFlowJson.inventory? null : <tr><td className="d-flex justify-content-between p-l-60"><div>Decrease (increase) in inventory</div><div>{numberAsCurrency(cashFlowJson.inventory * -1)}</div></td></tr>}
                                {!cashFlowJson.deferredRevenue? null : <tr><td className="d-flex justify-content-between p-l-60"><div>Increase (decrease) in deferred revenue</div><div>{numberAsCurrency(cashFlowJson.deferredRevenue)}</div></td></tr>}
                                {!cashFlowJson.otherAssets? null : <tr><td className="d-flex justify-content-between p-l-60"><div>Decrease (increase) in other assets</div><div>{numberAsCurrency(cashFlowJson.otherAssets * -1)}</div></td></tr>}
                                {!cashFlowJson.otherLiabilities? null : <tr><td className="d-flex justify-content-between p-l-60"><div>Increase (decrease) in other liabilities</div><div>{numberAsCurrency(cashFlowJson.otherLiabilities)}</div></td></tr>}
                                <tr><td className="d-flex justify-content-between font-weight-600"><div>Cash flow from operations</div><div>{numberAsCurrency(cashFlowJson.cashFlowFromOperations)}</div></td></tr>
                                <tr><td><div className="invisible">spacer</div> {/*spacer row*/}</td></tr>
                                <tr><td className="font-weight-600">Investing activities</td></tr>
                                {!cashFlowJson.netIncomeFromInvesting? null : <tr><td className="d-flex justify-content-between p-l-30"><div>Income (loss) from investing, net</div><div>{numberAsCurrency(cashFlowJson.netIncomeFromInvesting)}</div></td></tr>}
                                {!cashFlowJson.marketableSecurities? null : <tr><td className="d-flex justify-content-between p-l-30"><div>Decrease (increase) in marketable securities</div><div>{numberAsCurrency(cashFlowJson.marketableSecurities * -1)}</div></td></tr>}
                                {!cashFlowJson.propertyPlantAndEquipment? null : <tr><td className="d-flex justify-content-between p-l-30"><div>Decrease (increase) in property, plant, and equipment</div><div>{numberAsCurrency(cashFlowJson.propertyPlantAndEquipment * -1)}</div></td></tr>}
                                <tr><td className="d-flex justify-content-between font-weight-600"><div>Cash flow from investing</div><div>{numberAsCurrency(cashFlowJson.cashFlowFromInvesting)}</div></td></tr>
                                <tr><td><div className="invisible">spacer</div> {/*spacer row*/}</td></tr>
                                <tr><td className="font-weight-600">Financing activities</td></tr>
                                {!cashFlowJson.netIncomeFromFinancing? null : <tr><td className="d-flex justify-content-between p-l-30"><div>Income (loss) from financing activities, net</div><div>{numberAsCurrency(cashFlowJson.netIncomeFromFinancing * -1)}</div></td></tr>}
                                {!cashFlowJson.paidInCapital? null : <tr><td className="d-flex justify-content-between p-l-30"><div>Increase (decrease) in paid-in capital</div><div>{numberAsCurrency(cashFlowJson.paidInCapital)}</div></td></tr>}
                                {!cashFlowJson.otherEquity? null : <tr><td className="d-flex justify-content-between p-l-30"><div>Increase (decrease) in other equity</div><div>{numberAsCurrency(cashFlowJson.otherEquity)}</div></td></tr>}
                                {!cashFlowJson.dividendPayments? null : <tr><td className="d-flex justify-content-between p-l-30"><div>Payments for dividends and equivalents</div><div>{numberAsCurrency(cashFlowJson.dividendPayments * -1)}</div></td></tr>}
                                {!cashFlowJson.debt? null : <tr><td className="d-flex justify-content-between p-l-30"><div>Increase (decrease) in debt</div><div>{numberAsCurrency(cashFlowJson.debt)}</div></td></tr>}
                                <tr><td className="d-flex justify-content-between font-weight-600"><div>Cash flow from financing</div><div>{numberAsCurrency(cashFlowJson.cashFlowFromFinancing)}</div></td></tr>
                                <tr><td><div className="invisible">spacer</div> {/*spacer row*/}</td></tr>
                                <tr><td className="d-flex justify-content-between font-weight-600"><div>Increase (decrease) in cash and equivalents</div><div>{numberAsCurrency(cashFlowJson.cashFlow)}</div></td></tr>
                                <tr><td className="d-flex justify-content-between font-weight-600"><div>Cash and cash equivalents, end of period</div><div>{numberAsCurrency(cashEndingBalances)}</div></td></tr>

                            </tbody>
                        </table>
                    </div>
                    }
                </div>

        </Widget>
    )
}

export default CashFlowRender;