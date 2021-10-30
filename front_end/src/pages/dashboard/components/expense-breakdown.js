import React from 'react';
import { PageSettings } from '../../../config/page-settings';
import axios from 'axios';
import { API_BASE_URL } from '../../../utils/constants';
import { Doughnut } from 'react-chartjs-2';
import { dashboardText } from '../../../utils/i18n/dashboard-text';
import { Card, CardBody, CardTitle } from 'reactstrap';
import { formatCurrency, getDateInCurrentYear, getTodayAsDateString } from '../../../utils/util-fns';

function ExpenseBreakdown(props) {
    const appContext = React.useContext(PageSettings);
    const [loading, setLoading] = React.useState(true);
    const [labels, setLabels] = React.useState([]); 
    const [data, setData] = React.useState([]);
    const beginningOfCurrentFiscalYear = getDateInCurrentYear(appContext.permissions.find(permission => permission.organization.id === appContext.currentOrganizationId).organization.fiscalYearBegin);

    const [startDate, setStartDate] = React.useState(beginningOfCurrentFiscalYear);
    const [endDate, setEndDate] = React.useState(getTodayAsDateString());

    const [fontColor, setFontColor] = React.useState(getComputedStyle(document.documentElement).getPropertyValue('--base-text-color'));

    React.useEffect(() => {
        setFontColor(
            appContext.colorScheme === 'dark'
                ? getComputedStyle(document.documentElement).getPropertyValue('--dark-mode-text-color')
                : getComputedStyle(document.documentElement).getPropertyValue('--base-text-color')
        );
    }, [appContext.colorScheme]) //detects color scheme and changes the color of the chart text accordingly


    const formatBalance = (debitsMinusCredits) => {
        if (debitsMinusCredits == 0) {
            return formatCurrency(appContext.locale, appContext.currency, 0);
        } else {
            return formatCurrency(appContext.locale, appContext.currency, debitsMinusCredits);
        }
    }
    
    const doughnutChart = {
        data: {
            labels: labels,
            datasets: [{
                data: data,
                borderColor: [
                    "rgba(37, 137, 189, 1)", "rgba(176, 124, 158, 1)", "rgba(205, 198, 174, 1)", "rgba(56, 104, 106, 1)", "rgba(219, 216, 240, 1)", "rgba(163, 180, 162, 1)", "rgba(181, 145, 148, 1)", "rgba(54, 17, 52, 1)", "rgba(10, 35, 66, 1)", "rgba(80, 61, 66, 1)", 
                    "rgba(255, 228, 94, 1)", "rgba(32, 191, 85, 1)", "rgba(119, 135, 139, 1)", "rgba(190, 255, 199, 1)", "rgba(55, 62, 64, 1)", "rgba(72, 130, 134, 1)", "rgba(183, 213, 212, 1)", "rgba(255, 133, 82, 1)", "rgba(236, 145, 146, 1)", "rgba(255, 32, 110, 1)"
                ],
                borderWidth: 2,
                backgroundColor: [
                    "rgba(37, 137, 189, 0.7)", "rgba(176, 124, 158, 0.7)", "rgba(205, 198, 174, 0.7)", "rgba(56, 104, 106, 0.7)", "rgba(219, 216, 240, 0.7)", "rgba(163, 180, 162, 0.7)", "rgba(181, 145, 148, 0.7)", "rgba(54, 17, 52, 0.7)", "rgba(10, 35, 66, 0.7)", "rgba(80, 61, 66, 0.7)", 
                    "rgba(255, 228, 94, 0.7)", "rgba(32, 191, 85, 0.7)", "rgba(119, 135, 139, 0.7)", "rgba(190, 255, 199, 0.7)", "rgba(55, 62, 64, 0.7)", "rgba(72, 130, 134, 0.7)", "rgba(183, 213, 212, 0.7)", "rgba(255, 133, 82, 0.7)", "rgba(236, 145, 146, 0.7)", "rgba(255, 32, 110, 0.7)"
                ]
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            legend: {
                labels: {
                    fontColor: fontColor
                }
            },
        }
    }
    React.useEffect(() => {
        setLoading(true);
        let fetchedLabels = [];
        let fetchedData = [];
        axios.get(`${API_BASE_URL}/organization/${appContext.currentOrganizationId}/accountBalance/${startDate}/${endDate}`).then(response => {
            let expenseAccountBalances = [];
            response.data
                .filter(account => account.accountTypeId === 5)
                .forEach(account => {
                    expenseAccountBalances.push(account);
                });
            response.data
                .filter(childAccount => childAccount.parentAccountId !== null)
                .forEach(childAccount => {
                    if (expenseAccountBalances.find(parentAccount => parentAccount.accountId === childAccount.parentAccountId)) {
                        expenseAccountBalances.push(childAccount);
                    }
                })

            expenseAccountBalances
                .filter(account => !account.hasChildren)
                .forEach(account => {
                    fetchedLabels.push(account.accountName);
                    fetchedData.push(account.debitsMinusCredits);
                })

            setLabels(fetchedLabels);
            setData(fetchedData);
            setLoading(false);
        }).catch(() => {
            setLoading(false);
        });
    }, [])
    return(
        <Card className="shadow-sm very-rounded" style={{height: "380px"}}>
            <CardBody >
                <CardTitle className="font-weight-600">{dashboardText[appContext.locale]["Expense Breakdown"]}</CardTitle>
                {appContext.isLoading
                ?   <div className="d-flex justify-content-center fa-3x py-3"><i className="fas fa-circle-notch fa-spin"></i></div> 
                :   <div className="py-3">
                        <Doughnut data={doughnutChart.data} options={doughnutChart.options} height={250}/>
                    </div>
                } 
            </CardBody>
        </Card>
    )
}

export default ExpenseBreakdown;