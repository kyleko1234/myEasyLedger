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
import { Form, Input, InputGroup, InputGroupText } from 'reactstrap';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import SearchBar from '../../../components/misc/search-bar';
import JournalEntryViewModel from './journal-entry-view-model';

function JournalEntriesPage(props) {
    const appContext = React.useContext(PageSettings);

    //page data
    const [journalEntryViewModels, setJournalEntryViewModels] = React.useState([]);
    const [vendorOptions, setVendorOptions] = React.useState([]);
    const [customerOptions, setCustomerOptions] = React.useState([]);
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
    const [journalEntryModal, setJournalEntryModal] = React.useState(false);
    const toggleJournalEntryModal = () => setJournalEntryModal(!journalEntryModal);
    const [currentJournalEntryId, setCurrentJournalEntryId] = React.useState(0);
    const [editMode, setEditMode] = React.useState(false);

    //functions to fetch data from API
    const fetchJournalEntryData = () => {
        let requestBody = {
            query: searchQuery
        }
        axios.post(`${API_BASE_URL}/organization/${appContext.currentOrganizationId}/journalEntryViewModel?page=${pageIndex}&size=${pageSize}`, requestBody)
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

    const fetchData = () => {
        fetchJournalEntryData();
        fetchVendors();
        fetchCustomers();
        fetchAccounts();
    }

    //Fetch data on page load and when pageIndex and pageSize are updated, or when a search is submitted
    React.useEffect(() => {
        fetchData();
    }, [pageIndex, pageSize, searchQuery])

    //create a journalEntry
    const handleCreateAJournalEntryButton = () => {
        setEditMode(true);
        toggleJournalEntryModal();
    }

    const handleClickJournalEntry = (journalEntryId) => {
        setCurrentJournalEntryId(journalEntryId);
        toggleJournalEntryModal();
    }

    const handleSearchSubmit = (event) => {
        event.preventDefault();
        setSearchQuery(searchBarInput);
    }

    const clearSearch = () => {
        setSearchBarInput("");
        setSearchQuery("");
    }

    return (
        <>
            <JournalEntryTitleBarStandard
                handleCreateAJournalEntryButton={handleCreateAJournalEntryButton}
            />
            <JournalEntryTitleBarSmallScreen
                handleCreateAJournalEntryButton={handleCreateAJournalEntryButton}
            />
            <SearchBar
                handleSearchSubmit={handleSearchSubmit}
                inputValue={searchBarInput}
                clearSearch={clearSearch}
                onChange={event => setSearchBarInput(event.target.value)}
            />
            <JournalEntryTableHeader />
            <div>
                {journalEntryViewModels.map(journalEntryViewModel => {
                    return (
                        <JournalEntryViewModel
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
                editMode={editMode} setEditMode={setEditMode}
                toggle={toggleJournalEntryModal}
                refreshParentComponent={() => fetchData()}
                currentJournalEntryId={currentJournalEntryId} setCurrentJournalEntryId={setCurrentJournalEntryId}
                accountOptions={accountOptions}
                vendorOptions={vendorOptions}
                customerOptions={customerOptions}
            />
        </>
    )
}

export default JournalEntriesPage;