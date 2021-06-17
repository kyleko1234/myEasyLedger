import React from 'react';
import BalanceSummary from './components/balance-summary';
import IncomeAndExpenseSummary from './components/income-and-expense-summary';
import { PageSettings } from '../../config/page-settings';
import {dashboardText} from '../../utils/i18n/dashboard-text';
import {populateSampleUserWithSampleData} from '../../utils/dev-utils'
import ExpenseBreakdown from './components/expense-breakdown';
import axios from 'axios';
import { API_BASE_URL } from '../../utils/constants';

function Dashboard() {
    const appContext = React.useContext(PageSettings);

    const [accountTypeBalances, setAccountTypeBalances] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [numberOfMonths, setNumberOfMonths] = React.useState(12);

    React.useEffect(() => {
        async function fetchData() {
            setLoading(true)
            await axios.get(`${API_BASE_URL}/organization/${appContext.currentOrganizationId}/accountTypeSummary/monthly/${numberOfMonths - 1}`).then(response => {
                setAccountTypeBalances(response.data);
            })    
            setLoading(false);
        }
        fetchData();
    }, [])

    return (
        <div>
            {/*<button type="button" onClick={populateSampleUserWithSampleData}>POPULATE SAMPLE DATA</button> */}
            <div className="row mb-md-3">
                <div className="col-xl-8 col-lg-6 mb-3 mb-lg-0">
                    {(appContext.isLoading || loading) ? <div className="d-flex justify-content-center fa-3x py-3"><i className="fas fa-circle-notch fa-spin"></i></div> :
                    <IncomeAndExpenseSummary
                        accountTypeBalances={accountTypeBalances}
                        numberOfMonths={numberOfMonths}
                    />}
                </div>
                <div className="col-xl-4 col-lg-6 mb-3 mb-lg-0">
                    {appContext.isLoading? <div className="d-flex justify-content-center fa-3x py-3"><i className="fas fa-circle-notch fa-spin"></i></div> : 
                    <BalanceSummary/> }
                </div>
            </div>
            <div className="row">
                <div className="col-xl-6 col-lg-6 mb-3 mb-lg-0">
                    {appContext.isLoading? <div className="d-flex justify-content-center fa-3x py-3"><i className="fas fa-circle-notch fa-spin"></i></div> : 
                    <ExpenseBreakdown/>}
                </div>
            </div>
		</div>
    )


}

export default Dashboard;