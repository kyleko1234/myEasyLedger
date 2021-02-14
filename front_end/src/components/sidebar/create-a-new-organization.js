import React from 'react';
import {Link} from 'react-router-dom';
import ToggleMobileSidebarButton from './toggle-mobile-sidebar-button';
import {sidebarText} from '../../utils/i18n/sidebar-text';
import { PageSettings } from '../../config/page-settings';
import NewOrganizationForm from './new-organization-form';

function CreateANewOrganization(props) {
    const appContext = React.useContext(PageSettings);
    return(
        <div>
            <ol className="breadcrumb float-xl-right">
                <li className="breadcrumb-item"><Link to="/">{sidebarText[appContext.locale]["Home"]}</Link></li>
                <li className="breadcrumb-item active">{sidebarText[appContext.locale]["Create a New EasyLedger"]}</li>
            </ol>
            <h1 className="page-header">
                {sidebarText[appContext.locale]["Create a New EasyLedger"]}
                <ToggleMobileSidebarButton className="d-md-none float-right " />
            </h1>
            <NewOrganizationForm/>
        </div>
    )
}

export default CreateANewOrganization;