import React from 'react';

function AccountSubtypeDetailsSidebar( props ) {
    /*  required props: accountSubtypeName, accountSubtypeId, accountTypeName
            accounts
        If spreading an account subtype object from the api into props, you'll need {...accountSubtype}, accounts, context */

    

    return (
        <div>
            <div className="row my-3">
                <span className="col-md-6 font-weight-bold">{"Account Subtype Name: "}</span>
                <span className="col-md-6"> {props.accountSubtypeName} </span> 
            </div> 
            <div className="row my-3">
                <span className="col-md-6 font-weight-bold">{"Account Type: "}</span>
                <span className="col-md-6">
                    {props.accountTypeName}
                </span>
            </div>
            <div className="row my-3">
                <span className="col-md-6 font-weight-bold">{"Accounts: "}</span>
                <span className="col-md-6">
                    {props.accounts ? 
                        <ul>
                            {props.accounts.map(account => <li key={account.accountId}>{account.accountName}</li>)}
                        </ul>
                    : "Loading..."}
                </span>
            </div>
        </div>
    )
}

export default AccountSubtypeDetailsSidebar