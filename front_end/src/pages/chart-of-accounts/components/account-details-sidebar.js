import React from 'react';
import { PageSettings } from '../../../config/page-settings';

function AccountDetailsSidebar( props ) {
    /*  required props: accountName, accountSubtypeId, accountTypeId
            hasCategories, categories, accountSubtypes, accountTypes
        If spreading an account object from the api into props, you'll need {...account}, accountSubtypes, accountTypes, context */
    
    const appContext = React.useContext(PageSettings);

    return (
        <div>
            <div className="row my-3">
                <span className="col-md-6 font-weight-bold">{"Account Name: "}</span>
                <span className="col-md-6"> {props.accountName} </span> 
            </div> 
            {props.hasCategories? null : 
                <div className="row my-3">
                    <span className="col-md-6 font-weight-bold">{"Account Subtype: "}</span>
                    <span className="col-md-6">
                        {props.accountSubtypes ? 
                            props.accountSubtypes.slice()
                                .find(accountSubtype => accountSubtype.accountSubtypeId.toString() === props.accountSubtypeId.toString()).accountSubtypeName
                        : "Loading..."} 
                    </span>
                </div>
            }
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
                     {new Intl.NumberFormat(appContext.locale, { style: 'currency', currency: appContext.currency }).format(props.debitTotal)}
                </span>
            </div> 
            <div className="row my-3">
                <span className="col-md-6 font-weight-bold">{"Total Credits: "}</span>
                <span className="col-md-6">
                     {new Intl.NumberFormat(appContext.locale, { style: 'currency', currency: appContext.currency }).format(props.creditTotal)}
                </span>
            </div>             
            <div className="row my-3">
                <span className="col-md-6 font-weight-bold">{"Total Balance: "}</span>
                <span className="col-md-6">
                     {new Intl.NumberFormat(appContext.locale, { style: 'currency', currency: appContext.currency }).format(props.debitTotal - props.creditTotal)}
                </span>
            </div> 
            {props.hasCategories ? 
                (props.categories ?                 
                    <div className="row my-3">
                        <span className="col-md-6 font-weight-bold">{"Categories: "}</span>
                        <span className="col-md-6">
                            <ul>
                                {props.categories.map(category => {
                                    return (
                                        <li key={category.categoryId}>{category.categoryName}</li>
                                    )
                                })}
                            </ul>
                        </span>
                    </div> 
                : null)
            : null}

        </div>
    )
}

export default AccountDetailsSidebar