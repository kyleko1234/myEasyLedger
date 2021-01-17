import React from 'react';
import ClickableTableWithPaginationAndJournalEntryModal from '../../components/table/clickable-table-with-pagination-and-journal-entry-modal';
import {API_BASE_URL} from '../../utils/constants';
import axios from 'axios';
import {Link, Redirect, useParams} from 'react-router-dom';
import AccountDetailsSidebar from "./components/account-details-sidebar";
import { Modal, ModalHeader, ModalBody, ModalFooter, Alert } from "reactstrap";
import SweetAlert from 'react-bootstrap-sweetalert';
import { PageSettings } from '../../config/page-settings';



function AccountDetails(props) {

    const appContext = React.useContext(PageSettings);

    const columns = React.useMemo(
        () => [ // accessor is the "key" in the data},
            { Header: 'Date', accessor: 'journalEntryDate', width: "20%" },
            { Header: 'Description', accessor: 'description', width: "60%" },
            { Header: 'Debit', accessor: 'debitAmount', width: "10%" },
            { Header: 'Credit', accessor: 'creditAmount', width: "10%" },
        ],
        []
    )

    //get the selected account ID from URL parameters
    const selectedAccountId = useParams().id;

    // We'll start our table without any data
    const [data, setData] = React.useState([])
    const [pageCount, setPageCount] = React.useState(0)
    const [elementCount, setElementCount] = React.useState(0)

    //
    const [selectedAccount, setSelectedAccount] = React.useState(null);
    const [accountGroupOptions, setAccountGroupOptions] = React.useState(null);

    //initially fetch account data, list of subtypes, list of categories, list of types from API
    React.useEffect(() => {
        axios.get(`${API_BASE_URL}/account/${selectedAccountId}/accountBalance`).then(response => {
            let selectedAccount = response.data
            setSelectedAccount(selectedAccount);
        }).catch(console.log);
        
        axios.get(`${API_BASE_URL}/organization/${appContext.currentOrganization}/accountGroup`).then(response => {
            let formattedAccountGroupOptions = response.data.map(accountGroup => ({
                value: accountGroup.accountGroupId,
                label: accountGroup.accountGroupName,
                object: accountGroup
            }))
            setAccountGroupOptions(formattedAccountGroupOptions);
        }).catch(console.log);
    }, [])

    const refreshAccountData = React.useCallback(() => {
        axios.get(`${API_BASE_URL}/account/${selectedAccountId}/accountBalance`).then(response => {
            let account = response.data;
            setSelectedAccount(account);
        }).catch(console.log)

        axios.get(`${API_BASE_URL}/organization/${appContext.currentOrganization}/accountGroup`).then(response => {
            let formattedAccountGroupOptions = response.data.map(accountGroup => ({
                value: accountGroup.accountGroupId,
                label: accountGroup.accountGroupName,
                object: accountGroup
            }))
            setAccountGroupOptions(formattedAccountGroupOptions);
        }).catch(console.log);

    })

    const fetchData = React.useCallback(({ pageSize, pageIndex }) => {
        // This will get called when the table needs new data

        //fetch data from Easy Ledger API
        const url = `${API_BASE_URL}/account/${selectedAccountId}/lineItem/?page=${pageIndex}&size=${pageSize}`;
        axios.get(url).then(response => {
            var dataContent = response.data.content;
            dataContent.forEach(lineItem => {
                if (lineItem.isCredit) {
                    lineItem.debitAmount = 0;
                    lineItem.creditAmount = lineItem.amount;
                } else {
                    lineItem.creditAmount = 0;
                    lineItem.debitAmount = lineItem.amount;
                }
            })
            setData(dataContent);
            setPageCount(response.data.totalPages);
            setElementCount(response.data.totalElements);
        })
            .catch(console.log);
        //also refresh account data    
        axios.get(`${API_BASE_URL}/account/${selectedAccountId}/accountBalance`).then(response => {
            let account = response.data;
            setSelectedAccount(account);
        }).catch(console.log)
        axios.get(`${API_BASE_URL}/organization/${appContext.currentOrganization}/accountGroup`).then(response => {
            let formattedAccountGroupOptions = response.data.map(accountGroup => ({
                value: accountGroup.accountGroupId,
                label: accountGroup.accountGroupName,
                object: accountGroup
            }))
            setAccountGroupOptions(formattedAccountGroupOptions);
        }).catch(console.log);

    }, [])

    return (
        <>
            <ol className="breadcrumb float-xl-right">
                <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                <li className="breadcrumb-item"><Link to="/chart-of-accounts">Chart of Accounts</Link></li>
                <li className="breadcrumb-item active">Account Details</li>
            </ol>

            <h1 className="page-header">Account Details</h1>


            <div className="row">
                <span className="col-md-8">
                    {selectedAccount ? <ClickableTableWithPaginationAndJournalEntryModal
                        columns={columns}
                        data={data}
                        fetchData={fetchData}
                        pageCount={pageCount}
                        elementCount={elementCount}
                        tableTitle={selectedAccount.accountName}
                        hasAddEntryButton={false}
                    /> : "Loading..."}
                </span>
                <span className="col-md-4">
                    <div>
                        {selectedAccount && accountGroupOptions ? <AccountDetailsSidebar
                            {...selectedAccount}
                            accountGroupOptions={accountGroupOptions}
                            refreshAccountData={refreshAccountData}
                            elementCount={elementCount}
                        /> : "Loading..."}
                    </div>
                </span>
            </div>

        </>
    )
}




export default AccountDetails