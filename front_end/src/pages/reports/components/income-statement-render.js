import React from 'react';
import { PageSettings } from '../../../config/page-settings';
import { API_BASE_URL} from '../../../utils/constants';
import axios from 'axios';
import {incomeStatementRenderText} from '../../../utils/i18n/income-statement-render-text';

/**
 * INCOME STATEMENT FORMAT
 * 
 * 21 Revenue
 *      Revenue account groups
 *          Total Revenue
 * empty
 * 23 Cost of sales
 *      COS account groups
 *          total COS
 *          Gross Profit 
 * empty
 * Operating Expenses
 *      24 R&D
 *      25 SG&A
 *      26 Depreciation
 *      27 Amortization
 *          Total operating expenses
 * empty
 * Operating income
 * 22 - 28 Other income/expense, net
 * Income before provision for income taxes
 * 29 Income taxes
 * empty
 * Net income
 */
function IncomeStatementRender() {
    const appContext = React.useContext(PageSettings);

    const today = new Date();
    const [startDate, setStartDate] = React.useState(today.getFullYear() + "-01-01");
    const [endDate, setEndDate] = React.useState(today.toISOString().split('T')[0]);
    const [loading, setLoading] = React.useState(true);

    const [totalRevenue, setTotalRevenue] = React.useState(null);
    const [totalCostOfSales, setTotalCostOfSales] = React.useState(null);
    const [grossProfit, setGrossProfit] = React.useState(null);
    const [rd, setRd] = React.useState(null);
    const [sga, setSga] = React.useState(null);
    const [da, setDa] = React.useState(null);
    const [totalOperatingExpenses, setTotalOperatingExpenses] = React.useState(null);
    const [operatingIncome, setOperatingIncome] = React.useState(null);
    const [incomeFromInvesting, setIncomeFromInvesting] = React.useState(null);
    const [incomeFromFinancing, setIncomeFromFinancing] = React.useState(null);
    const [otherIncome, setOtherIncome] = React.useState(null);
    const [otherExpenses, setOtherExpenses] = React.useState(null);
    const [totalOtherIncomeExpense, setTotalOtherIncomeExpense] = React.useState(null);
    const [ebit, setEbit] = React.useState(null);
    const [interestExpense, setInterestExpense] = React.useState(null);
    const [earningsBeforeTax, setEarningsBeforeTax] = React.useState(null);
    const [taxExpense, setTaxExpense] = React.useState(null);
    const [nonRecurringAndExtraordinaryItems, setNonRecurringAndExtraordinaryItems] = React.useState(null);
    const [netIncome, setNetIncome] = React.useState(null);

    const [revenueSubtypeId, setRevenueSubtypeId] = React.useState(null);
    const [incomeFromInvestingSubtypeId, setIncomeFromInvestingSubtypeId] = React.useState(null);
    const [incomeFromFinancingSubtypeId, setIncomeFromFinancingSubtypeId] = React.useState(null);
    const [otherIncomeSubtypeId, setOtherIncomeSubtypeId] = React.useState(null);
    const [costOfSalesSubtypeId, setCostOfSalesSubtypeId] = React.useState(null);
    const [researchAndDevelopmentSubtypeId, setResearchAndDevelopmentSubtypeId] = React.useState(null);
    const [sgaSubtypeId, setSgaSubtypeId] = React.useState(null);
    const [depreciationAmortizationSubtypeId, setDepreciationAmortizationSubtypeId] = React.useState(null);
    const [otherExpensesSubtypeId, setOtherExpensesSubtypeId] = React.useState(null);
    const [interestExpenseSubtypeId, setInterestExpenseSubtypeId] = React.useState(null);
    const [taxExpenseSubtypeId, setTaxExpenseSubtypeId] = React.useState(null);
    const [nonRecurringSubtypeId, setNonRecurringSubtypeId] = React.useState(null);

    const [accountBalances, setAccountBalances] = React.useState(null);


    React.useEffect(() => {
        async function fetchData() {
            setLoading(true);
            await axios.get(`${API_BASE_URL}/organization/${appContext.currentOrganizationId}/reports/incomeStatement/${startDate}/${endDate}`).then(response => {
                if (response.data) {
                    setTotalRevenue(response.data.totalRevenue);
                    setTotalCostOfSales(response.data.totalCostOfSales);
                    setGrossProfit(response.data.grossProfit);
                    setRd(response.data.totalResearchAndDevelopment);
                    setSga(response.data.totalSalesGeneralAndAdministration);
                    setDa(response.data.totalDepreciationAndAmortization);
                    setTotalOperatingExpenses(response.data.totalOperatingExpenses);
                    setOperatingIncome(response.data.operatingIncome);
                    setIncomeFromInvesting(response.data.incomeFromInvesting);
                    setIncomeFromFinancing(response.data.incomeFromFinancing);
                    setOtherIncome(response.data.otherIncome);
                    setOtherExpenses(response.data.otherExpenses);
                    setTotalOtherIncomeExpense(response.data.totalOtherIncomeExpense);
                    setEbit(response.data.ebit);
                    setInterestExpense(response.data.interestExpense);
                    setEarningsBeforeTax(response.data.earningsBeforeTax);
                    setTaxExpense(response.data.taxExpense);
                    setNonRecurringAndExtraordinaryItems(response.data.nonRecurringAndExtraordinaryItems);
                    setNetIncome(response.data.netIncome);
                    setRevenueSubtypeId(response.data.revenueSubtypeId);
                    setIncomeFromInvestingSubtypeId(response.data.incomeFromInvestingSubtypeId);
                    setIncomeFromFinancingSubtypeId(response.data.incomeFromFinancingSubtypeId);
                    setOtherIncomeSubtypeId(response.data.otherIncomeSubtypeId);
                    setCostOfSalesSubtypeId(response.data.costOfSalesSubtypeId);
                    setResearchAndDevelopmentSubtypeId(response.data.researchAndDevelopmentSubtypeId);
                    setSgaSubtypeId(response.data.sgaSubtypeId);
                    setDepreciationAmortizationSubtypeId(response.data.depreciationAmortizationSubtypeId);
                    setOtherExpensesSubtypeId(response.data.otherExpensesSubtypeId);
                    setInterestExpenseSubtypeId(response.data.interestExpenseSubtypeId);
                    setTaxExpenseSubtypeId(response.data.setTaxExpenseSubtypeId);
                    setNonRecurringSubtypeId(response.data.nonRecurringSubtypeId);
                    let rawAccountBalances = response.data.accountBalances;
                    rawAccountBalances.forEach(account => {
                        if (account.hasChildren) {
                            let totalDebits = 0;
                            let totalCredits = 0;    
                            rawAccountBalances.filter(childAccount => childAccount.parentAccountId == account.accountId).forEach(childAccount => {
                                totalDebits = totalDebits + childAccount.debitTotal;
                                totalCredits = totalCredits + childAccount.creditTotal;
                            })    
                            account.debitTotal = totalDebits;
                            account.creditTotal = totalCredits;
                            account.debitsMinusCredits = totalDebits - totalCredits;    
                        }
                    })
                    setAccountBalances(rawAccountBalances);
                }
            }).catch(error => {
                console.log(error);
            });
            setLoading(false);
        }
        fetchData();
    }, [startDate, endDate]);

    const handleChangeStartDate = date => {
        setStartDate(date);
    }
    const handleChangeEndDate = date => {
        setEndDate(date);
    }

    const numberAsCurrency = (number) => {
        if (number == 0) {
            return new Intl.NumberFormat(appContext.locale, { style: 'currency', currency: appContext.currency }).format(0);
        }
        return new Intl.NumberFormat(appContext.locale, { style: 'currency', currency: appContext.currency }).format(number)
    }


    return (
        <div className="widget widget-rounded m-b-30">
            <div className="widget-header bg-light border-bottom">
                <div className="widget-header-title">
                    <div className="form-inline justify-content-between">
                        <div className="font-weight-600">{incomeStatementRenderText[appContext.locale]["Income Statement"]}</div>    
                        <div className="form-group">
                            <label className="ml-sm-5 px-1">{incomeStatementRenderText[appContext.locale]["From:"]} </label>
                            <input type="date" className="form-control form-control-sm width-125" value={startDate} onChange={event => handleChangeStartDate(event.target.value)} />
                            <label className="ml-sm-5 px-1">{incomeStatementRenderText[appContext.locale]["To:"]} </label>
                            <input type="date" className="form-control form-control-sm width-125" value={endDate} onChange={event => handleChangeEndDate(event.target.value)} />
                        </div> 
                    </div>
                </div>
            </div>
            <div>
                {loading? <div className="d-flex justify-content-center fa-3x py-3"><i className="fas fa-circle-notch fa-spin"></i></div> : 
                <div>
                    <table className="table table-striped m-b-0">
                        <tbody>
                            {!accountBalances.filter(account => account.accountSubtypeId == revenueSubtypeId).length? null : 
                                <>
                                <tr><td className="font-weight-600">{incomeStatementRenderText[appContext.locale]["Revenue"]}</td></tr>
                                    {accountBalances.filter(account => account.accountSubtypeId == revenueSubtypeId).map(account => {
                                        return(
                                            <tr key={account.accountId}><td className="d-flex justify-content-between p-l-30"><div>{account.accountName}</div><div>{numberAsCurrency(account.debitsMinusCredits * -1)}</div></td></tr>
                                        )
                                    })}
                                    <tr><td className="d-flex justify-content-between p-l-30 font-weight-600"><div className="p-l-30">{incomeStatementRenderText[appContext.locale]["Total revenue"]}</div><div>{numberAsCurrency(totalRevenue)}</div></td></tr>
                                    <tr><td>{/* empty row */}<div className="visibility-hidden">spacer row</div></td></tr>
                                </>
                            }
                            {!accountBalances.filter(account => account.accountSubtypeId == costOfSalesSubtypeId).length? null : 
                                <>
                                    <tr><td className="font-weight-600">{incomeStatementRenderText[appContext.locale]["Cost of sales"]}</td></tr>
                                    {accountBalances.filter(account => account.accountSubtypeId == costOfSalesSubtypeId).map(account => {
                                        return(
                                            <tr key={account.accountId}><td className="d-flex justify-content-between p-l-30"><div>{account.accountName}</div><div>{numberAsCurrency(account.debitsMinusCredits)}</div></td></tr>
                                        )
                                    })}
                                    <tr><td className="d-flex justify-content-between p-l-30 font-weight-600"><div className="p-l-30">{incomeStatementRenderText[appContext.locale]["Total cost of sales"]}</div><div>{numberAsCurrency(totalCostOfSales)}</div></td></tr>
                                    <tr><td>{/* empty row */}<div className="visibility-hidden">spacer row</div></td></tr>
                                </>
                            }
                            <tr><td className="d-flex justify-content-between font-weight-600"><div>{incomeStatementRenderText[appContext.locale]["Gross profit"]}</div><div>{numberAsCurrency(grossProfit)}</div></td></tr>
                            <tr><td>{/* empty row */}<div className="visibility-hidden">spacer row</div></td></tr>
                            <tr><td className="font-weight-600">{incomeStatementRenderText[appContext.locale]["Operating expenses"]}</td></tr>
                            {!rd? null : <tr><td className="d-flex justify-content-between p-l-30"><div>{incomeStatementRenderText[appContext.locale]["Research and development"]}</div><div>{numberAsCurrency(rd)}</div></td></tr>}
                            {!sga? null : <tr><td className="d-flex justify-content-between p-l-30"><div>{incomeStatementRenderText[appContext.locale]["Sales, general, and administration"]}</div><div>{numberAsCurrency(sga)}</div></td></tr>}
                            {!da? null : <tr><td className="d-flex justify-content-between p-l-30"><div>{incomeStatementRenderText[appContext.locale]["Depreciation and amortization"]}</div><div>{numberAsCurrency(da)}</div></td></tr>}
                            <tr><td className="d-flex justify-content-between p-l-30 font-weight-600"><div className="p-l-30">{incomeStatementRenderText[appContext.locale]["Total operating expenses"]}</div><div>{numberAsCurrency(totalOperatingExpenses)}</div></td></tr>
                            <tr><td>{/* empty row */}<div className="visibility-hidden">spacer row</div></td></tr>
                            <tr><td className="d-flex justify-content-between font-weight-600"><div>{incomeStatementRenderText[appContext.locale]["Operating income"]}</div><div>{numberAsCurrency(operatingIncome)}</div></td></tr>
                            <tr><td>{/* empty row */}<div className="visibility-hidden">spacer row</div></td></tr>
                            <tr><td className="font-weight-600"><div>{incomeStatementRenderText[appContext.locale]["Other income/expense"]}</div></td></tr>
                            {!incomeFromInvesting? null : <tr><td className="d-flex justify-content-between p-l-30"><div>{incomeStatementRenderText[appContext.locale]["Income from investing activities"]}</div><div>{numberAsCurrency(incomeFromInvesting)}</div></td></tr>}
                            {!incomeFromFinancing? null : <tr><td className="d-flex justify-content-between p-l-30"><div>{incomeStatementRenderText[appContext.locale]["Income from financing activities"]}</div><div>{numberAsCurrency(incomeFromFinancing)}</div></td></tr>}
                            {!otherIncome? null : <tr><td className="d-flex justify-content-between p-l-30"><div>{incomeStatementRenderText[appContext.locale]["Other income"]}</div><div>{numberAsCurrency(otherIncome)}</div></td></tr>}
                            {!otherExpenses? null : <tr><td className="d-flex justify-content-between p-l-30"><div>{incomeStatementRenderText[appContext.locale]["Other expenses"]}</div><div>{numberAsCurrency(otherExpenses)}</div></td></tr>}
                            <tr><td className="d-flex justify-content-between p-l-30 font-weight-600"><div className="p-l-30">{incomeStatementRenderText[appContext.locale]["Total other income/expense, net"]}</div><div>{numberAsCurrency(totalOtherIncomeExpense)}</div></td></tr>
                            <tr><td>{/* empty row */}<div className="visibility-hidden">spacer row</div></td></tr>
                            <tr><td className="d-flex justify-content-between font-weight-600"><div>{incomeStatementRenderText[appContext.locale]["Earnings before interest and tax"]}</div><div>{numberAsCurrency(ebit)}</div></td></tr>
                            <tr><td className="d-flex justify-content-between"><div>{incomeStatementRenderText[appContext.locale]["Interest expense"]}</div><div>{numberAsCurrency(interestExpense)}</div></td></tr>
                            <tr><td className="d-flex justify-content-between font-weight-600"><div>{incomeStatementRenderText[appContext.locale]["Earnings before tax"]}</div><div>{numberAsCurrency(earningsBeforeTax)}</div></td></tr>
                            <tr><td className="d-flex justify-content-between"><div>{incomeStatementRenderText[appContext.locale]["Tax expense"]}</div><div>{numberAsCurrency(taxExpense)}</div></td></tr>
                            <tr><td>{/* empty row */}<div className="visibility-hidden">spacer row</div></td></tr>
                            {!nonRecurringAndExtraordinaryItems ? null : <><tr><td className="d-flex justify-content-between"><div>{incomeStatementRenderText[appContext.locale]["Non-recurring and extraordinary items"]}</div><div>{numberAsCurrency(nonRecurringAndExtraordinaryItems)}</div></td></tr>
                            <tr><td>{/* empty row */}<div className="visibility-hidden">spacer row</div></td></tr></>}
                            <tr><td className="d-flex justify-content-between font-weight-600"><div>{incomeStatementRenderText[appContext.locale]["Net income"]}</div><div>{numberAsCurrency(netIncome)}</div></td></tr>
                        </tbody>
                    </table>
                </div>
                }
            </div>
        </div>
    )
}

export default IncomeStatementRender;