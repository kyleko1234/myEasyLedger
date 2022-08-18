import axios from 'axios';
import React from 'react';
import { PageSettings } from '../../../config/page-settings';
import { API_BASE_URL } from '../../../utils/constants';
import { journalEntriesText } from '../../../utils/i18n/journal-entries-text';
import { localizeDate } from '../../../utils/util-fns';
import JournalEntryModal from './journal-entry-modal';
import JournalEntryTableFooter from './journal-entry-table-footer';
import JournalEntryTableHeader from './journal-entry-table-header';
import JournalEntryTitleBarSmallScreen from './journal-entry-title-bar-small-screen';
import JournalEntryTitleBarStandard from './journal-entry-title-bar-standard';
import JournalEntryViewModelSmallScreen from './journal-entry-view-model-small-screen';
import JournalEntryViewModelStandard from './journal-entry-view-model-standard';

function JournalEntriesPage(props) {
    const appContext = React.useContext(PageSettings);

    //page data
    const [journalEntryViewModels, setJournalEntryViewModels] = React.useState([]);
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


    //modal control
    const [journalEntryModal, setJournalEntryModal] = React.useState(false);
    const toggleJournalEntryModal = () => setJournalEntryModal(!journalEntryModal);
    const [currentJournalEntryId, setCurrentJournalEntryId] = React.useState(0);


    //functions to fetch data from API
    const fetchJournalEntryData = (pageIndex, pageSize) => {
        axios.get(`${API_BASE_URL}/organization/${appContext.currentOrganizationId}/journalEntryViewModel?page=${pageIndex}&size=${pageSize}`)
            .then(response => {
                response.data.content.forEach(journalEntry => {
                    journalEntry.journalEntryDate = localizeDate(journalEntry.journalEntryDate);
                })
                setJournalEntryViewModels(response.data.content);
                setTotalPages(response.data.totalPages);
                setTotalElements(response.data.totalElements);
                setPageLength(response.data.numberOfElements);
                setFirst(response.data.first);
                setLast(response.data.last);
            })
            .catch(console.log);
    }

    const fetchVendors = () => {
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
                setVendorOptions(formattedVendorOptions);
            })
            .catch(console.log);
    }

    const fetchCustomers = () => {
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
                setCustomerOptions(formattedCustomerOptions);
            })
            .catch(console.log);
    }

    const fetchAccounts = () => {
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
                setAccountOptions(formattedAccounts);
            })
            .catch(console.log);
    }

    const fetchData = (pageIndex, pageSize) => {
        fetchJournalEntryData(pageIndex, pageSize);
        fetchVendors();
        fetchCustomers();
        fetchAccounts();
    }

    //Fetch data on page load and when pageIndex and pageSize are updated
    React.useEffect(() => {
        fetchData(pageIndex, pageSize);
    }, [pageIndex, pageSize])

    //create a journalEntry
    const handleCreateAJournalEntryButton = () => {
        //TODO
    }

    const handleClickJournalEntry = (journalEntryId) => {
        setCurrentJournalEntryId(journalEntryId);
        toggleJournalEntryModal();
    }

    return (
        <>
            <JournalEntryTitleBarStandard
                handleCreateAJournalEntryButton={handleCreateAJournalEntryButton}
            />
            <JournalEntryTitleBarSmallScreen
                handleCreateAJournalEntryButton={handleCreateAJournalEntryButton}
            />
            <JournalEntryTableHeader />
            <div>
                {journalEntryViewModels.map(journalEntryViewModel => {
                    return (
                        <JournalEntryViewModelStandard
                            key={journalEntryViewModel.journalEntryId}
                            journalEntryDate={journalEntryViewModel.journalEntryDate}
                            description={journalEntryViewModel.description}
                            debitAmount={journalEntryViewModel.debitAmount}
                            creditAmount={journalEntryViewModel.creditAmount}
                            onClick={() => handleClickJournalEntry(journalEntryViewModel.journalEntryId)}
                        />
                    )
                })}

            </div>
            <div>
                {journalEntryViewModels.map(journalEntryViewModel => {
                    return (
                        <JournalEntryViewModelSmallScreen
                            key={journalEntryViewModel.journalEntryId}
                            journalEntryDate={journalEntryViewModel.journalEntryDate}
                            description={journalEntryViewModel.description}
                            debitAmount={journalEntryViewModel.debitAmount}
                            creditAmount={journalEntryViewModel.creditAmount}
                            onClick={() => handleClickJournalEntry(journalEntryViewModel.journalEntryId)}
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
                toggle={toggleJournalEntryModal}
                refreshParentComponent={() => fetchData(pageIndex, pageSize)}
                currentJournalEntryId={currentJournalEntryId}
                accountOptions={accountOptions}
                vendorOptions={vendorOptions}
                customerOptions={customerOptions}
            />
        </>
    )
}

export default JournalEntriesPage;