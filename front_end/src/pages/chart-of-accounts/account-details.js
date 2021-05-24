import React from 'react';
import TableOfJournalEntries from '../journals/enterprise/table-of-journal-entries';
import { API_BASE_URL, DEBIT_ACCOUNT_TYPES } from '../../utils/constants';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { PageSettings } from '../../config/page-settings';
import { accountDetailsText } from '../../utils/i18n/account-details-text.js';
import ToggleMobileSidebarButton from '../../components/sidebar/toggle-mobile-sidebar-button';
import TableOfTransactions from '../journals/personal/table-of-transactions';
import AccountSwitcher from './components/account-switcher';
import { Card, CardBody } from 'reactstrap';
import AccountDetailsEditor from './components/account-details-editor';

function AccountDetails(props) {

    const appContext = React.useContext(PageSettings);

    const columns = appContext.isEnterprise
        ?   [ // accessor is the "key" in the data},
                { header: accountDetailsText[appContext.locale]['Date'], accessor: 'journalEntryDate', className: " col-sm-2" },
                { header: accountDetailsText[appContext.locale]['Description'], accessor: 'description', className: " text-truncate col-sm-6" },
                { header: accountDetailsText[appContext.locale]['Debit'], accessor: 'debitAmount', className: " text-right col-2" },
                { header: accountDetailsText[appContext.locale]['Credit'], accessor: 'creditAmount', className: " text-right col-2" },
            ]
        :   [ // accessor is the "key" in the data},
                { header: accountDetailsText[appContext.locale]['Date'], accessor: 'journalEntryDate', width: "20%" },
                { header: accountDetailsText[appContext.locale]['Description'], accessor: 'description', width: "60%" },
                { header: accountDetailsText[appContext.locale]['Inflow'], accessor: 'debitAmount', width: "10%" },
                { header: accountDetailsText[appContext.locale]['Outflow'], accessor: 'creditAmount', width: "10%" },
            ];

    //get the selected account ID from URL parameters
    const selectedAccountId = useParams().id;

    const [pageSize, setPageSize] = React.useState(10);
    const [pageIndex, setPageIndex] = React.useState(0);
    const [data, setData] = React.useState([]);
    const [totalPages, setTotalPages] = React.useState(0);
    const [totalElements, setTotalElements] = React.useState(0);
    const [pageLength, setPageLength] = React.useState(0);
    const [first, setFirst] = React.useState(true);
    const [last, setLast] = React.useState(true);
    const [loading, setLoading] = React.useState(true);
    const previousPage = () => setPageIndex(pageIndex - 1);
    const nextPage = () => setPageIndex(pageIndex + 1);

    const [accountDetailsEditorModal, setAccountDetailsEditorModal] = React.useState(false);
    const toggleAccountDetailsEditorModal = () => setAccountDetailsEditorModal(!accountDetailsEditorModal);

    const [refreshToken, setRefreshToken] = React.useState(0);
    

    //
    const [selectedAccount, setSelectedAccount] = React.useState(null);
    
    const formatBalance = (debitsMinusCredits, accountTypeId) => {
        if (debitsMinusCredits == 0) {
            return new Intl.NumberFormat(appContext.locale, { style: 'currency', currency: appContext.currency }).format(0);
        }
        if (DEBIT_ACCOUNT_TYPES.includes(accountTypeId)) {
            return new Intl.NumberFormat(appContext.locale, { style: 'currency', currency: appContext.currency }).format(debitsMinusCredits);
        } else {
            return new Intl.NumberFormat(appContext.locale, { style: 'currency', currency: appContext.currency }).format(debitsMinusCredits * -1);
        }
    }

    //initially fetch account data from API
    React.useEffect(() => {
        axios.get(`${API_BASE_URL}/account/${selectedAccountId}`).then(response => {
            let selectedAccount = response.data
            setSelectedAccount(selectedAccount);
        }).catch(console.log);
    }, [])

    const fetchData = React.useCallback(async ( pageIndex, pageSize ) => {
        // This will get called when the table needs new data
        //fetch data from Easy Ledger API
        setLoading(true);
        async function fetchTableData () {
            const url = `${API_BASE_URL}/account/${selectedAccountId}/lineItem/?page=${pageIndex}&size=${pageSize}`;
            await axios.get(url).then(response => {
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
                setTotalPages(response.data.totalPages);
                setTotalElements(response.data.totalElements);
                setPageLength(response.data.numberOfElements);
                setFirst(response.data.first);
                setLast(response.data.last);
            })
                .catch(console.log);
            //also refresh account data    
            await axios.get(`${API_BASE_URL}/account/${selectedAccountId}`).then(response => {
                let account = response.data;
                setSelectedAccount(account);
            }).catch(console.log)    
        }
        await fetchTableData();
        setRefreshToken(Math.random());
        setLoading(false);
    }, [selectedAccountId])

    return (
        <>
            {appContext.isEnterprise ?
                <div className="row">
                    <div className="col-lg-8">
                        <Card className="shadow-sm very-rounded my-3">
                            <CardBody>
                                {selectedAccount 
                                ?   <>
                                        <h1 className="h2 d-flex">
                                            {selectedAccount.accountCode
                                                ? selectedAccount.accountCode + " - " + selectedAccount.accountName
                                                : selectedAccount.accountName}
                                            <Link replace className="icon-link-text-muted ml-3 font-size-larger align-self-center" to="#" onClick={toggleAccountDetailsEditorModal}>
                                                <i className="fa fa-edit"></i>
                                            </Link>
                                        </h1>
                                        <TableOfJournalEntries
                                            tableTitle={ accountDetailsText[appContext.locale]["Balance"] +  ": " + formatBalance(selectedAccount.debitsMinusCredits, selectedAccount.accountTypeId)}
                                            hasAddEntryButton={true}
                                            parentComponentAccountId={selectedAccountId}
                                            fetchData={fetchData}
                                            pageSize={pageSize}
                                            pageIndex={pageIndex}
                                            columns={columns}
                                            data={data}
                                            totalPages={totalPages}
                                            totalElements={totalElements}
                                            pageLength={pageLength}
                                            first={first}
                                            last={last}
                                            loading={loading}
                                            previousPage={previousPage}
                                            nextPage={nextPage}                            
                                        /> 
                                    </>
                                :   <div className="d-flex justify-content-center fa-3x py-3"><i className="fas fa-circle-notch fa-spin"></i></div>}

                            </CardBody>
                        </Card>
                    </div>
                    <div className="col-lg-4 my-3">
                        <div>
                            {appContext.isLoading? <div className="d-flex justify-content-center fa-3x py-3"><i className="fas fa-circle-notch fa-spin"></i></div> :
                            <AccountSwitcher widgetTitle="Switch Accounts" isEnterprise={appContext.isEnterprise} category={false} selectedAccountId={selectedAccountId} externalRefreshToken={refreshToken}/>
                            }
                        </div>
                    </div>

                </div>
                :
                <div className="row">
                    <div className="col-lg-8 my-3">
                        {selectedAccount ? <TableOfTransactions
                            columns={columns}
                            data={data}
                            fetchData={fetchData}
                            tableTitle={accountDetailsText[appContext.locale]["Balance"] + ": " + formatBalance(selectedAccount.debitsMinusCredits, selectedAccount.accountTypeId)}
                            parentComponentAccountId={selectedAccountId}
                            hasAddEntryButton={true}
                            loading={loading}
                        /> : <div className="d-flex justify-content-center fa-3x py-3"><i className="fas fa-circle-notch fa-spin"></i></div>}
                    </div>
                    <div className="col-lg-4 my-3">
                        <div>
                            {appContext.isLoading? <div className="d-flex justify-content-center fa-3x py-3"><i className="fas fa-circle-notch fa-spin"></i></div> :
                            <AccountSwitcher widgetTitle="Switch Accounts" isEnterprise={appContext.isEnterprise} category={false} selectedAccountId={selectedAccountId}/>
                            }
                        </div>
                    </div>

                </div>
            }
            <AccountDetailsEditor isOpen={accountDetailsEditorModal} toggle={toggleAccountDetailsEditorModal} selectedAccountId={selectedAccountId} fetchData={() => fetchData(pageIndex, pageSize)} />

        </>
    )
}




export default AccountDetails