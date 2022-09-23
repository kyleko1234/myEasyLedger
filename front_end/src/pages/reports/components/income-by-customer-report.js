import React from 'react';
import StripedRow from '../../../components/tables/striped-row';
import { PageSettings } from '../../../config/page-settings';
import { incomeStatementRenderText } from '../../../utils/i18n/income-statement-render-text';
import { reportsText } from '../../../utils/i18n/reports-text';
import { formatCurrency, getPercentage, localizeDate } from '../../../utils/util-fns';

function IncomeByCustomerReport({ columnLabels, incomeByCustomerReports }) {
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
                {incomeByCustomerReports
                    ? <>
                        {incomeByCustomerReports[0].customerIncomeDTOs.map((customerIncomeDTO, i) => {
                            return (
                                <StripedRow key={i} className="justify-content-between">
                                    <div className={customerIncomeDTO.customerName === reportsText[appContext.locale]["No customer"] ? "fw-light fst-italic" : ""}>
                                        {customerIncomeDTO.customerName}
                                    </div>
                                    <div className="text-end d-flex">
                                        {incomeByCustomerReports.map((report, i) => {
                                            let incomeForThisCustomer = report.customerIncomeDTOs
                                            .find(dto => dto.customerName === customerIncomeDTO.customerName)
                                            .creditsMinusDebits
                                            return (
                                                <div key={i} className="width-175">
                                                    {numberAsCurrency(incomeForThisCustomer) + " (" + getPercentage(incomeForThisCustomer, report.totalIncome) + "%)"}
                                                </div>
                                            )
                                        })}
                                    </div>
                                </StripedRow>
                            )
                        })}
                        <StripedRow className="justify-content-between fw-semibold">
                            <div>
                                {reportsText[appContext.locale]["Total Income"]}
                            </div>
                            <div className="text-end d-flex">
                                {incomeByCustomerReports.map((report, i) => {
                                    return (
                                        <div key={i} className="width-175">
                                            {numberAsCurrency(report.totalIncome)}
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

export default IncomeByCustomerReport;