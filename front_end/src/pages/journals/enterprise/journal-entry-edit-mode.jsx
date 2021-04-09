import React from 'react';
import { useTable } from 'react-table';
import { Alert } from 'reactstrap';
import { PageSettings } from '../../../config/page-settings';
import Select from 'react-select';
import {journalEntryEditModeText} from '../../../utils/i18n/journal-entry-edit-mode-text';

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
            { Header: journalEntryEditModeText[appContext.locale]['Memo'], accessor: 'description', width:'40%', minWidth:"9em" },
            { Header: journalEntryEditModeText[appContext.locale]['Account'], accessor: 'accountName', width:'30%', minWidth:"6em" },
            { Header: journalEntryEditModeText[appContext.locale]['Debit'], accessor: 'debitAmount', width:'13%', minWidth:"6em" },
            { Header: journalEntryEditModeText[appContext.locale]['Credit'], accessor: 'creditAmount', width:'13%', minWidth:"6em" },
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
    
    const returnFormByColumnType = cell => {
        const columnId = cell.column.id;
        switch (columnId) {
            case "description":
                return(
                    <form onSubmit={event => {event.preventDefault(); handleSaveJournalEntryButton()}}> 
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
            case "debitAmount":
                return(
                    <form onSubmit={event => {event.preventDefault(); handleSaveJournalEntryButton()}}> 
                        <input
                            type="number"
                            className="form-control"
                            value={cell.value ? cell.value : ''}
                            step="any"
                            onChange={event => {
                                let updatedLineItemData = data.slice();
                                updatedLineItemData[cell.row.index].debitAmount = parseFloat(event.target.value);
                                updatedLineItemData[cell.row.index].creditAmount = null;
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
                            value={cell.value ? cell.value : ''}
                            step="any"
                            onChange={event => {
                                let updatedLineItemData = data.slice();
                                updatedLineItemData[cell.row.index].creditAmount = parseFloat(event.target.value);
                                updatedLineItemData[cell.row.index].debitAmount = null;
                                setLineItemData(updatedLineItemData);
                            }}
                        />
                    </form>
                )
            case "accountName": //Select component must exist outside of <form>. This way, form can be submitted with enter key. Forms unfortunately cannot be submitted with enter key when Select component is focused.
                return( 
                        <Select
                                    options={accountOptions}
                                    value={accountOptions.find(accountOption => accountOption.object.accountId == data[cell.row.index].accountId)}
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
            <div className="row m-b-10">
                <div className="col-xl-1"><strong>{journalEntryEditModeText[appContext.locale]["Date"]}</strong></div> 
                <div className="col-xl-2">
                    <input 
                        type="date" 
                        className="form-control"
                        value={journalEntryDate} 
                        onChange={event => setJournalEntryDate(event.target.value)}/>
                    </div>
            </div>
            <div className="row m-b-10">
                <div className="col-xl-1"><strong>{journalEntryEditModeText[appContext.locale]["Description"]}</strong></div> 
                <div className="col-xl-8">
                    <input 
                        type="text" 
                        className="form-control"
                        value={journalEntryDescription} 
                        onChange={event => setJournalEntryDescription(event.target.value)}/>
                </div>
                <button className="btn btn-light border border-rounded m-x-10 my-3 my-xl-0" onClick={handleCopyDescriptionToLineItemsButton}>
                    {journalEntryEditModeText[appContext.locale]["Copy description to line items"]}
                </button>
            </div>
            <br/>

            <div className="table-responsive">
                <table className="table"{...getTableProps()}>
                    <thead>
                        {headerGroups.map(headerGroup => (
                            <tr {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map(column => (
                                    // Add the sorting props to control sorting. For this example
                                    // we can add them into the header props
                                    <th {...column.getHeaderProps()} style={{width: column.width, minWidth: column.minWidth}}>
                                        {column.render('Header')}
                                    </th>
                                ))}
                                <th style={{width: "4%"}}></th>
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
                                                <td {...cell.getCellProps()}>
                                                    {returnFormByColumnType(cell)}
                                                </td>
                                            )
                                        })}
                                        <td>
                                            <button className="btn btn-lg btn-icon btn-light" onClick={() => removeRow(i)}>
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
                            <td>{journalEntryEditModeText[appContext.locale]["Total"]}</td>
                            <td></td>
                            <td>{new Intl.NumberFormat(appContext.locale, { style: 'currency', currency: appContext.currency }).format(sumAmountsInColumn("debitAmount"))}</td>
                            <td>{new Intl.NumberFormat(appContext.locale, { style: 'currency', currency: appContext.currency }).format(sumAmountsInColumn("creditAmount"))}</td>
                            <td></td>
                        </tr>
                    </tfoot>
                </table>
                <button className="btn btn-light btn-block row" style={{margin:"auto", padding:"1em", borderStyle:"solid", borderColor:"LightGray", borderWidth:"1px"}} onClick={() => addEmptyLineItem()}>
                    <i className="ion ion-md-add fa-fw fa-lg"></i>{journalEntryEditModeText[appContext.locale]["Add a Line Item"]}
                </button>
            </div>
        </>
    )
}

export default JournalEntryEditMode
