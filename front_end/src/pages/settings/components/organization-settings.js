import React from 'react';
import { Card, CardBody, CardTitle } from 'reactstrap';
import { PageSettings } from '../../../config/page-settings';
import { CURRENCY_OPTIONS, CALENDAR_MONTH_OPTIONS } from '../../../utils/constants';
import { settingsText } from '../../../utils/i18n/settings-text';
import Select from 'react-select';

//requiredProps: organizationId
function OrganizationSettings(props) {
    const appContext = React.useContext(PageSettings);
    const currencies = CURRENCY_OPTIONS(appContext.locale);
    const monthOptions = CALENDAR_MONTH_OPTIONS(appContext.locale);
    const permissionObject = appContext.permissions.find(permission => permission.organization.id == props.organizationId);
    const fiscalYearBegin = permissionObject.organization.fiscalYearBegin.split("-");
    const [organizationName, setOrganizationName] = React.useState(permissionObject.organization.name);
    const [fiscalYearBeginMonth, setFiscalYearBeginMonth] = React.useState(fiscalYearBegin[1]);
    const [fiscalYearBeginDay, setFiscalYearBeginDay] = React.useState(fiscalYearBegin[2]);
    const [dateOptions, setDateOptions] = React.useState([]);

    const generateDateOptions = month => {
        let numberOfDays;
        switch(month) {
            case "01":
            case "03":
            case "05":
            case "07":
            case "08":
            case "10":
            case "12":
                numberOfDays = 31;
                break;
            case "02": 
                numberOfDays = 28;
                break;
            default:
                numberOfDays = 30;
        }
        let returnedListOfOptions = []
        for (let i = 1; i <= numberOfDays; i++) {
            returnedListOfOptions.push({
                value: (i < 10? ("0" + i.toString()) : i.toString()),
                label: (i < 10? ("0" + i.toString()) : i.toString())
            })
        }
        return returnedListOfOptions
    }

    React.useEffect(() => {
        setDateOptions(generateDateOptions(fiscalYearBeginMonth));
    }, [fiscalYearBeginMonth])

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
                    <div className="form-group row mx-0 my-2 align-items-center">
                        <label className="col-lg-3 col-form-label my-0 px-0">
                            Currency:
                        </label>
                        <div className="col-md-9 px-0">{currencies.find(currency => currency.value === permissionObject.organization.currency).label}</div>
                    </div>
                    <div className="form-group row mx-0 align-items-center">
                        <label className="col-lg-3 col-form-label my-0 px-0">
                            Fiscal Year Begin Date:
                        </label>
                        <div className="col-md-9 d-flex px-0">
                            <div className="w-50 mr-3">
                                <Select
                                    options={monthOptions}
                                    value={monthOptions.find(option => option.value === fiscalYearBeginMonth)}
                                    onChange={selectedOption => setFiscalYearBeginMonth(selectedOption.value)}
                                />
                            </div>
                            <div className="w-25">
                                <Select
                                    options={dateOptions}
                                    value={dateOptions.find(option => option.value === fiscalYearBeginDay)}
                                    onChange={selectedOption => setFiscalYearBeginDay(selectedOption.value)}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </CardBody>
        </Card>
    )
}

export default OrganizationSettings;