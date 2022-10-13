import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import LoadingSpinner from '../../../components/misc/loading-spinner';
import { PageSettings } from '../../../config/page-settings';
import { PIE_CHART_BACKGROUND_COLORS, PIE_CHART_BORDER_COLORS, PIE_CHART_HOVER_BACKGROUND_COLORS } from '../../../utils/constants';
import { incomeStatementRenderText } from '../../../utils/i18n/income-statement-render-text';
import { formatCurrency, getPercentage, localizeDate } from '../../../utils/util-fns';

function PersonalExpenseReportPieChart({columnLabels, incomeStatementObjects, loading}) {
    const appContext = React.useContext(PageSettings);

    const [pieChartObjects, setPieChartObjects] = React.useState([]);

    const [fontColor, setFontColor] = React.useState(getComputedStyle(document.documentElement).getPropertyValue('--base-text-color'));

    React.useEffect(() => {
        setFontColor(
            appContext.colorScheme === 'dark'
                ? getComputedStyle(document.documentElement).getPropertyValue('--dark-mode-text-color')
                : getComputedStyle(document.documentElement).getPropertyValue('--base-text-color')
        );
    }, [appContext.colorScheme]) //detects color scheme and changes the color of the chart text accordingly

    React.useEffect(() => {
        let newDataObjectArray = [];
        incomeStatementObjects.forEach(incomeStatement => {
            let pieChartObject = {
                data: {
                    labels: [],
                    datasets: [{
                        data: [],
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
                                    return ` ${toolTipItem.label}: ${formatCurrency(appContext.locale, appContext.currency, toolTipItem.raw)} (${getPercentage(toolTipItem.raw, incomeStatement.totalExpenses)}%)`
                                },
                            }
                        }
                    },
                    
                }
            }
            let expenseParentLevelAccounts = incomeStatement.accountBalances.filter(account => account.accountTypeId === 5);
            expenseParentLevelAccounts.forEach(account => {
                pieChartObject.data.labels.push(account.accountName);
                pieChartObject.data.datasets[0].data.push(account.debitsMinusCredits);
            })
            newDataObjectArray.push(pieChartObject);
        })
        setPieChartObjects(newDataObjectArray);
    }, [incomeStatementObjects, fontColor]);

    return(
        <div className="d-flex justify-content-center">
            {loading
                ? <LoadingSpinner big />
                : pieChartObjects.map((pieChartObject, i) => {
                    return(
                        <div key={i} className="mx-4 d-flex flex-column align-items-center">
                            <div style={{height: "260px"}} >
                                <Doughnut
                                    key={i}
                                    data={pieChartObject.data}
                                    options={pieChartObject.options}
                                />
                            </div>
                            <div className="my-3">
                                <div className="font-weight-semibold text-center" key={i}>
                                    {columnLabels[i].label === "Custom"
                                        ?   <>
                                                <div>
                                                    {incomeStatementRenderText[appContext.locale]["From:"] + " " + localizeDate(columnLabels[i].startDate)}
                                                </div>
                                                <div>
                                                    {incomeStatementRenderText[appContext.locale]["To:"] + " " + localizeDate(columnLabels[i].endDate)}
                                                </div>
                                            </>
                                        : columnLabels[i].label}
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default PersonalExpenseReportPieChart;