import React from 'react';
import { useTable } from 'react-table';
import { PageSettings } from '../../../config/page-settings';
import { journalEntryViewModeText } from '../../../utils/i18n/journal-entry-view-mode-text.js'

function JournalEntryViewMode({ data, journalEntryDescription, journalEntryDate, fromAccountName }) {
    const appContext = React.useContext(PageSettings);
    const columns = React.useMemo(
        () => [ // accessor is the "key" in the data},
            { Header: journalEntryViewModeText[appContext.locale]['Transaction Type'], accessor: 'transactionTypeName', width: '25%' },
            { Header: journalEntryViewModeText[appContext.locale]['Amount'], accessor: 'amount', width: '25%' },
            { Header: journalEntryViewModeText[appContext.locale]['Category or Account'], accessor: 'accountName', width: '25%' },
            { Header: journalEntryViewModeText[appContext.locale]['Memo'], accessor: 'description', width: '25%' },
        ],
        []
    )

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable(
        {
            columns,
            data
        }
    )

    const sumAmounts = () => {
        let sum = 0;
        data.forEach(row => {
            if (row.transactionType.isCredit) {
                sum += row.amount;
            } else {
                sum -= row.amount;
            }
        });
        if (isNaN(sum)) {
            return 0
        } else {
            return sum;
        }
    }


    const formatCell = cell => {
        let columnId = cell.column.id;
        switch (columnId) {
            case "amount":
                return (new Intl.NumberFormat(appContext.locale, { style: 'currency', currency: appContext.currency }).format(cell.value));
            default:
                return cell.value;
        }
    }

    return (
        <>
            <div className="row m-b-10">
                <div className="col-md-1"><strong>{journalEntryViewModeText[appContext.locale]["From Account"]}</strong></div> <div className="col-md-11">{fromAccountName}</div>
            </div>

            <div className="row m-b-10">
                <div className="col-md-1"><strong>{journalEntryViewModeText[appContext.locale]["Date"]}</strong></div> <div className="col-md-11">{journalEntryDate}</div>
            </div>
            <div className="row m-b-10">
                <div className="col-md-1"><strong>{journalEntryViewModeText[appContext.locale]["Description"]}</strong></div> <div className="col-md-11">{journalEntryDescription}</div>
            </div>
            <br></br>

            <div className="table-responsive">
                <table className="table"{...getTableProps()}>
                    <thead>
                        {headerGroups.map(headerGroup => (
                            <tr {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map(column => (
                                    // Add the sorting props to control sorting. For this example
                                    // we can add them into the header props
                                    <th {...column.getHeaderProps()} style={{ width: column.width }} className={column.id == "amount" ? "text-right" : ""}>
                                        {column.render('Header')}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody {...getTableBodyProps()}>
                        {rows.map(
                            (row, i) => {
                                prepareRow(row);
                                return (
                                    <tr {...row.getRowProps()}>
                                        {row.cells.map(cell => {
                                            return (
                                                <td className={cell.column.id == "amount" ? "text-right" : ""} {...cell.getCellProps()}>{formatCell(cell)}</td>
                                            )
                                        })}
                                    </tr>
                                )
                            }
                        )}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td>{journalEntryViewModeText[appContext.locale]["Total"]}</td>
                            <td className="text-right">
                                {new Intl.NumberFormat(appContext.locale, { style: 'currency', currency: appContext.currency }).format(sumAmounts())}
                            </td>
                            <td></td>
                            <td></td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </>
    )
}

export default JournalEntryViewMode
