import React from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../../../utils/constants.js';
import { PageSettings } from '../../../config/page-settings';
import { useHistory } from "react-router-dom";
import {balanceSummaryText} from "../../../utils/i18n/balance-summary-text.js";


function BalanceSummary(props) {
    //required props: widgetTitle
    //valid widgetTitles: "Balance Summary", "Account Switcher"
    //optional props: selectedAccountId, externalRefreshToken
    //externalRefreshToken can be any data. This prop should be changed when you want to force this component to refresh data. This prop should not be used for anything else. 
    const appContext = React.useContext(PageSettings);
    const history = useHistory();
    const [loading, setLoading] = React.useState(true);
    const [assetAndLiabilityAccounts, setAssetAndLiabilityAccounts] = React.useState([]);

    //fetch data on component mount
    React.useEffect(() => {
        axios.get(`${API_BASE_URL}/organization/${appContext.currentOrganizationId}/accountBalance`).then(response => {
            if (response.data) {
                let filteredAccounts = response.data.filter(accountBalance => accountBalance.accountTypeId == 1 || accountBalance.accountTypeId == 2);
                filteredAccounts.forEach(account => (account.amount = (account.accountTypeId == 1 ?
                    account.debitTotal - account.creditTotal : account.creditTotal - account.debitTotal)));
                setAssetAndLiabilityAccounts(filteredAccounts);
            }
            setLoading(false);
        }).catch(console.log);

    }, [appContext.currentOrganizationId, props.externalRefreshToken])


    return (
        <div className="widget widget-rounded mb-3">
            <div className="widget-header bg-light border-bottom">
                <h4 className="widget-header-title">{balanceSummaryText[appContext.locale][props.widgetTitle]}</h4>
            </div>
            <div className="overflow-auto px-2" style={{ height: '500px' }}>
                {loading ? <div className="d-flex justify-content-center fa-3x py-3"><i className="fas fa-circle-notch fa-spin"></i></div> :
                    <table className='table table-hover'>
                        <thead>
                            <tr>
                                <th>{balanceSummaryText[appContext.locale]["Account"]}</th>
                                <th className="text-right">{balanceSummaryText[appContext.locale]["Balance"]}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {assetAndLiabilityAccounts.map(account => {
                                return (
                                    <tr key={account.accountId} className={props.selectedAccountId == account.accountId? "bg-white-hover" : "cursor-pointer"} onClick={props.selectedAccountId == account.accountId? null : () => history.push(`/account-details/${account.accountId}`)}>
                                        <td>
                                            {account.accountName}
                                        </td>
                                        <td className={"text-right " + (account.creditTotal > account.debitTotal ? "text-red" : "")}>
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
    )
}

export default BalanceSummary;