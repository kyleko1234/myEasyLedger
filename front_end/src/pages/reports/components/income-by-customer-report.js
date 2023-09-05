import React from 'react';
import LoadingSpinner from '../../../components/misc/loading-spinner';
import { PageSettings } from '../../../config/page-settings';
import { incomeStatementRenderText } from '../../../utils/i18n/income-statement-render-text';
import { reportsText } from '../../../utils/i18n/reports-text';
import { localizeDate } from '../../../utils/util-fns';
import ReportRow from './report-row';

function IncomeByCustomerReport({ incomeByCustomerReportDto }) {
    const appContext = React.useContext(PageSettings);
    const dateLabels = () => {
        let labels = [];
        incomeByCustomerReportDto.dateRanges.map(dateRange => {
            if (!dateRange.name || dateRange.name === "Custom") {
                labels.push(<>
                    <div>
                        {incomeStatementRenderText[appContext.locale]["From:"] + " " + localizeDate(dateRange.startDate)}
                    </div>
                    <div>
                        {incomeStatementRenderText[appContext.locale]["To:"] + " " + localizeDate(dateRange.endDate)}
                    </div>
                </>)
            } else {
                labels.push(dateRange.name);
            }
        })
        return labels;
    }
    const translate = text => reportsText[appContext.locale][text];

    return(
        <>
            {incomeByCustomerReportDto
                ? <div>
                    <ReportRow
                        values={dateLabels()}
                        className="fw-semibold"
                    />
                    {incomeByCustomerReportDto.customers
                        ? incomeByCustomerReportDto.customers.map((customer, i) => {
                            return(
                                <ReportRow
                                    key={i}
                                    label={customer.customerName ? customer.customerName : <span className="fw-light fst-italic">{translate("No customer")}</span>}
                                    values={customer.amounts}
                                />
                            )
                        })
                        : null
                    }
                    <ReportRow
                        label={translate("Total Income")}
                        values={incomeByCustomerReportDto.totalIncome}
                        isCurrency
                        className="fw-semibold"
                    />

                </div>
                : <LoadingSpinner big/>
            }
        </>
    )

}

export default IncomeByCustomerReport;