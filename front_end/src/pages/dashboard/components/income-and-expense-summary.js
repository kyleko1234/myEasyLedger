import React from 'react';
import { Bar, defaults } from 'react-chartjs-2';
import { PageSettings } from '../../../config/page-settings';
import axios from 'axios';
import { API_BASE_URL } from '../../../utils/constants';

function IncomeAndExpenseSummary() {
    const appContext = React.useContext(PageSettings);
    const [loading, setLoading] = React.useState(true);
    const [labels, setLabels] = React.useState([]);
    const [incomeData, setIncomeData] = React.useState([]);
    const [expenseData, setExpenseData] = React.useState([]);
    const [numberOfMonths, setNumberOfMonths] = React.useState(12);

    //fetch data on component mount
    React.useEffect(() => {
        axios.get(`${API_BASE_URL}/organization/${appContext.currentOrganization}/accountTypeSummary/monthly/${numberOfMonths - 1}`).then(response => {
            if (response.data) { //Warning: proper formatting of data for the bar chart relies on server-side sorting of AccountTypeSummary by yearMonth ascending.
                let incomeAndExpenseData = response.data.filter(accountTypeSummary => accountTypeSummary.accountTypeId == 4 || accountTypeSummary.accountTypeId == 5);
                let unparsedLabels = [];
                let incomeSummaries = [];
                let expenseSummaries = [];
                let currentDate = new Date();
                let currentYearMonth = (currentDate.getFullYear() * 100) + (currentDate.getMonth() + 1);
                if (incomeAndExpenseData.length != 0) {
                    unparsedLabels.push(incomeAndExpenseData[0].yearMonth); //add earliest yearMonth in the returned data set to the array of unparsed date labels
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
                }

            }
            setLoading(false);
        }).catch(console.log);

    }, [])

    defaults.global.defaultFontColor = "#333"; //chartJS font color


    //takes integer representing a year and month in format yyyymm and returns a string "yyyy MonthName"
    const parseYearMonth = yyyymm => {
        let month = yyyymm % 100;
        let year = (yyyymm - month) / 100;
        let monthString = ''
        switch (month) {
            case 1:
                monthString = " Jan";
                break;
            case 2:
                monthString = " Feb";
                break;
            case 3:
                monthString = " Mar";
                break;
            case 4:
                monthString = " Apr";
                break;
            case 5:
                monthString = " May";
                break;
            case 6:
                monthString = " June";
                break;
            case 7:
                monthString = " July";
                break;
            case 8:
                monthString = " Aug";
                break;
            case 9:
                monthString = " Sept";
                break;
            case 10:
                monthString = " Oct";
                break;
            case 11:
                monthString = " Nov";
                break;
            case 12:
                monthString = " Dec";
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
                label: 'Income',
                borderWidth: 2,
                borderColor: '#727cb6',
                backgroundColor: 'rgba(114, 124, 182, 0.3)',
                data: incomeData
            }, {
                label: 'Expenses',
                borderWidth: 2,
                borderColor: '#8f103c',
                backgroundColor: 'rgba(143, 16, 60, 0.3)',
                data: expenseData
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false
        }
    };






    return (
        <div className="card border-0 widget widget-rounded mb-3">
            <div className="widget-header bg-light border-bottom">
                <h4 className="widget-header-title">Income and Expenses</h4>
            </div>
            {loading ? <div>Loading...</div> :
                <div className="card-body" style={{ height: '500px' }}>
                    <Bar className="text-white" data={barChart.data} options={barChart.options} />
                </div>
            }
        </div>
    )
}

export default IncomeAndExpenseSummary;