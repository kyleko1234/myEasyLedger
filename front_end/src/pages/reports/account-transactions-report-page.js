import React from 'react'
import { Alert, Card, CardBody } from 'reactstrap';
import LoadingSpinner from '../../components/misc/loading-spinner';
import { PageSettings } from '../../config/page-settings'
import { incomeStatementRenderText } from '../../utils/i18n/income-statement-render-text';
import { reportsText } from '../../utils/i18n/reports-text';
import { getDateInCurrentYear, getFirstDayOfCurrentMonth, getTodayAsDateString, validateDate } from '../../utils/util-fns';
import Select from 'react-select';
import axios from 'axios';
import { API_BASE_URL } from '../../utils/constants';
import { journalEntriesText } from '../../utils/i18n/journal-entries-text';

function AccountTransactionsReportPage(props) {
    const appContext = React.useContext(PageSettings);
    const today = getTodayAsDateString();

    const beginningOfCurrentMonth = getFirstDayOfCurrentMonth();
    const [loading, setLoading] = React.useState(true);
    const [invalidDateAlert, setInvalidDateAlert] = React.useState(false);
    const [accountOptions, setAccountOptions] = React.useState([]);
    const [dateRangePresets, setDateRangePresets] = React.useState([]);
    const [selectedAccountId, setSelectedAccountId] = React.useState(null);

    const [fetchedReport, setFetchedReport] = React.useState(null);
    const [datesToRequest, setDatesToRequest] = React.useState({
        label: "Custom",
        startDate: beginningOfCurrentMonth,
        endDate: today
    })

    const handleUpdateReportButton = event => {
        event.preventDefault();
        console.log("UPDATE")
    }
    const handleSelectDateRangePreset = selectedOption => {
        if (selectedOption) {
            setDatesToRequest({
                label: selectedOption.label,
                startDate: selectedOption.object.startDate,
                endDate: selectedOption.object.endDate
            })
        }
    }
    const handleChangeStartDate = (date) => {
        let newDatesToRequest = datesToRequest.slice();
        newDatesToRequest = {
            label: "Custom",
            startDate: date,
            endDate: newDatesToRequest.endDate
        }
        setDatesToRequest(newDatesToRequest)
    }
    const handleChangeEndDate = (date) => {
        let newDatesToRequest = datesToRequest.slice();
        newDatesToRequest = {
            label: "Custom",
            startDate: newDatesToRequest.startDate,
            endDate: date
        }
        setDatesToRequest(newDatesToRequest)
    }

    const validateDatesToRequest = datesToRequest => {
        if (!(validateDate(datesToRequest.startDate) && validateDate(datesToRequest.endDate))) {
            return false;
        }
        return true;
    }

    const fetchDateRangePresets = () => {
        axios.get(`${API_BASE_URL}/organization/${appContext.currentOrganizationId}/dateRangePresetsUpToDate/${today}/${appContext.locale}`).then(response => {
            setDateRangePresets(response.data);
        })
    }

    const fetchAccounts = () => {
        let accountTypePrefixes = {
            1: journalEntriesText[appContext.locale]["[A] "],
            2: journalEntriesText[appContext.locale]["[L] "],
            3: journalEntriesText[appContext.locale]["[O] "],
            4: journalEntriesText[appContext.locale]["[I] "],
            5: journalEntriesText[appContext.locale]["[E] "]
        }
        axios.get(`${API_BASE_URL}/organization/${appContext.currentOrganizationId}/accountsWithEntries`)
            .then(response => {
                const formattedAccounts = response.data.filter(account => !account.hasChildren).map(account => {
                    return ({
                        value: account.accountId,
                        label: accountTypePrefixes[account.accountTypeId] +
                            (account.accountCode ? account.accountCode + " - " + account.accountName : account.accountName),
                        object: account
                    });
                });
                setAccountOptions(formattedAccounts);
                if (formattedAccounts.length > 0) {
                    setSelectedAccountId(formattedAccounts[0].value);
                }
            })
            .catch(console.log);

    }

    const fetchReport = (accountId) => {
        axios.get(`${API_BASE_URL}/reports/accountTransactionsReport/account/${accountId}/${datesToRequest.startDate}/${datesToRequest.endDate}`).then(response => {
            setFetchedReport(response.data);
        })
    }

    React.useEffect(() => {
        setLoading(true);
        fetchDateRangePresets();
        fetchAccounts();
        setLoading(false);
    }, [])

    React.useEffect(() => {
        if (selectedAccountId) {
            fetchReport(selectedAccountId)
        }
    }, [selectedAccountId])

    return (
        <div>
            <h1 className="page-header">
                {reportsText[appContext.locale]["Account Transactions Report"]}
            </h1>
            <Card className="very-rounded shadow-sm bg-light my-4">
                <CardBody>
                    <Alert isOpen={invalidDateAlert} color="danger">
                        {incomeStatementRenderText[appContext.locale]["Invalid date(s) selected."]}
                    </Alert>
                    <form onSubmit={handleUpdateReportButton}>
                        <div className="mb-2">
                            <h2 className="h5 my-0">{incomeStatementRenderText[appContext.locale]["Options"]}</h2>
                        </div>
                        <div className="d-none d-md-block">
                            <div>
                                <div className="d-flex w-100 align-items-center mb-3">
                                    <Select
                                        className="col-4 px-0"
                                        classNamePrefix="form-control"
                                        options={dateRangePresets}
                                        menuPortalTarget={document.body}
                                        menuShouldScrollIntoView={false}
                                        styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                                        onChange={selectedOption => handleSelectDateRangePreset(selectedOption)}
                                        placeholder={"Custom"}
                                        value={datesToRequest.label === "Custom" ? null : dateRangePresets.find(preset => preset.label == datesToRequest.label)}
                                    />
                                    <label className="my-0 text-end col-1 px-2">
                                        {incomeStatementRenderText[appContext.locale]["From:"]}
                                    </label>
                                    <div className="col-3">
                                        <input
                                            type="date"
                                            placeholder={incomeStatementRenderText[appContext.locale]["yyyy-mm-dd"]}
                                            className="form-control" value={datesToRequest.startDate}
                                            onChange={event => handleChangeStartDate(event.target.value)}
                                        />
                                    </div>
                                    <label className="my-0 text-end col-1 px-2">
                                        {incomeStatementRenderText[appContext.locale]["To:"]}
                                    </label>
                                    <div className="col-3">
                                        <input
                                            type="date"
                                            placeholder={incomeStatementRenderText[appContext.locale]["yyyy-mm-dd"]}
                                            className="form-control" value={datesToRequest.endDate}
                                            onChange={event => handleChangeEndDate(event.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="d-flex w-100 align-items-center justify-content-between">
                                    <div className="col-6 d-flex align-items-center">
                                        <label className="my-0 px-2">
                                            {reportsText[appContext.locale]["Account:"]}
                                        </label>
                                        <Select
                                            className="px-0 w-100"
                                            classNamePrefix="form-control"
                                            options={accountOptions}
                                            menuPortalTarget={document.body}
                                            menuShouldScrollIntoView={false}
                                            styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                                            onChange={selectedOption => setSelectedAccountId(selectedOption.object.accountId)}
                                            placeholder={"Account"}
                                            value={accountOptions.find(accountOption => accountOption.object.accountId === selectedAccountId)}
                                        />
                                    </div>
                                    <button type="submit" className="btn btn-primary width-200">
                                        {incomeStatementRenderText[appContext.locale]["Update report"]}
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="d-md-none">
                            <div>
                                <div className="d-flex mb-2 justify-content-between">
                                    <Select
                                        className="col-12 px-0"
                                        classNamePrefix="form-control"
                                        options={dateRangePresets}
                                        menuPortalTarget={document.body}
                                        menuShouldScrollIntoView={false}
                                        styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                                        onChange={selectedOption => handleSelectDateRangePreset(selectedOption)}
                                        placeholder={"Custom"}
                                        value={datesToRequest.label === "Custom" ? null : dateRangePresets.find(preset => preset.label == datesToRequest.label)}
                                    />
                                </div>
                                <div className="d-flex justify-content-between text-start align-items-center mb-2">
                                    <label className="my-0 col-3 px-0">
                                        {incomeStatementRenderText[appContext.locale]["From:"]}
                                    </label>
                                    <input
                                        type="date"
                                        placeholder={incomeStatementRenderText[appContext.locale]["yyyy-mm-dd"]}
                                        className="form-control"
                                        value={datesToRequest.startDate}
                                        onChange={event => handleChangeStartDate(event.target.value)}
                                    />
                                </div>
                                <div className="d-flex justify-content-between text-start align-items-center mb-2">
                                    <label className="my-0 col-3 px-0">
                                        {incomeStatementRenderText[appContext.locale]["To:"]}
                                    </label>
                                    <input
                                        type="date"
                                        placeholder={incomeStatementRenderText[appContext.locale]["yyyy-mm-dd"]}
                                        className="form-control"
                                        value={datesToRequest.endDate}
                                        onChange={event => handleChangeEndDate(event.target.value)}
                                    />
                                </div>
                                <div className="d-flex mb-2 justify-content-between">
                                    <Select
                                        className="px-0 w-100"
                                        classNamePrefix="form-control"
                                        options={accountOptions}
                                        menuPortalTarget={document.body}
                                        menuShouldScrollIntoView={false}
                                        styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                                        onChange={selectedOption => setSelectedAccountId(selectedOption.object.accountId)}
                                        placeholder={"Account"}
                                        value={accountOptions.find(accountOption => accountOption.object.accountId === selectedAccountId)}
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary btn-large w-100">
                                    {incomeStatementRenderText[appContext.locale]["Update report"]}
                                </button>
                            </div>
                        </div>
                    </form>
                </CardBody>
            </Card>
        </div>
    )
}
export default AccountTransactionsReportPage