import React from 'react';

function CategoryDetailsSidebar ( props ) {
    /*  required props: categoryName, accountId, accountTypeId, debitTotal, creditTotal
            accounts, context
        If spreading an account object from the api into props, you'll need {...category}, accounts, accountTypes, context */
    return (
        <div>
            <div className="row my-3">
                <span className="col-md-6 font-weight-bold">{"Category Name: "}</span>
                <span className="col-md-6"> {props.categoryName} </span> 
            </div> 
            <div className="row my-3">
                <span className="col-md-6 font-weight-bold">{"Account: "}</span>
                <span className="col-md-6">
                    {props.accounts ?
                        props.accounts.slice()
                            .find(account => account.accountId.toString() === props.accountId.toString()).accountName
                        : "Loading..."}
                </span>
            </div>
            <div className="row my-3">
                <span className="col-md-6 font-weight-bold">{"Account Type: "}</span>
                <span className="col-md-6">
                    {props.accountTypes ? 
                        props.accountTypes.slice()
                            .find(accountType => accountType.id.toString() === props.accountTypeId.toString()).name
                    : "Loading..."} 
                </span>
            </div>
            <div className="row my-3">
                <span className="col-md-6 font-weight-bold">{"Total Debits: "}</span>
                <span className="col-md-6">
                     {new Intl.NumberFormat(props.context.localization.locale, { style: 'currency', currency: props.context.localization.currency }).format(props.debitTotal)}
                </span>
            </div> 
            <div className="row my-3">
                <span className="col-md-6 font-weight-bold">{"Total Credits: "}</span>
                <span className="col-md-6">
                     {new Intl.NumberFormat(props.context.localization.locale, { style: 'currency', currency: props.context.localization.currency }).format(props.creditTotal)}
                </span>
            </div>             
            <div className="row my-3">
                <span className="col-md-6 font-weight-bold">{"Total Balance: "}</span>
                <span className="col-md-6">
                     {new Intl.NumberFormat(props.context.localization.locale, { style: 'currency', currency: props.context.localization.currency }).format(props.debitTotal - props.creditTotal)}
                </span>
            </div> 

        </div>
    )
}

export default CategoryDetailsSidebar