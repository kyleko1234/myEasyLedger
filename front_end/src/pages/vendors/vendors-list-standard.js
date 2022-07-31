import React from 'react';
import { Card, CardBody } from 'reactstrap';
import { PageSettings } from '../../config/page-settings';
import { vendorsText } from '../../utils/i18n/vendors-text';

//required props: vendors [list<vendors>], handleEditVendorButton [func]
function VendorsListStandard({vendors, handleEditVendorButton, className}) {
    const appContext = React.useContext(PageSettings);

    return(
        <div className={"mt-2 " + className}>
            <div className="pseudo-thead">
                <div className="pseudo-tr fw-semibold bg-light rounded border d-flex">
                    <div className="d-flex pseudo-td col-3">
                        {vendorsText[appContext.locale]["Vendor Name"]}
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
                {vendors.map(vendor => {
                    return (
                        <div key={vendor.vendorId} className="pseudo-tr d-flex justify-content-between align-items-center">
                            <div className="pseudo-td col-3" >
                                {vendor.vendorName}
                            </div>
                            <div className="pseudo-td col-3" >
                                {vendor.contactName}
                            </div>
                            <div className="pseudo-td col-3" >
                                {vendor.email}
                            </div>
                            <div className="pseudo-td col-2" >
                                {vendor.phoneNumber}
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
        </div>
    )
}

export default VendorsListStandard;