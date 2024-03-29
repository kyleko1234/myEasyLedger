import React from 'react';
import { useHistory } from 'react-router-dom';
import { PageSettings } from '../../../config/page-settings';
import { DEBIT_ACCOUNT_TYPES } from '../../../utils/constants';
import { accountDetailsEditorText } from '../../../utils/i18n/account-details-editor-text';
import { formatCurrency } from '../../../utils/util-fns';

function AccountListItem({account, handleEditAccountButton, className, category}) {
    const appContext = React.useContext(PageSettings);
    const debitTypes = DEBIT_ACCOUNT_TYPES;
    const history = useHistory();

    return(
        <div 
            className={"pseudo-tr d-flex justify-content-between align-items-center " + (account.hasChildren ? " " : "clickable ") + className}
            onClick={() => {
                if (!account.hasChildren) {
                    if (!category) {
                        history.push(`/account-details/${account.accountId}`)
                    } else {
                        history.push(`/category-details/${account.accountId}`)
                    }
                }
            }}
            >
            <div className="pseudo-td">
                <div>
                    <span className="fw-semibold">
                        {account.accountCode ? account.accountCode + " - " : null}
                    </span>
                    <span className="fw-semibold">
                        {account.accountName}
                    </span>
                </div>
                { account.parentAccountId || !appContext.isEnterprise
                    ? null
                    : <div className="font-size-compact fw-light text-muted fst-italic">
                        {accountDetailsEditorText[appContext.locale][account.accountSubtypeName]}
                    </div>
                }
            </div>
            <div className="pseudo-td py-0 d-flex align-items-center">
                <div className="text-right fw-semibold me-2 ">
                    {account.hasChildren || account.accountTypeId > 3
                        ? null
                        : debitTypes.includes(account.accountTypeId)
                            ? formatCurrency(appContext.locale, appContext.currency, account.debitsMinusCredits)
                            : formatCurrency(appContext.locale, appContext.currency, account.debitsMinusCredits * -1)}
                </div>
                <button 
                    className={"btn btn-sm btn-white border-0 text-muted me-2 " + (account.hasChildren ? "" : "nested-btn")}
                    onClick={event => handleEditAccountButton(event, account)}
                >
                    <i className="fas fa-edit font-size-compact"></i>
                </button>
                <i className={"fas fa-angle-right text-muted " + (account.hasChildren ? "invisible" : "")}></i>
            </div>
        </div>
    )
}

export default AccountListItem;