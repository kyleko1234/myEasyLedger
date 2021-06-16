import React from 'react';
import { PageSettings } from '../../../config/page-settings';
import { API_BASE_URL } from '../../../utils/constants';
import axios from 'axios';
import { incomeStatementRenderText } from '../../../utils/i18n/income-statement-render-text';
import { Card, CardBody } from 'reactstrap';
import { createJsxAttribute } from 'typescript';

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
    const [detailedView, setDetailedView] = React.useState(false);
    const toggleDetailedView = () => setDetailedView(!detailedView);
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
    const [expenseFromInvesting, setExpenseFromInvesting] = React.useState(null);
    const [expenseFromFinancing, setExpenseFromFinancing] = React.useState(null);
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
    const [expenseFromInvestingSubtypeId, setExpenseFromInvestingSubtypeId] = React.useState(null);
    const [expenseFromFinancingSubtypeId, setExpenseFromFinancingSubtypeId] = React.useState(null);
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

    const renderDetails = (subtypeId, typeId) => {
        if (detailedView) {
            return (
                accountBalances
                    .filter(account => account.accountSubtypeId === subtypeId)
                    .map(account => {
                        return (
                            <React.Fragment key={account.accountId}>
                                <div className="striped-row justify-content-between indent-2">
                                    <div>{account.accountName}</div><div>{numberAsCurrency(typeId === 5 ? account.debitsMinusCredits : account.debitsMinusCredits * -1)}</div>
                                </div>
                                {accountBalances
                                    .filter(childAccount => childAccount.parentAccountId === account.accountId)
                                    .map(childAccount => {
                                        return (
                                            <div key={childAccount.accountId} className="striped-row justify-content-between indent-3">
                                                <div>{childAccount.accountName}</div><div>{numberAsCurrency(typeId === 5 ? childAccount.debitsMinusCredits : childAccount.debitsMinusCredits * -1)}</div>
                                            </div>
                                        )
                                    })}
                            </React.Fragment>
                        )
                    })
            )
        } else {
            return null;
        }
    }
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
                    setExpenseFromInvesting(response.data.expenseFromInvesting);
                    setExpenseFromFinancing(response.data.expenseFromFinancing);
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
                    setExpenseFromInvestingSubtypeId(response.data.expenseFromInvestingSubtypeId);
                    setExpenseFromFinancingSubtypeId(response.data.expenseFromFinancingSubtypeId);
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
        <>
            <Card className="very-rounded shadow-sm bg-light my-4">
                <CardBody className="">
                    <h2 className="h5">{incomeStatementRenderText[appContext.locale]["Options"]}</h2>
                    <div className="d-sm-flex align-items-center ">
                        <div className="d-flex align-items-center mr-3 mb-2">
                            <label className="my-0 col-3 px-0">{incomeStatementRenderText[appContext.locale]["From:"]} </label>
                            <input type="date" className="form-control form-control-sm width-150" value={startDate} onChange={event => handleChangeStartDate(event.target.value)} />
                        </div>
                        <div className="d-flex align-items-center mr-3 mb-2">
                            <label className="my-0 col-3 px-0">{incomeStatementRenderText[appContext.locale]["To:"]} </label>
                            <input type="date" className="form-control form-control-sm width-150" value={endDate} onChange={event => handleChangeEndDate(event.target.value)} />
                        </div>
                    </div>
                    <div className="custom-control custom-switch">
                        <input type="checkbox" id="detailedViewCheckbox" className="custom-control-input" value={detailedView} onChange={toggleDetailedView} />
                        <label htmlFor="detailedViewCheckbox" className="my-0 custom-control-label">{incomeStatementRenderText[appContext.locale]["Detailed View"]}</label>
                    </div>

                </CardBody>
            </Card>
            <div>
                {loading ? <div className="d-flex justify-content-center fa-3x py-3"><i className="fas fa-circle-notch fa-spin"></i></div> :
                    <div>
                        {!(accountBalances.filter(account => account.accountSubtypeId === revenueSubtypeId).length) ? null :
                            <>
                                <div className="striped-row font-weight-600">{incomeStatementRenderText[appContext.locale]["Revenue"]}</div>
                                {accountBalances
                                    .filter(account => account.accountSubtypeId === revenueSubtypeId)
                                    .map(account => {
                                        return (
                                            <React.Fragment key={account.accountId}>
                                                <div className="striped-row justify-content-between indent">
                                                    <div>{account.accountName}</div><div>{numberAsCurrency(account.debitsMinusCredits * -1)}</div>
                                                </div>
                                                {detailedView ?
                                                    accountBalances
                                                        .filter(childAccount => childAccount.parentAccountId == account.accountId)
                                                        .map(childAccount => {
                                                            return (
                                                                <div key={childAccount.accountId} className="striped-row justify-content-between indent-2">
                                                                    <div>{childAccount.accountName}</div><div>{numberAsCurrency(childAccount.debitsMinusCredits * -1)}</div>
                                                                </div>
                                                            )
                                                        })
                                                    : null}
                                            </React.Fragment>
                                        )
                                    })
                                }
                                <div className="striped-row justify-content-between indent-2 font-weight-600">
                                    <div>{incomeStatementRenderText[appContext.locale]["Total revenue"]}</div><div>{numberAsCurrency(totalRevenue)}</div>
                                </div>
                                <div className="striped-row">
                                    <div className="invisible">{/** empty row */} empty row </div>
                                </div>
                            </>
                        }
                        {!(accountBalances.filter(account => account.accountSubtypeId === costOfSalesSubtypeId).length) ? null :
                            <>
                                <div className="striped-row font-weight-600">{incomeStatementRenderText[appContext.locale]["Cost of sales"]}</div>
                                {accountBalances
                                    .filter(account => account.accountSubtypeId === costOfSalesSubtypeId)
                                    .map(account => {
                                        return (
                                            <div key={account.accountId} className="striped-row justify-content-between indent-2">
                                                <div>{incomeStatementRenderText[appContext.locale]["Total cost of sales"]}</div><div>{numberAsCurrency(totalCostOfSales)}</div>
                                            </div>
                                        )

                                    })
                                }
                                <div className="striped-row">
                                    <div className="invisible">{/** empty row */} empty row </div>
                                </div>
                            </>
                        }
                        <div className="striped-row justify-content-between font-weight-600"><div>{incomeStatementRenderText[appContext.locale]["Gross profit"]}</div><div>{numberAsCurrency(grossProfit)}</div></div>
                        <div className="striped-row"><div className="invisible">{/* empty row */} empty row</div></div>

                        <div className="striped-row font-weight-600">{incomeStatementRenderText[appContext.locale]["Operating expenses"]}</div>
                        {!rd ? null : <div className="justify-content-between indent"><div>{incomeStatementRenderText[appContext.locale]["Research and development"]}</div><div>{numberAsCurrency(rd)}</div></div>}
                        {renderDetails(researchAndDevelopmentSubtypeId, 5)}
                        {!sga ? null : <div className="striped-row justify-content-between indent"><div>{incomeStatementRenderText[appContext.locale]["Sales, general, and administration"]}</div><div>{numberAsCurrency(sga)}</div></div>}
                        {renderDetails(sgaSubtypeId, 5)}
                        {!da ? null : <div className="striped-row justify-content-between indent"><div>{incomeStatementRenderText[appContext.locale]["Depreciation and amortization"]}</div><div>{numberAsCurrency(da)}</div></div>}
                        {renderDetails(depreciationAmortizationSubtypeId, 5)}
                        <div className="striped-row justify-content-between indent-2 font-weight-600"><div>{incomeStatementRenderText[appContext.locale]["Total operating expenses"]}</div><div>{numberAsCurrency(totalOperatingExpenses)}</div></div>
                        <div className="striped-row"><div className="invisible">{/* empty row */} empty row</div></div>
                        <div className="striped-row justify-content-between font-weight-600"><div>{incomeStatementRenderText[appContext.locale]["Operating income"]}</div><div>{numberAsCurrency(operatingIncome)}</div></div>
                        <div className="striped-row"><div className="invisible">{/* empty row */} empty row</div></div>
                        <div className="striped-row font-weight-600"><div>{incomeStatementRenderText[appContext.locale]["Other income/expense"]}</div></div>
                        {!incomeFromInvesting ? null : <div className="striped-row justify-content-between indent"><div>{incomeStatementRenderText[appContext.locale]["Net income/expense from investing activities"]}</div><div>{numberAsCurrency(incomeFromInvesting - expenseFromInvesting)}</div></div>}
                        {renderDetails(incomeFromInvestingSubtypeId, 4)}
                        {renderDetails(expenseFromInvestingSubtypeId, 4) /** Use a negative number for expenses here since it is a component of other income/expense net*/}
                        {!incomeFromFinancing ? null : <div className="striped-row justify-content-between indent"><div>{incomeStatementRenderText[appContext.locale]["Net income/expense from financing activities"]}</div><div>{numberAsCurrency(incomeFromFinancing - expenseFromFinancing)}</div></div>}
                        {renderDetails(incomeFromFinancingSubtypeId, 4)}
                        {renderDetails(expenseFromFinancingSubtypeId, 4)}
                        <div className="striped-row justify-content-between indent-2 font-weight-600"><div>{incomeStatementRenderText[appContext.locale]["Total other income/expense, net"]}</div><div>{numberAsCurrency(totalOtherIncomeExpense)}</div></div>
                        {renderDetails(otherIncomeSubtypeId, 4)}
                        {renderDetails(otherExpensesSubtypeId, 4)}
                        <div className="striped-row"><div className="invisible">{/* empty row */} empty row</div></div>
                        <div className="striped-row justify-content-between font-weight-600"><div>{incomeStatementRenderText[appContext.locale]["Earnings before interest and tax"]}</div><div>{numberAsCurrency(ebit)}</div></div>
                        <div className="striped-row justify-content-between"><div>{incomeStatementRenderText[appContext.locale]["Interest expense"]}</div><div>{numberAsCurrency(interestExpense)}</div></div>
                        <div className="striped-row justify-content-between font-weight-600"><div>{incomeStatementRenderText[appContext.locale]["Earnings before tax"]}</div><div>{numberAsCurrency(earningsBeforeTax)}</div></div>
                        <div className="striped-row justify-content-between"><div>{incomeStatementRenderText[appContext.locale]["Tax expense"]}</div><div>{numberAsCurrency(taxExpense)}</div></div>
                        <div className="striped-row"><div className="invisible">{/* empty row */} empty row</div></div>
                        {!nonRecurringAndExtraordinaryItems ? null :
                            <>
                                <div className="striped-row justify-content-between"><div>{incomeStatementRenderText[appContext.locale]["Non-recurring and extraordinary items"]}</div><div>{numberAsCurrency(nonRecurringAndExtraordinaryItems)}</div></div>
                                <div className="striped-row"><div className="invisible">{/* empty row */} empty row</div></div>
                            </>
                        }
                        <div className="striped-row justify-content-between font-weight-600"><div>{incomeStatementRenderText[appContext.locale]["Net income"]}</div><div>{numberAsCurrency(netIncome)}</div></div>

                    </div>
                }
            </div>
        </>
    )
}

export default IncomeStatementRender;