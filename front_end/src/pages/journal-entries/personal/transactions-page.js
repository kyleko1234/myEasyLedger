import axios from 'axios';
import React from 'react';
import { PageSettings } from '../../../config/page-settings';
import { API_BASE_URL } from '../../../utils/constants';
import { localizeDate } from '../../../utils/util-fns';
import JournalEntryTableFooter from '../enterprise/journal-entry-table-footer';
import TransactionModal from './transaction-modal';
import TransactionViewModelSmallSreen from './transaction-view-model-small-screen';
import TransactionViewModelStandard from './transaction-view-model-standard';
import TransactionsTableHeader from './transactions-table-header';
import TransactionsTitleBarSmallScreen from './transactions-title-bar-small-screen';
import TransactionsTitleBarStandard from './transactions-title-bar-standard';
import SearchBar from '../../../components/misc/search-bar';

function TransactionsPage(props) {
    const appContext = React.useContext(PageSettings);

    //page data
    const [transactionViewModels, setTransactionViewModels] = React.useState([]);
    const [accountOptions, setAccountOptions] = React.useState([]);

    /**
     * Search. Note: when moving through pages using the "older" and "newer" buttons/links, we do not want to change the search query even 
     * if the contents of the search input have changed. Therefore the search query that we send to the server must be stored in a different
     * variable than the actual value of the search bar input.
     * We set a useEffect hook to listen to a change in searchQuery. When the user hits the search button, searchQuery is updated to match the search bar input.
     * searchQuery being updated will trigger an API call for new data based on the new search term.
     * This way, if the user updates the search bar input WITHOUT hitting the search button, the pagination buttons will trigger API calls using the old search term 
     * instead of the updated but not submitted one.
     */
    const [searchQuery, setSearchQuery] = React.useState("");
    const [searchBarInput, setSearchBarInput] = React.useState("");

    //pagination
    const [pageSize, setPageSize] = React.useState(appContext.resultsPerPage);
    const [pageIndex, setPageIndex] = React.useState(0);
    const [totalPages, setTotalPages] = React.useState(0);
    const [totalElements, setTotalElements] = React.useState(0);
    const [pageLength, setPageLength] = React.useState(0);
    const [first, setFirst] = React.useState(true);
    const [last, setLast] = React.useState(true);
    const previousPage = () => setPageIndex(pageIndex - 1);
    const nextPage = () => setPageIndex(pageIndex + 1);

    //modal control
    const [transactionModal, setTransactionModal] = React.useState(false);
    const toggleTransactionModal = () => setTransactionModal(!transactionModal);
    const [currentJournalEntryId, setCurrentJournalEntryId] = React.useState(0);
    const [editMode, setEditMode] = React.useState(false);

    //functions to fetch data from API
    const fetchAccounts = () => {
        axios.get(`${API_BASE_URL}/organization/${appContext.currentOrganizationId}/account`).then(response => {
            const formattedAccounts = response.data.filter(account => !account.hasChildren).map(account => {
                return ({
                    value: account.accountId,
                    label: account.accountName,
                    object: account
                })
            });
            setAccountOptions(formattedAccounts);
        })
            .catch(console.log);
    }
    
    const fetchTransactionData = () => {
        let requestBody = {
            query: searchQuery
        }
        const url = `${API_BASE_URL}/organization/${appContext.currentOrganizationId}/assetAndLiabilityLineItem/?page=${pageIndex}&size=${pageSize}`;
        axios.post(url, requestBody).then(response => {
            let fetchedTransactions = response.data.content;
            fetchedTransactions.forEach(lineItem => {
                if (lineItem.isCredit) {
                    lineItem.debitAmount = 0;
                    lineItem.creditAmount = lineItem.amount;
                } else {
                    lineItem.creditAmount = 0;
                    lineItem.debitAmount = lineItem.amount;
                }
                lineItem.journalEntryDate = localizeDate(lineItem.journalEntryDate);
            })
            setTransactionViewModels(fetchedTransactions);
            setTotalPages(response.data.totalPages);
            setTotalElements(response.data.totalElements);
            setPageLength(response.data.numberOfElements);
            setFirst(response.data.first);
            setLast(response.data.last);
        })
            .catch(console.log);

    }

    const fetchData = () => {
        fetchTransactionData();
        fetchAccounts();
    }

    //Fetch data on page load and when pageIndex and pageSize are updated
    React.useEffect(() => {
        fetchData();
    }, [pageIndex, pageSize, searchQuery])

    const handleCreateTransactionButton = () => {
        setEditMode(true);
        toggleTransactionModal();
    }

    const handleClickTransaction = journalEntryId => {
        setCurrentJournalEntryId(journalEntryId);
        toggleTransactionModal();
    }

    const handleSearchSubmit = (event) => {
        event.preventDefault();
        setSearchQuery(searchBarInput);
    }

    const clearSearch = () => {
        setSearchBarInput("");
        setSearchQuery("");
    }

    return(
        <>
            <TransactionsTitleBarStandard
                handleCreateTransactionButton={handleCreateTransactionButton}
            />
            <TransactionsTitleBarSmallScreen
                handleCreateTransactionButton={handleCreateTransactionButton}
            />
            <SearchBar
                handleSearchSubmit={handleSearchSubmit}
                inputValue={searchBarInput}
                clearSearch={clearSearch}
                onChange={event => setSearchBarInput(event.target.value)}
            />
            <TransactionsTableHeader />
            <div>
                {transactionViewModels.map((transactionViewModel, i) => {
                    return(
                        <TransactionViewModelStandard
                            key={i}
                            journalEntryDate={transactionViewModel.journalEntryDate}
                            accountName={transactionViewModel.accountName}
                            description={transactionViewModel.description ? transactionViewModel.description : transactionViewModel.journalEntryDescription}
                            debitAmount={transactionViewModel.debitAmount}
                            creditAmount={transactionViewModel.creditAmount}
                            onClick={() => handleClickTransaction(transactionViewModel.journalEntryId)}
                        />
                    )
                })}
            </div>
            <div>
                {transactionViewModels.map((transactionViewModel, i) => {
                    return(
                        <TransactionViewModelSmallSreen
                            key={i}
                            journalEntryDate={transactionViewModel.journalEntryDate}
                            accountName={transactionViewModel.accountName}
                            description={transactionViewModel.description ? transactionViewModel.description : transactionViewModel.journalEntryDescription}
                            debitAmount={transactionViewModel.debitAmount}
                            creditAmount={transactionViewModel.creditAmount}
                            onClick={() => handleClickTransaction(transactionViewModel.journalEntryId)}
                        />
                    )
                })}
            </div>
            <JournalEntryTableFooter
                previousPage={previousPage}
                nextPage={nextPage}
                pageIndex={pageIndex}
                pageSize={pageSize}
                pageLength={pageLength}
                totalElements={totalElements}
                first={first}
                last={last}
            />
            <TransactionModal
                isOpen={transactionModal}
                editMode={editMode} setEditMode={setEditMode}
                toggle={toggleTransactionModal}
                refreshParentComponent={() => fetchData()}
                currentJournalEntryId={currentJournalEntryId} setCurrentJournalEntryId={setCurrentJournalEntryId}
                accountOptions={accountOptions}
            />
        </>
    )
}

export default TransactionsPage;