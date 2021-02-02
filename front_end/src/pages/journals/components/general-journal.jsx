import React from 'react';
import { API_BASE_URL } from '../../../utils/constants.js';
import axios from 'axios';
import { PageSettings } from '../../../config/page-settings';
import TableOfJournalEntries from './table-of-journal-entries';
import {generalJournalText} from '../../../utils/i18n/general-journal-text.js';


function GeneralJournal() {

  const appContext = React.useContext(PageSettings);
  
  const columns = React.useMemo(
    () => [ // accessor is the "key" in the data},
      { Header: generalJournalText[appContext.locale]["Date"], accessor: 'journalEntryDate', width:"20%"},
      { Header: generalJournalText[appContext.locale]["Description"], accessor: 'description', width:"50%"},
      { Header: generalJournalText[appContext.locale]["Debit"], accessor: 'debitAmount', width:"15%"},
      { Header: generalJournalText[appContext.locale]["Credit"], accessor: 'creditAmount', width: "15%"},
    ],
    []
  )

  // We'll start our table without any data
  const [data, setData] = React.useState([])
  const [pageCount, setPageCount] = React.useState(0)
  const [elementCount, setElementCount] = React.useState(0)

  const fetchData = React.useCallback(({ pageSize, pageIndex }) => {
    // This will get called when the table needs new data
        
    //fetch data from Easy Ledger API
    const url = `${API_BASE_URL}/organization/${appContext.currentOrganization}/journalEntryViewModel/?page=${pageIndex}&size=${pageSize}`;
    axios.get(url).then(response => {
        var dataContent = response.data.content;
        setData(dataContent);
        setPageCount(response.data.totalPages);
        setElementCount(response.data.totalElements);
      })
      .catch(console.log);
  }, [API_BASE_URL, appContext.currentOrganization])
  
  return (
    <div >
      <TableOfJournalEntries
        columns={columns}
        data={data}
        fetchData={fetchData}
        pageCount={pageCount}
        elementCount={elementCount}
        tableTitle={generalJournalText[appContext.locale]["Accounting Entries"]}
        hasAddEntryButton={true}
      />
    </div>
  )
}




export default GeneralJournal