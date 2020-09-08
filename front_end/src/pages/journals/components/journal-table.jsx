import React from 'react';
import TableOfJournalEntries from '../../../components/table/table-of-journal-entries';
import axios from 'axios';


function JournalTable() {

  const columns = React.useMemo(
    () => [ // accessor is the "key" in the data},
      { Header: 'Date', accessor: 'journalEntryDate'},
      { Header: 'Description', accessor: 'description'},
      { Header: 'Debit', accessor: 'debitAmount'},
      { Header: 'Credit', accessor: 'creditAmount'},
    ],
    []
  )
  const API_URL = 'http://localhost:8080/v0.1';
  const ORGANIZATION_ID = '1';

  // We'll start our table without any data
  const [data, setData] = React.useState([])
  const [pageCount, setPageCount] = React.useState(0)
  const [elementCount, setElementCount] = React.useState(0)
  const fetchIdRef = React.useRef(0)

  const fetchData = React.useCallback(({ pageSize, pageIndex }) => {
    // This will get called when the table needs new data
        
    //fetch data from Easy Ledger API
    const url = `${API_URL}/organization/${ORGANIZATION_ID}/journalEntryViewModel/?page=${pageIndex}&size=${pageSize}`;
    axios.get(url).then(response => {
        var dataContent = response.data.content;
        dataContent.forEach( entry => {
          entry.debitAmount = entry.debitAmount.toFixed(2);
          entry.creditAmount = entry.creditAmount.toFixed(2);
        })
        setData(dataContent);
        setPageCount(response.data.totalPages);
        setElementCount(response.data.totalElements);
      })
      .catch(console.log);
  }, [])
  
  return (
      <TableOfJournalEntries
        columns={columns}
        data={data}
        fetchData={fetchData}
        pageCount={pageCount}
        elementCount={elementCount}
      />
  )
}




export default JournalTable