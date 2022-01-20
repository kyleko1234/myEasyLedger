import React from 'react';
import { Bar, defaults, getDatasetAtEvent, getElementAtEvent } from 'react-chartjs-2';
import 'chart.js/auto';
import { PageSettings } from '../../../config/page-settings';
import axios from 'axios';
import { API_BASE_URL } from '../../../utils/constants';
import {incomeAndExpenseSummaryText} from '../../../utils/i18n/income-and-expense-summary-text.js';
import { Card, CardBody, CardTitle } from 'reactstrap';
import { timers } from 'jquery';

//required props: 
function IncomeAndExpenseSummary(props) {
    const appContext = React.useContext(PageSettings);
    const [labels, setLabels] = React.useState([]);
    const [incomeData, setIncomeData] = React.useState([]);
    const [expenseData, setExpenseData] = React.useState([]);
    const [fontColor, setFontColor] = React.useState(getComputedStyle(document.documentElement).getPropertyValue('--base-text-color'));
    const [gridlineColor, setGridlineColor] = React.useState(getComputedStyle(document.documentElement).getPropertyValue('--base-gridline-color'))
    const [loading, setLoading] = React.useState(true);
    const [numberOfMonths, setNumberOfMonths] = React.useState(12);
    const chartRef = React.useRef();
    const chartOnClick = event => {
        console.log(getElementAtEvent(chartRef.current, event));
    }

    //fetch data on component mount
    React.useEffect(() => {
        setLoading(true)
        axios.get(`${API_BASE_URL}/organization/${appContext.currentOrganizationId}/accountTypeSummary/monthly/${numberOfMonths - 1}`).then(response => {
            let accountTypeSummaries = response.data;
            let incomeAndExpenseData = accountTypeSummaries.filter(accountTypeSummary => accountTypeSummary.accountTypeId == 4 || accountTypeSummary.accountTypeId == 5);
            let unparsedLabels = [];
            let incomeSummaries = [];
            let expenseSummaries = [];
            let currentDate = new Date();
            let currentYearMonth = (currentDate.getFullYear() * 100) + (currentDate.getMonth() + 1);
            if (incomeAndExpenseData.length != 0) {
                unparsedLabels.push(incomeAndExpenseData[0].yearMonth); //add earliest yearMonth in the returned data set to the array of unparsed date labels
                if (!(incomeAndExpenseData[0].yearMonth == currentYearMonth)) {
                    while (unparsedLabels.length < numberOfMonths) { //generate consecutive months from the earliest yearMonth to the present yearMonth
                        let nextMonth = unparsedLabels[unparsedLabels.length - 1] % 100;
                        let nextYear = (unparsedLabels[unparsedLabels.length - 1] - nextMonth) / 100;
                        if (nextMonth == 12) {
                            nextMonth = 1;
                            nextYear++;
                        } else {
                            nextMonth++;
                        }
                        let nextYearMonth = nextYear * 100 + nextMonth;
                        unparsedLabels.push(nextYearMonth);
                        if (nextYearMonth == currentYearMonth) {
                            break;
                        }
                    }
                }
                unparsedLabels.forEach(unparsedLabel => { //populate income and expense summary arrays with data from corresponding objects
                    let incomeSummary = incomeAndExpenseData.find(summaryObject => summaryObject.accountTypeId == 4 && summaryObject.yearMonth == unparsedLabel);
                    let expenseSummary = incomeAndExpenseData.find(summaryObject => summaryObject.accountTypeId == 5 && summaryObject.yearMonth == unparsedLabel);
                    if (incomeSummary) {
                        incomeSummaries.push(incomeSummary.creditAmount - incomeSummary.debitAmount);
                    } else {
                        incomeSummaries.push(0);
                    }
                    if (expenseSummary) {
                        expenseSummaries.push(expenseSummary.debitAmount - expenseSummary.creditAmount);
                    } else {
                        expenseSummaries.push(0);
                    }
                })
                setIncomeData(incomeSummaries);
                setExpenseData(expenseSummaries);
                setLabels(unparsedLabels.map(label => parseYearMonth(label)));
                setLoading(false);
            }
        })    
    }, [])

    React.useEffect(() => {
        setFontColor(
            appContext.colorScheme === 'dark'
                ? getComputedStyle(document.documentElement).getPropertyValue('--dark-mode-text-color')
                : getComputedStyle(document.documentElement).getPropertyValue('--base-text-color')
        );
        setGridlineColor(
            appContext.colorScheme === 'dark'
                ? getComputedStyle(document.documentElement).getPropertyValue('--dark-mode-gridline-color')
                : getComputedStyle(document.documentElement).getPropertyValue('--base-gridline-color')
        );

    }, [appContext.colorScheme]) //detects color scheme and changes the color of the chart text accordingly

    //takes integer representing a year and month in format yyyymm and returns a string "yyyy MonthName"
    const parseYearMonth = yyyymm => {
        let month = yyyymm % 100;
        let year = (yyyymm - month) / 100;
        let monthString = ''
        switch (month) {
            case 1:
                monthString = incomeAndExpenseSummaryText[appContext.locale][" Jan"];
                break;
            case 2:
                monthString = incomeAndExpenseSummaryText[appContext.locale][" Feb"];
                break;
            case 3:
                monthString = incomeAndExpenseSummaryText[appContext.locale][" Mar"];
                break;
            case 4:
                monthString = incomeAndExpenseSummaryText[appContext.locale][" Apr"];
                break;
            case 5:
                monthString = incomeAndExpenseSummaryText[appContext.locale][" May"];
                break;
            case 6:
                monthString = incomeAndExpenseSummaryText[appContext.locale][" June"];
                break;
            case 7:
                monthString = incomeAndExpenseSummaryText[appContext.locale][" July"];
                break;
            case 8:
                monthString = incomeAndExpenseSummaryText[appContext.locale][" Aug"];
                break;
            case 9:
                monthString = incomeAndExpenseSummaryText[appContext.locale][" Sept"];
                break;
            case 10:
                monthString = incomeAndExpenseSummaryText[appContext.locale][" Oct"];
                break;
            case 11:
                monthString = incomeAndExpenseSummaryText[appContext.locale][" Nov"];
                break;
            case 12:
                monthString = incomeAndExpenseSummaryText[appContext.locale][" Dec"];
                break;
            default:
                break;
        }
        return (year.toString() + monthString);
    }


    const barChart = {
        data: {
            labels: labels,
            datasets: [{
                label: incomeAndExpenseSummaryText[appContext.locale]["Income"],
                borderWidth: 2,
                borderColor: '#348fe2',
                backgroundColor: 'rgba(52, 143, 226, 0.3)',
                hoverBorderColor: "#61A8E8",
                hoverBackgroundColor: "rgba(97, 168, 232, 0.3)",
                data: incomeData
            }, {
                label: incomeAndExpenseSummaryText[appContext.locale]["Expenses"],
                borderWidth: 2,
                borderColor: '#8f103c',
                backgroundColor: 'rgba(143, 16, 60, 0.3)',
                data: expenseData,
                hoverBackgroundColor:'rgba(189, 21, 79, 0.3)',
                hoverBorderColor: '#BD154F'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    labels: {
                        color: fontColor,
                    },
                    onHover: (event, chartElement) => {
                        event.native.target.style.cursor = 'pointer'
                    },
                    onLeave: (event, chartElement) => {
                        event.native.target.style.cursor =  '';
                    }
                },
            
            },
            scales: {
                y: {
                    grid: {
                        color: gridlineColor,
                    },
                    ticks: {
                        color: fontColor,
                    },
                    beginAtZero: true,
                    grace: "5%"
                },
                x: {
                    grid: {
                        color: gridlineColor
                    },
                    ticks: {
                        color: fontColor,
                    },
                }
            },
            onHover: (event, chartElement) => {
                event.native.target.style.cursor = chartElement[0] ? 'pointer' : '';
            },    
        
        }
    };

    return (
        <Card style={{ height: '500px' }} className="shadow-sm very-rounded">
            <CardBody >
                <CardTitle className="font-weight-600">
                    {incomeAndExpenseSummaryText[appContext.locale]["Income and Expenses"]}
                </CardTitle>
                <div style={{height: "90%"}}>
                    <Bar 
                        data={barChart.data} 
                        options={barChart.options} 
                        ref={chartRef}
                        onClick={chartOnClick}
                    />
                </div>
            </CardBody>
        </Card>
    )
}

export default IncomeAndExpenseSummary;