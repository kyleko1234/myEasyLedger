import React from 'react';
import ClickableTableWithPaginationAndJournalEntryModal from '../../../components/table/clickable-table-with-pagination-and-journal-entry-modal';
import axios from 'axios';
import {API_BASE_URL} from '../../../utils/constants.js';
import {Link, Redirect, useParams} from 'react-router-dom';
import CategoryDetailsSidebar from "./category-details-sidebar";
import { Modal, ModalHeader, ModalBody, ModalFooter, Alert } from "reactstrap";
import SweetAlert from 'react-bootstrap-sweetalert';



function CategoryDetails(props) {
    // required props: context, parentPath, parentName, utils
    // required utils: deleteCategory, fetchData

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
    const selectedCategoryId = useParams().id;

    // We'll start our table without any data
    const [data, setData] = React.useState([])
    const [pageCount, setPageCount] = React.useState(0)
    const [elementCount, setElementCount] = React.useState(0)

    //
    const [selectedCategory, setSelectedCategory] = React.useState(null);
    const [accounts, setAccounts] = React.useState(null);
    const [accountTypes, setAccountTypes] = React.useState(null);

    const [noCategoryNameAlert, setNoCategoryNameAlert] = React.useState(false);

    const [deleteCategoryAlert, setDeleteCategoryAlert] = React.useState(false);
    const toggleDeleteCategoryAlert = () => {
        setDeleteCategoryAlert(!deleteCategoryAlert);
    }
    const [cannotDeleteCategoryAlert, setCannotDeleteCategoryAlert] = React.useState(false);
    const toggleCannotDeleteCategoryAlert = () => {
        setCannotDeleteCategoryAlert(!cannotDeleteCategoryAlert);
    }

    const [editCategoryMode, setEditCategoryMode] = React.useState(false);
    const toggleEditCategoryMode = () => {
        setEditCategoryMode(!editCategoryMode);
        setCategoryNameInput(selectedCategory.categoryName)
        setAccountInput(selectedCategory.accountId);
        setNoCategoryNameAlert(false);
    }

    const [categoryNameInput, setCategoryNameInput] = React.useState('');
    const [accountInput, setAccountInput] = React.useState(null);

    const [redirect, setRedirect] = React.useState(false);

    //initially fetch category data, list of accounts
    React.useEffect(() => {
        axios.get(`${API_BASE_URL}/category/${selectedCategoryId}/categoryBalance`).then(response => {
            let returnedCategory = response.data
            setSelectedCategory(returnedCategory);
        })
        axios.get(`${API_BASE_URL}/organization/${props.context.organizationId}/account`).then(response => {
            setAccounts(response.data); 
        })
        axios.get(`${API_BASE_URL}/accountType`).then(response => {
            setAccountTypes(response.data); 
        })
    }, [])

    const refreshData = () => { //exactly the same as above. call this function to grab updated data from API when needed.
        axios.get(`${API_BASE_URL}/category/${selectedCategoryId}/categoryBalance`).then(response => {
            let returnedCategory = response.data
            setSelectedCategory(returnedCategory);
        })
        axios.get(`${API_BASE_URL}/organization/${props.context.organizationId}/account`).then(response => {
            setAccounts(response.data); 
        })
    }

    const fetchData = React.useCallback(({ pageSize, pageIndex }) => {
        // This will get called when the table needs new data
        // Retrieves data for the table of lineItems
        //fetch data from Easy Ledger API
        const url = `${API_BASE_URL}/category/${selectedCategoryId}/lineItem/?page=${pageIndex}&size=${pageSize}`;
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

    const handleConfirmDeleteCategoryButton = () => {
        toggleDeleteCategoryAlert();
        if (elementCount != 0) {
            toggleCannotDeleteCategoryAlert();
        } else {
            props.utils.deleteCategory(selectedCategory.categoryId);
            setRedirect(true);
        }
    }

    const handleSaveEditCategoryButton = () => {
        if (!categoryNameInput){
            setNoCategoryNameAlert(true);
        } else {
            let updatedCategory = {
                categoryId: selectedCategory.categoryId,
                categoryName: categoryNameInput,
                accountId: accountInput
            }
            axios.put(`${API_BASE_URL}/category/${selectedCategory.categoryId}`, updatedCategory).then(response => {
                console.log(response);
                refreshData();
                props.utils.fetchData(); //refresh data on parent component too!
            })
            toggleEditCategoryMode();
        }
    }

    const renderRedirect = () => {
        if (redirect) { //render a redirect to parent component if redirect is set to true
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
                <li className="breadcrumb-item active">Category Details</li>
            </ol>

            <h1 className="page-header">Category Details</h1>

            <div className="row">
                <span className="col-md-9">
                    {selectedCategory ? <ClickableTableWithPaginationAndJournalEntryModal
                        context={props.context}
                        columns={columns}
                        data={data}
                        fetchData={fetchData}
                        pageCount={pageCount}
                        elementCount={elementCount}
                        tableTitle={selectedCategory.categoryName}
                        hasAddEntryButton={false}
                    /> : "Loading..."}
                </span>
                <span className="col-md-3 border-left">
                    <div className="row d-flex justify-content-between">
                        <div>{/* empty div to push the other two buttons to the right */}</div>
                        <div>
                            <button 
                                className="btn btn-default btn-icon btn-lg"
                                onClick={() => toggleEditCategoryMode()}
                            >
                                <i className="fas fa-edit"></i>
                            </button>
                            <button 
                                className="btn btn-default btn-icon btn-lg"
                                onClick={() => toggleDeleteCategoryAlert()}
                            >
                                <i className="fas fa-trash-alt"></i>
                            </button>
                        </div>
                    </div>
                    <div>
                        {selectedCategory ? <CategoryDetailsSidebar
                            {...selectedCategory}
                            accounts={accounts}
                            accountTypes={accountTypes}
                            context={props.context}
                        /> : "Loading..."}
                    </div>
                </span>
            </div>

            {deleteCategoryAlert ? 
                <SweetAlert primary showCancel
                    confirmBtnText="Yes, delete it!"
                    confirmBtnBsStyle="primary"
                    cancelBtnBsStyle="default"
                    title="Are you sure?"
                    onConfirm={() => handleConfirmDeleteCategoryButton()}
                    onCancel={() => toggleDeleteCategoryAlert()}
                >
                    Are you sure you want to delete this category?
                </SweetAlert> 
            : null}
            {cannotDeleteCategoryAlert ? 
                <SweetAlert danger showConfirm={false} showCancel={true}
                    cancelBtnBsStyle="default"
                    title="Cannot delete this category."
                    onConfirm={() => toggleCannotDeleteCategoryAlert()}
                    onCancel={() => toggleCannotDeleteCategoryAlert()}
                >
                    {"Please remove all line items from this category and try again."}
                </SweetAlert> 
            : null}

            <Modal
                isOpen={editCategoryMode}
                toggle={() => toggleEditCategoryMode()}
                backdrop="static"
                centered={true}
            >
                <ModalHeader>Edit Category</ModalHeader>
                <ModalBody>
                        {noCategoryNameAlert ? 
                            <Alert color="danger"> Please provide a name for your category. </Alert> 
                        : null}
                        <form onSubmit={event => {event.preventDefault(); handleSaveEditCategoryButton()}}>
                            <div className="row m-b-10">
                                <span className="col-md-3 py-2 align-center"><strong>Category Name</strong></span>
                                <span className="col-md-9 align-center">
                                    <input 
                                        className="form-control" 
                                        type="text"
                                        value={categoryNameInput}
                                        onChange={event => setCategoryNameInput(event.target.value)}
                                    />
                                </span>
                            </div>
                            <div className="row m-b-10">
                                <span className="col-md-3 py-2 align-center"><strong>Account</strong></span>
                                <span className="col-md-9 align-center">
                                    {accounts && selectedCategory ?
                                        <select
                                            className="form-control"
                                            type="text"
                                            value={accountInput}
                                            onChange={event => setAccountInput(event.target.value)}
                                        >
                                            {accounts.slice().filter(account => account.accountTypeId === selectedCategory.accountTypeId).map(account => {
                                                //only renders accounts of the same account type of this category
                                                return (
                                                    <option key={account.accountId} value={account.accountId}> {account.accountName}</option>
                                                )
                                            })}
                                        </select>
                                        : "Loading..."}
                                </span>
                            </div>

                        </form>
                </ModalBody>
                <ModalFooter> 
                    <button
                        className="btn btn-primary"
                        style={{ width: "10ch" }}
                        onClick={() => handleSaveEditCategoryButton()}
                    >
                        Save
                    </button>
                    <button
                        className="btn btn-white"
                        style={{ width: "10ch" }}
                        onClick={() => toggleEditCategoryMode()}
                    >
                        Cancel
                    </button>
                </ModalFooter>
            </Modal>
        </>
    )
}




export default CategoryDetails