import React from 'react';
import { useTable } from 'react-table';
import { Alert } from 'reactstrap';
import { PageSettings } from '../../../config/page-settings';
import Select from 'react-select';
import {journalEntryEditModeText} from '../../../utils/i18n/journal-entry-edit-mode-text';
import { formatCurrency } from '../../../utils/util-fns';

function JournalEntryEditMode({
    data, setLineItemData,
    journalEntryDate, setJournalEntryDate,
    journalEntryDescription, setJournalEntryDescription,
    accountOptions,
    alertMessages,
    handleSaveJournalEntryButton
}) {
    const appContext = React.useContext(PageSettings);

    const columns = React.useMemo(
        () => [ // accessor is the "key" in the data},
            { header: journalEntryEditModeText[appContext.locale]['Memo'], accessor: 'description', className: " col-4 " },
            { header: journalEntryEditModeText[appContext.locale]['Account'], accessor: 'accountName', className: " col-3 "},
            { header: journalEntryEditModeText[appContext.locale]['Debit'], accessor: 'debitAmount', className: " col-2 " },
            { header: journalEntryEditModeText[appContext.locale]['Credit'], accessor: 'creditAmount', className: " col-2 "},
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
    
    const returnFormByColumnType = (row, i, columnAccessor) => { //FIX THIS
        switch (columnAccessor) {
            case "description":
                return(
                    <form onSubmit={event => {event.preventDefault(); handleSaveJournalEntryButton()}}> 
                        <input
                            type="text"
                            className="form-control"
                            value={row[columnAccessor] ? row[columnAccessor] : ''}
                            onChange={event => {
                                let updatedLineItemData = data.slice();
                                updatedLineItemData[i].description = event.target.value;
                                setLineItemData(updatedLineItemData);
                            }}
                        />
                    </form>
                )
            case "debitAmount":
                return(
                    <form onSubmit={event => {event.preventDefault(); handleSaveJournalEntryButton()}}> 
                        <input
                            type="number"
                            className="form-control"
                            value={(row[columnAccessor] !== null) ? row[columnAccessor] : ''}
                            step="any"
                            onChange={event => {
                                let updatedLineItemData = data.slice();
                                updatedLineItemData[i].debitAmount = parseFloat(event.target.value);
                                updatedLineItemData[i].creditAmount = null;
                                setLineItemData(updatedLineItemData);
                            }}
                        />
                    </form>
                )
            case "creditAmount":
                return(
                    <form onSubmit={event => {event.preventDefault(); handleSaveJournalEntryButton()}}> 
                        <input
                            type="number"
                            className="form-control"
                            value={(row[columnAccessor] !== null) ? row[columnAccessor] : ''}
                            step="any"
                            onChange={event => {
                                let updatedLineItemData = data.slice();
                                updatedLineItemData[i].creditAmount = parseFloat(event.target.value);
                                updatedLineItemData[i].debitAmount = null;
                                setLineItemData(updatedLineItemData);
                            }}
                        />
                    </form>
                )
            case "accountName": //Select component must exist outside of <form>. This way, form can be submitted with enter key. Forms unfortunately cannot be submitted with enter key when Select component is focused.
                return( 
                        <Select
                            classNamePrefix="form-control"
                            options={accountOptions}
                            value={accountOptions.find(accountOption => accountOption.object.accountId == data[i].accountId)}
                            isSearchable={true}
                            menuPortalTarget={document.body}
                            menuShouldScrollIntoView={false}
                            styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                            menuPlacement={'auto'}
                            onChange={(selectedOption) => {
                                let updatedLineItemData = data.slice();
                                updatedLineItemData[i].accountId = selectedOption.object.accountId;
                                updatedLineItemData[i].accountName = selectedOption.object.accountName;
                                setLineItemData(updatedLineItemData);
                            }}
                        />

                )
            default:
                return (row[columnAccessor]);
        }
    }

    const addEmptyLineItem = () => {
        let updatedLineItemData = data.slice();
        updatedLineItemData.push({
            lineItemId: "",
            accountName: "",
            accountId: "",
            description: "",
            debitAmount: 0,
            creditAmount: 0,
        })
        setLineItemData(updatedLineItemData);
    }

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
    
    const removeRow = i => {
        let updatedLineItemData = data.slice();
        updatedLineItemData.splice(i, 1);
        setLineItemData(updatedLineItemData);
    }

    const handleCopyDescriptionToLineItemsButton = () => {
        let updatedLineItemData = data.slice();
        updatedLineItemData.forEach(lineItem => lineItem.description = journalEntryDescription);
        setLineItemData(updatedLineItemData);
    }

    return (
        <>
            { alertMessages.length ? 
                <div>
                    <Alert color="danger" className="m-b-15" style={{borderStyle: "solid", borderColor:"FireBrick", borderWidth: "1px"}}>
                        <div className="d-flex justify-content-center">
                            <ul className="my-0">
                                {alertMessages.map((alertMessage, i) => (
                                    <li key={i}>{alertMessage}</li>
                                ))}
                            </ul>
                        </div>
                    </Alert>
                </div> : null
            }
            <div className="row mb-2 align-items-center">
                <div className="col-xl-1"><strong>{journalEntryEditModeText[appContext.locale]["Date"]}</strong></div> 
                <div className="col-xl-2">
                    <input 
                        type="date" 
                        className="form-control"
                        value={journalEntryDate} 
                        onChange={event => setJournalEntryDate(event.target.value)}/>
                    </div>
            </div>
            <div className="row mb-2 align-items-center">
                <div className="col-xl-1"><strong>{journalEntryEditModeText[appContext.locale]["Description"]}</strong></div> 
                <div className="col-xl-8">
                    <input 
                        type="text" 
                        className="form-control"
                        value={journalEntryDescription} 
                        onChange={event => setJournalEntryDescription(event.target.value)}/>
                </div>
                <button className="btn btn-white d-none d-xl-inline-block col-xl-3" onClick={handleCopyDescriptionToLineItemsButton}>
                    {journalEntryEditModeText[appContext.locale]["Copy description to line items"]}
                </button>
            </div>
            <button className="btn btn-white my-3 d-block w-100 d-xl-none" onClick={handleCopyDescriptionToLineItemsButton}>
                    {journalEntryEditModeText[appContext.locale]["Copy description to line items"]}
            </button>

            <div className="mt-3">
                <div className="table d-none d-lg-block">
                    <div className="thead">
                        <div className="tr bg-light rounded border d-flex">
                            {columns.map(column => (
                                <div className={"th " + column.className} key={column.accessor}>
                                    {column.header}
                                </div>
                            ))}
                            <div className="th col-1"></div>
                        </div>
                    </div>
                    <div className="tbody">
                        {data.map(
                            (row, i) => {
                                return (
                                    <div className="tr d-flex" key={i}>
                                        {columns.map(column => {
                                            return (
                                                <div key={column.accessor} className={"td " + column.className}>
                                                    {returnFormByColumnType(row, i, column.accessor)}
                                                </div>
                                            )
                                        })}
                                        <div className="td col-1">
                                            <button className="btn btn-lg btn-icon btn-white border-0" onClick={() => removeRow(i)}>
                                                <i className="ion ion-md-close fa-fw fa-lg"></i>
                                            </button>
                                        </div>
                                    </div>
                                )
                            }
                        )}
                    </div>
                    <div className="tfoot">
                        <div className="tr d-flex">
                            <div className="td col-4">{journalEntryEditModeText[appContext.locale]["Total"]}</div>
                            <div className="td col-3"></div>
                            <div className="td col-2"> {formatCurrency(appContext.locale, appContext.currency, sumAmountsInColumn("debitAmount"))}</div>
                            <div className="td col-2">{formatCurrency(appContext.locale, appContext.currency, sumAmountsInColumn("creditAmount"))}</div>
                            <div className="td col-1"></div>
                        </div>
                    </div>
                </div>
                <div className="table d-lg-none">
                    <div className="tbody">
                        {data.map(
                            (row, i) => {
                                return(
                                    <div className="tr d-flex align-items-center" key={i}>
                                        <div className="td">
                                            <div className="mb-2">
                                                <div className="fw-semibold font-size-compact">
                                                    {columns[1].header}
                                                </div>
                                                <div className="d-flex justify-content-between">
                                                    <div className="w-100">{returnFormByColumnType(row, i, columns[1].accessor)}</div>
                                                    <div>
                                                        <button className="btn btn-lg btn-white border-0 px-1 ms-2" onClick={() => removeRow(i)}>
                                                            <i className="ion ion-md-close fa-fw fa-lg"></i>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="mb-2">
                                                <div className="fw-semibold font-size-compact">
                                                    {columns[0].header}
                                                </div>
                                                <div>
                                                    {returnFormByColumnType(row, i, columns[0].accessor)}
                                                </div>
                                            </div>
                                            <div className="d-flex justify-content-between">
                                                <div className="me-2">
                                                    <div className="fw-semibold font-size-compact">
                                                        {columns[2].header}
                                                    </div>
                                                    <div>
                                                        {returnFormByColumnType(row, i, columns[2].accessor)}
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="fw-semibold font-size-compact">
                                                        {columns[3].header}
                                                    </div>
                                                    <div>
                                                        {returnFormByColumnType(row, i, columns[3].accessor)}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                        )}
                    </div>
                    <div className="tfoot">
                        <div className="tr d-flex">
                            <div className="td w-100 d-flex justify-content-between">
                                <div>
                                    <div>
                                        {journalEntryEditModeText[appContext.locale]["Total Debit"]}
                                    </div>
                                    <div className="fw-normal">
                                        {formatCurrency(appContext.locale, appContext.currency, sumAmountsInColumn("debitAmount"))}
                                    </div>
                                </div>
                                <div className="text-end">
                                    <div>
                                        {journalEntryEditModeText[appContext.locale]["Total Credit"]}
                                    </div>
                                    <div className="fw-normal">
                                        {formatCurrency(appContext.locale, appContext.currency, sumAmountsInColumn("creditAmount"))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <button className="btn btn-lg btn-white w-100 d-block" onClick={() => addEmptyLineItem()}>
                        <i className="ion ion-md-add fa-fw fa-lg"></i>{journalEntryEditModeText[appContext.locale]["Add a Line Item"]}
                    </button>
                </div>
            </div>
        </>
    )
}

export default JournalEntryEditMode
