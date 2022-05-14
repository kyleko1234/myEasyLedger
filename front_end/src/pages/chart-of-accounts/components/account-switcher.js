import React from 'react';
import axios from 'axios';
import { API_BASE_URL, CATEGORY_ACCOUNT_TYPES, NON_CATEGORY_ACCOUNT_TYPES, ACCOUNT_TYPE_OPTIONS} from '../../../utils/constants.js';
import { PageSettings } from '../../../config/page-settings';
import { useHistory } from "react-router-dom";
import { balanceSummaryText } from "../../../utils/i18n/balance-summary-text.js";
import { Link } from 'react-router-dom';
import Select from 'react-select';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Card, CardBody, Collapse } from 'reactstrap';
import { formatCurrency } from '../../../utils/util-fns.js';


function AccountSwitcher(props) {
    //required props: widgetTitle (string) selectedAccountId (number), isEnterprise (boolean), 
    //valid widgetTitles: "Switch Accounts", "Switch Categories"
    //if category is true there will be balances for each account shown in the list, otherwise not. Obviously if category is true this is a list of categories, otherwise it is a list of accounts. This is relevant for personal ui only; for enterprise category should always be false
    //optional props: category(boolean), externalRefreshToken
    //externalRefreshToken can be any data, but this component will be refreshed when the value of externalRefreshToken changes
    const appContext = React.useContext(PageSettings);
    const history = useHistory();
    const accountTypeOptions = ACCOUNT_TYPE_OPTIONS(appContext.locale);

    const [loading, setLoading] = React.useState(true);
    const [forceExpandToken, setForceExpandToken] = React.useState(null);
    const [forceCollapseToken, setForceCollapseToken] = React.useState(null);
    const [accounts, setAccounts] = React.useState([]);
    const [selectedAccountTypeOptionId, setSelectedAccountTypeOptionId] = React.useState(null);

    const handleExpandAll = () => {
        accounts
            .filter(account => account.hasChildren === true)
            .forEach(account => account.expanded = true);
    }
    const handleCollapseAll = () => {
        accounts
            .filter(account => account.hasChildren === true)
            .forEach(account => account.expanded = false);
    }


    //fetch data on component mount
    React.useEffect(() => {
        setLoading(true);
        axios.get(`${API_BASE_URL}/organization/${appContext.currentOrganizationId}/account`).then(response => {
            if (response.data) {
                setAccounts(response.data);
                setSelectedAccountTypeOptionId(response.data.find(account => account.accountId == props.selectedAccountId).accountTypeId);
            }
            setLoading(false);
        }).catch(console.log);
    }, [appContext.currentOrganizationId, props.externalRefreshToken]) //load fresh data when props.externalRefreshToken changes

    const formatBalance = (accountTypeId, amount) => {
        let formattedNumber = formatCurrency(appContext.locale, appContext.currency, amount);
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
        <Card className="very-rounded shadow-sm">
            <CardBody>
                <h4>{balanceSummaryText[appContext.locale][props.widgetTitle]}</h4>
                <div className="fw-normal">
                    <Link replace to="#" onClick={handleExpandAll}>{balanceSummaryText[appContext.locale]["(Expand All)"]}</Link>
                    <span> / </span>
                    <Link replace to="#" onClick={handleCollapseAll}>{balanceSummaryText[appContext.locale]["(Collapse All)"]}</Link>
                </div>
                <div className="d-flex align-items-center border-top border-bottom py-3 mt-3">
                    <label className="px-0 my-0 py-2 col-md-6">
                        {props.category? balanceSummaryText[appContext.locale]["Select a category type:"]: balanceSummaryText[appContext.locale]["Select an account type:"]}
                    </label>
                    <div className="col-md-6">
                        <Select
                            classNamePrefix="form-control"
                            options={props.isEnterprise? accountTypeOptions : 
                                (props.category? accountTypeOptions.filter(accountTypeOption => CATEGORY_ACCOUNT_TYPES.includes(accountTypeOption.value)) : accountTypeOptions.filter(accountTypeOption => NON_CATEGORY_ACCOUNT_TYPES.includes(accountTypeOption.value)))}
                            value={accountTypeOptions.find(accountTypeOption => accountTypeOption.value == selectedAccountTypeOptionId)}
                            onChange={selectedOption => setSelectedAccountTypeOptionId(selectedOption.value)}
                            menuPortalTarget={document.body}
                            menuShouldScrollIntoView={false}
                            styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                            menuPlacement={'auto'}

                        />
                    </div>
                </div>
				<PerfectScrollbar style={{marginLeft: "-1.25rem", marginRight: "-1.25rem"}} options={{suppressScrollX: true, wheelPropagation: false}}>
                    <div style={{maxHeight: "420px", paddingLeft: "1.25rem", paddingRight: "1.25rem"}}>
                        {// loading ? <div className="d-flex justify-content-center fa-3x py-3"><i className="fas fa-circle-notch fa-spin"></i></div> :     --add this line in case you need a loading spinner. currently it is removed because it is annoying to see a spinner every click. */
                            accounts
                                .filter(account => account.accountTypeId === selectedAccountTypeOptionId && account.parentAccountId === null)
                                .map(account => {
                                    return (
                                        account.hasChildren
                                            ?   <React.Fragment key={account.accountId}>
                                                    <Link to="#" className="pseudo-tr d-flex align-items-center" onClick={() => account.expanded = !account.expanded}>
                                                        <div className="col-1 ps-2">
                                                            <i className={"fas fa-angle-right rotating-caret" + (account.expanded? " expand" : "")}></i>
                                                        </div>
                                                        <div className= "col-10 pseudo-td px-0">
                                                            <div className={"fw-semibold font-size-compact " + ((account.accountCode && appContext.isEnterprise) ? "" : "d-none")}>
                                                                {account.accountCode}
                                                            </div>
                                                            <div className="text-truncate">
                                                                {account.accountName}
                                                            </div>
                                                        </div>
                                                        <div className="col-1 ps-0"><i className="fas fa-angle-right invisible"></i></div>
                                                    </Link>
                                                    <Collapse isOpen={account.expanded} style={appContext.colorScheme == "dark" ? {borderTop: "1px solid #383838"} : {borderTop: "1px solid #dadada"}}>
                                                        {accounts
                                                            .filter(childAccount => childAccount.parentAccountId == account.accountId)
                                                            .map(childAccount => {
                                                                return(
                                                                    <Link to={props.category ? `/category-details/${childAccount.accountId}` : `/account-details/${childAccount.accountId}`} key={childAccount.accountId} className="pseudo-tr d-flex align-items-center">
                                                                        <div className="col-1 ps-2"></div>
                                                                        <div className= "col-10 pseudo-td ps-3 pe-0">
                                                                            <div className={"fw-semibold font-size-compact " + ((childAccount.accountCode && appContext.isEnterprise) ? "" : "d-none")}>
                                                                                {childAccount.accountCode}
                                                                            </div>
                                                                            <div className="text-truncate">
                                                                                {childAccount.accountName}
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-1 ps-0 text-muted"><i className="fas fa-angle-right "></i></div>
                                                                    </Link>
                                                                )
                                                            })
                                                        }
                                                    </Collapse>
                                                    {/**children go here */}
                                                </React.Fragment>
                                            :   <Link key={account.accountId} to={props.category ? `/category-details/${account.accountId}` : `/account-details/${account.accountId}`} className="pseudo-tr d-flex align-items-center">
                                                    <div className="col-1 ps-2">
                                                        <i className="fas fa-angle-right rotating-caret px-2 invisible"></i>
                                                    </div>
                                                    <div className= "col-10 pseudo-td px-0">
                                                        <div className={"fw-semibold font-size-compact " + ((account.accountCode && appContext.isEnterprise) ? "" : "d-none")}>
                                                            {account.accountCode}
                                                        </div>
                                                        <div className="text-truncate">
                                                            {account.accountName}
                                                        </div>
                                                    </div>
                                                    <div className="col-1 ps-0 text-muted"><i className="fas fa-angle-right "></i></div>
                                                </Link>
                                    )
                                })
                        }
                    </div>
                </PerfectScrollbar>
            </CardBody>
        </Card>
    )
}
AccountSwitcher.defaultProps = {
    category: false
}
export default AccountSwitcher;