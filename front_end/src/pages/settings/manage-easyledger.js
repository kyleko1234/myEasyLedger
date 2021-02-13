import React from 'react';
import OrganizationRoster from './components/organization-roster';
import {Link} from 'react-router-dom';
import ToggleMobileSidebarButton from '../../components/sidebar/toggle-mobile-sidebar-button';
import {settingsText} from '../../utils/i18n/settings-text';
import { PageSettings } from '../../config/page-settings';

function ManageEasyLedger(props) {
    const appContext = React.useContext(PageSettings);
    return(
        <div>
            <ol className="breadcrumb float-xl-right">
                <li className="breadcrumb-item"><Link to="/">{settingsText[appContext.locale]["Home"]}</Link></li>
                <li className="breadcrumb-item"><Link to="/">{settingsText[appContext.locale]["Settings"]}</Link></li>
                <li className="breadcrumb-item active">{appContext.permissions.find(permission => permission.organization.id = props.match.params.organizationId).organization.name + " " + settingsText[appContext.locale]["Settings"]}</li>
            </ol>
            <h1 className="page-header">
                {appContext.permissions.find(permission => permission.organization.id = props.match.params.organizationId).organization.name + " " + settingsText[appContext.locale]["Settings"]}
                <ToggleMobileSidebarButton className="d-md-none float-right " />
            </h1>
            <OrganizationRoster organizationId={props.match.params.organizationId}/>
        </div>
    )
}

export default ManageEasyLedger;