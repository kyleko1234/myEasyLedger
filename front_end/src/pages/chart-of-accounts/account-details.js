import React from 'react';
import TableOfJournalEntries from '../journals/enterprise/table-of-journal-entries';
import { API_BASE_URL } from '../../utils/constants';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { PageSettings } from '../../config/page-settings';
import { accountDetailsText } from '../../utils/i18n/account-details-text.js';
import ToggleMobileSidebarButton from '../../components/sidebar/toggle-mobile-sidebar-button';
import TableOfTransactions from '../journals/personal/table-of-transactions';
import AccountSwitcher from './components/account-switcher';

function AccountDetails(props) {

    const appContext = React.useContext(PageSettings);

    const columns = React.useMemo(
        () => {
            if (appContext.isEnterprise) {
                return [ // accessor is the "key" in the data},
                    { Header: accountDetailsText[appContext.locale]['Date'], accessor: 'journalEntryDate', width: "20%" },
                    { Header: accountDetailsText[appContext.locale]['Description'], accessor: 'description', width: "60%" },
                    { Header: accountDetailsText[appContext.locale]['Debit'], accessor: 'debitAmount', width: "10%" },
                    { Header: accountDetailsText[appContext.locale]['Credit'], accessor: 'creditAmount', width: "10%" },
                ]
            } else {
                return [ // accessor is the "key" in the data},
                    { Header: accountDetailsText[appContext.locale]['Date'], accessor: 'journalEntryDate', width: "20%" },
                    { Header: accountDetailsText[appContext.locale]['Description'], accessor: 'description', width: "60%" },
                    { Header: accountDetailsText[appContext.locale]['Inflow'], accessor: 'debitAmount', width: "10%" },
                    { Header: accountDetailsText[appContext.locale]['Outflow'], accessor: 'creditAmount', width: "10%" },
                ]
            }

        }
        , []
    )

    //get the selected account ID from URL parameters
    const selectedAccountId = useParams().id;

    // We'll start our table without any data
    const [data, setData] = React.useState([])
    const [pageCount, setPageCount] = React.useState(0)
    const [elementCount, setElementCount] = React.useState(0)

    //
    const [selectedAccount, setSelectedAccount] = React.useState(null);
    const [accountGroupOptions, setAccountGroupOptions] = React.useState(null);
    const [refreshToken, setRefreshToken] = React.useState(0); //set this to a random number when a child component updates to force all child components to update together. Theoretically children components might fail to update if you get two identical random numbers in a row but lmao you're never gonna be able to reproduce this, just refresh
    const [loading, setLoading] = React.useState(true);
    
    //initially fetch account data and list of accountgroups from API
    React.useEffect(() => {
        axios.get(`${API_BASE_URL}/account/${selectedAccountId}/accountBalance`).then(response => {
            let selectedAccount = response.data
            setSelectedAccount(selectedAccount);
        }).catch(console.log);

        axios.get(`${API_BASE_URL}/organization/${appContext.currentOrganizationId}/accountGroup`).then(response => {
            let formattedAccountGroupOptions = response.data.map(accountGroup => ({
                value: accountGroup.accountGroupId,
                label: accountGroup.accountGroupName,
                object: accountGroup
            }))
            setAccountGroupOptions(formattedAccountGroupOptions);
        }).catch(console.log);
    }, [])

    const fetchData = React.useCallback(async ({ pageSize, pageIndex }) => {
        // This will get called when the table needs new data

        //fetch data from Easy Ledger API
        const url = `${API_BASE_URL}/account/${selectedAccountId}/lineItem/?page=${pageIndex}&size=${pageSize}`;
        setLoading(true);
        async function fetchTableData () {
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
                setPageCount(response.data.totalPages);
                setElementCount(response.data.totalElements);
            })
                .catch(console.log);
            //also refresh account data    
            await axios.get(`${API_BASE_URL}/account/${selectedAccountId}/accountBalance`).then(response => {
                let account = response.data;
                setSelectedAccount(account);
            }).catch(console.log)
            await axios.get(`${API_BASE_URL}/organization/${appContext.currentOrganizationId}/accountGroup`).then(response => {
                let formattedAccountGroupOptions = response.data.map(accountGroup => ({
                    value: accountGroup.accountGroupId,
                    label: accountGroup.accountGroupName,
                    object: accountGroup
                }))
                setAccountGroupOptions(formattedAccountGroupOptions);
            }).catch(console.log);
    
        }
        await fetchTableData();
        setLoading(false);
        setRefreshToken(Math.random());
    }, [selectedAccountId])

    return (
        <>
            <ol className="breadcrumb float-xl-right">
                <li className="breadcrumb-item"><Link to="/">{accountDetailsText[appContext.locale]["Home"]}</Link></li>
                {appContext.isEnterprise ? <li className="breadcrumb-item"><Link to="/chart-of-accounts">{accountDetailsText[appContext.locale]["Chart of Accounts"]}</Link></li>
                    : <li className="breadcrumb-item"><Link to="/accounts">{accountDetailsText[appContext.locale]["Accounts"]}</Link></li>}
                <li className="breadcrumb-item active">{accountDetailsText[appContext.locale]["Account Details"]}</li>
            </ol>

            <h1 className="page-header">
                {accountDetailsText[appContext.locale]["Account Details"]}
                <ToggleMobileSidebarButton className="d-md-none float-right " />
            </h1>
            {appContext.isEnterprise ?
                <div className="row">
                    <div className="col-lg-8">
                        {selectedAccount ? <TableOfJournalEntries
                            columns={columns}
                            data={data}
                            fetchData={fetchData}
                            pageCount={pageCount}
                            elementCount={elementCount}
                            tableTitle={selectedAccount.accountName}
                            hasAddEntryButton={false}
                            parentComponentAccountId={selectedAccountId}
                        /> : <div className="d-flex justify-content-center fa-3x py-3"><i className="fas fa-circle-notch fa-spin"></i></div>
                        /* we reuse TableOfJournalEntries component, even though it's more like a TableOfLineItems here */}
                    </div>
                    <div className="col-lg-4">
                        <div>
                            {appContext.isLoading? <div className="d-flex justify-content-center fa-3x py-3"><i className="fas fa-circle-notch fa-spin"></i></div> :
                            <AccountSwitcher widgetTitle="Switch Accounts" isEnterprise={appContext.isEnterprise} category={false} selectedAccountId={selectedAccountId} externalRefreshToken={refreshToken}/>
                            }
                        </div>
                    </div>

                </div>
                :
                <div className="row">
                    <div className="col-lg-8">
                        {selectedAccount ? <TableOfTransactions
                            columns={columns}
                            data={data}
                            fetchData={fetchData}
                            pageCount={pageCount}
                            elementCount={elementCount}
                            tableTitle={selectedAccount.accountName}
                            parentComponentAccountId={selectedAccountId}
                            hasAddEntryButton={true}
                            loading={loading}
                        /> : <div className="d-flex justify-content-center fa-3x py-3"><i className="fas fa-circle-notch fa-spin"></i></div>}
                    </div>
                    <div className="col-lg-4">
                        <div>
                            {appContext.isLoading? <div className="d-flex justify-content-center fa-3x py-3"><i className="fas fa-circle-notch fa-spin"></i></div> :
                            <AccountSwitcher widgetTitle="Switch Accounts" isEnterprise={appContext.isEnterprise} category={false} selectedAccountId={selectedAccountId} externalRefreshToken={refreshToken}/>
                            }
                        </div>
                    </div>

                </div>
            }

        </>
    )
}




export default AccountDetails