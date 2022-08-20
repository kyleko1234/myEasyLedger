import React from 'react';
import { Tooltip } from 'reactstrap';
import { PageSettings } from '../../../config/page-settings';
import { journalEntriesText } from '../../../utils/i18n/journal-entries-text';

function TransactionsTitleBarSmallScreen({ className, handleCreateTransactionButton }) {
    const appContext = React.useContext(PageSettings);
    const [buttonTooltip, setButtonTooltip] = React.useState(false);
    const toggleButtonTooltip = () => setButtonTooltip(!buttonTooltip);

    return (
        <div className={"d-sm-none my-2 " + className}>
            <h1>
                {journalEntriesText[appContext.locale]["Transactions"]}
            </h1>
            <div id="add-a-transaction-button-small-screen">
                <button
                    className="btn btn-primary btn-lg d-block w-100"
                    onClick={handleCreateTransactionButton}
                    disabled={appContext.currentPermissionTypeId < 2}
                >
                    {journalEntriesText[appContext.locale]["Add a new transaction"]}
                </button>
            </div>
            {appContext.currentPermissionTypeId < 2
                ? <Tooltip
                    target="add-a-transaction-button-small-screen"
                    isOpen={buttonTooltip}
                    toggle={toggleButtonTooltip}
                    fade={false}
                >
                    {journalEntriesText[appContext.locale]["This action requires EDIT permissions for this ledger."]}
                </Tooltip>
                : null
            }
        </div>
    )

}

export default TransactionsTitleBarSmallScreen;