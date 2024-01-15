import React from 'react';
import { Card, CardBody, CardTitle, Alert, Tooltip} from 'reactstrap';
import { PageSettings } from '../../../config/page-settings';
import { CURRENCY_OPTIONS, CALENDAR_MONTH_OPTIONS, API_BASE_URL } from '../../../utils/constants';
import { settingsText } from '../../../utils/i18n/settings-text';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import SweetAlert from 'react-bootstrap-sweetalert';
import { validateDate } from '../../../utils/util-fns';
import StyledSelect from '../../../components/misc/styled-select';

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
    const [initialRetainedEarnings, setInitialRetainedEarnings] = React.useState(permissionObject.organization.initialRetainedEarnings);

    const [dateOptions, setDateOptions] = React.useState([]);
    const [savedAlert, setSavedAlert] = React.useState(false);
    const [errorAlert, setErrorAlert] = React.useState(false);
    const [invalidDateAlert, setInvalidDateAlert] = React.useState(false);

    const [loading, setLoading] = React.useState(false);

    const [confirmDeleteOrganizationAlert, setConfirmDeleteOrganizationAlert] = React.useState(false);
    const [cannotDeleteOrganizationAlert, setCannotDeleteOrganizationAlert] = React.useState(false);
    const toggleConfirmDeleteOrganizationAlert = () => setConfirmDeleteOrganizationAlert(!confirmDeleteOrganizationAlert);
    const toggleCannotDeleteOrganizationAlert = () => setCannotDeleteOrganizationAlert(!cannotDeleteOrganizationAlert);

    const [saveButtonTooltip, setSaveButtonTooltip] = React.useState(false);
    const toggleSaveButtonTooltip = () => setSaveButtonTooltip(!saveButtonTooltip);
    const [deleteButtonTooltip, setDeleteButtonTooltip] = React.useState(false);
    const toggleDeleteButtonTooltip = () => setDeleteButtonTooltip(!deleteButtonTooltip);


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
            lockJournalEntriesBefore: lockJournalEntriesBefore,
            initialRetainedEarnings: initialRetainedEarnings
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
                <div>
                    <Alert color="success" isOpen={savedAlert}>{settingsText[appContext.locale]["Settings saved."]}</Alert>
                    <Alert color="danger" isOpen={errorAlert}>{settingsText[appContext.locale]["Something went wrong. Please try again later."]}</Alert>
                    <div className="mb-3 row mx-0 my-2 align-items-center">
                        <label 
                            className={"col-lg-3 col-form-label my-0 px-0 " + (permissionObject.permissionType.id < 3 ? "disabled " : "")}
                            htmlFor='ledger-name-input'
                        >
                            {settingsText[appContext.locale]["Ledger name"] + ":"}
                        </label>
                        <div className="col-md-9">
                            <input 
                                id="ledger-name-input"
                                className="form-control"
                                disabled={permissionObject.permissionType.id < 3? true : false}
                                type="text" value={organizationName} 
                                onChange={event => setOrganizationName(event.target.value)}
                            />
                        </div>
                    </div>
                    <div className="mb-3 row mx-0 my-2 align-items-center">
                        <label className="col-lg-3 col-form-label my-0 px-0 disabled">
                            {settingsText[appContext.locale]["Currency"] + ":"}
                        </label>
                        <div className="col-md-9 col-form-label disabled">{currencies.find(currency => currency.value === permissionObject.organization.currency).label}</div>
                    </div>
                    <div className={"mb-3 row mx-0 my-2 align-items-center " + (permissionObject.organization.isEnterprise ? "" : "d-none")}>
                        <label 
                            className={"col-lg-3 col-form-label my-0 px-0 " + (permissionObject.permissionType.id < 3 ? "disabled " : "")}
                            htmlFor='initial-retained-earnings'
                        >
                            {settingsText[appContext.locale]["Initial value of retained earnings"] + ":"}
                        </label>
                        <div className="col-md-9">
                            <input 
                                id="initial-retained-earnings"
                                className="form-control"
                                disabled={permissionObject.permissionType.id < 3? true : false}
                                type="number" value={initialRetainedEarnings} 
                                onChange={event => setInitialRetainedEarnings(event.target.value)}
                            />
                        </div>
                    </div>
                    <div className="mb-3 row mx-0 align-items-center">
                        <label className={"col-lg-3 col-form-label my-0 px-0 " + (permissionObject.permissionType.id < 3 ? "disabled " : "")}>
                            {settingsText[appContext.locale]["Fiscal year begin date"] + ":"}
                        </label>
                        <div className="col-md-9 d-flex">
                            <div className="w-50 me-3">
                                <StyledSelect
                                    options={monthOptions}
                                    value={monthOptions.find(option => option.value === fiscalYearBeginMonth)}
                                    onChange={selectedOption => setFiscalYearBeginMonth(selectedOption.value)}
                                    isDisabled={permissionObject.permissionType.id < 3? true : false}
                                />
                            </div>
                            <div className="w-25">
                                <StyledSelect
                                    options={dateOptions}
                                    value={dateOptions.find(option => option.value === fiscalYearBeginDay)}
                                    onChange={selectedOption => setFiscalYearBeginDay(selectedOption.value)}
                                    isDisabled={permissionObject.permissionType.id < 3? true : false}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="mb-3 row mx-0 align-items-center">
                        <div className="form-check form-switch">
                            <input 
                                type="checkbox" 
                                id="lockInitialAccountValueCheckbox" 
                                className="form-check-input" 
                                value={lockInitialAccountValues} 
                                checked={lockInitialAccountValues}
                                onChange={toggleLockInitialAccountValues} 
                                disabled={permissionObject.permissionType.id < 3}
                            />
                            <label 
                                htmlFor="lockInitialAccountValueCheckbox" 
                                className={"my-0 mx-2 form-check-label " + (permissionObject.permissionType.id < 3 ? "disabled " : "")}
                            >
                                {settingsText[appContext.locale]["Lock initial values for all accounts"]}
                            </label>
                        </div>
                    </div>
                    <Alert color="danger" isOpen={invalidDateAlert}>{settingsText[appContext.locale]["Invalid date."]}</Alert>
                    <div className="mb-3 row mx-0 align-items-center">
                        <label 
                            className={"col-lg-3 col-form-label my-0 px-0 " + (permissionObject.permissionType.id < 3 ? "disabled " : "")}
                            htmlFor="lock-entries-before-input"
                        >
                            {settingsText[appContext.locale]["Lock journal entries before"] + ":"}
                        </label>
                        <div className="col-md-9">
                            <input 
                                id="lock-entries-before-input"
                                className="form-control"
                                disabled={permissionObject.permissionType.id < 3}
                                type="date" value={lockJournalEntriesBefore? lockJournalEntriesBefore : ''} 
                                onChange={event => setLockJournalEntriesBefore(event.target.value)}
                            />
                        </div>
                    </div>
                    <div className="d-sm-flex">
                        <div id="save-button">
                            <button 
                                className="btn btn-primary width-175 d-none d-sm-inline-block" 
                                onClick={saveSettings}
                                disabled={permissionObject.permissionType.id < 3}
                            >
                                {settingsText[appContext.locale]["Save"]}
                            </button>
                            <button 
                                className="btn btn-primary d-block w-100 d-sm-none" 
                                onClick={saveSettings}
                                disabled={permissionObject.permissionType.id < 3}
                            >
                                {settingsText[appContext.locale]["Save"]}
                            </button>
                        </div>
                        <div id="delete-button" className="ms-sm-4">
                            <button 
                                className="btn btn-danger d-none d-sm-inline-block" 
                                onClick={handleDeleteOrganizationButton}
                                disabled={permissionObject.permissionType.id < 4}
                            >
                                {settingsText[appContext.locale]["Delete this ledger"]}
                            </button>
                            <button 
                                className="btn btn-danger d-block w-100 d-sm-none mt-3" 
                                onClick={handleDeleteOrganizationButton}
                                disabled={permissionObject.permissionType.id < 4}
                            >
                                {settingsText[appContext.locale]["Delete this ledger"]}
                            </button>
                        </div>
                    </div>
                </div>
                <SweetAlert 
                    primary 
                    showCancel
                    show={confirmDeleteOrganizationAlert}
                    confirmBtnText={settingsText[appContext.locale]["Yes, delete it!"]}
                    confirmBtnBsStyle="danger"
                    cancelBtnBsStyle="default"
                    cancelBtnText={settingsText[appContext.locale]["Cancel"]}
                    title={settingsText[appContext.locale]["Are you sure?"]}
                    onConfirm={handleConfirmDeleteOrganizationButton}
                    onCancel={toggleConfirmDeleteOrganizationAlert}
                >
                    {settingsText[appContext.locale]["Are you sure you want to delete this ledger? This action cannot be undone."]}
                </SweetAlert>
                
                <SweetAlert 
                    danger 
                    show={cannotDeleteOrganizationAlert}
                    showConfirm={true} 
                    showCancel={false}
                    confirmBtnBsStyle="default"
                    confirmBtnText={settingsText[appContext.locale]["Cancel"]}
                    title={settingsText[appContext.locale]["Cannot delete this ledger."]}
                    onConfirm={toggleCannotDeleteOrganizationAlert}
                    onCancel={toggleCannotDeleteOrganizationAlert}
                >
                    {settingsText[appContext.locale]["All Journal Entries and Transactions must be deleted before you can delete this ledger."]}
                </SweetAlert>
                    
                {permissionObject.permissionType.id < 3
                    ? <Tooltip 
                        target="save-button" 
                        fade={false}
                        isOpen={saveButtonTooltip} 
                        toggle={toggleSaveButtonTooltip}
                    >
                        {settingsText[appContext.locale]["This action requires ADMIN permissions for this ledger."]}
                    </Tooltip>
                    : null
                }
                {permissionObject.permissionType.id < 4
                    ? <Tooltip 
                        target="delete-button" 
                        fade={false}
                        isOpen={deleteButtonTooltip} 
                        toggle={toggleDeleteButtonTooltip}
                    >
                        {settingsText[appContext.locale]["This action requires OWN permissions for this ledger."]}
                    </Tooltip>
                    : null
                }
            </CardBody>
        </Card>
    )
}

export default OrganizationSettings;