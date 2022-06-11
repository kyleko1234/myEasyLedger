import axios from 'axios';
import React from 'react';
import { Alert } from 'reactstrap';
import { PageSettings } from '../../../config/page-settings';
import { API_BASE_URL } from '../../../utils/constants';
import { dashboardText } from '../../../utils/i18n/dashboard-text';

function EmptyLedgerAlert(props) {
    const appContext = React.useContext(PageSettings);
    const [containsJournalEntries, setContainsJournalEntries] = React.useState(true);

    React.useEffect(() => {
        let isMounted = true;
        if (appContext.currentOrganizationId) {
            axios.get(`${API_BASE_URL}/organization/${appContext.currentOrganizationId}/containsJournalEntries`).then(response => {
                if (isMounted) {
                    setContainsJournalEntries(response.data.containsJournalEntries);
                }
            })
        }
        return () => {
            isMounted = false;
        }
    }, [appContext.currentOrganizationId])

    return(
        <Alert color="success" isOpen={!containsJournalEntries}>
            {appContext.isEnterprise
                ? dashboardText[appContext.locale]["To get started with your new ledger, please click on 'Journal Entries' in the navigation bar, then click on 'Add an entry'."]
                : dashboardText[appContext.locale]["To get started with your new ledger, please click on 'Transactions' in the navigation bar, then click on 'Add a new transaction'."]
            }
        </Alert>
    )
}

export default EmptyLedgerAlert;