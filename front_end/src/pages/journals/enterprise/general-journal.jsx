import React from 'react';
import { API_BASE_URL } from '../../../utils/constants.js';
import axios from 'axios';
import { PageSettings } from '../../../config/page-settings';
import TableOfJournalEntries from './table-of-journal-entries';
import {generalJournalText} from '../../../utils/i18n/general-journal-text.js';
import { Card, CardBody } from 'reactstrap';


function GeneralJournal() {

  const appContext = React.useContext(PageSettings);
    
  return (
        <TableOfJournalEntries
          tableTitle={generalJournalText[appContext.locale]["Accounting Entries"]}
          hasAddEntryButton={true}
        />
  )
}




export default GeneralJournal