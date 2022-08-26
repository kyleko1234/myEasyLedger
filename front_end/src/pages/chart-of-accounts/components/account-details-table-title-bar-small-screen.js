import React from 'react';
import { Tooltip } from 'reactstrap';
import { PageSettings } from '../../../config/page-settings';
import { DEBIT_ACCOUNT_TYPES } from '../../../utils/constants';
import { accountDetailsText } from '../../../utils/i18n/account-details-text';
import { journalEntriesText } from '../../../utils/i18n/journal-entries-text';
import { formatCurrency } from '../../../utils/util-fns';

function AccountDetailsTableTitleBarSmallScreen({ handleCreateAJournalEntryButton, selectedAccount }) {
    const appContext = React.useContext(PageSettings);
    const [addAnEntryTooltip, setAddAnEntryTooltip] = React.useState(false);
    const toggleAddAnEntryTooltip = () => setAddAnEntryTooltip(!addAnEntryTooltip);

    const formatBalance = (debitsMinusCredits, accountTypeId) => {
        if (DEBIT_ACCOUNT_TYPES.includes(accountTypeId)) {
            return formatCurrency(appContext.locale, appContext.currency, debitsMinusCredits);
        } else {
            return formatCurrency(appContext.locale, appContext.currency, debitsMinusCredits * -1);
        }
    }

    return (
        <div className={"d-sm-none my-2 "}>
            <div className="h4 mb-0">
                {accountDetailsText[appContext.locale]["Balance"] + ": " + formatBalance(selectedAccount.debitsMinusCredits, selectedAccount.accountTypeId)}
            </div>
            <div id="add-an-entry-button-small-screen">
                <button
                    className="btn btn-primary btn-lg d-block w-100"
                    onClick={handleCreateAJournalEntryButton}
                    disabled={appContext.currentPermissionTypeId < 2}
                >
                    {journalEntriesText[appContext.locale]["Add an entry"]}
                </button>
            </div>
            {appContext.currentPermissionTypeId < 2
                ? <Tooltip
                    target="add-an-entry-button-small-screen"
                    isOpen={addAnEntryTooltip}
                    toggle={toggleAddAnEntryTooltip}
                    fade={false}
                >
                    {journalEntriesText[appContext.locale]["This action requires EDIT permissions for this ledger."]}
                </Tooltip>
                : null
            }
        </div>
    )
}

export default AccountDetailsTableTitleBarSmallScreen;