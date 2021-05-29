import React from 'react';
import { useTable } from 'react-table';
import { PageSettings } from '../../../config/page-settings';
import {journalEntryViewModeText} from '../../../utils/i18n/journal-entry-view-mode-text.js'

function JournalEntryViewMode({ data, journalEntryDescription, journalEntryDate}) {
  const appContext = React.useContext(PageSettings);
  const columns = React.useMemo(
    () => [ // accessor is the "key" in the data},
      { Header: journalEntryViewModeText[appContext.locale]['Memo'], accessor: 'description', width:'50%'},
      { Header: journalEntryViewModeText[appContext.locale]['Account'], accessor: 'accountName', width:'24%'},
      { Header: journalEntryViewModeText[appContext.locale]['Debit'], accessor: 'debitAmount', width:'13%'},
      { Header: journalEntryViewModeText[appContext.locale]['Credit'], accessor: 'creditAmount', width:'13%'},
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

  const formatCell = cell => {
    let columnId = cell.column.id;
    switch (columnId) {
      case "debitAmount":
      case "creditAmount":
        if (cell.value) {
          return (new Intl.NumberFormat(appContext.locale, { style: 'currency', currency: appContext.currency }).format(cell.value));
        } else {
          return null;
        }
      default:
        return cell.value;
    }
  }

  return (
    <>
      <div className="row m-b-10">
        <div className="col-md-2"><strong>{journalEntryViewModeText[appContext.locale]["Date"]}</strong></div> <div className="col-md-10">{journalEntryDate}</div>
      </div>
      <div className="row m-b-10">
        <div className="col-md-2"><strong>{journalEntryViewModeText[appContext.locale]["Description"]}</strong></div> <div className="col-md-10">{journalEntryDescription}</div>
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
                <th {...column.getHeaderProps()} style={{width: column.width}} className={column.id == "debitAmount" || column.id == "creditAmount" ? "text-right" : ""}>
                  {column.render('Header')}
                </th>
              ))}
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
                      <td className={cell.column.id == "debitAmount" || cell.column.id == "creditAmount" ? "text-right" : ""} {...cell.getCellProps()}>{formatCell(cell)}</td>
                    )
                  })}
                </tr>
              )}
          )}
        </tbody>
        <tfoot>
          <tr>
            <td>{journalEntryViewModeText[appContext.locale]["Total"]}</td>
            <td></td>
            <td className="text-right">
              {new Intl.NumberFormat(appContext.locale, { style: 'currency', currency: appContext.currency }).format(sumAmountsInColumn("debitAmount"))}
            </td>
            <td className="text-right">
              {new Intl.NumberFormat(appContext.locale, { style: 'currency', currency: appContext.currency }).format(sumAmountsInColumn("creditAmount"))}
            </td>
          </tr>
        </tfoot>
      </table>
      </div>
    </>
  )
}

export default JournalEntryViewMode
