import React from 'react';
import {useParams} from 'react-router-dom';
import AccountDetailsPagePersonal from '../chart-of-accounts/account-details-page-personal';

function CategoryDetails(props) {
    const selectedAccountId = useParams().id;

    return(
        <AccountDetailsPagePersonal selectedAccountId={selectedAccountId} category={true} />
    )
}

export default CategoryDetails;