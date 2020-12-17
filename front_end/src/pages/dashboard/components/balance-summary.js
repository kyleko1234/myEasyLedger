import React from 'react';
import axios from 'axios';
import {API_BASE_URL} from '../../../utils/constants.js';
import {PageSettings} from '../../../config/page-settings';
import { useHistory } from "react-router-dom";
import PerfectScrollbar from 'react-perfect-scrollbar';



function BalanceSummary() {
    const appContext = React.useContext(PageSettings);
    const history = useHistory();
    const [loading, setLoading] = React.useState(true);
    const [assetAndLiabilityAccounts, setAssetAndLiabilityAccounts] = React.useState([]);
    const labels = ["Account", "Balance"];

    //fetch data on component mount
    React.useEffect(() => {
        axios.get(`${API_BASE_URL}/organization/${appContext.currentOrganization}/accountBalance`).then(response => {
            if (response.data) {
                let filteredAccounts = response.data.filter(accountBalance => accountBalance.accountTypeId == 1 || accountBalance.accountTypeId == 2);
                filteredAccounts.forEach(account => (account.amount = (account.accountTypeId == 1? 
                    account.debitTotal - account.creditTotal : account.creditTotal - account.debitTotal)));
                setAssetAndLiabilityAccounts(filteredAccounts);
            }
            setLoading(false);
        }).catch(console.log);

    }, [])


    return (
        <div className="card border-0 mb-3">
            <div className="card-body">
                <div className="mb-3">
                    <b>BALANCE SUMMARY</b>
                </div>
                <div style={{ height: '500px'}} className="overflow-auto">
                    {loading? <div>Loading...</div> :
                            <table className = 'table table-hover'>
                                <thead>
                                    <tr>
                                        <th>Account</th>
                                        <th className="text-right">Balance</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {assetAndLiabilityAccounts.map(account => {
                                        return(
                                            <tr key={account.accountId} className="cursor-pointer" onClick={() => history.push(`/chartofaccounts/accountDetails/${account.accountId}`)}>
                                                <td>
                                                    {account.accountName}
                                                </td>
                                                <td className={"text-right " + (account.creditTotal > account.debitTotal? "text-red": "" )}>
                                                    {new Intl.NumberFormat(appContext.locale, { style: 'currency', currency: appContext.currency }).format(account.amount)}
                                                </td>
                                            </tr>
                                        )                  
                                    })}
                                </tbody>
                            </table>
                    }
				</div>
            </div>
        </div>
    )
}

export default BalanceSummary;