import React from 'react';
import { Tooltip } from 'reactstrap';
import { PageSettings } from '../../config/page-settings';

//required props: handleAddButton [func]
function VendorsTitleBarStandard(props) {
    const appContext = React.useContext(PageSettings);
    const [permissionTooltip, setPermissionTooltip] = React.useState(false);
    const togglePermissionTooltip = () => setPermissionTooltip(!permissionTooltip);


    return(
        <div className="d-flex justify-content-between align-items-center">
            <div className="h1">
                Vendors
            </div>
            <div id="add-a-vendor-button">
                <button 
                    type="button" 
                    className="btn btn-primary" 
                    disabled={appContext.currentPermissionTypeId < 2}
                    onClick={props.handleAddButton}
                >
                    Add a Vendor
                </button>
            </div>
            {appContext.currentPermissionTypeId < 2
                ? <Tooltip
                    isOpen={permissionTooltip}
                    toggle={togglePermissionTooltip}
                    fade={false}
                    target="add-a-vendor-button"
                    placement="left"
                >
                    This action requires EDIT permissions for this EasyLedger.
                </Tooltip>
                : null
            }
        </div>
    )
}

export default VendorsTitleBarStandard;