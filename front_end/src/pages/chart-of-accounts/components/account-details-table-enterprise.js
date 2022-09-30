import axios from 'axios';
import React from 'react';
import { Link } from 'react-router-dom';
import { PageSettings } from '../../../config/page-settings';
import { API_BASE_URL } from '../../../utils/constants';
import { journalEntriesText } from '../../../utils/i18n/journal-entries-text';
import { localizeDate } from '../../../utils/util-fns';
import JournalEntryModal from '../../journal-entries/enterprise/journal-entry-modal';
import JournalEntryTableFooter from '../../journal-entries/enterprise/journal-entry-table-footer';
import JournalEntryTableHeader from '../../journal-entries/enterprise/journal-entry-table-header';
import JournalEntryViewModelSmallScreen from '../../journal-entries/enterprise/journal-entry-view-model-small-screen';
import JournalEntryViewModelStandard from '../../journal-entries/enterprise/journal-entry-view-model-standard';
import AccountDetailsEditor from './account-details-editor';
import AccountDetailsTableTitleBarSmallScreen from './account-details-table-title-bar-small-screen';
import AccountDetailsTableTitleBarStandard from './account-details-table-title-bar-standard';

//using selectedAccountId for react effect update dependencies is noticeably faster than using selectedAccount
function AccountDetailsTableEnterprise({ selectedAccount, selectedAccountId, setRefreshToken, fetchAccount }) {
    const appContext = React.useContext(PageSettings);

    //page data
    const [lineItemViewModels, setLineItemViewModels] = React.useState([]);
    const [vendorOptions, setVendorOptions] = React.useState([]);
    const [customerOptions, setCustomerOptions] = React.useState([]);
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

    const fetchVendors = (isMounted) => {
        axios.get(`${API_BASE_URL}/organization/${appContext.currentOrganizationId}/vendor`)
            .then(response => {
                let formattedVendorOptions = response.data.map(vendor => {
                    return ({
                        value: vendor.vendorId,
                        label: vendor.vendorName,
                        object: vendor
                    });
                });
                formattedVendorOptions.unshift({
                    value: null,
                    label: journalEntriesText[appContext.locale]["None"],
                    object: {
                        vendorId: null
                    }
                })
                if (isMounted) {
                    setVendorOptions(formattedVendorOptions);
                }
            })
            .catch(console.log);
    }

    const fetchCustomers = (isMounted) => {
        axios.get(`${API_BASE_URL}/organization/${appContext.currentOrganizationId}/customer`)
            .then(response => {
                let formattedCustomerOptions = response.data.map(customer => {
                    return ({
                        value: customer.customerId,
                        label: customer.customerName,
                        object: customer
                    });
                });
                formattedCustomerOptions.unshift({
                    value: null,
                    label: journalEntriesText[appContext.locale]["None"],
                    object: {
                        customerId: null
                    }
                })
                if (isMounted) {
                    setCustomerOptions(formattedCustomerOptions);
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
        fetchVendors(isMounted);
        fetchCustomers(isMounted);
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
            <JournalEntryTableHeader />
            <div>
                {lineItemViewModels.map((lineItemViewModel, i) => {
                    return (
                        <JournalEntryViewModelStandard
                            key={i}
                            journalEntryDate={lineItemViewModel.journalEntryDate}
                            description={
                                <>
                                    <div className={"text-truncate " + (lineItemViewModel.description ? " font-size-compact" : "")}>
                                        {lineItemViewModel.journalEntryDescription}
                                    </div>
                                    <div className="font-size-compact fw-light">
                                        <em>{lineItemViewModel.description}</em>
                                    </div>
                                </>
                            }
                            debitAmount={lineItemViewModel.debitAmount}
                            creditAmount={lineItemViewModel.creditAmount}
                            onClick={() => handleClickJournalEntry(lineItemViewModel.journalEntryId)}
                        />
                    )
                })}
            </div>
            <div>
                {lineItemViewModels.map((lineItemViewModel, i) => {
                    return (
                        <JournalEntryViewModelSmallScreen
                            key={i}
                            journalEntryDate={lineItemViewModel.journalEntryDate}
                            description={
                                <>
                                    <div className={lineItemViewModel.description? "font-size-compact" : ""}>
                                        {lineItemViewModel.journalEntryDescription}
                                    </div>
                                    <div className="font-size-compact fw-light">
                                        <em>{lineItemViewModel.description}</em>
                                    </div>
                                </>
                            }
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
            <JournalEntryModal
                isOpen={journalEntryModal}
                editMode={editMode} setEditMode={setEditMode}
                toggle={toggleJournalEntryModal}
                refreshParentComponent={() => fetchData(pageIndex, pageSize, true)}
                currentJournalEntryId={currentJournalEntryId} setCurrentJournalEntryId={setCurrentJournalEntryId}
                accountOptions={accountOptions}
                vendorOptions={vendorOptions}
                customerOptions={customerOptions}
            />
            <AccountDetailsEditor
                isOpen={accountDetailsEditorModal}
                toggle={toggleAccountDetailsEditorModal}
                selectedAccountId={selectedAccount.accountId}
                fetchData={() => fetchData(pageIndex, pageSize, true)}
            />
        </>
    )
}
export default AccountDetailsTableEnterprise;