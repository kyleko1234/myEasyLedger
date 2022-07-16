import React from 'react';
import { PageSettings } from '../../../config/page-settings';
import { journalEntryViewModeText } from '../../../utils/i18n/journal-entry-view-mode-text.js'
import { formatCurrency, localizeDate } from '../../../utils/util-fns';

function JournalEntryViewMode({ data, journalEntryDescription, journalEntryDate, accountOptions, vendorOptions, customerOptions, journalEntryVendorId, journalEntryCustomerId}) {
    const appContext = React.useContext(PageSettings);
    const columns = React.useMemo(
        () => [ // accessor is the "key" in the data},
            { header: journalEntryViewModeText[appContext.locale]['Memo'], accessor: 'description', className: 'col-6 ' },
            { header: journalEntryViewModeText[appContext.locale]['Account'], accessor: 'accountId', className: 'col-2 ' },
            { header: journalEntryViewModeText[appContext.locale]['Debit'], accessor: 'debitAmount', className: 'col-2 text-end ' },
            { header: journalEntryViewModeText[appContext.locale]['Credit'], accessor: 'creditAmount', className: 'col-2 text-end ' },
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
                    return formatCurrency(appContext.locale, appContext.currency, cellValue);
                } else {
                    return null;
                }
            case "accountId": 
                /** search through accountOptions for the accountOption that matches the lineItem's accountId, then use the label of that accountOption. This is to include the account code of the specified account in the table. */
                let accountOption = accountOptions.find(accountOption => accountOption.value === cellValue);
                return (accountOption? accountOption.label : ' ');
            default:
                return cellValue;
        }
    }

    return (
        <>
            <div>
                <div className="row mb-2 px-2 px-lg-0">
                    <div className="col-md-3 col-lg-2">
                        <strong>{journalEntryViewModeText[appContext.locale]["Date"]}</strong>
                    </div> 
                    <div className="col-md-9 col-lg-10">
                        {localizeDate(journalEntryDate)}
                    </div>
                </div>
                <div className="row mb-2 px-2 px-lg-0">
                    <div className="col-md-3 col-lg-2">
                        <strong>{journalEntryViewModeText[appContext.locale]["Description"]}</strong>
                    </div> 
                    <div className="col-md-9 col-lg-10">
                        {journalEntryDescription}
                    </div>
                </div>
                <div className="row mb-2 px-2 px-lg-0">
                    <div className="col-md-3 col-lg-2">
                        <strong>{journalEntryViewModeText[appContext.locale]["Vendor"]}</strong>
                    </div> 
                    <div className="col-md-9 col-lg-10">
                        {journalEntryVendorId
                            ? vendorOptions
                                .find(vendorOption => vendorOption.object.vendorId === journalEntryVendorId)
                                .object.vendorName
                            : <div className="text-muted fw-light">
                                {journalEntryViewModeText[appContext.locale]["None"]}
                            </div>
                        }
                    </div>
                </div>
                <div className="row px-2 px-lg-0">
                    <div className="col-md-3 col-lg-2">
                        <strong>{journalEntryViewModeText[appContext.locale]["Customer"]}</strong>
                    </div> 
                    <div className="col-md-9 col-lg-10">
                        {journalEntryCustomerId
                            ? customerOptions
                                .find(customerOption => customerOption.object.customerId === journalEntryCustomerId)
                                .object.customerName
                            : <div className="text-muted fw-light">
                                {journalEntryViewModeText[appContext.locale]["None"]}
                            </div>
                        }
                    </div>
                </div>
            </div>

            <div className="mt-3">
                <div className="pseudo-table d-none d-lg-block">
                    <div className="pseudo-thead">
                        <div className="pseudo-tr bg-light rounded border d-flex">
                            {columns.map(column => (
                                <div key={column.accessor} className={"pseudo-th " + column.className}>
                                    {column.header}
                                </div>
                            ))}
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
                            <div className="pseudo-td col-6">{journalEntryViewModeText[appContext.locale]["Total"]}</div>
                            <div className="pseudo-td col-2"></div>
                            <div className="pseudo-td col-2 text-end">
                                {formatCurrency(appContext.locale, appContext.currency, sumAmountsInColumn("debitAmount"))}
                            </div>
                            <div className="pseudo-td col-2 text-end">
                                {formatCurrency(appContext.locale, appContext.currency, sumAmountsInColumn("creditAmount"))}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="pseudo-table d-lg-none">
                    <div className="pseudo-tbody border-top">
                        {data.map((row, i) => { /**Probably refactor this at some point */
                            return(
                                <div key={i} className="pseudo-tr d-flex">
                                    <div className="px-2 py-2 w-100">
                                        <div className="fw-semibold">
                                            {formatCell(row[columns[1].accessor], columns[1].accessor)}
                                        </div>
                                        <div className="mb-2">
                                            {row[columns[0].accessor]? row[columns[0].accessor]: <em className="text-muted font-weight-light">{journalEntryViewModeText[appContext.locale]["No memo"]}</em> }
                                        </div>
                                        <div className="d-flex justify-content-between ">
                                            <div className="">
                                                <div className="fw-semibold">
                                                    {columns[2].header}
                                                </div>
                                                <div>
                                                    {formatCell(row[columns[2].accessor], columns[2].accessor)}
                                                </div>
                                            </div>
                                            <div className="text-end">
                                                <div className="fw-semibold">
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
                    <div className="pseudo-tfoot">
                        <div className="pseudo-tr d-flex">
                            <div className="px-2 py-2 w-100 d-flex justify-content-between">
                                <div>
                                    <div>
                                        {journalEntryViewModeText[appContext.locale]["Total Debit"]}
                                    </div>
                                    <div className="fw-normal">
                                        {formatCurrency(appContext.locale, appContext.currency, sumAmountsInColumn("debitAmount"))}
                                    </div>
                                </div>
                                <div className="text-end">
                                    <div>
                                        {journalEntryViewModeText[appContext.locale]["Total Credit"]}
                                    </div>
                                    <div className="fw-normal">
                                        {formatCurrency(appContext.locale, appContext.currency, sumAmountsInColumn("creditAmount"))}
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
