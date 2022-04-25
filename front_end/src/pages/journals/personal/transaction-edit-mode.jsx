import React from 'react';
import { PageSettings } from '../../../config/page-settings';
import { journalEntryViewModeText } from '../../../utils/i18n/journal-entry-view-mode-text.js';
import {journalEntryEditModeText} from '../../../utils/i18n/journal-entry-edit-mode-text.js';
import {Alert} from 'reactstrap';
import Select from 'react-select';
import { formatCurrency } from '../../../utils/util-fns';

function TransactionEditMode({ data, journalEntryDescription, setJournalEntryDescription, journalEntryDate, setJournalEntryDate, fromAccountId, setFromAccountId,
        fromAccountName, setFromAccountName,
        setLineItemData, transactionTypeOptions, accountOptions, handleSaveTransactionButton, alertMessages }) {
    const appContext = React.useContext(PageSettings);
    const columns = React.useMemo(
        () => [ // accessor is the "key" in the data},
            { header: journalEntryViewModeText[appContext.locale]['Transaction Type'], accessor: 'transactionTypeName', className: "col-3" },
            { header: journalEntryViewModeText[appContext.locale]['Category or Account'], accessor: 'accountName', className: "col-3" },
            { header: journalEntryViewModeText[appContext.locale]['Memo'], accessor: 'description', className: "col-3" },
            { header: journalEntryViewModeText[appContext.locale]['Amount'], accessor: 'amount', className: "col-2" },
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

    const returnFormByColumnType = (cellValue, columnAccessor, rowIndex) => {
        switch (columnAccessor) {
            case "description":
                return(
                    <form onSubmit={event => {event.preventDefault(); handleSaveTransactionButton()}}> 
                        <input
                            type="text"
                            className="form-control"
                            value={cellValue ? cellValue : ''}
                            onChange={event => {
                                let updatedLineItemData = data.slice();
                                updatedLineItemData[rowIndex].description = event.target.value;
                                setLineItemData(updatedLineItemData);
                            }}
                        />
                    </form>
                )
            case "amount":
                return(
                    <form onSubmit={event => {event.preventDefault(); handleSaveTransactionButton()}}> 
                        <input
                            type="number"
                            className="form-control"
                            value={(cellValue !== null) ? cellValue : ''}
                            step="any"
                            onChange={event => {
                                let updatedLineItemData = data.slice();
                                updatedLineItemData[rowIndex].amount = parseFloat(event.target.value);
                                setLineItemData(updatedLineItemData);
                            }}
                        />
                    </form>
                )
            case "accountName": //Select component must exist outside of <form>. This way, form can be submitted with enter key. Forms unfortunately cannot be submitted with enter key when Select component is focused.
                return( 
                    <Select
                        classNamePrefix="form-control"
                        options={accountOptions.filter(accountOption => data[rowIndex].transactionType.accountTypeIds.includes(accountOption.object.accountTypeId))}
                        value={data[rowIndex].accountId == false ? null : accountOptions.find(accountOption => accountOption.object.accountId == data[rowIndex].accountId) /**The conditional checking for a false-y accountId is necessary if you want this select dropdown to reset when transactionTypeOption is changed. */}
                        isSearchable={true}
                        menuPortalTarget={document.body}
                        menuShouldScrollIntoView={false}
                        styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                        menuPlacement={'auto'}
                        onChange={(selectedOption) => {
                            let updatedLineItemData = data.slice();
                            updatedLineItemData[rowIndex].accountId = selectedOption.object.accountId;
                            updatedLineItemData[rowIndex].accountName = selectedOption.object.accountName;
                            setLineItemData(updatedLineItemData);
                        }}
                    />

                )
            case "transactionTypeName": 
                return(
                    <Select
                        classNamePrefix="form-control"
                        options={transactionTypeOptions}
                        value={transactionTypeOptions.find(transactionType => transactionType.value == data[rowIndex].transactionType.value)}
                        menuPortalTarget={document.body}
                        menuShouldScrollIntoView={false}
                        styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                        menuPlacement={'auto'}
                        onChange={(selectedOption) => {
                            let updatedLineItemData = data.slice();
                            updatedLineItemData[rowIndex].transactionType = selectedOption;
                            updatedLineItemData[rowIndex].transactionTypeName = selectedOption.label;
                            updatedLineItemData[rowIndex].accountId = '';
                            updatedLineItemData[rowIndex].accountName = '';
                            setLineItemData(updatedLineItemData);
                        }}
                    />
                )
            default:
                return (cellValue);
        }
    }
    const addEmptyLineItem = () => {
        let updatedLineItemData = data.slice();
        updatedLineItemData.push({
            lineItemId: "",
            accountName: "",
            accountId: "",
            description: "",
            transactionType: transactionTypeOptions[0],
            transactionTypeName: transactionTypeOptions[0].label,
            amount: 0,
        })
        setLineItemData(updatedLineItemData);
    }

    const removeLineItem = i => {
        let updatedLineItemData = data.slice();
        updatedLineItemData.splice(i, 1);
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
                <div className="col-lg-2"><strong>{journalEntryViewModeText[appContext.locale]["From Account"]}</strong></div> 
                <div className="col-lg-4">
                    <Select
                        classNamePrefix="form-control"
                        options={accountOptions.filter(accountOption => transactionTypeOptions[2].accountTypeIds.includes(accountOption.object.accountTypeId))}
                        value={accountOptions.find(accountOption => accountOption.object.accountId == fromAccountId)}
                        isSearchable={true}
                        menuPortalTarget={document.body}
                        menuShouldScrollIntoView={false}
                        styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                        menuPlacement={'auto'}
                        onChange={(selectedOption) => {
                            setFromAccountId(selectedOption.object.accountId);
                            setFromAccountName(selectedOption.object.accountName);
                        }}
                    /> 
                </div>
            </div>

            <div className="row mb-2 align-items-center">
                <div className="col-lg-2"><strong>{journalEntryViewModeText[appContext.locale]["Date"]}</strong></div> 
                <div className="col-lg-4">
                    <input 
                        type="date" 
                        className="form-control"
                        value={journalEntryDate} 
                        onChange={event => setJournalEntryDate(event.target.value)}/>
                </div>
            </div>
            <div className="row mb-2 align-items-center">
                <div className="col-lg-2"><strong>{journalEntryViewModeText[appContext.locale]["Description"]}</strong></div> 
                <div className="col-lg-8">
                    <input 
                            type="text" 
                            className="form-control"
                            value={journalEntryDescription} 
                            onChange={event => setJournalEntryDescription(event.target.value)}/>
                </div>
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
                                                <div className={"td " + column.className} key={column.accessor}>
                                                    {returnFormByColumnType(row[column.accessor], column.accessor, i)}
                                                </div>
                                            )
                                        })}
                                        <div className="td col-1 px-0">
                                            <button className="btn btn-lg btn-white border-0" onClick={() => removeLineItem(i)}>
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
                            <div className="td col-3 ">{journalEntryViewModeText[appContext.locale]["Total"]}</div>
                            <div className="td col-3 "></div>
                            <div className="td col-3 "></div>
                            <div className="td col-2 ">
                                {formatCurrency(appContext.locale, appContext.currency, sumAmounts())}
                            </div>
                            <div className="td col-1 "></div>
                        </div>
                    </div>
                </div>
                <div className="table d-lg-none">
                    <div className="tbody border-top">
                        {data.map(
                            (row, i) => {
                                return(
                                    <div className="tr d-flex" key={i}>
                                        <div className="td w-100">
                                            <div className="d-flex mb-2 align-items-center">
                                                <div className="col-5 px-0 mr-2">
                                                    <div className="font-weight-600 font-size-compact">
                                                        {columns[0].header}
                                                    </div>
                                                    <div>
                                                        {returnFormByColumnType(row[columns[0].accessor], columns[0].accessor, i)}
                                                    </div>
                                                </div>
                                                <div className="col-5 px-0 mr-2">
                                                    <div className="font-weight-600 font-size-compact">
                                                        {columns[1].header}
                                                    </div>
                                                    <div>
                                                        {returnFormByColumnType(row[columns[1].accessor], columns[1].accessor, i)}
                                                    </div>
                                                </div>
                                                <div className="col-1 px-0">
                                                    <div className="font-weight-600 font-size-compact invisible">
                                                        space {/**invisible text to align button */}
                                                    </div> 
                                                    <div>
                                                        <button className="btn btn-lg btn-white border-0" onClick={() => removeLineItem(i)}>
                                                            <i className="ion ion-md-close fa-fw fa-lg"></i>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="d-flex mb-2 align-items-center">
                                                    <div className="col-6 px-0 mr-2">
                                                        <div className="font-weight-600 font-size-compact">
                                                            {columns[2].header}
                                                        </div>
                                                        <div>
                                                            {returnFormByColumnType(row[columns[2].accessor], columns[2].accessor, i)}
                                                        </div>
                                                    </div>
                                                    <div className="col-4 px-0 mr-2">
                                                        <div className="font-weight-600 font-size-compact">
                                                            {columns[3].header}
                                                        </div>
                                                        <div>
                                                            {returnFormByColumnType(row[columns[3].accessor], columns[3].accessor, i)}
                                                        </div>
                                                    </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                        )}
                    </div>
                </div>
                <div>
                    <button className="btn btn-lg btn-white d-block w-100" onClick={addEmptyLineItem}>
                        <i className="ion ion-md-add fa-fw fa-lg"></i>{journalEntryEditModeText[appContext.locale]["Add a Line Item"]}
                    </button>
                </div>
            </div>
        </>
    )
}

export default TransactionEditMode;