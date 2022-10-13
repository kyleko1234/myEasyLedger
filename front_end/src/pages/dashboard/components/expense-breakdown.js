import React from 'react';
import { PageSettings } from '../../../config/page-settings';
import axios from 'axios';
import { API_BASE_URL, PIE_CHART_BACKGROUND_COLORS, PIE_CHART_BORDER_COLORS, PIE_CHART_HOVER_BACKGROUND_COLORS } from '../../../utils/constants';
import { Doughnut, getElementAtEvent} from 'react-chartjs-2';
import { dashboardText } from '../../../utils/i18n/dashboard-text';
import { Card, CardBody, CardTitle } from 'reactstrap';
import { formatCurrency, getDateInCurrentYear, getPercentage, getTodayAsDateString, localizeDate } from '../../../utils/util-fns';
import { useHistory } from 'react-router-dom';

function ExpenseBreakdown(props) {
    const appContext = React.useContext(PageSettings);
    const [loading, setLoading] = React.useState(true);
    const history = useHistory();
    const [labels, setLabels] = React.useState([]); 
    const [data, setData] = React.useState([]);
    const [totalExpenses, setTotalExpenses] = React.useState(0);
    const beginningOfCurrentFiscalYear = getDateInCurrentYear(appContext.permissions.find(permission => permission.organization.id === appContext.currentOrganizationId).organization.fiscalYearBegin);

    const [startDate, setStartDate] = React.useState(beginningOfCurrentFiscalYear);
    const [endDate, setEndDate] = React.useState(getTodayAsDateString());

    const [fontColor, setFontColor] = React.useState(getComputedStyle(document.documentElement).getPropertyValue('--base-text-color'));
    const chartRef = React.useRef();

    React.useEffect(() => {
        setFontColor(
            appContext.colorScheme === 'dark'
                ? getComputedStyle(document.documentElement).getPropertyValue('--dark-mode-text-color')
                : getComputedStyle(document.documentElement).getPropertyValue('--base-text-color')
        );
    }, [appContext.colorScheme]) //detects color scheme and changes the color of the chart text accordingly

    const chartOnClick = event => {
        let element = getElementAtEvent(chartRef.current, event);
        if (element[0]) { //this 'element' related code is really just here to make sure the whitespace in the chart isn't clickable 
            history.push(`/reports/expenses-by-account/${startDate}/${endDate}`)
        }
    }

    const formatBalance = (debitsMinusCredits) => {
        if (debitsMinusCredits == 0) {
            return formatCurrency(appContext.locale, appContext.currency, 0);
        } else {
            return formatCurrency(appContext.locale, appContext.currency, debitsMinusCredits);
        }
    }

    const sumDebitsMinusCredits = (objects) => {
        let totalDebitsMinusCredits = 0;
        objects.forEach(object => {
            totalDebitsMinusCredits = totalDebitsMinusCredits + object.debitsMinusCredits;
        })
        return totalDebitsMinusCredits;
    }

    const doughnutChart = {
        data: {
            labels: labels,
            datasets: [{
                data: data,
                borderColor: PIE_CHART_BORDER_COLORS,
                borderWidth: 2,
                backgroundColor: PIE_CHART_BACKGROUND_COLORS,
                hoverBorderColor: PIE_CHART_BORDER_COLORS,
            }]
        },
        options: {
            cutout: "40%",
            maintainAspectRatio: false,
            responsive: true,
            plugins: {
                legend: {
                    display: false,
                    labels: {
                        color: fontColor
                    }
                },
                tooltip: {
                    callbacks: {
                        label: (toolTipItem) => {
                            return ` ${toolTipItem.label}: ${formatCurrency(appContext.locale, appContext.currency, toolTipItem.raw)} (${getPercentage(toolTipItem.raw, totalExpenses)}%)`
                        },
                    }
                }
            },
            onHover: (event, chartElement) => {
                event.native.target.style.cursor = chartElement[0] ? 'pointer' : '';
            }
        }
    }
    React.useEffect(() => {
        setLoading(true);
        let fetchedLabels = [];
        let fetchedData = [];
        axios.get(`${API_BASE_URL}/organization/${appContext.currentOrganizationId}/accountBalance/${startDate}/${endDate}`).then(response => {
            let expenseAccountBalances = [];

            //filter first-level expense accounts from response data
            response.data
                .filter(account => account.accountTypeId === 5)
                .forEach(account => {
                    expenseAccountBalances.push(account);
                });

            //for accounts that have children, sum up the debits and credits of the child accounts to find the debitTotal, reditTotal, and debitsMinusCredits
            expenseAccountBalances.forEach(account => {
                if (account.hasChildren) {
                    let totalDebits = 0;
                    let totalCredits = 0;    
                    response.data.filter(childAccount => childAccount.parentAccountId == account.accountId).forEach(childAccount => {
                        totalDebits = totalDebits + childAccount.debitTotal;
                        totalCredits = totalCredits + childAccount.creditTotal;
                    })
                    account.debitTotal = totalDebits;
                    account.creditTotal = totalCredits;
                    account.debitsMinusCredits = totalDebits - totalCredits;    
                }    
            })

            //push formatted expense accounts to labels/data to be used by the pie chart
            expenseAccountBalances
                .forEach(account => {
                    fetchedLabels.push(account.accountName);
                    fetchedData.push(account.debitsMinusCredits);
                })
            setLabels(fetchedLabels);
            setData(fetchedData);
            setTotalExpenses(sumDebitsMinusCredits(expenseAccountBalances));
            setLoading(false);
        }).catch(() => {
            setLoading(false);
        });
    }, [])
    return(
        <Card className="shadow-sm very-rounded" style={{height: "380px"}}>
            <CardBody >
                <CardTitle className="font-weight-semibold">
                    {dashboardText[appContext.locale]["Expense Breakdown"]}
                    <span className="fw-normal">                            
                        {appContext.isLoading
                            ? null
                            : dashboardText[appContext.locale]["Date range"](localizeDate(startDate), localizeDate(endDate))
                        }
                    </span>
                </CardTitle>
                {appContext.isLoading
                ?   <div className="d-flex justify-content-center fa-3x py-3"><i className="fas fa-circle-notch fa-spin"></i></div> 
                :   <div>
                        <div style={{overflow: "none"}}>
                            <Doughnut 
                                data={doughnutChart.data} 
                                options={doughnutChart.options} 
                                height={275}
                                ref={chartRef}
                                onClick={chartOnClick}
                            />
                        </div>
                    </div>
                } 
            </CardBody>
        </Card>
    )
}

export default ExpenseBreakdown;