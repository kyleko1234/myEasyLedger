import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import LoadingSpinner from '../../../components/misc/loading-spinner';
import { PageSettings } from '../../../config/page-settings';
import { PIE_CHART_BACKGROUND_COLORS, PIE_CHART_BORDER_COLORS, PIE_CHART_HOVER_BACKGROUND_COLORS } from '../../../utils/constants';
import { incomeStatementRenderText } from '../../../utils/i18n/income-statement-render-text';
import { formatCurrency, getPercentage, localizeDate } from '../../../utils/util-fns';
/**
 * dateRanges should have the format of a DateRangeDTO object. Optional name field, required startDate and endDate fields.
 * customerData should be an array of objects. customerData[i] should correspond with dateRange[i].
 * Objects within customerData should have the format {customerNames: Array<String>, amounts: Array<Number, totalIncome: Number}.
 * customerData.customerNames[i] should correspond with customerData.amounts[i].
 */
function IncomeByCustomerPieCharts({dateRanges, customerData, loading}) {
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
        let pieCharts = [];
        customerData.forEach((customerDataObject) => {
            let pieChart = {
                data: {
                    labels: customerDataObject.customerNames,
                    datasets: [{
                        data: customerDataObject.amounts,
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
                                    return ` ${toolTipItem.label}: ${formatCurrency(appContext.locale, appContext.currency, toolTipItem.raw)} (${getPercentage(toolTipItem.raw, customerDataObject.totalIncome)}%)`
                                },
                            },
                        },
                    },
                    layout: {
                        padding: {
                            x: 80,
                        }
                    }    
                }
            }
            pieCharts.push(pieChart);
        })
        setPieChartObjects(pieCharts);
    }, [customerData, fontColor]);

    return(
        <div className="d-none d-lg-flex justify-content-center">
            {loading
                ? <LoadingSpinner big />
                : pieChartObjects.map((pieChart, i) => {
                    return(
                        <div key={i} className="mx-4 d-flex flex-column align-items-center">
                            <div style={{height: "260px"}} >
                                <Doughnut
                                    key={i}
                                    data={pieChart.data}
                                    options={pieChart.options}
                                />
                            </div>
                            <div className="my-3">
                                <div className="font-weight-semibold text-center" key={i}>
                                    {dateRanges[i].name === "Custom" || !dateRanges[i].name
                                        ?   <>
                                                <div>
                                                    {incomeStatementRenderText[appContext.locale]["From:"] + " " + localizeDate(dateRanges[i].startDate)}
                                                </div>
                                                <div>
                                                    {incomeStatementRenderText[appContext.locale]["To:"] + " " + localizeDate(dateRanges[i].endDate)}
                                                </div>
                                            </>
                                        : dateRanges[i].name}
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default IncomeByCustomerPieCharts;