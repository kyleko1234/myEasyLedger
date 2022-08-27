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

function TransactionsPage(props) {
    const appContext = React.useContext(PageSettings);

    //page data
    const [transactionViewModels, setTransactionViewModels] = React.useState([]);
    const [accountOptions, setAccountOptions] = React.useState([]);


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
    
    const fetchJournalEntryData = (pageIndex, pageSize) => {
        const url = `${API_BASE_URL}/organization/${appContext.currentOrganizationId}/assetAndLiabilityLineItem/?page=${pageIndex}&size=${pageSize}`;
        axios.get(url).then(response => {
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

    const fetchData = (pageIndex, pageSize) => {
        fetchJournalEntryData(pageIndex, pageSize);
        fetchAccounts();
    }

    //Fetch data on page load and when pageIndex and pageSize are updated
    React.useEffect(() => {
        fetchData(pageIndex, pageSize);
    }, [pageIndex, pageSize])

    const handleCreateTransactionButton = () => {
        setEditMode(true);
        toggleTransactionModal();
    }

    const handleClickTransaction = journalEntryId => {
        setCurrentJournalEntryId(journalEntryId);
        toggleTransactionModal();
    }

    return(
        <>
            <TransactionsTitleBarStandard
                handleCreateTransactionButton={handleCreateTransactionButton}
            />
            <TransactionsTitleBarSmallScreen
                handleCreateTransactionButton={handleCreateTransactionButton}
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
                refreshParentComponent={() => fetchData(pageIndex, pageSize)}
                currentJournalEntryId={currentJournalEntryId} setCurrentJournalEntryId={setCurrentJournalEntryId}
                accountOptions={accountOptions}
            />
        </>
    )
}

export default TransactionsPage;