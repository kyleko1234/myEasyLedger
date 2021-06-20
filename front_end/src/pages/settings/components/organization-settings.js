import React from 'react';
import { Card, CardBody, CardTitle } from 'reactstrap';
import { PageSettings } from '../../../config/page-settings';
import { CURRENCY_OPTIONS } from '../../../utils/constants';
import { settingsText } from '../../../utils/i18n/settings-text';

//requiredProps: organizationId
function OrganizationSettings(props) {
    const appContext = React.useContext(PageSettings);
    const currencies = CURRENCY_OPTIONS(appContext.locale);
    const permissionObject = appContext.permissions.find(permission => permission.organization.id == props.organizationId);
    const [organizationName, setOrganizationName] = React.useState(permissionObject.organization.name)

    return(
        <Card className="very-rounded shadow-sm mb-3">
            <CardBody>
                <CardTitle className="font-weight-600">
                    {settingsText[appContext.locale]["EasyLedger Settings"]}
                </CardTitle>   
                <div>
                    <div className="form-group row mx-0 my-2 align-items-center">
                        <label className="col-lg-3 col-form-label my-0 px-0">
                            Easyledger Name:
                        </label>
                        <input 
                            className="form-control col-md-9 "
                            disabled={permissionObject.permissionType.id < 3? true : false}
                            type="text" value={organizationName} 
                            onChange={event => setOrganizationName(event.target.value)}
                        />
                    </div>
                    <div className="form-group row mx-0 align-items-center">
                        <label className="col-lg-3 col-form-label my-0 px-0">
                            Currency:
                        </label>
                        <div className="col-md-9 px-0">{currencies.find(currency => currency.value === permissionObject.organization.currency).label}</div>
                    </div>

                </div>
                <button onClick={() => console.log(permissionObject)}>TEST</button>
            </CardBody>
        </Card>
    )
}

export default OrganizationSettings;