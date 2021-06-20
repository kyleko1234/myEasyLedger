import React from 'react';
import OrganizationRoster from './components/organization-roster';
import {settingsText} from '../../utils/i18n/settings-text';
import { PageSettings } from '../../config/page-settings';
import OrganizationSettings from './components/organization-settings';

function ManageEasyLedger(props) {
    const appContext = React.useContext(PageSettings);
    return(
        <div>
            <h1 className="page-header">
                {appContext.permissions.find(permission => permission.organization.id == props.match.params.organizationId).organization.name + " " + settingsText[appContext.locale]["Settings"]}
            </h1>
            <OrganizationSettings organizationId={props.match.params.organizationId} />
            <OrganizationRoster organizationId={props.match.params.organizationId}/>
        </div>
    )
}

export default ManageEasyLedger;