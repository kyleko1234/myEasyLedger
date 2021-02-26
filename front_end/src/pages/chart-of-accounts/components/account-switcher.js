import React from 'react';
import axios from 'axios';
import { API_BASE_URL, CATEGORY_ACCOUNT_TYPES, NON_CATEGORY_ACCOUNT_TYPES } from '../../../utils/constants.js';
import { PageSettings } from '../../../config/page-settings';
import { useHistory } from "react-router-dom";
import {balanceSummaryText} from "../../../utils/i18n/balance-summary-text.js";
import {Link} from 'react-router-dom';


function AccountSwitcher(props) {
    //required props: widgetTitle (string), category (boolean), selectedAccountId (number)
    //valid widgetTitles: "Switch Accounts", "Switch Categories"
    //if category is true there will be balances for each account shown in the list, otherwise not. Obviously if category is true this is a list of categories, otherwise it is a list of accounts. This is relevant for personal ui only
    //optional props: externalRefreshToken
    //externalRefreshToken can be any data. This prop should be changed when you want to force this component to refresh data. This prop should not be used for anything else. 
    const appContext = React.useContext(PageSettings);
    const history = useHistory();
    const [loading, setLoading] = React.useState(true);
    const [accountGroups, setAccountGroups] = React.useState([]);
    const [accounts, setAccounts] = React.useState([]);
    //fetch data on component mount
    React.useEffect(() => {
        setLoading(true);
        axios.get(`${API_BASE_URL}/organization/${appContext.currentOrganizationId}/accountGroup`).then(response => {
            if (response.data) {
                if (props.category) {
                    setAccountGroups(response.data.filter(accountGroup => CATEGORY_ACCOUNT_TYPES.includes(accountGroup.accountTypeId)));
                } else {
                    setAccountGroups(response.data.filter(accountGroup => NON_CATEGORY_ACCOUNT_TYPES.includes(accountGroup.accountTypeId)));
                }
            }
        }).catch(console.log);
        if (props.category) {
            axios.get(`${API_BASE_URL}/organization/${appContext.currentOrganizationId}/account`).then(response => {
                if (response.data) {
                    setAccounts(response.data);
                }
                setLoading(false);
            }).catch(console.log);
        } else {
            axios.get(`${API_BASE_URL}/organization/${appContext.currentOrganizationId}/accountBalance`).then(response => {
                if (response.data) {
                    let formattedAccounts = response.data;
                    formattedAccounts.forEach(account => (account.amount = (account.accountTypeId == 1 ? 
                        account.debitTotal - account.creditTotal : account.creditTotal - account.debitTotal)));
                    setAccounts(formattedAccounts);
                }
                setLoading(false);
            }).catch(console.log);
        }
    }, [appContext.currentOrganizationId, props.externalRefreshToken])

    const formatBalance = (accountTypeId, amount) => {
        let formattedNumber = new Intl.NumberFormat(appContext.locale, { style: 'currency', currency: appContext.currency }).format(amount)
        let className = "";
        if (accountTypeId == 1 && amount < 0) {
            className = "text-red"
        } else if (accountTypeId == 2 && amount > 0) {
            className = "text-red"
        }
        
        return (
            <div className={className}>{formattedNumber}</div>
        )
    }
    return (
        <div className="widget widget-rounded widget-list widget-list-rounded mb-3">
            <div className="widget-header border-bottom">
                <h4 className="widget-header-title">{balanceSummaryText[appContext.locale][props.widgetTitle]}</h4>
            </div>
            <div className="overflow-auto" style={{ height: '500px' }}>
                {//loading ? <div className="d-flex justify-content-center fa-3x py-3"><i className="fas fa-circle-notch fa-spin"></i></div> :     --add this line in case you need a loading spinner. currently it is removed because it is annoying to see a spinner every click.
                    accountGroups.map(accountGroup => {
                        return (
                            <React.Fragment key={accountGroup.accountGroupId}>
                                <div className="widget-list-item bg-light">
                                    <div className="widget-list-content font-weight-600">
                                        <div className="widget-list-title">{accountGroup.accountGroupName}</div>
                                    </div>
                                </div>
                                {accounts ? 
                                    accounts.filter(account => account.accountGroupId == accountGroup.accountGroupId).map(account => {
                                        return(
                                            <>
                                                {account.accountId == props.selectedAccountId? 
                                                    <div className="widget-list-item bg-white-hover" key={account.accountId}>
                                                        <div className="widget-list-content p-l-30">
                                                            <div className="widget-list-title">{account.accountName}</div>
                                                        </div>
                                                        {props.category? null : 
                                                            <div className="widget-list-content text-right">
                                                                {formatBalance(account.accountTypeId, account.amount)}
                                                            </div>
                                                        }
                                                        <div className="m-r-10 widget-list-action text-right">
                                                            <i className="fa fa-angle-right fa-lg text-muted"></i>
                                                        </div>
                                                    </div>
                                                    :
                                                    <Link className="widget-list-item bg-white" to={props.category? `/category-details/${account.accountId}`: `/account-details/${account.accountId}`} key={account.accountId}>
                                                        <div className="widget-list-content p-l-30">
                                                            <div className="widget-list-title">{account.accountName}</div>
                                                        </div>
                                                        {props.category? null : 
                                                            <div className="widget-list-content text-right">
                                                                {formatBalance(account.accountTypeId, account.amount)}
                                                            </div>
                                                        }
                                                        <div className="m-r-10 widget-list-action text-right">
                                                            <i className="fa fa-angle-right fa-lg text-muted"></i>
                                                        </div>
                                                    </Link>
                                                }
                                            </>
                                        )
                                    })
                                : <div className="d-flex justify-content-center fa-3x py-3"><i className="fas fa-circle-notch fa-spin"></i></div>}
                            </React.Fragment>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default AccountSwitcher;