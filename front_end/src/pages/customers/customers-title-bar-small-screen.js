import React from 'react';
import { Tooltip } from 'reactstrap';
import { PageSettings } from '../../config/page-settings';
import { accountDetailsEditorText } from '../../utils/i18n/account-details-editor-text';
import { customersText } from '../../utils/i18n/customers-text';
import { vendorsText } from '../../utils/i18n/vendors-text';

//required props: handleAddButton [func]
function CustomersTitleBarSmallScreen(props) {
    const appContext = React.useContext(PageSettings);
    const [permissionTooltip, setPermissionTooltip] = React.useState(false);
    const togglePermissionTooltip = () => setPermissionTooltip(!permissionTooltip);
    
    return (
        <div>
            <div className="h1">
                {customersText[appContext.locale]["Customers"]}
            </div>
            <div id="small-screen-add-a-customer-button">
                <button 
                    type="button" 
                    className="btn btn-primary btn-lg d-block w-100" 
                    disabled={appContext.currentPermissionTypeId < 2}
                    onClick={props.handleAddButton}
                >
                    {customersText[appContext.locale]["Add a Customer"]}
                </button>
            </div>
            {appContext.currentPermissionTypeId < 2
                ?<Tooltip
                    isOpen={permissionTooltip}
                    toggle={togglePermissionTooltip}
                    fade={false}
                    target="small-screen-add-a-customer-button"
                >
                    {accountDetailsEditorText[appContext.locale]["This action requires EDIT permissions for this ledger."]}
                </Tooltip>
                : null
            }
        
        </div>
    )
}

export default CustomersTitleBarSmallScreen;