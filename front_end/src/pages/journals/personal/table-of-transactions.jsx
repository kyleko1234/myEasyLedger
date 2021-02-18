import React from 'react';
import { useTable, usePagination } from 'react-table';
import tableOfJournalEntriesText from '../../../utils/i18n/table-of-journal-entries-text.js';

// Let's add a fetchData method to our Table component that will be used to fetch
// new data when pagination state changes
// We can also add a loading state to let our table know it's loading new data

//Table of Transactions for account detailed view in personal organizations
function TableOfTransactions({
    columns,
    data,
    fetchData,
    pageCount: controlledPageCount,
    elementCount,
    tableTitle,
    hasAddEntryButton
}) {
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        page,
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        // Get the state from the instance
        state: { pageIndex, pageSize },
    } = useTable(
        {
            columns,
            data,
            initialState: { pageIndex: 0, pageSize: 10 }, // Pass our hoisted table state
            manualPagination: true, // Tell the usePagination
            // hook that we'll handle our own data fetching
            // This means we'll also have to provide our own
            // pageCount.
            pageCount: controlledPageCount,
        },
        usePagination
    )

    // Listen for changes in pagination and use the state to fetch our new data
    React.useEffect(() => {
        fetchData({ pageIndex, pageSize })
    }, [fetchData, pageIndex, pageSize])

    const openEditorForNewEntry = () => {

    }
    // Render the UI for your table
    return (
        <>
            <div className="widget widget-rounded m-b-30">
                <div className="widget-header bg-light">
                    <h4 className="widget-header-title d-flex justify-content-between ">
                        <div className="align-self-center">{tableTitle}</div>
                        <div>
                            {hasAddEntryButton ?
                                <button className="btn btn-sm btn-primary align-self-center" onClick={openEditorForNewEntry}>
                                    <i className="ion ion-md-add fa-fw fa-lg"></i> Add a new transaction
                                </button> : null}
                        </div>
                    </h4>
                </div>
                <div className="table-responsive bg-white border-top">
                    <table {...getTableProps()} className="table table-hover m-b-0 text-inverse">
                        <thead>
                            {headerGroups.map(headerGroup => (
                                <tr {...headerGroup.getHeaderGroupProps()}>
                                    {headerGroup.headers.map(column => (
                                        <th {...column.getHeaderProps()}>
                                            {column.render('Header')}
                                            <span>
                                                {column.isSorted
                                                    ? column.isSortedDesc
                                                        ? ' 🔽'
                                                        : ' 🔼'
                                                    : ''}
                                            </span>
                                        </th>
                                    ))}
                                </tr>
                            ))}
                        </thead>
                        <tbody {...getTableBodyProps()}>
                            {page.map((row, i) => {
                                prepareRow(row)
                                return (
                                    <tr {...row.getRowProps()}>
                                        {row.cells.map(cell => {
                                            return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                        })}
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
                <div className="d-flex justify-content-between px-1 py-2 border-top bg-light" >
                    <span style={{ width: "25ch" }}>
                        <ul className="pager align-self-center m-t-0 m-b-0">
                            <li className={canPreviousPage ? "previous" : "previous disabled"}>
                                {canPreviousPage ? <Link onClick={() => previousPage()} to="#">&larr; {tableOfJournalEntriesText[appContext.locale]["Newer"]}</Link> : null}
                            </li>
                        </ul>
                    </span>
                    <span className="align-self-center">
                        Showing {((pageIndex * pageSize) + 1) + "-" + ((pageIndex * pageSize) + page.length)} of {elementCount}{' '}
                        results
                    </span>{/**TODO replace with page selector */}
                    <span>
                        <ul className="pager align-self-center m-t-0 m-b-0" style={{ width: "25ch" }}>
                            <li className={canNextPage ? "next" : "next disabled"}>
                                {canNextPage ? <Link onClick={() => nextPage()} to="#">{tableOfJournalEntriesText[appContext.locale]["Older"]} &rarr;</Link> : null}
                            </li>
                        </ul>
                    </span>
                </div>
            </div>
        </>
    )
}
