import React from 'react';
import { Tooltip } from 'reactstrap';
import { PageSettings } from '../../config/page-settings';

//required props: handleAddButton [func]
function VendorsTitleBarSmallScreen(props) {
    const appContext = React.useContext(PageSettings);
    const [permissionTooltip, setPermissionTooltip] = React.useState(false);
    const togglePermissionTooltip = () => setPermissionTooltip(!permissionTooltip);

    return(
        <div>
            <div className="h1">
                Vendors
            </div>
            <div id="small-screen-add-a-vendor-button">
                <button 
                    type="button" 
                    className="btn btn-primary btn-lg d-block w-100" 
                    disabled={appContext.currentPermissionTypeId < 2}
                    onClick={props.handleAddButton}
                >
                    Add a Vendor
                </button>
            </div>
            {appContext.currentPermissionTypeId < 2
                ?<Tooltip
                    isOpen={permissionTooltip}
                    toggle={togglePermissionTooltip}
                    fade={false}
                    target="small-screen-add-a-vendor-button"
                >
                    This action requires EDIT permissions for this EasyLedger.
                </Tooltip>
                : null
            }
        
        </div>
    )
}

export default VendorsTitleBarSmallScreen;