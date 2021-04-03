import React from 'react';
import axios from 'axios';
import { API_BASE_URL, CATEGORY_ACCOUNT_TYPES, NON_CATEGORY_ACCOUNT_TYPES, ACCOUNT_TYPE_OPTIONS} from '../../../utils/constants.js';
import { PageSettings } from '../../../config/page-settings';
import { useHistory } from "react-router-dom";
import { balanceSummaryText } from "../../../utils/i18n/balance-summary-text.js";
import { Link } from 'react-router-dom';
import Select from 'react-select';
import { WidgetHeader, WidgetList, ExpandableWidgetListItem, WidgetListItem } from '../../../components/widget/widget.jsx';


function AccountSwitcher(props) {
    //required props: widgetTitle (string) selectedAccountId (number), isEnterprise (boolean)
    //valid widgetTitles: "Switch Accounts", "Switch Categories"
    //if category is true there will be balances for each account shown in the list, otherwise not. Obviously if category is true this is a list of categories, otherwise it is a list of accounts. This is relevant for personal ui only; for enterprise category should always be false
    //optional props: externalRefreshToken, category(boolean)
    //externalRefreshToken can be any data. This prop should be changed when you want to force this component to refresh data. This prop should not be used for anything else. 
    const appContext = React.useContext(PageSettings);
    const history = useHistory();
    const accountTypeOptions = ACCOUNT_TYPE_OPTIONS(appContext.locale);

    const [loading, setLoading] = React.useState(true);
    const [forceExpandToken, setForceExpandToken] = React.useState(null);
    const [forceCollapseToken, setForceCollapseToken] = React.useState(null);
    const [accounts, setAccounts] = React.useState([]);
    const [selectedAccountTypeOptionId, setSelectedAccountTypeOptionId] = React.useState(null);

    const handleExpandAll = () => {
        setForceExpandToken(Math.random());
    }
    const handleCollapseAll = () => {
        setForceCollapseToken(Math.random());
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
        <WidgetList>
            <WidgetHeader className="bg-light">
                <div>{balanceSummaryText[appContext.locale][props.widgetTitle]}</div>
                <div className="font-weight-normal">
                    <Link replace to="#" onClick={handleExpandAll}>{balanceSummaryText[appContext.locale]["(Expand All)"]}</Link>
                    <span> / </span>
                    <Link replace to="#" onClick={handleCollapseAll}>{balanceSummaryText[appContext.locale]["(Collapse All)"]}</Link>
                </div>
            </WidgetHeader>
            <div className="row px-3 py-2">
                <label className="col-form-label col-md-6">
                    {props.category? balanceSummaryText[appContext.locale]["Select a category type:"]: balanceSummaryText[appContext.locale]["Select an account type:"]}
                </label>
                <div className="col-md-6">
                    <Select
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
            <div className="overflow-auto" style={{ maxHeight: '750px' }}>
                {//loading ? <div className="d-flex justify-content-center fa-3x py-3"><i className="fas fa-circle-notch fa-spin"></i></div> :     --add this line in case you need a loading spinner. currently it is removed because it is annoying to see a spinner every click.
                    
                    accounts.filter(account => account.accountTypeId == selectedAccountTypeOptionId && account.parentAccountId == null).map(account => {
                        return (
                            account.hasChildren?
                            <ExpandableWidgetListItem key={account.accountId} parentText={account.accountName} parentClassName="bg-light nohover rounded-0" forceExpandToken={forceExpandToken} forceCollapseToken={forceCollapseToken}>
                                {accounts ?
                                    accounts.filter(childAccount => childAccount.parentAccountId == account.accountId).map(childAccount => {
                                        return (
                                            <React.Fragment key={childAccount.accountId}>
                                                {childAccount.accountId == props.selectedAccountId ?
                                                    <WidgetListItem className="widget-list-item bg-white-hover">
                                                        <div className="p-l-30">
                                                            {childAccount.accountName}
                                                        </div>
                                                        {props.category || props.isEnterprise ? null :
                                                            <div className=" text-right">
                                                                {formatBalance(childAccount.accountTypeId, childAccount.debitsMinusCredits)}
                                                            </div>
                                                        }
                                                    </WidgetListItem>
                                                    :
                                                    <WidgetListItem link className=" bg-white" to={props.category ? `/category-details/${childAccount.accountId}` : `/account-details/${childAccount.accountId}`}>
                                                        <div className="p-l-30">{childAccount.accountName}</div>
                                                        {props.category || props.isEnterprise ? null :
                                                            <div className=" text-right">
                                                                {formatBalance(childAccount.accountTypeId, childAccount.debitsMinusCredits)}
                                                            </div>
                                                        }
                                                    </WidgetListItem>
                                                }
                                            </React.Fragment>
                                        )
                                    })
                                    : <div className="d-flex justify-content-center fa-3x py-3"><i className="fas fa-circle-notch fa-spin"></i></div>}
                            </ExpandableWidgetListItem>
                            :
                            (account.accountId == props.selectedAccountId
                            ?   
                                <React.Fragment key={account.accountId}>
                                    <div>{/*Empty div to force css to play nicely*/}</div>
                                    <div className="widget-list-item border-top-d5d5d5 bg-light-hover">
                                        <div className="widget-list-content d-flex">
                                            <b className={"rotating-caret expand align-self-center invisible"} ></b>
                                            <div className="align-self-center m-l-5 font-weight-600">{account.accountName}</div>
                                        </div>
                                            {props.category || props.isEnterprise ? null :
                                                <div className="widget-list-content">
                                                    <div className=" text-right">
                                                        {formatBalance(account.accountTypeId, account.debitsMinusCredits)}
                                                    </div>
                                                </div>
                                            }
                                        <div className="m-r-10 widget-list-action text-right">
                                            <i className="fa fa-angle-right fa-lg text-muted invisible"></i>
                                        </div>
                                    </div>
                                    <div>{/*Empty div to force css to play nicely*/}</div>
                                </React.Fragment>
                            :   
                                <React.Fragment key={account.accountId}>
                                    <div>{/*Empty div to force css to play nicely*/}</div>
                                    <Link replace className="widget-list-item border-top-d5d5d5 bg-light" to={props.category ? `/category-details/${account.accountId}` : `/account-details/${account.accountId}`}>
                                        <div className="widget-list-content d-flex">
                                            <b className={"rotating-caret expand align-self-center invisible"} ></b>
                                            <div className="align-self-center m-l-5 font-weight-600">{account.accountName}</div>
                                        </div>
                                            {props.category || props.isEnterprise ? null :
                                                <div className="widget-list-content">
                                                    <div className=" text-right">
                                                        {formatBalance(account.accountTypeId, account.debitsMinusCredits)}
                                                    </div>
                                                </div>
                                            }
                                        <div className="m-r-10 widget-list-action text-right">
                                            <i className="fa fa-angle-right fa-lg text-muted "></i>
                                        </div>
                                    </Link>
                                    <div>{/*Empty div to force css to play nicely*/}</div>
                                </React.Fragment>
                            )
                        )
                    })
                }
            </div>
        </WidgetList>
    )
}
AccountSwitcher.defaultProps = {
    category: false
}
export default AccountSwitcher;