import React from 'react';
import Table from './table';

function JournalTable ({ data }) {
    const columns = React.useMemo(
        () => [ // accessor is the "key" in the data},
          { Header: 'Date', accessor: 'entryDate'},
          { Header: 'Description', accessor: 'description'},
          { Header: 'Debit', accessor: 'debitAmount'},
          { Header: 'Credit', accessor: 'creditAmount'},
        ],
        []
    )

   // Render the UI for your table
   return (
    <Table columns={columns} data={data}/>
  )
}

export default JournalTable