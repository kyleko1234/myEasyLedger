import React from 'react';
import ClickableTableWithPaginationAndJournalEntryModal from '../../../components/table/clickable-table-with-pagination-and-journal-entry-modal';
import axios from 'axios';
import {API_BASE_URL} from '../../../components/utils/constants.js';
import {Link, Redirect, useParams} from 'react-router-dom';
import AccountSubtypeDetailsSidebar from "./account-subtype-details-sidebar";
import { Modal, ModalHeader, ModalBody, ModalFooter, Alert } from "reactstrap";
import SweetAlert from 'react-bootstrap-sweetalert';



function AccountSubtypeDetails(props) {
    // required props: context, parentPath, parentName, utils
    // required utils: deleteAccountSubtype, fetchData
    // renders account details based on the id in url parameter

    const columns = React.useMemo(
        () => [ // accessor is the "key" in the data},
            { Header: 'Date', accessor: 'journalEntryDate', width: "10%" },
            { Header: 'Description', accessor: 'description', width: "50%" },
            { Header: 'Account', accessor: 'accountName', width: "20%" },
            { Header: 'Debit', accessor: 'debitAmount', width: "10%" },
            { Header: 'Credit', accessor: 'creditAmount', width: "10%" },
        ],
        []
    )

    //get the selected account ID from URL parameters
    const selectedAccountSubtypeId = useParams().id;

    // We'll start our table without any data
    const [data, setData] = React.useState([])
    const [pageCount, setPageCount] = React.useState(0)
    const [elementCount, setElementCount] = React.useState(0)

    //
    const [selectedAccountSubtype, setSelectedAccountSubtype] = React.useState(null);
    const [accounts, setAccounts] = React.useState(null);

    
    const [noAccountSubtypeNameAlert, setNoAccountSubtypeNameAlert] = React.useState(false);

    const [deleteAccountSubtypeAlert, setDeleteAccountSubtypeAlert] = React.useState(false);
    const toggleDeleteAccountSubtypeAlert = () => {
        setDeleteAccountSubtypeAlert(!deleteAccountSubtypeAlert);
    }
    const [cannotDeleteAccountSubtypeAlert, setCannotDeleteAccountSubtypeAlert] = React.useState(false);
    const toggleCannotDeleteAccountSubtypeAlert = () => {
        setCannotDeleteAccountSubtypeAlert(!cannotDeleteAccountSubtypeAlert);
    }

    const [editAccountSubtypeMode, setEditAccountSubtypeMode] = React.useState(false);
    const toggleEditAccountSubtypeMode = () => {
        setEditAccountSubtypeMode(!editAccountSubtypeMode);
        setAccountSubtypeNameInput(selectedAccountSubtype.accountSubtypeName)
        setNoAccountSubtypeNameAlert(false);
    }

    const [accountSubtypeNameInput, setAccountSubtypeNameInput] = React.useState('');

    const [redirect, setRedirect] = React.useState(false);

    //initially fetch account data, list of subtypes, list of types from API
    React.useEffect(() => {
        axios.get(`${API_BASE_URL}/accountSubtype/${selectedAccountSubtypeId}`).then(response => {
            let responseData = response.data
            setSelectedAccountSubtype(responseData);
        })
        axios.get(`${API_BASE_URL}/organization/${props.context.organizationId}/accountBalance`).then(response => {
            let accountsBelongingToSubtype = response.data.filter(account => account.accountSubtypeId && (account.accountSubtypeId.toString() === selectedAccountSubtypeId.toString()))
            setAccounts(accountsBelongingToSubtype);
        })
    }, [])

    const refreshData = () => {
        axios.get(`${API_BASE_URL}/accountSubtype/${selectedAccountSubtypeId}`).then(response => {
            let responseData = response.data
            setSelectedAccountSubtype(responseData);
        })
        axios.get(`${API_BASE_URL}/organization/${props.context.organizationId}/accountBalance`).then(response => {
            let accountsBelongingToSubtype = response.data.filter(account => account.accountSubtypeId && (account.accountSubtypeId.toString() === selectedAccountSubtypeId.toString()))
            setAccounts(accountsBelongingToSubtype);
        })
    }

    const fetchData = React.useCallback(({ pageSize, pageIndex }) => {
        // This will get called when the table needs new data

        //fetch data from Easy Ledger API
        const url = `${API_BASE_URL}/accountSubtype/${selectedAccountSubtypeId}/lineItem/?page=${pageIndex}&size=${pageSize}`;
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

    const handleConfirmDeleteAccountSubtypeButton = () => {
        toggleDeleteAccountSubtypeAlert();
        if (accounts.length != 0) {
            toggleCannotDeleteAccountSubtypeAlert();
        } else {
            props.utils.deleteAccountSubtype(selectedAccountSubtype.accountSubtypeId);
            setRedirect(true);
        }
    }

    const handleSaveEditAccountSubtypeButton = () => {
        if (!accountSubtypeNameInput){
            setNoAccountSubtypeNameAlert(true);
        } else {
            let updatedAccountSubtype = {
                accountSubtypeId: selectedAccountSubtype.accountSubtypeId,
                accountSubtypeName: accountSubtypeNameInput,
                accountTypeId: selectedAccountSubtype.accountTypeId,
                organizationId: props.context.organizationId
            }
            axios.put(`${API_BASE_URL}/accountSubtype/${selectedAccountSubtype.accountSubtypeId}`, updatedAccountSubtype).then(response => {
                console.log(response);
                refreshData();
                props.utils.fetchData(); //refresh data on parent component too!
            })
            toggleEditAccountSubtypeMode();
        }
    }

    const renderRedirect = () => { //redirect is false by default. if when redirect is set to true, user is redirected to parent component
        if (redirect) {
            return (
                <Redirect post to={props.parentPath}/>
            )
        }
    }

    return (
        <>
            {renderRedirect()}
            <ol className="breadcrumb float-xl-right">
                <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                <li className="breadcrumb-item"><Link to={props.parentPath}>{props.parentName}</Link></li>
                <li className="breadcrumb-item active">Account Subtype Details</li>
            </ol>

            <h1 className="page-header">Account Subtype Details</h1>

            <div className="row">
                <span className="col-md-9">
                    {selectedAccountSubtype ? <ClickableTableWithPaginationAndJournalEntryModal
                        context={props.context}
                        columns={columns}
                        data={data}
                        fetchData={fetchData}
                        pageCount={pageCount}
                        elementCount={elementCount}
                        tableTitle={selectedAccountSubtype.accountSubtypeName}
                        hasAddEntryButton={false}
                    /> : "Loading..."}
                </span>
                <span className="col-md-3 border-left">
                    <div className="row d-flex justify-content-between">
                        <div>{/* empty div to push the other two buttons to the right */}</div>
                        <div>
                            <button 
                                className="btn btn-default btn-icon btn-lg"
                                onClick={() => toggleEditAccountSubtypeMode()}
                            >
                                <i className="fas fa-edit"></i>
                            </button>
                            <button 
                                className="btn btn-default btn-icon btn-lg"
                                onClick={() => toggleDeleteAccountSubtypeAlert()}
                            >
                                <i className="fas fa-trash-alt"></i>
                            </button>
                        </div>
                    </div>
                    <div>
                        {selectedAccountSubtype ? <AccountSubtypeDetailsSidebar
                            {...selectedAccountSubtype}
                            accounts={accounts}
                            context={props.context}
                        /> : "Loading..."}
                    </div>
                </span>
            </div>

            {deleteAccountSubtypeAlert ? 
                <SweetAlert primary showCancel
                    confirmBtnText="Yes, delete it!"
                    confirmBtnBsStyle="primary"
                    cancelBtnBsStyle="default"
                    title="Are you sure?"
                    onConfirm={() => handleConfirmDeleteAccountSubtypeButton()}
                    onCancel={() => toggleDeleteAccountSubtypeAlert()}
                >
                    Are you sure you want to delete this subtype?
                </SweetAlert> 
            : null}
            {cannotDeleteAccountSubtypeAlert ? 
                <SweetAlert danger showConfirm={false} showCancel={true}
                    cancelBtnBsStyle="default"
                    title="Cannot delete this account subtype."
                    onConfirm={() => toggleCannotDeleteAccountSubtypeAlert()}
                    onCancel={() => toggleCannotDeleteAccountSubtypeAlert()}
                >
                    Please remove all accounts from this subtype and try again.
                </SweetAlert> 
            : null}

            <Modal
                isOpen={editAccountSubtypeMode}
                toggle={() => toggleEditAccountSubtypeMode()}
                backdrop="static"
                centered={true}
            >
                <ModalHeader>Edit Account Subtype</ModalHeader>
                <ModalBody>
                        {noAccountSubtypeNameAlert ? 
                            <Alert color="danger"> Please provide a name for your account subtype. </Alert> 
                        : null}
                        <form onSubmit={event => {event.preventDefault(); handleSaveEditAccountSubtypeButton()}}>
                            <div className="row m-b-10">
                                <span className="col-md-3 py-2 align-center"><strong>Account Subtype Name</strong></span>
                                <span className="col-md-9 align-center">
                                    <input 
                                        className="form-control" 
                                        type="text"
                                        value={accountSubtypeNameInput}
                                        onChange={event => setAccountSubtypeNameInput(event.target.value)}
                                    />
                                </span>
                            </div>
                        </form>
                </ModalBody>
                <ModalFooter> 
                    <button
                        className="btn btn-primary"
                        style={{ width: "10ch" }}
                        onClick={() => handleSaveEditAccountSubtypeButton()}
                    >
                        Save
                    </button>
                    <button
                        className="btn btn-white"
                        style={{ width: "10ch" }}
                        onClick={() => toggleEditAccountSubtypeMode()}
                    >
                        Cancel
                    </button>
                </ModalFooter>
            </Modal>
        </>
    )
}




export default AccountSubtypeDetails