import React from 'react'
import { useTable } from 'react-table'
import { Alert } from 'reactstrap'
import { PageSettings } from '../../config/page-settings'

function JournalEntryEditMode({
    data, setLineItemData,
    journalEntryDate, setJournalEntryDate,
    journalEntryDescription, setJournalEntryDescription,
    categories,
    accounts,
    alertMessages
}) {
    const appContext = React.useContext(PageSettings);

    const columns = React.useMemo(
        () => [ // accessor is the "key" in the data},
            { Header: 'Description', accessor: 'description', width:'40%', minWidth:"9em" },
            { Header: 'Account', accessor: 'accountName', width:'18%', minWidth:"6em" },
            { Header: 'Category', accessor: 'categoryName', width:'18%', minWidth:"6em" },
            { Header: 'Debit', accessor: 'debitAmount', width:'10%', minWidth:"6em" },
            { Header: 'Credit', accessor: 'creditAmount', width:'10%', minWidth:"6em" },
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
        const accountTypesWithCategories = [4, 5];
        switch (columnId) {
            case "description":
                return( 
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
                )
            case "debitAmount":
                return(
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
                )
            case "creditAmount":
                return(
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
                )
            case "accountName":
                return(
                    <>
                        <select
                            value={(data[cell.row.index].accountId)}
                            className="form-control"
                            onChange={event => {
                                let updatedLineItemData = data.slice();
                                let selectedAccount = accounts.find(account => account.accountId.toString() === event.target.value);
                                updatedLineItemData[cell.row.index].accountId = selectedAccount.accountId;
                                updatedLineItemData[cell.row.index].accountName = selectedAccount.accountName;
                                updatedLineItemData[cell.row.index].accountTypeId = selectedAccount.accountTypeId;
                                updatedLineItemData[cell.row.index].categoryId = '';
                                if (!accountTypesWithCategories.includes(selectedAccount.accountTypeId)) {
                                    updatedLineItemData[cell.row.index].categoryId = null;
                                    updatedLineItemData[cell.row.index].categoryName = null;
                                }
                                setLineItemData(updatedLineItemData);
                            }}
                        >
                            <option value='' disabled className="font-italic">Select an account...</option>
                            {accounts.map(
                                (account) => {
                                    return(
                                        <option key={account.accountId} value={account.accountId}>{account.accountName}</option>
                                    )
                                }
                            )}
                        </select>
                    </>
                )
            case "categoryName":
                if (accountTypesWithCategories.includes(data[cell.row.index].accountTypeId)) {
                    const categoriesForThisAccount = categories.filter(category => category.accountId.toString() === data[cell.row.index].accountId.toString());
                    return(
                        <>
                            <select
                                value={data[cell.row.index].categoryId ? data[cell.row.index].categoryId : "" }
                                className="form-control"
                                onChange={event => {
                                    let updatedLineItemData = data.slice();
                                    let selectedCategory = categories.find(category => category.categoryId.toString() === event.target.value);
                                    updatedLineItemData[cell.row.index].categoryId = selectedCategory.categoryId;
                                    updatedLineItemData[cell.row.index].categoryName = selectedCategory.categoryName;
                                    setLineItemData(updatedLineItemData);
                                }}
                            >
                                <option value='' disabled className="font-italic">Select a category...</option>

                                {categoriesForThisAccount.map(
                                    (category) => {
                                        return(
                                            <option key={category.categoryId} value={category.categoryId}>{category.categoryName}</option>
                                        )
                                    }
                                )}
                            </select>
                        </>
                    )
                } else {
                    return(
                        <>
                            <select
                                value=""
                                readOnly
                                className="form-control">
                            </select>
                        </>
                    )
                }
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
            accountTypeId: "",
            description: "",
            debitAmount: 0,
            creditAmount: 0,
            categoryName: "",
            categoryId: "",
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
                <div className="col-md-1"><strong>Date</strong></div> 
                <div className="col-md-2">
                    <input 
                        type="date" 
                        className="form-control"
                        value={journalEntryDate} 
                        onChange={event => setJournalEntryDate(event.target.value)}/>
                    </div>
            </div>
            <div className="row m-b-10">
                <div className="col-md-1"><strong>Description</strong></div> 
                <div className="col-md-11">
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
                            <td><strong>Total</strong></td>
                            <td></td>
                            <td></td>
                            <td><strong>{new Intl.NumberFormat(appContext.locale, { style: 'currency', currency: appContext.currency }).format(sumAmountsInColumn("debitAmount"))}</strong></td>
                            <td><strong>{new Intl.NumberFormat(appContext.locale, { style: 'currency', currency: appContext.currency }).format(sumAmountsInColumn("creditAmount"))}</strong></td>
                            <td></td>
                        </tr>
                    </tfoot>
                </table>
                <button className="btn btn-light btn-block row" style={{margin:"auto", padding:"1em", borderStyle:"solid", borderColor:"LightGray", borderWidth:"1px"}} onClick={() => addEmptyLineItem()}>
                    <i className="ion ion-md-add fa-fw fa-lg"></i>Add a Line Item
                </button>
            </div>
        </>
    )
}

export default JournalEntryEditMode
