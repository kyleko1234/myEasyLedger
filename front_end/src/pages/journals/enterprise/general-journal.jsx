import React from 'react';
import { API_BASE_URL } from '../../../utils/constants.js';
import axios from 'axios';
import { PageSettings } from '../../../config/page-settings';
import TableOfJournalEntries from './table-of-journal-entries';
import { generalJournalText } from '../../../utils/i18n/general-journal-text.js';
import { tableOfJournalEntriesText } from '../../../utils/i18n/table-of-journal-entries-text.js';
import { localizeDate } from '../../../utils/util-fns.js';


function GeneralJournal() {

    const appContext = React.useContext(PageSettings);

    const columns = [
        { header: tableOfJournalEntriesText[appContext.locale]['Date'], accessor: 'journalEntryDate', className: " col-md-2" },
        { header: tableOfJournalEntriesText[appContext.locale]['Description'], accessor: 'description', className: " text-truncate col-md-6" },
        { header: tableOfJournalEntriesText[appContext.locale]['Debit'], accessor: 'debitAmount', className: " text-end col-md-2" },
        { header: tableOfJournalEntriesText[appContext.locale]['Credit'], accessor: 'creditAmount', className: " text-end col-md-2" },
    ]
    const [pageSize, setPageSize] = React.useState(appContext.resultsPerPage);
    const [pageIndex, setPageIndex] = React.useState(0);
    const [data, setData] = React.useState([]);
    const [totalPages, setTotalPages] = React.useState(0);
    const [totalElements, setTotalElements] = React.useState(0);
    const [pageLength, setPageLength] = React.useState(0);
    const [first, setFirst] = React.useState(true);
    const [last, setLast] = React.useState(true);
    const [loading, setLoading] = React.useState(true);
    const previousPage = () => setPageIndex(pageIndex - 1);
    const nextPage = () => setPageIndex(pageIndex + 1);


    async function fetchData(pageIndex, pageSize) {
        await axios.get(`${API_BASE_URL}/organization/${appContext.currentOrganizationId}/journalEntryViewModel?page=${pageIndex}&size=${pageSize}`)
            .then(response => {
                response.data.content.forEach(journalEntry => {
                    journalEntry.journalEntryDate = localizeDate(journalEntry.journalEntryDate);
                })
                setData(response.data.content);
                setTotalPages(response.data.totalPages);
                setTotalElements(response.data.totalElements);
                setPageLength(response.data.numberOfElements);
                setFirst(response.data.first);
                setLast(response.data.last);
            })
            .catch(console.log);

        setLoading(false);
    }



    return (
        <TableOfJournalEntries
            tableTitle={<div className="h1">{generalJournalText[appContext.locale]["Accounting Entries"]}</div>}
            hasAddEntryButton={true}
            fetchData={fetchData}
            pageSize={pageSize}
            pageIndex={pageIndex}
            columns={columns}
            data={data}
            totalPages={totalPages}
            totalElements={totalElements}
            pageLength={pageLength}
            first={first}
            last={last}
            loading={loading}
            previousPage={previousPage}
            nextPage={nextPage}
        />
    )
}




export default GeneralJournal