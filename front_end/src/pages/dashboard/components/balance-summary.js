import React from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../../../utils/constants.js';
import { PageSettings } from '../../../config/page-settings';
import { Link, useHistory } from "react-router-dom";
import {balanceSummaryText} from "../../../utils/i18n/balance-summary-text.js";
import { Card, CardBody, CardTitle } from 'reactstrap';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { formatCurrency, getTodayAsDateString } from '../../../utils/util-fns.js';
import { tableOfJournalEntriesText } from '../../../utils/i18n/table-of-journal-entries-text.js';


function BalanceSummary(props) {
    //optional props: selectedAccountId, externalRefreshToken
    //externalRefreshToken can be any data. This prop should be changed when you want to force this component to refresh data. This prop should not be used for anything else. 
    const appContext = React.useContext(PageSettings);
    const history = useHistory();
    const [loading, setLoading] = React.useState(true);
    const [displayedAccounts, setDisplayedAccounts] = React.useState([]);
    const today = getTodayAsDateString();

    const filterZeroBalanceAccounts = true;

    const accountTypePrefixes = {
        1: tableOfJournalEntriesText[appContext.locale]["[A] "],
        2: tableOfJournalEntriesText[appContext.locale]["[L] "],
        3: tableOfJournalEntriesText[appContext.locale]["[O] "],
        4: tableOfJournalEntriesText[appContext.locale]["[I] "],
        5: tableOfJournalEntriesText[appContext.locale]["[E] "]
    }

    //fetch data on component mount
    React.useEffect(() => {
        let mounted = true;
        axios.get(`${API_BASE_URL}/organization/${appContext.currentOrganizationId}/accountBalance/${today}`).then(response => {
            if (response.data) {
                let formattedAccounts = response.data.map(account => {
                    if (!account.accountTypeId) {
                        account.accountTypeId = response.data.find(parentAccount => parentAccount.accountId === account.parentAccountId).accountTypeId;
                    }
                    return account;
                })
                let filteredAccounts = formattedAccounts.filter(account => {
                    if ((account.accountTypeId === 1 || account.accountTypeId === 2 || account.accountTypeId === 3) 
                            && !account.hasChildren) {
                        if (filterZeroBalanceAccounts) {
                            if (account.debitsMinusCredits) {
                                return true;
                            } else {
                                return false;
                            }
                        } else {
                            return true;
                        }
                    } else {
                        return false;
                    }
                });
                if (mounted) {
                    setDisplayedAccounts(filteredAccounts);
                }
            }
            if (mounted){
                setLoading(false);
            }
        }).catch(console.log);
        
        return () => {
            mounted = false;
        }
    }, [appContext.currentOrganizationId, props.externalRefreshToken])


    return (
        <Card className="shadow-sm very-rounded" style={{ height: '500px' }}>
            <CardBody>
                <CardTitle className="font-weight-semibold">
                    {balanceSummaryText[appContext.locale]["Balance Summary"]} 
                    <span className="font-weight-normal">
                        {loading
                            ? null
                            : balanceSummaryText[appContext.locale]["Date text"](today)
                        }
                    </span>
                </CardTitle>
				<PerfectScrollbar style={{maxHeight: "427px", marginLeft: "-1.25rem", marginRight: "-1.25rem"}} options={{suppressScrollX: true, wheelPropagation: true}}>
                    <div style={{paddingLeft: "1.25rem", paddingRight: "1.25rem"}}>
                        {loading 
                            ?   <div className="d-flex justify-content-center fa-3x py-3"><i className="fas fa-circle-notch fa-spin"></i></div> 
                            :   
                                <div>
                                    {displayedAccounts.map(account => {
                                        return(
                                            <Link key={account.accountId} to={`/account-details/${account.accountId}`} className="tr d-flex align-items-center">
                                                <div className="td d-flex col-11 justify-content-between align-items-center">
                                                    <div className="col-8">
                                                        <div className={"font-size-compact font-weight-600 " + ((account.accountCode && appContext.isEnterprise)? "" : " d-none")}>
                                                            {account.accountCode}
                                                        </div>
                                                        <div className="text-truncate">
                                                            {appContext.isEnterprise
                                                                ? accountTypePrefixes[account.accountTypeId] + " - " + account.accountName
                                                                : account.accountName}
                                                        </div>
                                                    </div>
                                                    <div className={" text-right " + (account.creditTotal > account.debitTotal ? "text-red" : "")}>
                                                        {formatCurrency(appContext.locale, appContext.currency, (
                                                            account.accountTypeId === 1
                                                                ? account.debitsMinusCredits
                                                                : (account.debitsMinusCredits === 0
                                                                    ? account.debitsMinusCredits
                                                                    : account.debitsMinusCredits * -1
                                                                )
                                                        ))}
                                                    </div>
                                                </div>
                                                <div className="col-1 pl-0 text-muted"><i className="fas fa-angle-right "></i></div>
                                            </Link>
                                        ) 
                                    })}
                                </div>
                        }
                    </div>
                </PerfectScrollbar>
            </CardBody>
        </Card>
    )
}

export default BalanceSummary;