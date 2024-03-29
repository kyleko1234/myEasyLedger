import axios from 'axios';
import React from 'react';
import { Card, CardBody } from 'reactstrap';
import LoadingSpinner from '../../components/misc/loading-spinner';
import { PageSettings } from '../../config/page-settings';
import { API_BASE_URL } from '../../utils/constants';
import AccountDetailsTableEnterprise from './components/account-details-table-enterprise';
import AccountSwitcher from './components/account-switcher';

function AccountDetailsPageEnterprise({ selectedAccountId }) {
    const appContext = React.useContext(PageSettings);
    const [selectedAccount, setSelectedAccount] = React.useState(null);
    const [refreshToken, setRefreshToken] = React.useState(0);

    const fetchAccount = (isMounted) => {
        axios.get(`${API_BASE_URL}/account/${selectedAccountId}`).then(response => {
            let selectedAccount = response.data
            if (isMounted){
                setSelectedAccount(selectedAccount);
            }
        }).catch(console.log);
    }
    React.useEffect(() => {
        let isMounted = true;
        fetchAccount(isMounted);
        return () => {
            isMounted = false;
        }
    }, [selectedAccountId])
    
    return (
        <>
            <div className="row">
                <div className="col-lg-8">
                    <Card className="shadow-sm very-rounded my-3">
                        <CardBody>
                            {selectedAccount
                                ? <AccountDetailsTableEnterprise
                                    selectedAccount={selectedAccount}
                                    selectedAccountId={selectedAccountId}
                                    refreshToken={refreshToken} setRefreshToken={setRefreshToken}
                                    fetchAccount={fetchAccount}
                                />
                                : <LoadingSpinner big />
                            }
                        </CardBody>
                    </Card>
                </div>
                <div className="col-lg-4 my-3">
                    <div>
                        {appContext.isLoading
                            ? <LoadingSpinner big />
                            : <AccountSwitcher
                                widgetTitle="Switch Accounts"
                                isEnterprise={appContext.isEnterprise}
                                category={false}
                                selectedAccountId={selectedAccountId}
                                externalRefreshToken={refreshToken}
                            />
                        }
                    </div>
                </div>
            </div>

        </>
    )
}
export default AccountDetailsPageEnterprise;