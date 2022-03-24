import React from 'react';
import { PageSettings } from '../../../config/page-settings';
import { Card, CardBody, CardTitle } from 'reactstrap';
import { Line, defaults } from 'react-chartjs-2';
import {incomeAndExpenseSummaryText} from '../../../utils/i18n/income-and-expense-summary-text.js';
import axios from 'axios';
import { API_BASE_URL } from '../../../utils/constants';
import { dashboardText } from '../../../utils/i18n/dashboard-text';

//required props: numberOfMonths
function NetAssets(props) {
    const appContext = React.useContext(PageSettings);
    const [numberOfMonths, setNumberOfMonths] = React.useState(12);
    const [netAssetsData, setNetAssetsData] = React.useState([]);
    const [labels, setLabels] = React.useState([]);
    const [fontColor, setFontColor] = React.useState(getComputedStyle(document.documentElement).getPropertyValue('--base-text-color'));
    const [gridlineColor, setGridlineColor] = React.useState(getComputedStyle(document.documentElement).getPropertyValue('--base-gridline-color'))

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

    const lineChart = {
        data: {
            labels: labels,
            datasets: [{
                    label: (appContext.isEnterprise? dashboardText[appContext.locale]["Net Assets"] :dashboardText[appContext.locale]["Net Worth"]),
                    borderColor: '#348fe2',
                    pointBackgroundColor: 'black',
                    pointRadius: 2,
                    borderWidth: 2,
                    backgroundColor: 'rgba(52, 143, 226, 0.3)',
                    data: netAssetsData,
                    tension: 0
            }]
        },
        options: {
            responsive: true, 
            maintainAspectRatio: false,
            interaction: {
                mode: 'nearest',
                intersect: false
            },
            plugins: {
                
                legend: {
                    labels: {
                        color: fontColor
                    }
                }
            },
            scales: {
                y: {
                    grid: {
                        color: gridlineColor,
                    },
                    ticks: {
                        color: fontColor,
                    }
                },
                x: {
                    grid: {
                        color: gridlineColor
                    },
                    ticks: {
                        color: fontColor,
                    }
                }
            } 
        }
    };


    React.useEffect(() => {
        let isMounted = true;
        axios.get(`${API_BASE_URL}/organization/${appContext.currentOrganizationId}/monthlyNetAssets/${numberOfMonths}`).then(response => {
            if (response.data) {
                let unparsedLabels = [];
                let retrievedNetAssetsData = [];
                response.data.forEach(dto => {
                    unparsedLabels.push(dto.yearMonth);
                    retrievedNetAssetsData.push(dto.netAssets);
                })
                if (isMounted) {
                    setNetAssetsData(retrievedNetAssetsData);
                    setLabels(unparsedLabels.map(label => parseYearMonth(label)));    
                }
            }
        })
        return () => {
            isMounted = false;
        }
    }, [numberOfMonths])

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
        <Card className="shadow-sm very-rounded " style={{height: "380px"}}>
            <CardBody>
                <CardTitle className="font-weight-600">
                    {appContext.isEnterprise? dashboardText[appContext.locale]["Net Assets"] : dashboardText[appContext.locale]["Net Worth"]}
                </CardTitle>
                <div >
                    <Line data={lineChart.data} options={lineChart.options} height={300}/>
                </div>
            </CardBody>
        </Card>
    )
}

export default NetAssets;