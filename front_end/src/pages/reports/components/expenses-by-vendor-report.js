import React from 'react';
import StripedRow from '../../../components/tables/striped-row';
import { PageSettings } from '../../../config/page-settings';
import { incomeStatementRenderText } from '../../../utils/i18n/income-statement-render-text';
import { reportsText } from '../../../utils/i18n/reports-text';
import { formatCurrency, localizeDate } from '../../../utils/util-fns';

function ExpensesByVendorReport({ columnLabels, expensesByVendorReports }) {
    const appContext = React.useContext(PageSettings);

    const numberAsCurrency = (number) => {
        if (number == 0) {
            return formatCurrency(appContext.locale, appContext.currency, 0);
        }
        return formatCurrency(appContext.locale, appContext.currency, number);
    }

    return (
        <>
            <div className="d-flex justify-content-between font-weight-semibold text-end">
                <div>{/*empty div for spacing*/}</div>
                <div className="text-end d-flex">
                    {
                        columnLabels.map((columnLabel, i) => {
                            return (
                                <div className="pseudo-td width-175" key={i}>
                                    {columnLabel.label === "Custom"
                                        ? <>
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
                {expensesByVendorReports
                    ? <>
                        {expensesByVendorReports[0].vendorExpensesDTOs.map((vendorExpensesDTO, i) => {
                            return (
                                <StripedRow key={i} className="justify-content-between">
                                    <div className={vendorExpensesDTO.vendorName === reportsText[appContext.locale]["No vendor"] ? "fw-light fst-italic" : ""}>
                                        {vendorExpensesDTO.vendorName}
                                    </div>
                                    <div className="text-end d-flex">
                                        {expensesByVendorReports.map((report, i) => {
                                            return (
                                                <div key={i} className="width-175">
                                                    {numberAsCurrency(report.vendorExpensesDTOs
                                                        .find(dto => dto.vendorName === vendorExpensesDTO.vendorName)
                                                        .debitsMinusCredits)}
                                                </div>
                                            )
                                        })}
                                    </div>
                                </StripedRow>
                            )
                        })}
                        <StripedRow className="justify-content-between fw-semibold">
                            <div>
                                {reportsText[appContext.locale]["Total Expenses"]}
                            </div>
                            <div className="text-end d-flex">
                                {expensesByVendorReports.map((report, i) => {
                                    return (
                                        <div key={i} className="width-175">
                                            {numberAsCurrency(report.totalExpenses)}
                                        </div>
                                    )
                                })}
                            </div>
                        </StripedRow>
                    </>
                    : null
                }
            </div>
        </>
    )
}

export default ExpensesByVendorReport;