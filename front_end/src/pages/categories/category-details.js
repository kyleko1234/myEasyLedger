import React from 'react';
import { PageSettings } from '../../config/page-settings';
import {Link, useParams} from 'react-router-dom';
import ToggleMobileSidebarButton from '../../components/sidebar/toggle-mobile-sidebar-button';
import {accountDetailsText} from '../../utils/i18n/account-details-text.js';
import axios from 'axios';
import {API_BASE_URL} from '../../utils/constants.js';
import TableOfTransactions from '../journals/personal/table-of-transactions.jsx';
import AccountSwitcher from '../chart-of-accounts/components/account-switcher';

function CategoryDetails(props) {
    const appContext = React.useContext(PageSettings)

    //for react-table v7 props
    const columns = React.useMemo(
        () => [ // accessor is the "key" in the data},
            { Header: accountDetailsText[appContext.locale]['Date'], accessor: 'journalEntryDate', width: "25%" },
            { Header: accountDetailsText[appContext.locale]['Description'], accessor: 'description', width: "50%" },
            { Header: accountDetailsText[appContext.locale]['Amount'], accessor: 'amount', width: "25%" },
        ], []
    )
    const [data, setData] = React.useState([])
    const [pageCount, setPageCount] = React.useState(0)
    const [elementCount, setElementCount] = React.useState(0)

    const [selectedAccount, setSelectedAccount] = React.useState(null);
    const [loading, setLoading] = React.useState(true);

    const selectedAccountId = useParams().id;

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
            await axios.get(`${API_BASE_URL}/account/${selectedAccountId}/account`).then(response => {
                let account = response.data;
                setSelectedAccount(account);
            }).catch(console.log)    
        }
        await fetchTableData();
        setLoading(false);
    }, [selectedAccountId])

    const refreshAccountData = () => {
        axios.get(`${API_BASE_URL}/account/${selectedAccountId}`).then(response => {
            let account = response.data;
            setSelectedAccount(account);
        }).catch(console.log)
    }

    React.useEffect(() => {
        refreshAccountData();
    }, [])
    return(
        <>
            <ol className="breadcrumb float-xl-right">
                <li className="breadcrumb-item"><Link to="/">{accountDetailsText[appContext.locale]["Home"]}</Link></li>
                <li className="breadcrumb-item"><Link to="/categories">{accountDetailsText[appContext.locale]["Categories"]}</Link></li>
                <li className="breadcrumb-item active">{accountDetailsText[appContext.locale]["Category Details"]}</li>
            </ol>

            <h1 className="page-header">
                {accountDetailsText[appContext.locale]["Category Details"]}
                <ToggleMobileSidebarButton className="d-md-none float-right " />
            </h1>
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
                        hasAddEntryButton={false}
                        loading={loading}
                        category
                    /> : <div className="d-flex justify-content-center fa-3x py-3"><i className="fas fa-circle-notch fa-spin"></i></div>}
                </div>
                <div className="col-lg-4">
                    <AccountSwitcher 
                        widgetTitle="Switch Categories" category={true} selectedAccountId={selectedAccountId}
                    />
                </div>

            </div>
        </>
    )
}

export default CategoryDetails;