import React from 'react';
import { Card, CardBody } from 'reactstrap';

//required props: vendors [list<vendors>], handleEditVendorButton [func]
function VendorsListStandard({vendors, handleEditVendorButton, className}) {
    return(
        <Card className={"mt-4 very-rounded shadow-sm " + className}>
            <CardBody>
                <div className="d-flex font-size-compact fw-bold">
                    <div className="d-flex pseudo-td py-0 col-4">
                        Vendor Name
                    </div>
                    <div className="d-flex pseudo-td py-0 col-3">
                        Contact Name
                    </div>
                    <div className="d-flex pseudo-td py-0 col-4">
                        Email
                    </div>
                    <div className="d-flex pseudo-td py-0 col-1">
                        
                    </div>
                </div>
                <div>
                {vendors.map(vendor => {
                    return (
                        <div key={vendor.vendorId} className="pseudo-tr d-flex justify-content-between align-items-center">
                            <div className="pseudo-td col-4" >
                                {vendor.vendorName}
                            </div>
                            <div className="pseudo-td col-3" >
                                {vendor.contactName}
                            </div>
                            <div className="pseudo-td col-4" >
                                {vendor.email}
                            </div>
                            <div className="pseudo-td col-1 py-0 d-flex justify-content-end" >
                                <button className="btn btn-sm btn-white border-0 text-muted" onClick={() => handleEditVendorButton(vendor)}>
                                    <i className="fas fa-edit font-size-compact"></i>
                                </button>                               
                            </div>
                        </div>
                    )
                })}
                </div>
            </CardBody>
        </Card>
    )
}

export default VendorsListStandard;