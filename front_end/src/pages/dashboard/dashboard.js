import React from 'react';
import BalanceSummary from './components/balance-summary';
import IncomeAndExpenseSummary from './components/income-and-expense-summary';
import { PageSettings } from '../../config/page-settings';
import {dashboardText} from '../../utils/i18n/dashboard-text';
import {populateSampleUserWithSampleData} from '../../utils/dev-utils'
import ExpenseBreakdown from './components/expense-breakdown';
import axios from 'axios';
import { API_BASE_URL } from '../../utils/constants';
import NetAssets from './components/net-assets';

function Dashboard() {
    const appContext = React.useContext(PageSettings);

    const [accountTypeSummaries, setAccountTypeSummaries] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [numberOfMonths, setNumberOfMonths] = React.useState(12);

    React.useEffect(() => {
        async function fetchData() {
            setLoading(true)
            await axios.get(`${API_BASE_URL}/organization/${appContext.currentOrganizationId}/accountTypeSummary/monthly/${numberOfMonths - 1}`).then(response => {
                setAccountTypeSummaries(response.data);
            })    
            setLoading(false);
        }
        fetchData();
    }, [])

    return (
        <>
            {appContext.currentOrganizationId
                ? <div>
                    {/*<button type="button" onClick={populateSampleUserWithSampleData}>POPULATE SAMPLE DATA</button>*/}
                    <div className="row mb-md-3">
                        <div className="col-xl-8 col-lg-6 mb-3 mb-lg-0">
                            {(appContext.isLoading || loading) ? <div className="d-flex justify-content-center fa-3x py-3"><i className="fas fa-circle-notch fa-spin"></i></div> :
                            <IncomeAndExpenseSummary
                                accountTypeSummaries={accountTypeSummaries}
                                numberOfMonths={numberOfMonths}
                            />}
                        </div>
                        <div className="col-xl-4 col-lg-6 mb-3 mb-lg-0">
                            {appContext.isLoading? <div className="d-flex justify-content-center fa-3x py-3"><i className="fas fa-circle-notch fa-spin"></i></div> : 
                            <BalanceSummary/>}
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-6 mb-3 mb-lg-0">
                            {appContext.isLoading? <div className="d-flex justify-content-center fa-3x py-3"><i className="fas fa-circle-notch fa-spin"></i></div> : 
                            <ExpenseBreakdown/>}
                        </div>
                        <div className="col-lg-6 mb-3 mb-lg-0">
                            {(appContext.isLoading || loading) ? <div className="d-flex justify-content-center fa-3x py-3"><i className="fas fa-circle-notch fa-spin"></i></div> :
                            <NetAssets/>}
                        </div>
                    </div>
                </div>
                : <div className="d-flex justify-content-center">
                    <div className="text-muted h3 pt-3 text-center">
                        {dashboardText[appContext.locale]["Create a new EasyLedger by clicking the button in the upper-right corner."]}
                    </div>
                </div>
            }
        </>
    )


}

export default Dashboard;