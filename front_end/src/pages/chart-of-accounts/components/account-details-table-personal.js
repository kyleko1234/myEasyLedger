import axios from 'axios';
import React from 'react';
import { Link } from 'react-router-dom';
import { PageSettings } from '../../../config/page-settings';
import { API_BASE_URL } from '../../../utils/constants';
import { journalEntriesText } from '../../../utils/i18n/journal-entries-text';
import { localizeDate } from '../../../utils/util-fns';
import JournalEntryTableFooter from '../../journal-entries/enterprise/journal-entry-table-footer';
import TransactionModal from '../../journal-entries/personal/transaction-modal';
import TransactionViewModelSmallSreen from '../../journal-entries/personal/transaction-view-model-small-screen';
import TransactionViewModelStandard from '../../journal-entries/personal/transaction-view-model-standard';
import TransactionsTableHeader from '../../journal-entries/personal/transactions-table-header';
import AccountDetailsEditor from './account-details-editor';
import AccountDetailsTableTitleBarSmallScreen from './account-details-table-title-bar-small-screen';
import AccountDetailsTableTitleBarStandard from './account-details-table-title-bar-standard';

//using selectedAccountId for react effect update dependencies is noticeably faster than using selectedAccount
function AccountDetailsTablePersonal({ selectedAccount, selectedAccountId, setRefreshToken, fetchAccount, category }) {
    const appContext = React.useContext(PageSettings);

    //page data
    const [lineItemViewModels, setLineItemViewModels] = React.useState([]);
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

    const [journalEntryModal, setJournalEntryModal] = React.useState(false);
    const toggleJournalEntryModal = () => setJournalEntryModal(!journalEntryModal);
    const [currentJournalEntryId, setCurrentJournalEntryId] = React.useState(0);
    const [editMode, setEditMode] = React.useState(false);
    const [accountDetailsEditorModal, setAccountDetailsEditorModal] = React.useState(false);
    const toggleAccountDetailsEditorModal = () => setAccountDetailsEditorModal(!accountDetailsEditorModal);

    const fetchLineItemViewModels = (pageIndex, pageSize, isMounted) => {
        const url = `${API_BASE_URL}/account/${selectedAccountId}/lineItem/?page=${pageIndex}&size=${pageSize}`;
        axios.get(url).then(response => {
            var fetchedLineItems = response.data.content;
            fetchedLineItems.forEach(lineItem => {
                if (lineItem.isCredit) {
                    lineItem.debitAmount = 0;
                    lineItem.creditAmount = lineItem.amount;
                } else {
                    lineItem.creditAmount = 0;
                    lineItem.debitAmount = lineItem.amount;
                }
                lineItem.journalEntryDate = localizeDate(lineItem.journalEntryDate);
            })
            if (isMounted) {
                setLineItemViewModels(fetchedLineItems);
                setTotalPages(response.data.totalPages);
                setTotalElements(response.data.totalElements);
                setPageLength(response.data.numberOfElements);
                setFirst(response.data.first);
                setLast(response.data.last);
            }
        })
            .catch(console.log);

    }


    const fetchAccounts = (isMounted) => {
        let accountTypePrefixes = {
            1: journalEntriesText[appContext.locale]["[A] "],
            2: journalEntriesText[appContext.locale]["[L] "],
            3: journalEntriesText[appContext.locale]["[O] "],
            4: journalEntriesText[appContext.locale]["[I] "],
            5: journalEntriesText[appContext.locale]["[E] "]
        }
        axios.get(`${API_BASE_URL}/organization/${appContext.currentOrganizationId}/account`)
            .then(response => {
                const formattedAccounts = response.data.filter(account => !account.hasChildren).map(account => {
                    return ({
                        value: account.accountId,
                        label: accountTypePrefixes[account.accountTypeId] +
                            (account.accountCode ? account.accountCode + " - " + account.accountName : account.accountName),
                        object: account
                    });
                });
                if (isMounted) {
                    setAccountOptions(formattedAccounts);
                }
            })
            .catch(console.log);
    }

    const fetchData = (pageIndex, pageSize, isMounted) => {
        fetchLineItemViewModels(pageIndex, pageSize, isMounted);
        fetchAccounts(isMounted);
        fetchAccount(isMounted);
        setRefreshToken(Math.random());
    }

    React.useEffect(() => {
        let isMounted = true;
        fetchData(pageIndex, pageSize, isMounted);
        return () => {
            isMounted = false;
        }
    }, [pageIndex, pageSize, selectedAccountId])

    //create a journalEntry
    const handleCreateAJournalEntryButton = () => {
        setEditMode(true);
        toggleJournalEntryModal();
    }

    const handleClickJournalEntry = (journalEntryId) => {
        setCurrentJournalEntryId(journalEntryId);
        toggleJournalEntryModal();
    }
    return (
        <>
            <h1 className="h2 d-flex">
                {selectedAccount.accountCode
                    ? selectedAccount.accountCode + " - " + selectedAccount.accountName
                    : selectedAccount.accountName}
                <Link replace className="icon-link-text-muted ms-3 font-size-larger align-self-center" to="#" onClick={toggleAccountDetailsEditorModal}>
                    <i className="fas fa-edit"></i>
                </Link>
            </h1>
            <AccountDetailsTableTitleBarStandard
                handleCreateAJournalEntryButton={handleCreateAJournalEntryButton}
                selectedAccount={selectedAccount}
            />
            <AccountDetailsTableTitleBarSmallScreen
                handleCreateAJournalEntryButton={handleCreateAJournalEntryButton}
                selectedAccount={selectedAccount}
            />
            <TransactionsTableHeader />
            <div>
                {lineItemViewModels.map(lineItemViewModel => {
                    return (
                        <TransactionViewModelStandard
                            key={lineItemViewModel.journalEntryId}
                            journalEntryDate={lineItemViewModel.journalEntryDate}
                            accountName={lineItemViewModel.accountName}
                            description={lineItemViewModel.description ? lineItemViewModel.description : lineItemViewModel.journalEntryDescription}
                            debitAmount={lineItemViewModel.debitAmount}
                            creditAmount={lineItemViewModel.creditAmount}
                            onClick={() => handleClickJournalEntry(lineItemViewModel.journalEntryId)}
                        />
                    )
                })}
            </div>
            <div>
                {lineItemViewModels.map(lineItemViewModel => {
                    return (
                        <TransactionViewModelSmallSreen
                            key={lineItemViewModel.journalEntryId}
                            journalEntryDate={lineItemViewModel.journalEntryDate}
                            accountName={lineItemViewModel.accountName}
                            description={lineItemViewModel.description ? lineItemViewModel.description : lineItemViewModel.journalEntryDescription}
                            debitAmount={lineItemViewModel.debitAmount}
                            creditAmount={lineItemViewModel.creditAmount}
                            onClick={() => handleClickJournalEntry(lineItemViewModel.journalEntryId)}
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
                isOpen={journalEntryModal}
                editMode={editMode} setEditMode={setEditMode}
                toggle={toggleJournalEntryModal}
                refreshParentComponent={() => fetchData(pageIndex, pageSize, true)}
                currentJournalEntryId={currentJournalEntryId} setCurrentJournalEntryId={setCurrentJournalEntryId}
                accountOptions={accountOptions}
                defaultFromAccountId={selectedAccountId}
                defaultFromAccountName={selectedAccount.accountName}
            />
            <AccountDetailsEditor
                isOpen={accountDetailsEditorModal}
                toggle={toggleAccountDetailsEditorModal}
                selectedAccountId={selectedAccount.accountId}
                fetchData={() => fetchData(pageIndex, pageSize, true)}
                category={category}
            />
        </>
    )
}
export default AccountDetailsTablePersonal;