import React from 'react';
import LoadingSpinner from '../../../components/misc/loading-spinner';
import StripedRow from '../../../components/tables/striped-row';
import { PageSettings } from '../../../config/page-settings';
import { incomeStatementRenderText } from '../../../utils/i18n/income-statement-render-text';
import { getPercentage, localizeDate } from '../../../utils/util-fns';

function EnterpriseExpenseReportRender({loading, columnLabels, incomeStatementObjects, numberAsCurrency, detailedView}) {
    const appContext = React.useContext(PageSettings);

    //returns true if debitsMinusCredits of an account is zero for all date ranges selected by the user
    const zeroDebitsMinusCreditsInAccount = (account) => {
        for (let i = 0; i < incomeStatementObjects.length; i++) {
            let accountForThisDatePeriod = incomeStatementObjects[i].accountBalances.find(specificAccount => specificAccount.accountId === account.accountId);
            if (accountForThisDatePeriod.debitsMinusCredits) {
                return false;
            }
            
        }
        return true;
    }

    const hasZeroAmountsForFieldInAllDateRanges = (fieldName) => {
        let nonZeroAmount = []
        nonZeroAmount = incomeStatementObjects.filter(incomeStatement => incomeStatement[fieldName] != 0);
        if (nonZeroAmount.length) {
            return false;
        } 
        return true;
    }

    const renderRow = (accessor, rowName, baseIndent) => {
        let indentClassName = baseIndent === 1 
            ? "indent" 
            : "indent-" + baseIndent;
        if (hasZeroAmountsForFieldInAllDateRanges(accessor) /* && !detailedView */) {
            return null;
        } else {
            return(
                <StripedRow className={"justify-content-between " + indentClassName}>
                    <div>{incomeStatementRenderText[appContext.locale][rowName]}</div>
                    <div className="text-end d-flex">
                        {incomeStatementObjects.map((incomeStatement, i) => {
                            return(
                                <div key={i} className="width-175">
                                    {numberAsCurrency(incomeStatement[accessor]) + " (" + getPercentage(incomeStatement[accessor], incomeStatement.totalExpenses) + "%)"}
                                </div>
                            )
                        })}
                    </div>
                </StripedRow>
            )
        }
    }

    const renderDetails = (subtypeId, typeId, baseIndent) => {
        let incrementIndent = baseIndent + 1;
        let baseIndentClassName = baseIndent === 1 
            ? "indent" 
            : "indent-" + baseIndent;
        let incrementIndentClassName = "indent-" + (incrementIndent);
        if (detailedView) {
            return (
                incomeStatementObjects[0].accountBalances
                    .filter(account => account.accountSubtypeId === subtypeId)
                    .map(account => {
                        return (
                            zeroDebitsMinusCreditsInAccount(account)
                                ? null
                                : <React.Fragment key={account.accountId}>
                                    <StripedRow className={"justify-content-between " + baseIndentClassName}>
                                        <div>{account.accountName}</div>
                                        <div className="text-end d-flex">
                                            {incomeStatementObjects.map((incomeStatement, i) => {
                                                let accountDebitsMinusCredits = incomeStatement.accountBalances.find(specificAccount => specificAccount.accountId === account.accountId).debitsMinusCredits;
                                                return(
                                                    <div key={i} className="width-175">
                                                        {numberAsCurrency(accountDebitsMinusCredits) + " (" + getPercentage(accountDebitsMinusCredits, incomeStatement.totalExpenses) + "%)"}
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </StripedRow>
                                    {incomeStatementObjects[0].accountBalances
                                        .filter(childAccount => childAccount.parentAccountId === account.accountId)
                                        .map(childAccount => {
                                            return (
                                                zeroDebitsMinusCreditsInAccount(childAccount)
                                                    ? null
                                                    : <StripedRow key={childAccount.accountId} className={"justify-content-between " + incrementIndentClassName}>
                                                        <div>{childAccount.accountName}</div>
                                                        <div className="text-end d-flex">
                                                            {incomeStatementObjects.map((incomeStatement, i) => {
                                                                let childAccountDebitsMinusCredits = incomeStatement.accountBalances.find(specificChildAccount => specificChildAccount.accountId === childAccount.accountId).debitsMinusCredits;
                                                                return(
                                                                    <div key={i} className="width-175">
                                                                        {numberAsCurrency(childAccountDebitsMinusCredits) + " (" + getPercentage(childAccountDebitsMinusCredits, incomeStatement.totalExpenses) + "%)"}
                                                                    </div>
                                                                )
                                                            })}
                                                        </div>
                                                    </StripedRow>
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

    return(
        <div className="min-width-md">
            <div className="d-flex justify-content-between font-weight-semibold text-end">
                <div>{/*empty div for spacing*/}</div>
                <div className="text-end d-flex">
                    {
                        columnLabels.map((columnLabel, i) => {
                            return(
                                <div className="pseudo-td width-175" key={i}>
                                    {columnLabel.label === "Custom"
                                    ?   <>
                                            <div>
                                                {incomeStatementRenderText[appContext.locale]["From:"] + " " + localizeDate(columnLabel.startDate)}
                                            </div>
                                            <div>
                                                {incomeStatementRenderText[appContext.locale]["To:"] + " " + localizeDate(columnLabel.endDate)}
                                            </div>
                                        </>
                                    : columnLabel.label}
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            <div>
                {(loading || !incomeStatementObjects.length)
                    ? <LoadingSpinner big />
                    : <div>
                        <StripedRow className="font-weight-semibold">
                            {incomeStatementRenderText[appContext.locale]["Cost of sales"]}
                        </StripedRow>
                        {incomeStatementObjects[0].accountBalances
                            .filter(account => account.accountSubtypeId === incomeStatementObjects[0].costOfSalesSubtypeId)
                            .map(account => {
                                return (
                                    zeroDebitsMinusCreditsInAccount(account)
                                        ? null
                                        : <React.Fragment key={account.accountId}>
                                            <StripedRow className="justify-content-between indent">
                                                <div>{account.accountName}</div>
                                                <div className="text-end d-flex">
                                                    {incomeStatementObjects.map((incomeStatement, i) => {
                                                        let specificAccountDebitsMinusCredits = incomeStatement.accountBalances.find(specificAccount => specificAccount.accountId === account.accountId).debitsMinusCredits;
                                                        return(
                                                            <div key={i} className="width-175">
                                                                {numberAsCurrency(specificAccountDebitsMinusCredits) + " (" + getPercentage(specificAccountDebitsMinusCredits, incomeStatement.totalExpenses) + "%)"}
                                                            </div>
                                                        )
                                                    })}
                                                </div>
                                            </StripedRow>
                                            {detailedView
                                                ? incomeStatementObjects[0].accountBalances
                                                    .filter(childAccount => childAccount.parentAccountId == account.accountId)
                                                    .map(childAccount => {
                                                        return (
                                                            zeroDebitsMinusCreditsInAccount(childAccount)
                                                                ? null
                                                                : <StripedRow key={childAccount.accountId} className="justify-content-between indent-2">
                                                                    <div>{childAccount.accountName}</div>
                                                                    <div className="text-end d-flex">
                                                                        {incomeStatementObjects.map((incomeStatement, i) => {
                                                                            let specificChildAccountDebitsMinusCredits = incomeStatement.accountBalances.find(specificChildAccount => specificChildAccount.accountId === childAccount.accountId).debitsMinusCredits;
                                                                            return(
                                                                                <div key={i} className="width-175">
                                                                                    {numberAsCurrency(specificChildAccountDebitsMinusCredits) + " (" + getPercentage(specificChildAccountDebitsMinusCredits, incomeStatement.totalExpenses) + "%)"}
                                                                                </div>
                                                                            )
                                                                        })}
                                                                    </div>
                                                                </StripedRow>
                                                        )
                                                    })
                                                : null
                                            }
                                        </React.Fragment>
                                )
                            })
                        }
                        <StripedRow className="justify-content-between font-weight-semibold ">
                            <div>{incomeStatementRenderText[appContext.locale]["Total cost of sales"]}</div>
                            <div className="text-end d-flex">
                                {incomeStatementObjects.map((incomeStatement, i) => {
                                    return(
                                        <div key={i} className="width-175">
                                            {numberAsCurrency(incomeStatement.totalCostOfSales) + " (" + getPercentage(incomeStatement.totalCostOfSales, incomeStatement.totalExpenses) + "%)"}
                                        </div>
                                    )
                                })}
                            </div>
                        </StripedRow>
                        <StripedRow>
                            <div className="invisible">{/** empty row */} empty row </div>
                        </StripedRow>
                        <StripedRow className="font-weight-semibold">
                            {incomeStatementRenderText[appContext.locale]["Operating expenses"]}
                        </StripedRow>
                        {renderRow("totalResearchAndDevelopment", "Research and development", 1)}
                        {renderDetails(incomeStatementObjects[0].researchAndDevelopmentSubtypeId, 5, 2)}
                        {renderRow("totalSalesGeneralAndAdministration", "Sales, general, and administration", 1)}
                        {renderDetails(incomeStatementObjects[0].sgaSubtypeId, 5, 2)}
                        {renderRow("totalDepreciationAndAmortization", "Depreciation and amortization", 1)}
                        {renderDetails(incomeStatementObjects[0].depreciationAmortizationSubtypeId, 5, 2)}
                        <StripedRow className="justify-content-between font-weight-semibold">
                            <div>{incomeStatementRenderText[appContext.locale]["Total operating expenses"]}</div>
                            <div className="text-end d-flex">
                                {incomeStatementObjects.map((incomeStatement, i) => {
                                    return(
                                        <div key={i} className="width-175">
                                            {numberAsCurrency(incomeStatement.totalOperatingExpenses) + " (" + getPercentage(incomeStatement.totalOperatingExpenses, incomeStatement.totalExpenses) + "%)"}
                                        </div>
                                    )
                                })}
                            </div>
                        </StripedRow>
                        <StripedRow>
                            <div className="invisible">{/* empty row */} empty row</div>
                        </StripedRow>
                        <StripedRow className="font-weight-semibold">
                            <div>{incomeStatementRenderText[appContext.locale]["Other expense"]}</div>
                        </StripedRow>
                        {hasZeroAmountsForFieldInAllDateRanges("expenseFromInvesting") 
                            ? null 
                            : <StripedRow className="justify-content-between indent">
                                <div>{incomeStatementRenderText[appContext.locale]["Expense from investing activities"]}</div>
                                <div className="text-end d-flex">
                                    {incomeStatementObjects.map((incomeStatement, i) => {
                                        return(
                                            <div key={i} className="width-175">
                                                {numberAsCurrency(incomeStatement["expenseFromInvesting"]) + " (" + getPercentage(incomeStatement.expenseFromInvesting, incomeStatement.totalExpenses) + "%)"}
                                            </div>
                                        )
                                    })}
                                </div>
                            </StripedRow>
                        }
                        {renderDetails(incomeStatementObjects[0].expenseFromInvestingSubtypeId, 5, 2)}
                        {hasZeroAmountsForFieldInAllDateRanges("expenseFromFinancing")
                            ? null 
                            : <StripedRow className="justify-content-between indent">
                                <div>{incomeStatementRenderText[appContext.locale]["Expense from financing activities"]}</div>
                                <div className="text-end d-flex">
                                    {incomeStatementObjects.map((incomeStatement, i) => {
                                        return(
                                            <div key={i} className="width-175">
                                                {numberAsCurrency(incomeStatement["expenseFromFinancing"]) + " (" + getPercentage(incomeStatement.expenseFromFinancing, incomeStatement.totalExpenses) + "%)"}
                                            </div>
                                        )
                                    })}
                                </div>
                            </StripedRow>
                        }
                        {renderDetails(incomeStatementObjects[0].expenseFromFinancingSubtypeId, 5, 2)}
                        <StripedRow className="justify-content-between font-weight-semibold">
                            <div>{incomeStatementRenderText[appContext.locale]["Total other expense"]}</div>
                            <div className="text-end d-flex">
                                {incomeStatementObjects.map((incomeStatement, i) => {
                                    return(
                                        <div key={i} className="width-175">
                                            {numberAsCurrency(incomeStatement.expenseFromInvesting + incomeStatement.expenseFromFinancing) + " (" + getPercentage(incomeStatement.expenseFromInvesting + incomeStatement.expenseFromFinancing, incomeStatement.totalExpenses) + "%)"}
                                        </div>
                                    )
                                })}
                            </div>
                        </StripedRow>
                        <StripedRow>
                            <div className="invisible">{/* empty row */} empty row</div>
                        </StripedRow>
                        <StripedRow className="justify-content-between">
                            <div>{incomeStatementRenderText[appContext.locale]["Interest expense"]}</div>
                            <div className="text-end d-flex">
                                {incomeStatementObjects.map((incomeStatement, i) => {
                                    return(
                                        <div key={i} className="width-175">
                                            {numberAsCurrency(incomeStatement.interestExpense) + " (" + getPercentage(incomeStatement.interestExpense, incomeStatement.totalExpenses) + "%)"}
                                        </div>
                                    )
                                })}
                            </div>
                        </StripedRow>
                        {renderDetails(incomeStatementObjects[0].interestExpenseSubtypeId, 5, 1)}
                        <StripedRow className="justify-content-between">
                            <div>{incomeStatementRenderText[appContext.locale]["Tax expense"]}</div>
                            <div className="text-end d-flex">
                                {incomeStatementObjects.map((incomeStatement, i) => {
                                    return(
                                        <div key={i} className="width-175">
                                            {numberAsCurrency(incomeStatement.taxExpense) + " (" + getPercentage(incomeStatement.taxExpense, incomeStatement.totalExpenses) + "%)"}
                                        </div>
                                    )
                                })}
                            </div>
                        </StripedRow>
                        {renderDetails(incomeStatementObjects[0].taxExpenseSubtypeId, 5, 1)}
                        <StripedRow>
                            <div className="invisible">{/* empty row */} empty row</div>
                        </StripedRow>
                        {hasZeroAmountsForFieldInAllDateRanges("nonRecurringAndExtraordinaryItems") 
                            ? null 
                            : <>
                                <StripedRow className=" justify-content-between">
                                    <div>{incomeStatementRenderText[appContext.locale]["Non-recurring and extraordinary items"]}</div>
                                    <div className="text-end d-flex">
                                        {incomeStatementObjects.map((incomeStatement, i) => {
                                            return(
                                                <div key={i} className="width-175">
                                                    {numberAsCurrency(incomeStatement.nonRecurringAndExtraordinaryItems) + " (" + getPercentage(incomeStatement.nonRecurringAndExtraordinaryItems, incomeStatement.totalExpenses) + "%)"}
                                                </div>
                                            )
                                        })}
                                    </div>
                                </StripedRow>
                                {renderDetails(incomeStatementObjects[0].nonRecurringSubtypeId, 5, 1)}
                                <StripedRow className="striped-row">
                                    <div className="invisible">{/* empty row */} empty row</div>
                                </StripedRow>
                            </>
                        }
                        <StripedRow className="justify-content-between font-weight-semibold">
                            <div>{incomeStatementRenderText[appContext.locale]["Total expenses"]}</div>
                            <div className="text-end d-flex">
                                {incomeStatementObjects.map((incomeStatement, i) => {
                                    return(
                                        <div key={i} className="width-175">
                                            {numberAsCurrency(incomeStatement.totalExpenses)}
                                        </div>
                                    )
                                })}
                            </div>
                        </StripedRow>
                    </div>
                }
            </div>
        </div>
    )
}

export default EnterpriseExpenseReportRender;