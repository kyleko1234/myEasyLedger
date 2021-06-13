import React from 'react';
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
            <div>
                <div className="row mb-2 px-2 px-lg-0">
                    <div className="col-md-3 col-lg-2"><strong>{journalEntryViewModeText[appContext.locale]["Date"]}</strong></div> <div className="col-md-9 col-lg-10">{journalEntryDate}</div>
                </div>
                <div className="row px-2 px-lg-0">
                    <div className="col-md-3 col-lg-2"><strong>{journalEntryViewModeText[appContext.locale]["Description"]}</strong></div> <div className="col-md-9 col-lg-10">{journalEntryDescription}</div>
                </div>
            </div>

            <div className="mt-3">
                <div className="table d-none d-lg-block">
                    <div className="thead">
                        <div className="tr bg-light rounded border d-flex">
                            {columns.map(column => (
                                <div key={column.accessor} className={"th " + column.className}>
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
                                                <div className={"td " + column.className} key={column.accessor}>
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
                <div className="table d-lg-none">
                    <div className="tbody border-top">
                        {data.map((row, i) => { /**Probably refactor this at some point */
                            return(
                                <div key={i} className="tr d-flex">
                                    <div className="td w-100">
                                        <div className="font-weight-600">
                                            {row[columns[1].accessor]}
                                        </div>
                                        <div className="mb-2">
                                            {row[columns[0].accessor]? row[columns[0].accessor]: <em className="text-muted font-weight-light">No memo</em> }
                                        </div>
                                        <div className="d-flex justify-content-between ">
                                            <div className="">
                                                <div className="font-weight-600">
                                                    {columns[2].header}
                                                </div>
                                                <div>
                                                    {formatCell(row[columns[2].accessor], columns[2].accessor)}
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <div className="font-weight-600">
                                                    {columns[3].header}
                                                </div>
                                                <div>
                                                    {formatCell(row[columns[3].accessor], columns[3].accessor)}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                </div>
                            )
                        })}
                    </div>
                    <div className="tfoot">
                        <div className="tr d-flex">
                            <div className="td w-100 d-flex justify-content-between">
                                <div>
                                    <div>
                                        {journalEntryViewModeText[appContext.locale]["Total Debit"]}
                                    </div>
                                    <div className="font-weight-normal">
                                        {new Intl.NumberFormat(appContext.locale, { style: 'currency', currency: appContext.currency }).format(sumAmountsInColumn("debitAmount"))}
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div>
                                        {journalEntryViewModeText[appContext.locale]["Total Credit"]}
                                    </div>
                                    <div className="font-weight-normal">
                                        {new Intl.NumberFormat(appContext.locale, { style: 'currency', currency: appContext.currency }).format(sumAmountsInColumn("creditAmount"))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default JournalEntryViewMode
