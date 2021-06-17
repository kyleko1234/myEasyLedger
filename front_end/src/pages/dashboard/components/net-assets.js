import React from 'react';
import { PageSettings } from '../../../config/page-settings';
import { Card, CardBody, CardTitle } from 'reactstrap';
import { Line, defaults } from 'react-chartjs-2';
import {incomeAndExpenseSummaryText} from '../../../utils/i18n/income-and-expense-summary-text.js';

//required props: accountTypeSummaries, numberOfMonths
function NetAssets(props) {
    const appContext = React.useContext(PageSettings);
    const [netAssetsData, setNetAssetsData] = React.useState([])
    const [labels, setLabels] = React.useState([])

    const lineChart = {
        data: {
            labels: labels,
            datasets: [{
                    label: 'Net worth',
                    borderColor: '#348fe2',
                    pointBackgroundColor: 'black',
                    pointRadius: 2,
                    borderWidth: 2,
                    backgroundColor: 'rgba(52, 143, 226, 0.3)',
                    data: netAssetsData
            }]
        },
        options: {
            responsive: true, 
            maintainAspectRatio: false,
            hover: {
                mode: 'nearest',
                intersect: true
            },
            tooltips: {
                mode: 'index',
                intersect: false,
            }
        }
    };

    defaults.global.defaultFontColor = getComputedStyle(document.documentElement).getPropertyValue('--base-font-color'); //chartJS font color



    React.useEffect(() => {
        if (props.accountTypeSummaries) {
            let assetsAndLiabilitiesData = props.accountTypeSummaries.filter(accountTypeSummary => accountTypeSummary.accountTypeId == 1 || accountTypeSummary.accountTypeId == 2);
            let unparsedLabels = [];
            let netAssetsSummaries = [];
            let currentDate = new Date();
            let currentYearMonth = (currentDate.getFullYear() * 100) + (currentDate.getMonth() + 1);
            if (assetsAndLiabilitiesData.length != 0) {
                unparsedLabels.push(assetsAndLiabilitiesData[0].yearMonth); //add earliest yearMonth in the returned data set to the array of unparsed date labels
                while (unparsedLabels.length < props.numberOfMonths) { //generate consecutive months from the earliest yearMonth to the present yearMonth
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
                let assetsSummary = assetsAndLiabilitiesData.find(summaryObject => summaryObject.accountTypeId == 1 && summaryObject.yearMonth == unparsedLabel);
                let liabilitiesSummary = assetsAndLiabilitiesData.find(summaryObject => summaryObject.accountTypeId == 2 && summaryObject.yearMonth == unparsedLabel);
                
                let assetsAmount;
                let liabilitiesAmount;
                if (assetsSummary) {
                    assetsAmount = (assetsSummary.debitAmount - assetsSummary.creditAmount);
                } else {
                    assetsAmount = 0;
                }
                if (liabilitiesSummary) {
                    liabilitiesAmount = (liabilitiesSummary.creditAmount - liabilitiesSummary.debitAmount);
                } else {
                    liabilitiesAmount = 0;
                }

                netAssetsSummaries.push(assetsAmount - liabilitiesAmount);
            })
            setNetAssetsData(netAssetsSummaries);
            setLabels(unparsedLabels.map(label => parseYearMonth(label)));
        }
    }, [props.accountTypeSummaries])

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
    
    

    return(
        <Card className="shadow-sm very-rounded">
            <CardBody>
                <CardTitle className="font-weight-600">
                    Net Worth
                </CardTitle>
                <div>
                    <Line data={lineChart.data} options={lineChart.options}/>
                </div>
            </CardBody>
        </Card>
    )
}

export default NetAssets;