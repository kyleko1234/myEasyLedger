import React from 'react';
import { PageSettings } from '../../../config/page-settings';
import { journalEntryViewModeText } from '../../../utils/i18n/journal-entry-view-mode-text.js'

function TransactionViewMode({ data, journalEntryDescription, journalEntryDate, fromAccountName }) {
    const appContext = React.useContext(PageSettings);
    const columns = React.useMemo(
        () => [ // accessor is the "key" in the data},
            { header: journalEntryViewModeText[appContext.locale]['Transaction Type'], accessor: 'transactionTypeName', className: 'col-3 ' },
            { header: journalEntryViewModeText[appContext.locale]['Category or Account'], accessor: 'accountName', className: 'col-3' },
            { header: journalEntryViewModeText[appContext.locale]['Memo'], accessor: 'description', className: 'col-4 ' },
            { header: journalEntryViewModeText[appContext.locale]['Amount'], accessor: 'amount', className: 'col-2 text-right' },
        ],
        []
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


    const formatCell = (cellValue, columnAccessor) => {
        switch (columnAccessor) {
            case "amount":
                return (new Intl.NumberFormat(appContext.locale, { style: 'currency', currency: appContext.currency }).format(cellValue));
            default:
                return cellValue;
        }
    }

    return (
        <>
            <div className="row mb-2 px-2 px-lg-0">
                <div className="col-md-3 col-lg-2"><strong>{journalEntryViewModeText[appContext.locale]["From Account"]}</strong></div> <div className="col-lg-10">{fromAccountName}</div>
            </div>

            <div className="row mb-2 px-2 px-lg-0">
                <div className="col-md-3 col-lg-2"><strong>{journalEntryViewModeText[appContext.locale]["Date"]}</strong></div> <div className="col-lg-10">{journalEntryDate}</div>
            </div>
            <div className="row px-2 px-lg-0">
                <div className="col-md-3 col-lg-2"><strong>{journalEntryViewModeText[appContext.locale]["Description"]}</strong></div> <div className="col-lg-10">{journalEntryDescription}</div>
            </div>

            <div className="mt-3"> 
                <div className="table d-none d-lg-block">
                    <div className="thead">
                        <div className="tr bg-light rounded border d-flex">
                            {columns.map(column => {
                                return(
                                    <div className={"th " + column.className} key={column.accessor}>
                                        {column.header}
                                    </div>
                                )
                            })}
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
                            <div className="td col-3">{journalEntryViewModeText[appContext.locale]["Total"]}</div>
                            <div className="td col-3"></div>
                            <div className="td col-3"></div>
                            <div className="td col-3 text-right">
                                {new Intl.NumberFormat(appContext.locale, { style: 'currency', currency: appContext.currency }).format(sumAmounts())}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="table d-lg-none">
                    <div className="tbody border-top">
                        {data.map((row, i) => {
                            return(
                                <div key={i} className="tr d-flex">
                                    <div className="px-2 py-2 w-100">
                                        <div className="font-weight-600">
                                            {row[columns[0].accessor] + " - " + row[columns[1].accessor]}
                                        </div>
                                        <div className="d-flex">
                                            <div className="mr-5">
                                                {row[columns[2].accessor]? row[columns[2].accessor]: <em className="text-muted font-weight-light">{journalEntryViewModeText[appContext.locale]["No memo"]}</em> }
                                            </div>
                                            <div className="text-right">
                                                {formatCell(row[columns[3].accessor], columns[3].accessor)}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    <div className="tfoot">
                        <div className="tr d-flex justify-content-between">
                            <div className="px-2 py-2">{journalEntryViewModeText[appContext.locale]["Total"]}</div>
                            <div className="px-2 py-2 text-right">
                                {new Intl.NumberFormat(appContext.locale, { style: 'currency', currency: appContext.currency }).format(sumAmounts())}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default TransactionViewMode;
