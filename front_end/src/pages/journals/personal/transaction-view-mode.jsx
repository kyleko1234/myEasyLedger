import React from 'react';
import { PageSettings } from '../../../config/page-settings';
import { journalEntryViewModeText } from '../../../utils/i18n/journal-entry-view-mode-text.js'
import { formatCurrency } from '../../../utils/util-fns';

function TransactionViewMode({ data, journalEntryDescription, journalEntryDate, fromAccountName }) {
    const appContext = React.useContext(PageSettings);
    const columns = React.useMemo(
        () => [ // accessor is the "key" in the data},
            { header: journalEntryViewModeText[appContext.locale]['Transaction Type'], accessor: 'transactionTypeName', className: 'col-3 ' },
            { header: journalEntryViewModeText[appContext.locale]['Category or Account'], accessor: 'accountName', className: 'col-3' },
            { header: journalEntryViewModeText[appContext.locale]['Memo'], accessor: 'description', className: 'col-4 ' },
            { header: journalEntryViewModeText[appContext.locale]['Amount'], accessor: 'amount', className: 'col-2 text-end' },
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
                return formatCurrency(appContext.locale, appContext.currency, cellValue);
            default:
                return cellValue;
        }
    }

    return (
        <>
            <div className="row mb-2 px-2 px-lg-0">
                <div className="col-lg-2"><strong>{journalEntryViewModeText[appContext.locale]["From Account"]}</strong></div> <div className="col-lg-10">{fromAccountName}</div>
            </div>

            <div className="row mb-2 px-2 px-lg-0">
                <div className="col-lg-2"><strong>{journalEntryViewModeText[appContext.locale]["Date"]}</strong></div> <div className="col-lg-10">{journalEntryDate}</div>
            </div>
            <div className="row px-2 px-lg-0">
                <div className="col-lg-2"><strong>{journalEntryViewModeText[appContext.locale]["Description"]}</strong></div> <div className="col-lg-10">{journalEntryDescription}</div>
            </div>

            <div className="mt-3"> 
                <div className="pseudo-table d-none d-lg-block">
                    <div className="pseudo-thead">
                        <div className="pseudo-tr bg-light rounded border d-flex">
                            {columns.map(column => {
                                return(
                                    <div className={"pseudo-th " + column.className} key={column.accessor}>
                                        {column.header}
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    <div className="pseudo-tbody">
                        {data.map(
                            (row, i) => {
                                return (
                                    <div className="pseudo-tr d-flex" key={i}>
                                        {columns.map(column => {
                                            return (
                                                <div className={"pseudo-td " + column.className} key={column.accessor}>
                                                    {formatCell(row[column.accessor], column.accessor)}
                                                </div>
                                            )
                                        })}
                                    </div>
                                )
                            }
                        )}
                    </div>
                    <div className="pseudo-tfoot">
                        <div className="pseudo-tr d-flex">
                            <div className="pseudo-td col-3">{journalEntryViewModeText[appContext.locale]["Total"]}</div>
                            <div className="pseudo-td col-3"></div>
                            <div className="pseudo-td col-3"></div>
                            <div className="pseudo-td col-3 text-end">
                                {formatCurrency(appContext.locale, appContext.currency, sumAmounts())}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="pseudo-table d-lg-none">
                    <div className="pseudo-tbody border-top">
                        {data.map((row, i) => {
                            return(
                                <div key={i} className="pseudo-tr d-flex">
                                    <div className="px-2 py-2 w-100">
                                        <div className="fw-semibold">
                                            {row[columns[0].accessor] + " - " + row[columns[1].accessor]}
                                        </div>
                                        <div className="d-flex justify-content-between">
                                            <div className="me-5">
                                                {row[columns[2].accessor]? row[columns[2].accessor]: <em className="text-muted font-weight-light">{journalEntryViewModeText[appContext.locale]["No memo"]}</em> }
                                            </div>
                                            <div className="text-end">
                                                {formatCell(row[columns[3].accessor], columns[3].accessor)}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    <div className="pseudo-tfoot">
                        <div className="pseudo-tr d-flex justify-content-between">
                            <div className="px-2 py-2">{journalEntryViewModeText[appContext.locale]["Total"]}</div>
                            <div className="px-2 py-2 text-end">
                                {formatCurrency(appContext.locale, appContext.currency, sumAmounts())}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default TransactionViewMode;
