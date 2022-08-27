import React from 'react';
import { useParams } from 'react-router-dom';
import { PageSettings } from '../../config/page-settings';
import AccountDetailsPageEnterprise from './account-details-page-enterprise';
import AccountDetailsPagePersonal from './account-details-page-personal';

function AccountDetails(props) {
    const appContext = React.useContext(PageSettings);

    //get the selected account ID from URL parameters
    const selectedAccountId = useParams().id;   

    return (
        <>
            {appContext.isEnterprise 
                /**View for Enterprise Edition */
                ? <AccountDetailsPageEnterprise selectedAccountId={selectedAccountId} />
                : /**View for Personal Edition */
                <AccountDetailsPagePersonal selectedAccountId={selectedAccountId} category={false} />
            }
        </>
    )
}




export default AccountDetails