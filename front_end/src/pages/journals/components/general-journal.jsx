import React from 'react';
import ClickableTableWithPaginationAndJournalEntryModal from '../../../components/table/clickable-table-with-pagination-and-journal-entry-modal';
import { API_BASE_URL } from '../../../components/utils/constants.js';
import axios from 'axios';


function GeneralJournal({context}) {

  const columns = React.useMemo(
    () => [ // accessor is the "key" in the data},
      { Header: 'Date', accessor: 'journalEntryDate', width:"20%"},
      { Header: 'Description', accessor: 'description', width:"50%"},
      { Header: 'Debit', accessor: 'debitAmount', width:"15%"},
      { Header: 'Credit', accessor: 'creditAmount', width: "15%"},
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
    const url = `${API_BASE_URL}/organization/${context.organizationId}/journalEntryViewModel/?page=${pageIndex}&size=${pageSize}`;
    axios.get(url).then(response => {
        var dataContent = response.data.content;
        setData(dataContent);
        setPageCount(response.data.totalPages);
        setElementCount(response.data.totalElements);
      })
      .catch(console.log);
  }, [API_BASE_URL, context.organizationId])
  
  return (
    <div >
      <ClickableTableWithPaginationAndJournalEntryModal
        context={context}
        columns={columns}
        data={data}
        fetchData={fetchData}
        pageCount={pageCount}
        elementCount={elementCount}
        tableTitle="Accounting Entries"
        hasAddEntryButton={true}
      />
    </div>
  )
}




export default GeneralJournal