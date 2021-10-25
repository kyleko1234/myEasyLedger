import React from 'react';
import { PageSettings } from '../../config/page-settings';
import {Link, useParams} from 'react-router-dom';
import {accountDetailsText} from '../../utils/i18n/account-details-text.js';
import axios from 'axios';
import {API_BASE_URL} from '../../utils/constants.js';
import TableOfTransactions from '../journals/personal/table-of-transactions.jsx';
import AccountSwitcher from '../chart-of-accounts/components/account-switcher';
import { Card, CardBody } from 'reactstrap';
import AccountDetailsEditor from '../chart-of-accounts/components/account-details-editor';

function CategoryDetails(props) {
    const appContext = React.useContext(PageSettings)

    //for react-table v7 props
    const columns = React.useMemo(
        () => [ // accessor is the "key" in the data},
            { header: accountDetailsText[appContext.locale]['Date'], accessor: 'journalEntryDate', className: " col-3" },
            { header: accountDetailsText[appContext.locale]['Description'], accessor: 'description', className: " col-6 text-truncate" },
            { header: accountDetailsText[appContext.locale]['Amount'], accessor: 'amount', className: " col-3 text-right" },
            { accessor: "blank"}
        ], []
    )
    const [selectedAccount, setSelectedAccount] = React.useState(null);
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


    const refreshAccountData = async () => {
        await axios.get(`${API_BASE_URL}/account/${selectedAccountId}`).then(response => {
            let account = response.data;
            setSelectedAccount(account);
        }).catch(console.log)
    }

    const fetchData = async (pageIndex, pageSize) => {
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
                setTotalPages(response.data.totalPages);
                setTotalElements(response.data.totalElements);
                setPageLength(response.data.numberOfElements);
                setFirst(response.data.first);
                setLast(response.data.last);
            })
                .catch(console.log);
            //also refresh account data    
            await refreshAccountData(); 
        }
        await fetchTableData();
        setRefreshToken(Math.random());
        setLoading(false);
    }



    React.useEffect(() => {
        refreshAccountData();
    }, [])

    return(
        <div className="row">
            <div className="col-lg-8">
                <Card className="shadow-sm very-rounded my-3">
                    <CardBody>
                        {selectedAccount 
                        ?   <>
                                <h1 className="h2 d-flex">
                                    {selectedAccount.accountName}
                                    <Link replace className="icon-link-text-muted ml-3 font-size-larger align-self-center" to="#" onClick={toggleAccountDetailsEditorModal}>
                                        <i className="fas fa-edit"></i>
                                    </Link>
                                </h1>
                                <TableOfTransactions
                                    tableTitle={<div></div>}
                                    hasAddEntryButton={true}
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
                                    category
                                /> 
                            </>
                        : <div className="d-flex justify-content-center fa-3x py-3"><i className="fas fa-circle-notch fa-spin"></i></div>}
                    </CardBody>
                </Card>
            </div>


            <div className="col-lg-4 my-3">
                <div>
                {appContext.isLoading? <div className="d-flex justify-content-center fa-3x py-3"><i className="fas fa-circle-notch fa-spin"></i></div> :                    
                   <AccountSwitcher 
                        widgetTitle="Switch Categories" category={true} selectedAccountId={selectedAccountId}
                    />
                }
                </div>
            </div>
            <AccountDetailsEditor isOpen={accountDetailsEditorModal} toggle={toggleAccountDetailsEditorModal} selectedAccountId={selectedAccountId} fetchData={() => fetchData(pageIndex, pageSize)} />

        </div>
    )
}

export default CategoryDetails;