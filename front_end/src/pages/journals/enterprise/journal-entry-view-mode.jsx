import React from 'react';
import { useTable } from 'react-table';
import { PageSettings } from '../../../config/page-settings';
import { journalEntryViewModeText } from '../../../utils/i18n/journal-entry-view-mode-text.js'

function JournalEntryViewMode({ data, journalEntryDescription, journalEntryDate }) {
    const appContext = React.useContext(PageSettings);
    const columns = React.useMemo(
        () => [ // accessor is the "key" in the data},
            { header: journalEntryViewModeText[appContext.locale]['Memo'], accessor: 'description', className: 'col-6 ' },
            { header: journalEntryViewModeText[appContext.locale]['Account'], accessor: 'accountName', className: 'col-2 ' },
            { header: journalEntryViewModeText[appContext.locale]['Debit'], accessor: 'debitAmount', className: 'col-2 text-right ' },
            { header: journalEntryViewModeText[appContext.locale]['Credit'], accessor: 'creditAmount', className: 'col-2 text-right ' },
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

    const sumAmountsInColumn = columnName => {
        let sum = 0;
        data.forEach(row => {
            sum += row[columnName];
        });
        if (isNaN(sum)) {
            return 0
        } else {
            return sum;
        }
    }

    const formatCell = (cellValue, columnAccessor) => {
        switch (columnAccessor) {
            case "debitAmount":
            case "creditAmount":
                if (cellValue) {
                    return (new Intl.NumberFormat(appContext.locale, { style: 'currency', currency: appContext.currency }).format(cellValue));
                } else {
                    return null;
                }
            default:
                return cellValue;
        }
    }

    return (
        <>
            <div className="row mb-2">
                <div className="col-md-3 col-lg-2"><strong>{journalEntryViewModeText[appContext.locale]["Date"]}</strong></div> <div className="col-md-9 col-lg-10">{journalEntryDate}</div>
            </div>
            <div className="row mb-2">
                <div className="col-md-3 col-lg-2"><strong>{journalEntryViewModeText[appContext.locale]["Description"]}</strong></div> <div className="col-md-9 col-lg-10">{journalEntryDescription}</div>
            </div>
            <br />

            <div className="table-responsive">
                <div className="table">
                    <div className="thead">
                        <div className="tr bg-light rounded border d-flex">
                            {columns.map(column => (
                                <div className={"th " + column.className}>
                                    {column.header}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="tbody">
                        {data.map(
                            (row, i) => {
                                return (
                                    <div className="tr d-flex" key={i}>
                                        {columns.map(column => {
                                            return (
                                                <div className={"td " + column.className}>
                                                    {formatCell(row[column.accessor], column.accessor)}
                                                </div>
                                            )
                                        })}
                                    </div>
                                )
                            }
                        )}
                    </div>
                    <div className="tfoot">
                        <div className="tr d-flex">
                            <div className="td col-6">{journalEntryViewModeText[appContext.locale]["Total"]}</div>
                            <div className="td col-2"></div>
                            <div className="td col-2 text-right">
                                {new Intl.NumberFormat(appContext.locale, { style: 'currency', currency: appContext.currency }).format(sumAmountsInColumn("debitAmount"))}
                            </div>
                            <div className="td col-2 text-right">
                                {new Intl.NumberFormat(appContext.locale, { style: 'currency', currency: appContext.currency }).format(sumAmountsInColumn("creditAmount"))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default JournalEntryViewMode
