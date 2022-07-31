import React from 'react';

//required props: customers [list<customer>], handleEditCustomerButton [func]
function CustomersListSmallScreen({customers, handleEditCustomerButton, className}) {

    return(
        <div className={"mt-2 " + className}>
            {customers.map(customer => {
                return (
                    <div key={customer.customerId} className="pseudo-tr d-flex justify-content-between align-items-center">
                        <div className="pseudo-td " >
                            <div className="fw-semibold">
                                {customer.customerName}
                            </div>
                            <div className="font-size-compact">
                                {customer.phoneNumber}
                            </div>
                            <div className="font-size-compact fw-light">
                                <em>
                                    {customer.contactName + (customer.contactName && customer.email ? " - " : "") + customer.email}
                                </em>
                            </div>
                        </div>
                        <div className="pseudo-td py-0" >
                            <button className="btn btn-sm btn-white border-0 text-muted" onClick={() => handleEditCustomerButton(customer)}>
                                <i className="fas fa-edit font-size-compact"></i>
                            </button>                               
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default CustomersListSmallScreen;