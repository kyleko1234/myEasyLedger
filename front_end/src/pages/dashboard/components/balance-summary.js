import React from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../../../utils/constants.js';
import { PageSettings } from '../../../config/page-settings';
import { useHistory } from "react-router-dom";
import {balanceSummaryText} from "../../../utils/i18n/balance-summary-text.js";
import { Card, CardBody } from 'reactstrap';


function BalanceSummary(props) {
    //optional props: selectedAccountId, externalRefreshToken
    //externalRefreshToken can be any data. This prop should be changed when you want to force this component to refresh data. This prop should not be used for anything else. 
    const appContext = React.useContext(PageSettings);
    const history = useHistory();
    const [loading, setLoading] = React.useState(true);
    const [assetAndLiabilityAccounts, setAssetAndLiabilityAccounts] = React.useState([]);

    //fetch data on component mount
    React.useEffect(() => {
        axios.get(`${API_BASE_URL}/organization/${appContext.currentOrganizationId}/account`).then(response => {
            if (response.data) {
                let filteredAccounts = response.data.filter(account => (account.accountTypeId == 1 || account.accountTypeId == 2) && account.hasChildren === false);
                setAssetAndLiabilityAccounts(filteredAccounts);
            }
            setLoading(false);
        }).catch(console.log);

    }, [appContext.currentOrganizationId, props.externalRefreshToken])


    return (
        <Card className="shadow-sm very-rounded">
            <CardBody className="overflow-auto py-0" style={{ height: '500px' }}>
                {loading ? <div className="d-flex justify-content-center fa-3x py-3"><i className="fas fa-circle-notch fa-spin"></i></div> :
                    <table className='table table-hover'>
                        <thead>
                            <tr>
                                <th className="border-top-0">{balanceSummaryText[appContext.locale]["Account"]}</th>
                                <th className="text-right border-top-0">{balanceSummaryText[appContext.locale]["Balance"]}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {assetAndLiabilityAccounts.map(account => {
                                return (
                                    <tr key={account.accountId} className={props.selectedAccountId == account.accountId? "bg-white-hover" : "cursor-pointer"} onClick={props.selectedAccountId == account.accountId? null : () => history.push(`/account-details/${account.accountId}`)}>
                                        <td>
                                            {account.accountCode? account.accountCode + " - " + account.accountName : account.accountName}
                                        </td>
                                        <td className={"text-right " + (account.creditTotal > account.debitTotal ? "text-red" : "")}>
                                            {new Intl.NumberFormat(appContext.locale, { style: 'currency', currency: appContext.currency }).format(account.accountTypeId == 1? account.debitsMinusCredits : (account.debitsMinusCredits == 0? account.debitsMinusCredits : account.debitsMinusCredits * -1))}
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                }
            </CardBody>
        </Card>
    )
}

export default BalanceSummary;