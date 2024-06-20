import React from 'react';
import { Link } from 'react-router-dom';
import { PageSettings } from '../../../config/page-settings';
import { formatCurrency } from '../../../utils/util-fns';
import JournalEntryViewModelStandard from './journal-entry-view-model-standard';
import JournalEntryViewModelSmallScreen from './journal-entry-view-model-small-screen';

function JournalEntryViewModel({journalEntryDate, description, debitAmount, creditAmount, onClick}) {
    const appContext = React.useContext(PageSettings);

    return (
        <>
            <JournalEntryViewModelStandard
                journalEntryDate={journalEntryDate}
                description={description}
                debitAmount={debitAmount}
                creditAmount={creditAmount}
                onClick={onClick}
            />
            <JournalEntryViewModelSmallScreen
                journalEntryDate={journalEntryDate}
                description={description}
                debitAmount={debitAmount}
                creditAmount={creditAmount}
                onClick={onClick}
            />

        </>
    )
}

export default JournalEntryViewModel;