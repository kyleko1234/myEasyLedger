import React from 'react';

function AccountDetailsSidebarView( props ) {
    /*  required props: accountName, accountSubtypeId,
            accountSubtypes, accountTypes, context
        If spreading an account object from the api into props, you'll need {...account}, accountSubtypes, accountTypes */

    

    return (
        <div>
            <p> <strong>{"Account Name: "}</strong> {props.accountName} </p> 
            <p> 
                <strong>{"Account Subtype: "}</strong>
                {props.accountSubtypes ? 
                    props.accountSubtypes.slice()
                        .find(accountSubtype => accountSubtype.accountSubtypeId.toString() === props.accountSubtypeId.toString()).accountSubtypeName
                : "Loading..."} 
            </p>
            <p> 
                <strong>{"Account Type: "}</strong>
                {props.accountTypes ? 
                    props.accountTypes.slice()
                        .find(accountType => accountType.id.toString() === props.accountTypeId.toString()).name
                : "Loading..."} 
            </p>
            <p> <strong>{"Total Debits: "}</strong> {new Intl.NumberFormat(props.context.localization.locale, { style: 'currency', currency: props.context.localization.currency }).format(props.debitTotal)} </p> 
            <p> <strong>{"Total Credits: "}</strong> {new Intl.NumberFormat(props.context.localization.locale, { style: 'currency', currency: props.context.localization.currency }).format(props.creditTotal)} </p> 
            <p> <strong>{"Balance: "}</strong> {new Intl.NumberFormat(props.context.localization.locale, { style: 'currency', currency: props.context.localization.currency }).format(props.debitTotal - props.creditTotal)} </p> 


        </div>
    )
}

export default AccountDetailsSidebarView