import React from 'react';
import { Pie } from 'react-chartjs-2';
import LoadingSpinner from '../../../components/misc/loading-spinner';
import { PageSettings } from '../../../config/page-settings';
import { incomeStatementRenderText } from '../../../utils/i18n/income-statement-render-text';

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
                    maintainAspectRatio: false,
                    responsive: true,
                    plugins: {
                        legend: {
                            display: false,
                            labels: {
                                color: fontColor
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
                        <div className="mx-5 d-flex flex-column align-items-center">
                            <div style={{height: "300px"}} >
                                <Pie
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
                                                    {incomeStatementRenderText[appContext.locale]["From:"] + " " + columnLabels[i].startDate}
                                                </div>
                                                <div>
                                                    {incomeStatementRenderText[appContext.locale]["To:"] + " " + columnLabels[i].endDate}
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