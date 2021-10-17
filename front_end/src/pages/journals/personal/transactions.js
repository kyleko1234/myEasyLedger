import React from 'react';
import axios from 'axios';
import { transactionsText } from '../../../utils/i18n/transactions-text';
import { PageSettings } from '../../../config/page-settings';
import { API_BASE_URL } from '../../../utils/constants';
import TableOfTransactions from './table-of-transactions';

function Transactions() {
    const appContext = React.useContext(PageSettings);
    const columns = [ // accessor is the "key" in the data},
                { header: transactionsText[appContext.locale]['Date'], accessor: 'journalEntryDate', className: " col-md-2 text-nowrap " },
                { header: transactionsText[appContext.locale]['Description'], accessor: 'description', className: " col-md-6 text-truncate " },
                { header: transactionsText[appContext.locale]['Inflow'], accessor: 'debitAmount', className: " text-right col-md-2 text-nowrap " },
                { header: transactionsText[appContext.locale]['Outflow'], accessor: 'creditAmount', className: " text-right col-md-2 text-nowrap " },
    ];

    const [pageSize, setPageSize] = React.useState(10);
    const [pageIndex, setPageIndex] = React.useState(0);
    const [data, setData] = React.useState([]);
    const [totalPages, setTotalPages] = React.useState(0);
    const [totalElements, setTotalElements] = React.useState(0);
    const [pageLength, setPageLength] = React.useState(0);
    const [first, setFirst] = React.useState(true);
    const [last, setLast] = React.useState(true);
    const [loading, setLoading] = React.useState(true);
    const previousPage = () => setPageIndex(pageIndex - 1);
    const nextPage = () => setPageIndex(pageIndex + 1);
    
        
    const fetchData = React.useCallback(async ( pageIndex, pageSize ) => {
        // This will get called when the table needs new data
        //fetch data from Easy Ledger API
        setLoading(true);
        async function fetchTableData () {
            const url = `${API_BASE_URL}/organization/${appContext.currentOrganizationId}/assetAndLiabilityLineItem/?page=${pageIndex}&size=${pageSize}`;
            await axios.get(url).then(response => {
                var dataContent = response.data.content;
                dataContent.forEach(lineItem => {
                    if (lineItem.isCredit) {
                        lineItem.debitAmount = 0;
                        lineItem.creditAmount = lineItem.amount;
                    } else {
                        lineItem.creditAmount = 0;
                        lineItem.debitAmount = lineItem.amount;
                    }
                })
                setData(dataContent);
                setTotalPages(response.data.totalPages);
                setTotalElements(response.data.totalElements);
                setPageLength(response.data.numberOfElements);
                setFirst(response.data.first);
                setLast(response.data.last);
            })
                .catch(console.log);
        }
        await fetchTableData();
        setLoading(false);
    }, [])

    return(
        <>
            <TableOfTransactions
                tableTitle={ <div className="h1">{transactionsText[appContext.locale]["Transactions"]}</div>}
                hasAddEntryButton={true}
                fetchData={fetchData}
                pageSize={pageSize}
                pageIndex={pageIndex}
                columns={columns}
                data={data}
                totalPages={totalPages}
                totalElements={totalElements}
                pageLength={pageLength}
                first={first}
                last={last}
                loading={loading}
                previousPage={previousPage}
                nextPage={nextPage}
                category={false}                            
            /> 
        </>
    )
}

export default Transactions;