import React from 'react';
import { PageSettings } from '../../config/page-settings';

function ToggleMobileSidebarButton(props) {
    const appContext = React.useContext(PageSettings);

    return ( 
        <div className={props.className? props.className: ""}>
            <button className="btn btn-icon btn-lg" onClick={appContext.toggleMobileSidebar}>
                <i className="fas fa-bars"></i>
            </button>
        </div>
    )

}

export default ToggleMobileSidebarButton;