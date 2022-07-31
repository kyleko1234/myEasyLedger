import React from 'react';
import { PageSettings } from '../../config/page-settings';
import { customersText } from '../../utils/i18n/customers-text';
import { vendorsText } from '../../utils/i18n/vendors-text';

//required props: customers [list<customer>], handleEditCustomerButton [func]
function CustomersListStandard({customers, handleEditCustomerButton, className}) {
    const appContext = React.useContext(PageSettings);

    return(
        <div className={"mt-2 " + className}>
            <div className="pseudo-thead">
                <div className="pseudo-tr fw-semibold bg-light rounded border d-flex">
                    <div className="d-flex pseudo-td col-3">
                        {customersText[appContext.locale]["Customer Name"]}
                    </div>
                    <div className="d-flex pseudo-td col-3">
                        {vendorsText[appContext.locale]["Contact Name"]}
                    </div>
                    <div className="d-flex pseudo-td col-3">
                        {vendorsText[appContext.locale]["Email"]}
                    </div>
                    <div className="d-flex pseudo-td col-2">
                        {vendorsText[appContext.locale]["Phone Number"]}
                    </div>
                    <div className="d-flex pseudo-td col-1">
                        
                    </div>
                </div>
            </div>
            <div>
                {customers.map(customer => {
                    return (
                        <div key={customer.customerId} className="pseudo-tr d-flex justify-content-between align-items-center">
                            <div className="pseudo-td col-3" >
                                {customer.customerName}
                            </div>
                            <div className="pseudo-td col-3" >
                                {customer.contactName}
                            </div>
                            <div className="pseudo-td col-3" >
                                {customer.email}
                            </div>
                            <div className="pseudo-td col-2" >
                                {customer.phoneNumber}
                            </div>
                            <div className="pseudo-td col-1 py-0 d-flex justify-content-end" >
                                <button className="btn btn-sm btn-white border-0 text-muted" onClick={() => handleEditCustomerButton(customer)}>
                                    <i className="fas fa-edit font-size-compact"></i>
                                </button>                               
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default CustomersListStandard;