import React from 'react';
import { useTable } from 'react-table';
import { PageSettings } from '../../../config/page-settings';
import { journalEntryViewModeText } from '../../../utils/i18n/journal-entry-view-mode-text.js';
import {journalEntryEditModeText} from '../../../utils/i18n/journal-entry-edit-mode-text.js';
import {Alert} from 'reactstrap';
import Select from 'react-select';

function TransactionEditMode({ data, journalEntryDescription, setJournalEntryDescription, journalEntryDate, setJournalEntryDate, fromAccountId, setFromAccountId,
    fromAccountName, setFromAccountName,
    setLineItemData, transactionTypeOptions, accountOptions, handleSaveTransactionButton, alertMessages }) {
    const appContext = React.useContext(PageSettings);
    const columns = React.useMemo(
        () => [ // accessor is the "key" in the data},
            { Header: journalEntryViewModeText[appContext.locale]['Transaction Type'], accessor: 'transactionTypeName', width: '25%' },
            { Header: journalEntryViewModeText[appContext.locale]['Category or Account'], accessor: 'accountName', width: '25%' },
            { Header: journalEntryViewModeText[appContext.locale]['Memo'], accessor: 'description', width: '25%' },
            { Header: journalEntryViewModeText[appContext.locale]['Amount'], accessor: 'amount', width: '25%' },
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

    const returnFormByColumnType = cell => {
        const columnId = cell.column.id;
        switch (columnId) {
            case "description":
                return(
                    <form onSubmit={event => {event.preventDefault(); handleSaveTransactionButton()}}> 
                        <input
                            type="text"
                            className="form-control"
                            value={cell.value ? cell.value : ''}
                            onChange={event => {
                                let updatedLineItemData = data.slice();
                                updatedLineItemData[cell.row.index].description = event.target.value;
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
                            value={cell.value ? cell.value : ''}
                            step="any"
                            onChange={event => {
                                let updatedLineItemData = data.slice();
                                updatedLineItemData[cell.row.index].amount = parseFloat(event.target.value);
                                setLineItemData(updatedLineItemData);
                            }}
                        />
                    </form>
                )
            case "accountName": //Select component must exist outside of <form>. This way, form can be submitted with enter key. Forms unfortunately cannot be submitted with enter key when Select component is focused.
                return( 
                    <Select
                        options={accountOptions.filter(accountOption => data[cell.row.index].transactionType.accountTypeIds.includes(accountOption.object.accountTypeId))}
                        value={data[cell.row.index].accountId == false ? null : accountOptions.find(accountOption => accountOption.object.accountId == data[cell.row.index].accountId) /**The conditional checking for a false-y accountId is necessary if you want this select dropdown to reset when transactionTypeOption is changed. */}
                        isSearchable={true}
                        menuPortalTarget={document.body}
                        menuShouldScrollIntoView={false}
                        styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                        menuPlacement={'auto'}
                        onChange={(selectedOption) => {
                            let updatedLineItemData = data.slice();
                            updatedLineItemData[cell.row.index].accountId = selectedOption.object.accountId;
                            updatedLineItemData[cell.row.index].accountName = selectedOption.object.accountName;
                            setLineItemData(updatedLineItemData);
                        }}
                    />

                )
            case "transactionTypeName": 
                return(
                    <Select
                        options={transactionTypeOptions}
                        value={transactionTypeOptions.find(transactionType => transactionType.value == data[cell.row.index].transactionType.value)}
                        menuPortalTarget={document.body}
                        menuShouldScrollIntoView={false}
                        styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                        menuPlacement={'auto'}
                        onChange={(selectedOption) => {
                            let updatedLineItemData = data.slice();
                            updatedLineItemData[cell.row.index].transactionType = selectedOption;
                            updatedLineItemData[cell.row.index].transactionTypeName = selectedOption.label;
                            updatedLineItemData[cell.row.index].accountId = '';
                            updatedLineItemData[cell.row.index].accountName = '';
                            setLineItemData(updatedLineItemData);
                        }}
                    />
                )
            default:
                return (cell.value);
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
            <div className="row m-b-10">
                <div className="col-xl-2"><strong>{journalEntryViewModeText[appContext.locale]["From Account"]}</strong></div> 
                <div className="col-xl-3">
                    <Select
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

            <div className="row m-b-10">
                <div className="col-xl-2"><strong>{journalEntryViewModeText[appContext.locale]["Date"]}</strong></div> 
                <div className="col-xl-3">
                    <input 
                        type="date" 
                        className="form-control"
                        value={journalEntryDate} 
                        onChange={event => setJournalEntryDate(event.target.value)}/>
                </div>
            </div>
            <div className="row m-b-10">
                <div className="col-xl-2"><strong>{journalEntryViewModeText[appContext.locale]["Description"]}</strong></div> 
                <div className="col-xl-8">
                    <input 
                            type="text" 
                            className="form-control"
                            value={journalEntryDescription} 
                            onChange={event => setJournalEntryDescription(event.target.value)}/>
                </div>
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
                                    <th {...column.getHeaderProps()} style={{ width: column.width }}>
                                        {column.render('Header')}
                                    </th>
                                ))}
                                <th></th>
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
                                                <td {...cell.getCellProps()}>{returnFormByColumnType(cell)}</td>
                                            )
                                        })}
                                        <td>
                                            <button className="btn btn-lg btn-icon btn-light" onClick={() => removeLineItem(i)}>
                                                <i className="ion ion-md-close fa-fw fa-lg"></i>
                                            </button>
                                        </td>
                                    </tr>
                                )
                            }
                        )}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td>{journalEntryViewModeText[appContext.locale]["Total"]}</td>
                            <td></td>
                            <td></td>
                            <td>
                                {new Intl.NumberFormat(appContext.locale, { style: 'currency', currency: appContext.currency }).format(sumAmounts())}
                            </td>
                            <td></td>
                        </tr>
                    </tfoot>
                </table>
                <button className="btn btn-light btn-block row" style={{margin:"auto", padding:"1em", borderStyle:"solid", borderColor:"LightGray", borderWidth:"1px"}} onClick={addEmptyLineItem}>
                    <i className="ion ion-md-add fa-fw fa-lg"></i>{journalEntryEditModeText[appContext.locale]["Add a Line Item"]}
                </button>
            </div>
        </>
    )
}

export default TransactionEditMode;