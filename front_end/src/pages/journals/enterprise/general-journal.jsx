import React from 'react';
import { API_BASE_URL } from '../../../utils/constants.js';
import axios from 'axios';
import { PageSettings } from '../../../config/page-settings';
import TableOfJournalEntries from './table-of-journal-entries';
import { generalJournalText } from '../../../utils/i18n/general-journal-text.js';
import { Card, CardBody } from 'reactstrap';
import { tableOfJournalEntriesText } from '../../../utils/i18n/table-of-journal-entries-text.js';


function GeneralJournal() {

    const appContext = React.useContext(PageSettings);

    const columns = [
        { header: tableOfJournalEntriesText[appContext.locale]['Date'], accessor: 'journalEntryDate', className: " col-sm-2" },
        { header: tableOfJournalEntriesText[appContext.locale]['Description'], accessor: 'description', className: " text-truncate col-sm-6" },
        { header: tableOfJournalEntriesText[appContext.locale]['Debit'], accessor: 'debitAmount', className: " text-right col-2" },
        { header: tableOfJournalEntriesText[appContext.locale]['Credit'], accessor: 'creditAmount', className: " text-right col-2" },
    ]
    const [pageSize, setPageSize] = React.useState(10);
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
                setData(response.data.content);
                setTotalPages(response.data.totalPages);
                setTotalElements(response.data.totalElements);
                setPageLength(response.data.size);
                setFirst(response.data.first);
                setLast(response.data.last);
            })
            .catch(console.log);

        setLoading(false);
    }



    return (
        <TableOfJournalEntries
            tableTitle={generalJournalText[appContext.locale]["Accounting Entries"]}
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