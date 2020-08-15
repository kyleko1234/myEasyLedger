import React from 'react';
import Table from './table';
import axios from 'axios';


function JournalTable() {

  const columns = React.useMemo(
    () => [ // accessor is the "key" in the data},
      { Header: 'Date', accessor: 'entryDate'},
      { Header: 'Description', accessor: 'description'},
      { Header: 'Debit', accessor: 'debitAmount'},
      { Header: 'Credit', accessor: 'creditAmount'},
    ],
    []
  )
  const API_URL = 'http://localhost:8080/v0.1';
  
  // We'll start our table without any data
  const [data, setData] = React.useState([])
  const [loading, setLoading] = React.useState(false)
  const [pageCount, setPageCount] = React.useState(0)
  const [elementCount, setElementCount] = React.useState(0)
  const fetchIdRef = React.useRef(0)

  const fetchData = React.useCallback(({ pageSize, pageIndex }) => {
    // This will get called when the table needs new data
    // You could fetch your data from literally anywhere,
    // even a server. But for this example, we'll just fake it.

    // Give this fetch an ID
    const fetchId = ++fetchIdRef.current

    // Set the loading state
    setLoading(true);

    //fetch data from API
    const url = `${API_URL}/entryViewModel/?page=${pageIndex}&size=${pageSize}`;
    axios.get(url).then(response => {
        setData(response.data.content);
        setPageCount(response.data.totalPages);
        setElementCount(response.data.totalElements);
      })
      .catch(console.log);
    
    setLoading(false);
  }, [])

  return (
      <Table
        columns={columns}
        data={data}
        fetchData={fetchData}
        loading={loading}
        pageCount={pageCount}
        elementCount={elementCount}
      />
  )
}




export default JournalTable