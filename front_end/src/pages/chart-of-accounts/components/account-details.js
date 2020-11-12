import React from 'react';
import ClickableTableWithPaginationAndJournalEntryModal from '../../../components/table/clickable-table-with-pagination-and-journal-entry-modal';
import {API_BASE_URL} from '../../../components/utils/constants';
import axios from 'axios';
import {Link, Redirect, useParams} from 'react-router-dom';
import AccountDetailsSidebar from "./account-details-sidebar";
import { Modal, ModalHeader, ModalBody, ModalFooter, Alert } from "reactstrap";
import SweetAlert from 'react-bootstrap-sweetalert';



function AccountDetails(props) {
    // required props: context, parentPath, parentName, utils
    // required utils: deleteAccount, fetchData

    const columns = React.useMemo(
        () => [ // accessor is the "key" in the data},
            { Header: 'Date', accessor: 'journalEntryDate', width: "20%" },
            { Header: 'Description', accessor: 'description', width: "60%" },
            { Header: 'Debit', accessor: 'debitAmount', width: "10%" },
            { Header: 'Credit', accessor: 'creditAmount', width: "10%" },
        ],
        []
    )

    const columnsWithCategories = React.useMemo(
        () => [ // accessor is the "key" in the data},
            { Header: 'Date', accessor: 'journalEntryDate', width: "10%" },
            { Header: 'Description', accessor: 'description', width: "50%" },
            { Header: 'Category', accessor: 'categoryName', width: "20%" },
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
    const [accountSubtypes, setAccountSubtypes] = React.useState(null);
    const [accountTypes, setAccountTypes] = React.useState(null);

    const [hasCategories, setHasCategories] = React.useState(false);
    const [categories, setCategories] = React.useState(null);

    const [noAccountNameAlert, setNoAccountNameAlert] = React.useState(false);

    const [deleteAccountAlert, setDeleteAccountAlert] = React.useState(false);
    const toggleDeleteAccountAlert = () => {
        setDeleteAccountAlert(!deleteAccountAlert);
    }
    const [cannotDeleteAccountAlert, setCannotDeleteAccountAlert] = React.useState(false);
    const toggleCannotDeleteAccountAlert = () => {
        setCannotDeleteAccountAlert(!cannotDeleteAccountAlert);
    }

    const [editAccountMode, setEditAccountMode] = React.useState(false);
    const toggleEditAccountMode = () => {
        setEditAccountMode(!editAccountMode);
        setAccountNameInput(selectedAccount.accountName)
        setAccountSubtypeInput(selectedAccount.accountSubtypeId);
        setNoAccountNameAlert(false);
    }

    const [accountNameInput, setAccountNameInput] = React.useState('');
    const [accountSubtypeInput, setAccountSubtypeInput] = React.useState(null);

    const [redirect, setRedirect] = React.useState(false);

    //initially fetch account data, list of subtypes, list of categories, list of types from API
    React.useEffect(() => {
        axios.get(`${API_BASE_URL}/account/${selectedAccountId}/accountBalance`).then(response => {
            let selectedAccount = response.data
            let accountTypesWithCategories = [4, 5]
            if (accountTypesWithCategories.includes(selectedAccount.accountTypeId)) {
                setHasCategories(true);
            } 
            setSelectedAccount(selectedAccount);
        })
        axios.get(`${API_BASE_URL}/accountType`).then(response => {
            setAccountTypes(response.data);
        })
        axios.get(`${API_BASE_URL}/organization/${props.context.organizationId}/accountSubtype`).then(response => {
            setAccountSubtypes(response.data); 
        })
        axios.get(`${API_BASE_URL}/organization/${props.context.organizationId}/category`).then(response => {
            let categoriesForThisAccount = response.data.filter(category => category.accountId.toString() === selectedAccountId.toString());
            setCategories(categoriesForThisAccount);
        })
    }, [])

    const refreshData = () => { //call this function to grab updated data from API when needed
        axios.get(`${API_BASE_URL}/account/${selectedAccountId}/accountBalance`).then(response => {
            let accountTypesWithCategories = [4, 5]
            if (accountTypesWithCategories.includes(selectedAccount.accountTypeId)) {
                setHasCategories(true);
            } 
            setSelectedAccount(selectedAccount);
        })
        axios.get(`${API_BASE_URL}/accountType`).then(response => {
            setAccountTypes(response.data);
        })
        axios.get(`${API_BASE_URL}/organization/${props.context.organizationId}/accountSubtype`).then(response => {
            setAccountSubtypes(response.data); 
        })
        axios.get(`${API_BASE_URL}/organization/${props.context.organizationId}/category`).then(response => {
            let categoriesForThisAccount = response.data.filter(category => category.accountId.toString() === selectedAccountId.toString());
            setCategories(categoriesForThisAccount);
        })
    }

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
    }, [])

    const handleConfirmDeleteAccountButton = () => {
        toggleDeleteAccountAlert();
        if (elementCount != 0) {
            toggleCannotDeleteAccountAlert();
        } else if (hasCategories && categories.length != 0) {
            toggleCannotDeleteAccountAlert();
        } else {
            props.utils.deleteAccount(selectedAccount.accountId);
            setRedirect(true);
        }
    }

    const handleSaveEditAccountButton = () => {
        if (!accountNameInput){
            setNoAccountNameAlert(true);
        } else {
            let updatedAccount = {
                accountId: selectedAccount.accountId,
                accountName: accountNameInput,
                accountTypeId: selectedAccount.accountTypeId,
                accountSubtypeId: (hasCategories? null : accountSubtypeInput),
                organizationId: props.context.organizationId
            }
            axios.put(`${API_BASE_URL}/account/${selectedAccount.accountId}`, updatedAccount).then(response => {
                console.log(response);
                refreshData();
                props.utils.fetchData(); //refresh data on parent component too!
            })
            toggleEditAccountMode();
        }
    }

    const renderRedirect = () => {
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
                <li className="breadcrumb-item active">Account Details</li>
            </ol>

            <h1 className="page-header">Account Details</h1>

            <div className="row">
                <span className="col-md-9">
                    {selectedAccount ? <ClickableTableWithPaginationAndJournalEntryModal
                        context={props.context}
                        columns={hasCategories ? columnsWithCategories : columns}
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
                                onClick={() => toggleEditAccountMode()}
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
                        {selectedAccount ? <AccountDetailsSidebar
                            {...selectedAccount}
                            accountSubtypes={accountSubtypes}
                            accountTypes={accountTypes}
                            hasCategories={hasCategories}
                            categories={categories}
                            context={props.context}
                        /> : "Loading..."}
                    </div>
                </span>
            </div>

            {deleteAccountAlert ? 
                <SweetAlert primary showCancel
                    confirmBtnText="Yes, delete it!"
                    confirmBtnBsStyle="primary"
                    cancelBtnBsStyle="default"
                    title="Are you sure?"
                    onConfirm={() => handleConfirmDeleteAccountButton()}
                    onCancel={() => toggleDeleteAccountAlert()}
                >
                    Are you sure you want to delete this account?
                </SweetAlert> 
            : null}
            {cannotDeleteAccountAlert ? 
                <SweetAlert danger showConfirm={false} showCancel={true}
                    cancelBtnBsStyle="default"
                    title="Cannot delete this account."
                    onConfirm={() => toggleCannotDeleteAccountAlert()}
                    onCancel={() => toggleCannotDeleteAccountAlert()}
                >
                    {hasCategories ? "Please remove all categories from this account and try again."
                     : "Please remove all line items from this account and try again."}
                </SweetAlert> 
            : null}

            <Modal
                isOpen={editAccountMode}
                toggle={() => toggleEditAccountMode()}
                backdrop="static"
                centered={true}
            >
                <ModalHeader>Edit Account</ModalHeader>
                <ModalBody>
                        {noAccountNameAlert ? 
                            <Alert color="danger"> Please provide a name for your account. </Alert> 
                        : null}
                        <form onSubmit={event => {event.preventDefault(); handleSaveEditAccountButton()}}>
                            <div className="row m-b-10">
                                <span className="col-md-3 py-2 align-center"><strong>Account Name</strong></span>
                                <span className="col-md-9 align-center">
                                    <input 
                                        className="form-control" 
                                        type="text"
                                        value={accountNameInput}
                                        onChange={event => setAccountNameInput(event.target.value)}
                                    />
                                </span>
                            </div>
                            {hasCategories? null :
                                <div className="row m-b-10">
                                    <span className="col-md-3 py-2 align-center"><strong>Account Subtype</strong></span>
                                    <span className="col-md-9 align-center">
                                        { accountSubtypes ? 
                                            <select 
                                                className="form-control" 
                                                type="text"
                                                value={accountSubtypeInput}
                                                onChange={event => setAccountSubtypeInput(event.target.value)}
                                            >
                                                {accountSubtypes.map(accountSubtype => {
                                                    return (
                                                        <option key={accountSubtype.accountSubtypeId} value={accountSubtype.accountSubtypeId}> {accountSubtype.accountSubtypeName}</option>
                                                    )
                                                })}
                                            </select>
                                        : "Loading..."}
                                    </span>
                                </div>
                            }
                        </form>
                </ModalBody>
                <ModalFooter> 
                    <button
                        className="btn btn-primary"
                        style={{ width: "10ch" }}
                        onClick={() => handleSaveEditAccountButton()}
                    >
                        Save
                    </button>
                    <button
                        className="btn btn-white"
                        style={{ width: "10ch" }}
                        onClick={() => toggleEditAccountMode()}
                    >
                        Cancel
                    </button>
                </ModalFooter>
            </Modal>
        </>
    )
}




export default AccountDetails