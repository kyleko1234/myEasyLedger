import React from 'react';
import TableOfJournalEntries from '../../../components/table/table-of-journal-entries';
import axios from 'axios';


function JournalTable({API_URL, localization, organizationId, personId}) {

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
  const fetchIdRef = React.useRef(0)

  const fetchData = React.useCallback(({ pageSize, pageIndex }) => {
    // This will get called when the table needs new data
        
    //fetch data from Easy Ledger API
    const url = `${API_URL}/organization/${organizationId}/journalEntryViewModel/?page=${pageIndex}&size=${pageSize}`;
    axios.get(url).then(response => {
        var dataContent = response.data.content;
        dataContent.forEach( entry => {
          entry.debitAmount = entry.debitAmount;
          entry.creditAmount = entry.creditAmount;
        })
        setData(dataContent);
        setPageCount(response.data.totalPages);
        setElementCount(response.data.totalElements);
      })
      .catch(console.log);
  }, [])
  
  return (
    <div >
      <TableOfJournalEntries
        columns={columns}
        data={data}
        fetchData={fetchData}
        pageCount={pageCount}
        elementCount={elementCount}
        organizationId={organizationId}
        personId={personId}
        API_URL={API_URL}
        localization={localization}
      />
    </div>
  )
}




export default JournalTable