import React from 'react';
import { Card, CardBody } from 'reactstrap';

//required props: vendors [list<vendors>], handleEditVendorButton [func]
function VendorsListSmallScreen({vendors, handleEditVendorButton, className}) {

    return(
        <div className={"mt-2 " + className}>
            {vendors.map(vendor => {
                return (
                    <div key={vendor.vendorId} className="pseudo-tr d-flex justify-content-between align-items-center">
                        <div className="pseudo-td " >
                            <div className="fw-semibold">
                                {vendor.vendorName}
                            </div>
                            <div className="font-size-compact">
                                {vendor.phoneNumber}
                            </div>
                            <div className="font-size-compact fw-light">
                                <em>
                                    {vendor.contactName + (vendor.contactName && vendor.email ? " - " : "") + vendor.email}
                                </em>
                            </div>
                        </div>
                        <div className="pseudo-td py-0" >
                            <button className="btn btn-sm btn-white border-0 text-muted" onClick={() => handleEditVendorButton(vendor)}>
                                <i className="fas fa-edit font-size-compact"></i>
                            </button>                               
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default VendorsListSmallScreen;