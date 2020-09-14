import React from 'react'
import { useTable } from 'react-table'

function LineItemForm({
    data, setLineItemData,
    journalEntryDate, setJournalEntryDate,
    journalEntryDescription, setJournalEntryDescription,
    categories,
    accounts,
    localization
}) {
    


    const columns = React.useMemo(
        () => [ // accessor is the "key" in the data},
            { Header: 'Description', accessor: 'description' },
            { Header: 'Account', accessor: 'accountName' },
            { Header: 'Category', accessor: 'categoryName' },
            { Header: 'Debit', accessor: 'debitAmount' },
            { Header: 'Credit', accessor: 'creditAmount' },
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
        const accountTypesWithCategories = [3, 4, 5];
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
                            value={data[cell.row.index].accountId}
                            className="form-control"
                            onChange={event => {
                                let updatedLineItemData = data.slice();
                                let selectedAccount = accounts.find(account => account.accountId == event.target.value);
                                updatedLineItemData[cell.row.index].accountId = selectedAccount.accountId;
                                updatedLineItemData[cell.row.index].accountName = selectedAccount.accountName;
                                updatedLineItemData[cell.row.index].accountTypeId = selectedAccount.accountTypeId;
                                if (!accountTypesWithCategories.includes(selectedAccount.accountTypeId)) {
                                    updatedLineItemData[cell.row.index].categoryId = null;
                                    updatedLineItemData[cell.row.index].categoryName = null;
                                }
                                setLineItemData(updatedLineItemData);
                            }}
                        >
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
                    const categoriesForThisAccountType = categories.filter(category => category.accountTypeId == data[cell.row.index].accountTypeId);
                    return(
                        <>
                            <select
                                value={data[cell.row.index].categoryId ? data[cell.row.index].categoryId : "" }
                                className="form-control"
                                onChange={event => {
                                    let updatedLineItemData = data.slice();
                                    let selectedCategory = categories.find(category => category.categoryId == event.target.value);
                                    updatedLineItemData[cell.row.index].categoryId = selectedCategory.categoryId;
                                    updatedLineItemData[cell.row.index].categoryName = selectedCategory.categoryName;
                                    setLineItemData(updatedLineItemData);
                                }}
                            >
                                {categoriesForThisAccountType.map(
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
            debitAmount: "",
            creditAmount: "",
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
            <div className="row m-b-10">
                <div className="col-md-1"><strong>Date</strong></div> 
                <div className="col-md-11">
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
                                    <th {...column.getHeaderProps()}>
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
                                                <td {...cell.getCellProps()}>
                                                    {returnFormByColumnType(cell)}
                                                </td>
                                            )
                                        })}
                                        <td>
                                            <button className="btn btn-lg btn-icon btn-light" onClick={() => removeRow(i)}>
                                                <i className="ion ion-ios-close fa-fw fa-lg"></i>
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
                            <td><strong>{new Intl.NumberFormat(localization.locale, { style: 'currency', currency:localization.currency }).format(sumAmountsInColumn("debitAmount"))}</strong></td>
                            <td><strong>{new Intl.NumberFormat(localization.locale, { style: 'currency', currency:localization.currency }).format(sumAmountsInColumn("creditAmount"))}</strong></td>
                            <td></td>
                        </tr>
                    </tfoot>
                </table>
                <button className="btn btn-green btn-block row" style={{margin:"auto", padding:"1em"}} onClick={() => addEmptyLineItem()}>Add a Line Item</button>
            </div>
        </>
    )
}

export default LineItemForm
