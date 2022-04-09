import React from 'react';
import { Card, CardBody, CardTitle, Alert} from 'reactstrap';
import { PageSettings } from '../../../config/page-settings';
import { CURRENCY_OPTIONS, CALENDAR_MONTH_OPTIONS, API_BASE_URL } from '../../../utils/constants';
import { settingsText } from '../../../utils/i18n/settings-text';
import Select from 'react-select';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import SweetAlert from 'react-bootstrap-sweetalert';
import { validateDate } from '../../../utils/util-fns';

//requiredProps: organizationId
function OrganizationSettings(props) {
    const appContext = React.useContext(PageSettings);
    const currencies = CURRENCY_OPTIONS(appContext.locale);
    const monthOptions = CALENDAR_MONTH_OPTIONS(appContext.locale);
    const history = useHistory();
    const permissionObject = appContext.permissions.find(permission => permission.organization.id == props.organizationId);
    const fiscalYearBegin = permissionObject.organization.fiscalYearBegin.split("-");
    const [organizationName, setOrganizationName] = React.useState(permissionObject.organization.name);
    const [fiscalYearBeginMonth, setFiscalYearBeginMonth] = React.useState(fiscalYearBegin[1]);
    const [fiscalYearBeginDay, setFiscalYearBeginDay] = React.useState(fiscalYearBegin[2]);
    const [lockInitialAccountValues, setLockInitialAccountValues] = React.useState(permissionObject.organization.lockInitialAccountValues);
    const toggleLockInitialAccountValues = () => {
        setLockInitialAccountValues(!lockInitialAccountValues);
    }
    const [lockJournalEntriesBefore, setLockJournalEntriesBefore] = React.useState(permissionObject.organization.lockJournalEntriesBefore);

    const [dateOptions, setDateOptions] = React.useState([]);
    const [savedAlert, setSavedAlert] = React.useState(false);
    const [errorAlert, setErrorAlert] = React.useState(false);
    const [invalidDateAlert, setInvalidDateAlert] = React.useState(false);

    const [loading, setLoading] = React.useState(false);

    const [confirmDeleteOrganizationAlert, setConfirmDeleteOrganizationAlert] = React.useState(false);
    const [cannotDeleteOrganizationAlert, setCannotDeleteOrganizationAlert] = React.useState(false);
    const toggleConfirmDeleteOrganizationAlert = () => setConfirmDeleteOrganizationAlert(!confirmDeleteOrganizationAlert);
    const toggleCannotDeleteOrganizationAlert = () => setCannotDeleteOrganizationAlert(!cannotDeleteOrganizationAlert);
    
    const handleDeleteOrganizationButton = () => {
        setConfirmDeleteOrganizationAlert(true);
    }
    const handleConfirmDeleteOrganizationButton = async () => {
        setLoading(true);
        setConfirmDeleteOrganizationAlert(false);
        axios.delete(`${API_BASE_URL}/organization/${props.organizationId}`).then(async (response) => {
            setLoading(false);
            await appContext.checkForAuthentication();
            history.push('/');
        }).catch(() => {
            setLoading(false);
            toggleCannotDeleteOrganizationAlert();
        })
    }

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

    const saveSettings = () => {
        setSavedAlert(false);
        setErrorAlert(false);
        setInvalidDateAlert(false);
        if (!validateDate(lockJournalEntriesBefore)) {
            setInvalidDateAlert(true);
            return;
        }
        let requestBody = {
            id: props.organizationId,
            name: organizationName,
            fiscalYearBegin: "2020-" + fiscalYearBeginMonth + "-" + fiscalYearBeginDay,
            lockInitialAccountValues: lockInitialAccountValues,
            lockJournalEntriesBefore: lockJournalEntriesBefore
        }
        axios.put(`${API_BASE_URL}/organization/${props.organizationId}`, requestBody).then(response => {
            appContext.fetchUserInfo(appContext.personId);
            setSavedAlert(true);
        }).catch(error => {
            setErrorAlert(true);
        })
    }

    return(
        <Card className="very-rounded shadow-sm mb-3">
            <CardBody>
                <CardTitle className="font-weight-600">
                    {settingsText[appContext.locale]["EasyLedger Settings"]}
                </CardTitle>   
                <div>
                    <Alert color="success" isOpen={savedAlert}>{settingsText[appContext.locale]["Settings saved."]}</Alert>
                    <Alert color="danger" isOpen={errorAlert}>{settingsText[appContext.locale]["Something went wrong. Please try again later."]}</Alert>
                    <div className="form-group row mx-0 my-2 align-items-center">
                        <label className="col-lg-3 col-form-label my-0 px-0">
                            {settingsText[appContext.locale]["Easyledger Name"] + ":"}
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
                            {settingsText[appContext.locale]["Currency"] + ":"}
                        </label>
                        <div className="col-md-9 px-0">{currencies.find(currency => currency.value === permissionObject.organization.currency).label}</div>
                    </div>
                    <div className="form-group row mx-0 align-items-center">
                        <label className="col-lg-3 col-form-label my-0 px-0">
                            {settingsText[appContext.locale]["Fiscal Year Begin Date"] + ":"}
                        </label>
                        <div className="col-md-9 d-flex px-0">
                            <div className="w-50 mr-3">
                                <Select
                                    classNamePrefix="form-control"
                                    options={monthOptions}
                                    value={monthOptions.find(option => option.value === fiscalYearBeginMonth)}
                                    onChange={selectedOption => setFiscalYearBeginMonth(selectedOption.value)}
                                    isDisabled={permissionObject.permissionType.id < 3? true : false}
                                />
                            </div>
                            <div className="w-25">
                                <Select
                                    classNamePrefix="form-control"
                                    options={dateOptions}
                                    value={dateOptions.find(option => option.value === fiscalYearBeginDay)}
                                    onChange={selectedOption => setFiscalYearBeginDay(selectedOption.value)}
                                    isDisabled={permissionObject.permissionType.id < 3? true : false}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="form-group row mx-0 align-items-center">
                        <div className="custom-control custom-switch">
                            <input 
                                type="checkbox" 
                                id="lockInitialAccountValueCheckbox" 
                                className="custom-control-input" 
                                value={lockInitialAccountValues} 
                                checked={lockInitialAccountValues}
                                onChange={toggleLockInitialAccountValues} 
                                disabled={permissionObject.permissionType.id < 3}
                            />
                            <label htmlFor="lockInitialAccountValueCheckbox" className="my-0 custom-control-label">
                                Lock initial account values for accounts with transactions
                            </label>
                        </div>
                    </div>
                    <Alert color="danger" isOpen={invalidDateAlert}>Invalid date.</Alert>
                    <div className="form-group row mx-0 align-items-center">
                        <label className="col-lg-3 col-form-label my-0 px-0">
                            Lock journal entries before:
                        </label>
                        <input 
                            className="form-control col-md-9 "
                            disabled={permissionObject.permissionType.id < 3}
                            type="date" value={lockJournalEntriesBefore? lockJournalEntriesBefore : ''} 
                            onChange={event => setLockJournalEntriesBefore(event.target.value)}
                        />
                    </div>
                    <button 
                        className="btn btn-primary width-175 d-none d-sm-inline-block" 
                        onClick={saveSettings}
                        disabled={permissionObject.permissionType.id < 3}
                    >
                        {settingsText[appContext.locale]["Save"]}
                    </button>
                    <button 
                        className="btn btn-primary btn-block d-sm-none" 
                        onClick={saveSettings}
                        disabled={permissionObject.permissionType.id < 3}
                    >
                        {settingsText[appContext.locale]["Save"]}
                    </button>
                    <button 
                        className="btn btn-danger d-none d-sm-inline-block ml-4" 
                        onClick={handleDeleteOrganizationButton}
                        disabled={permissionObject.permissionType.id < 4}
                    >
                        {settingsText[appContext.locale]["Delete this EasyLedger"]}
                    </button>
                    <button 
                        className="btn btn-danger btn-block d-sm-none mt-4" 
                        onClick={handleDeleteOrganizationButton}
                        disabled={permissionObject.permissionType.id < 4}
                    >
                        {settingsText[appContext.locale]["Delete this EasyLedger"]}
                    </button>
                    
                </div>
                {confirmDeleteOrganizationAlert
                    ? <SweetAlert primary showCancel
                        confirmBtnText={settingsText[appContext.locale]["Yes, delete it!"]}
                        confirmBtnBsStyle="danger"
                        cancelBtnBsStyle="default"
                        cancelBtnText={settingsText[appContext.locale]["Cancel"]}
                        title={settingsText[appContext.locale]["Are you sure?"]}
                        onConfirm={handleConfirmDeleteOrganizationButton}
                        onCancel={toggleConfirmDeleteOrganizationAlert}
                    >
                        {settingsText[appContext.locale]["Are you sure you want to delete this EasyLedger? This action cannot be undone."]}
                    </SweetAlert>
                    : null
                }
                {cannotDeleteOrganizationAlert
                    ? <SweetAlert danger showConfirm={false} showCancel={true}
                        cancelBtnBsStyle="default"
                        cancelBtnText={settingsText[appContext.locale]["Cancel"]}
                        title={settingsText[appContext.locale]["Cannot delete this EasyLedger."]}
                        onConfirm={toggleCannotDeleteOrganizationAlert}
                        onCancel={toggleCannotDeleteOrganizationAlert}
                    >
                        {settingsText[appContext.locale]["All Journal Entries and Transactions must be deleted before you can delete this EasyLedger."]}
                    </SweetAlert>
                    : null
                }
            </CardBody>
        </Card>
    )
}

export default OrganizationSettings;