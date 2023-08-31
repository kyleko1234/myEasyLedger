import axios from 'axios';
import React from 'react';
import { useParams } from 'react-router-dom';
import LoadingSpinner from '../../components/misc/loading-spinner';
import { PageSettings } from '../../config/page-settings';
import { API_BASE_URL } from '../../utils/constants';
import { incomeStatementReportText } from '../../utils/i18n/income-statement-report-text';
import { reportTypeListText } from '../../utils/i18n/report-type-list-text';
import { formatCurrency, getPercentage } from '../../utils/util-fns';
import DateRangeControls from './components/date-range-controls';
import ExpensesByAccountReport from './components/expenses-by-account-report';

function ExpensesByAccountPageV2() {
    const appContext = React.useContext(PageSettings);
    const params = useParams();
    const [loading, setLoading] = React.useState(true);
    const [incomeExpenseReportDto, setIncomeExpenseReportDto] = React.useState();
    const [detailedView, setDetailedView] = React.useState(false);
    const toggleDetailedView = () => setDetailedView(!detailedView);

    const convertAmountsIntoCurrencyAndPercentage = (amountsArray, totalArray) => {
        let returnedArray = []
        for (let i = 0; i < totalArray.length; i++) {
            returnedArray.push(formatCurrency(appContext.locale, appContext.currency, amountsArray[i]) + ` (${getPercentage(amountsArray[i], totalArray[i])}%)`);
        }
        return returnedArray;
    }

    const fetchIncomeExpenseReports = async (datesToRequest) => {
        setLoading(true);
        axios.post(`${API_BASE_URL}/organization/${appContext.currentOrganizationId}/reports/incomeExpenseReport`, datesToRequest)
            .then(response => {
                let dto = response.data;
                dto.expenseAccounts.forEach(account => {
                    account.amounts = convertAmountsIntoCurrencyAndPercentage(account.amounts, dto.totalExpenses)
                })
                setIncomeExpenseReportDto(dto);
                setLoading(false);
            })
            .catch(response => {
                console.log(response);
                setLoading(false);
            })
    }

    return (
        <div>
            <h1 className="page-header">
                {appContext.isEnterprise
                    ? incomeStatementReportText[appContext.locale]["Expense Distribution (by Account)"]
                    : reportTypeListText[appContext.locale]["Expense Distribution (by Category)"]} 
            </h1>
            <div>
                {appContext.isLoading
                    ? <LoadingSpinner big/>
                    : <div>
                        <DateRangeControls
                            parentComponentDataFetchFunction={fetchIncomeExpenseReports}
                            detailedView={detailedView}
                            toggleDetailedView={toggleDetailedView}
                            defaultStartDate={params.startDate? params.startDate: null}
                            defaultEndDate={params.endDate? params.endDate: null}
                        />
                        <ExpensesByAccountReport
                            incomeExpenseReportDto={incomeExpenseReportDto}
                            detailedView={detailedView}
                        />
                    </div>
                }
            </div>
        </div>
    )
}
export default ExpensesByAccountPageV2;