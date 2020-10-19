import React from 'react';
import ClickableTableWithPaginationAndJournalEntryModal from '../../../components/table/clickable-table-with-pagination-and-journal-entry-modal';
import axios from 'axios';
import {Link, useParams} from 'react-router-dom';
import AccountDetailsSidebarView from "./account-details-sidebar-view";
import SweetAlert from 'react-bootstrap-sweetalert';



function AccountDetails(props) {
    // required props: context, parentPath, parentName, match
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
    const [accountSubtypes, setAccountSubtypes] = React.useState(null)
    const [accountTypes, setAccountTypes] = React.useState(null);

    const [deleteAccountAlert, setDeleteAccountAlert] = React.useState(false);
    const toggleDeleteAccountAlert = () => {
        setDeleteAccountAlert(!deleteAccountAlert);
    }
    const [cannotDeleteAccountAlert, setCannotDeleteAccountAlert] = React.useState(false);
    const toggleCannotDeleteAccountAlert = () => {
        setCannotDeleteAccountAlert(!cannotDeleteAccountAlert);
    }

    //initially fetch account data, list of subtypes, list of types from API
    React.useEffect(() => {
        axios.get(`${props.context.apiUrl}/account/${selectedAccountId}/accountBalance`).then(response => {
            let responseData = response.data
            setSelectedAccount(responseData);
        })
        axios.get(`${props.context.apiUrl}/accountType`).then(response => {
            setAccountTypes(response.data);
        })
        axios.get(`${props.context.apiUrl}/organization/${props.context.organizationId}/accountSubtype`).then(response => {
            setAccountSubtypes(response.data); 
        })
    }, [])

    const fetchData = React.useCallback(({ pageSize, pageIndex }) => {
        // This will get called when the table needs new data

        //fetch data from Easy Ledger API
        const url = `${props.context.apiUrl}/account/${selectedAccountId}/lineItem/?page=${pageIndex}&size=${pageSize}`;
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
    }, [])

    const handleConfirmDeleteAccountButton = () => {
        toggleDeleteAccountAlert();
        if (elementCount != 0) {
            toggleCannotDeleteAccountAlert();
        } else {
            //TODO handle deletion of account
        }
    }
    return (
        <>
            <ol className="breadcrumb float-xl-right">
                <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                <li className="breadcrumb-item"><Link to={props.parentPath}>{props.parentName}</Link></li>
                <li className="breadcrumb-item active">Account Details</li>
            </ol>

            <h1 className="page-header">Account Details</h1>

            <div className="row">
                <span className="col-md-9">
                    {selectedAccount ? <ClickableTableWithPaginationAndJournalEntryModal
                        context={props.context}
                        columns={columns}
                        data={data}
                        fetchData={fetchData}
                        pageCount={pageCount}
                        elementCount={elementCount}
                        tableTitle={selectedAccount.accountName}
                        hasAddEntryButton={false}
                    /> : "Loading..."}
                </span>
                <span className="col-md-3 border-left">
                    <div className="row d-flex justify-content-between">
                        <div>{/* empty div to push the other two buttons to the right */}</div>
                        <div>
                            <button 
                                className="btn btn-default btn-icon btn-lg"
                            >
                                <i className="fas fa-edit"></i>
                            </button>
                            <button 
                                className="btn btn-default btn-icon btn-lg"
                                onClick={() => toggleDeleteAccountAlert()}
                            >
                                <i className="fas fa-trash-alt"></i>
                            </button>
                        </div>
                    </div>
                    <div>
                        {selectedAccount ? <AccountDetailsSidebarView
                            {...selectedAccount}
                            accountSubtypes={accountSubtypes}
                            accountTypes={accountTypes}
                            context={props.context}
                        /> : "Loading..."}
                    </div>
                </span>
            </div>

            {deleteAccountAlert ? 
                <SweetAlert primary showCancel
                    confirmBtnText="Yes, delete it!"
                    confirmBtnBsStyle="primary"
                    cancelBtnBsStyle="white"
                    title="Are you sure?"
                    onConfirm={() => handleConfirmDeleteAccountButton()}
                    onCancel={() => toggleDeleteAccountAlert()}
                >
                    Are you sure you want to delete this account?
                </SweetAlert> 
            : null}
            {cannotDeleteAccountAlert ? 
                <SweetAlert danger showConfirm={false} showCancel={true}
                    cancelBtnBsStyle="white"
                    title="Cannot delete this account."
                    onCancel={() => toggleCannotDeleteAccountAlert()}
                >
                    Please remove all line items from this account and try again.
                </SweetAlert> 
            : null}
        </>
    )
}




export default AccountDetails