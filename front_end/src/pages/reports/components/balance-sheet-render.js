import React from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../../../utils/constants';
import { PageSettings } from '../../../config/page-settings';
import { balanceSheetRenderText } from '../../../utils/i18n/balance-sheet-render-text.js';
import { Card, CardBody, Alert } from 'reactstrap';
import Select from 'react-select';
import { Link } from 'react-router-dom';
import { formatCurrency, getTodayAsDateString, localizeDate, validateDate } from '../../../utils/util-fns';
import StripedRow from '../../../components/tables/striped-row';
import LoadingSpinner from '../../../components/misc/loading-spinner';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { array } from 'prop-types';

function BalanceSheetRender(props) {
    const appContext = React.useContext(PageSettings);

    const today = getTodayAsDateString();
    const [loading, setLoading] = React.useState(true);

    const [detailedView, setDetailedView] = React.useState(false);
    const toggleDetailedView = () => setDetailedView(!detailedView);

    const [balanceSheetObjects, setBalanceSheetObjects] = React.useState([]);

    const [endDatesToRequest, setEndDatesToRequest] = React.useState([{
        label: "Custom", 
        endDate: props.endDate? props.endDate : today
    }]);
    
    const [columnLabels, setColumnLabels] = React.useState([]);
    const [dateRangePresets, setDateRangePresets] = React.useState([]);
    const [invalidDateAlert, setInvalidDateAlert] = React.useState(false);
    const [unbalancedAlert, setUnbalancedAlert] = React.useState(false);

    const handleChangeDate = (date, i) => {
        let newEndDatesToRequestArray = endDatesToRequest.slice();
        newEndDatesToRequestArray[i] = (
            {label: "Custom", endDate: date}
        )
        setEndDatesToRequest(newEndDatesToRequestArray);
    }

    const numberAsCurrency = (number) => {
        if (number == 0) {
            return formatCurrency(appContext.locale, appContext.currency, 0);
        }
        return formatCurrency(appContext.locale, appContext.currency, number);
    }

    const requestBalanceSheetObjects = async arrayToStoreObjects => {
        setUnbalancedAlert(false);
        let newColumnLabels = [];
        for (const endDateObject of endDatesToRequest) {
            await axios.get(`${API_BASE_URL}/organization/${appContext.currentOrganizationId}/reports/balanceSheet/${endDateObject.endDate}`).then(response => {
                newColumnLabels.push(endDateObject);     //column labels are not updated until the report is actually updated
                arrayToStoreObjects.push(response.data);
            }).catch(console.log);
        }
        setColumnLabels(newColumnLabels);
        //verify accounting equation and set unbalanced alert if needed
        let satisfiesAccountingEquation = true;
        arrayToStoreObjects.forEach(balanceSheet => {
            let totalAssets = balanceSheet.balanceSheetAssets.totalAssets
            let equityAndLiability = parseFloat((balanceSheet.balanceSheetLiabilities.totalLiabilities + balanceSheet.balanceSheetEquity.totalEquity).toFixed(2))
            if (totalAssets !== equityAndLiability) {
                satisfiesAccountingEquation = false;
            }
        })
        setUnbalancedAlert(!satisfiesAccountingEquation);
    }

    const validateDatesToRequest = endDatesToRequest => {
        let returnedBoolean = true
        endDatesToRequest.forEach(endDateToRequestObject => {
            if (!validateDate(endDateToRequestObject.endDate)) {
                returnedBoolean = false;
            }
        })
        return returnedBoolean;
    }

    const handleUpdateReportButton = async (event) => {
        event.preventDefault();
        setLoading(true);
        setInvalidDateAlert(false);
        if (validateDatesToRequest(endDatesToRequest)) {
            let fetchedBalanceSheetObjects = [];
            await requestBalanceSheetObjects(fetchedBalanceSheetObjects);
            setBalanceSheetObjects(fetchedBalanceSheetObjects);    
        } else {
            setInvalidDateAlert(true);
        }
        setLoading(false);
    }

    React.useEffect(() => {
        async function fetchData() {
            setLoading(true);
            await axios.get(`${API_BASE_URL}/organization/${appContext.currentOrganizationId}/dateRangePresetsUpToDate/${today}/${appContext.locale}`).then(response => {
                setDateRangePresets(response.data);
            })
            let fetchedBalanceSheetObjects = []
            await requestBalanceSheetObjects(fetchedBalanceSheetObjects);
            setBalanceSheetObjects(fetchedBalanceSheetObjects);
            setLoading(false);
        }
        fetchData();
    }, [])

    const handleSelectDateRangePreset = (selectedOption, i) => {
        if (selectedOption) {
            let endDateToRequestObject = {
                label: selectedOption.label,
                endDate: selectedOption.object.endDate
            };
            let newEndDatesToRequestArray = endDatesToRequest.slice();
            newEndDatesToRequestArray[i] = endDateToRequestObject;
            setEndDatesToRequest(newEndDatesToRequestArray);
        }
    }
    
    const handleCompareButton = () => {
        let endDatesArray = endDatesToRequest.slice();
        endDatesArray.push({
            label: "Custom", 
            endDate:today}
        )
        setEndDatesToRequest(endDatesArray);
    }
    
    const handleRemoveDateRangeButton = i => {
        let endDatesArray = endDatesToRequest.slice();
        endDatesArray.splice(i, 1);
        setEndDatesToRequest(endDatesArray);
    }

    const sumDebitsAndCreditsOfChildren = (accountId, indexOfBalanceSheetObject) => {
        let total = 0;
        let childAccounts = balanceSheetObjects[indexOfBalanceSheetObject]
            .accountBalances
            .filter(childAccount => childAccount.parentAccountId === accountId);
        childAccounts
            .forEach(account => {
                if (account.debitsMinusCredits) {
                    total += account.debitsMinusCredits;
                }
        })
        return total;
    }

    //returns true if debitsMinusCredits of an account is zero for all date ranges selected by the user
    const zeroDebitsMinusCreditsInAccount = (account) => {
        for (let i = 0; i < balanceSheetObjects.length; i++) {
            let accountForThisDatePeriod = balanceSheetObjects[i].accountBalances.find(specificAccount => specificAccount.accountId === account.accountId);
            if (account.hasChildren) {
                if (sumDebitsAndCreditsOfChildren(account.accountId, i)) {
                    return false;
                }    
            } else {
                if (accountForThisDatePeriod.debitsMinusCredits) {
                    return false;
                }
            }
        }
        return true;
    }

    /**
     * returns true if debitsMinusCredits of a SubtypeBalance object is zero for all date ranges selected by the user
     * @param {AccountSubtypeBalance} subtypeBalance 
     * @param {String} balanceSheetIdentifier - "balanceSheetAssets", "balanceSheetLiabilities", or "balanceSheetEquity"
     * @param {String} subtypeClassificationIdentifier "currentAssetsSubtypeBalances", "nonCurrentAssetsSubtypeBalances", "currentLiabilitiesSubtypeBalances", "nonCurrentLiabilitiesSubtypeBalances", "equityItemsSubtypeBalances"
     */
    const zeroDebitsMinusCreditsInSubtype = (subtypeBalance, balanceSheetIdentifier, subtypeClassificationIdentifier) => {
        for (let i = 0; i < balanceSheetObjects.length; i++) {
            let subtypeForThisDatePeriod = balanceSheetObjects[i][balanceSheetIdentifier][subtypeClassificationIdentifier]
                .find(specificSubtype => specificSubtype.accountSubtypeId === subtypeBalance.accountSubtypeId)
            if (subtypeForThisDatePeriod.debitsMinusCredits) {
                return false;
            }
        }
        return true;
    }

    return (
        <>
            <Card className="bg-light shadow-sm very-rounded my-4">
                <CardBody>
                    <Alert isOpen={invalidDateAlert} color="danger">
                        {balanceSheetRenderText[appContext.locale]["Invalid date(s) selected."]}
                    </Alert>
                    <form onSubmit={handleUpdateReportButton}>
                        <div className="mb-2">
                            <h2 className="h5 my-0">
                                {balanceSheetRenderText[appContext.locale]["Options"]}
                            </h2>
                        </div>
                        <div>
                            {endDatesToRequest.map((endDateObject, i) => {
                                return(
                                    <div className="mb-2" key={i}>
                                        {endDatesToRequest.length > 1 
                                            ? <div className="font-weight-semibold my-1 d-flex align-items-center">
                                                {balanceSheetRenderText[appContext.locale]["Date range"] + " " + (i + 1)}
                                                <button className="btn btn-light py-0 px-1 mx-1 border-0" onClick={() => handleRemoveDateRangeButton(i)}><i className="ion ion-md-close fa-fw"></i></button>
                                            </div> 
                                            : null
                                        }
                                        <div className="d-flex w-100 align-items-center" key={i}>
                                            <Select
                                                className="col-4 px-0"
                                                classNamePrefix="form-control"
                                                options={dateRangePresets}
                                                menuPortalTarget={document.body}
                                                menuShouldScrollIntoView={false}
                                                styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                                                onChange={selectedOption => handleSelectDateRangePreset(selectedOption, i)}
                                                placeholder={balanceSheetRenderText[appContext.locale]["Custom"]}
                                                value={endDatesToRequest[i].label === "Custom" ? null : dateRangePresets.find(preset => preset.label == endDatesToRequest[i].label)}
                                            />
                                            <label className="col-2 px-1 px-sm-2 text-end my-0" htmlFor={`end-date-${i}`}>
                                                {balanceSheetRenderText[appContext.locale]["As of:"]} 
                                            </label>
                                            <div className="col-6">
                                                <input 
                                                    type="date" 
                                                    id={`end-date-${i}`}
                                                    className="form-control align-self-center" 
                                                    placeholder={balanceSheetRenderText[appContext.locale]["yyyy-mm-dd"]} 
                                                    value={endDatesToRequest[i].endDate} 
                                                    onChange={event => handleChangeDate(event.target.value, i)} 
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                        {endDatesToRequest.length < 3
                            ? <div className="mb-2">
                                <Link replace to="#" onClick={handleCompareButton} className="text-decoration-none"><i className="ion ion-md-add"></i> {balanceSheetRenderText[appContext.locale]["Compare"]}</Link>
                            </div>
                            : null
                        }
                        <div className="d-flex align-items-center justify-content-between mt-2">
                            <div className="form-check form-switch">
                                <input 
                                    type="checkbox" 
                                    role="switch"
                                    id="detailedViewCheckbox" 
                                    className="form-check-input" 
                                    value={detailedView} 
                                    onChange={toggleDetailedView} 
                                />
                                <label htmlFor="detailedViewCheckbox" className="my-0 form-check-label">
                                    {balanceSheetRenderText[appContext.locale]["Detailed View"]}
                                </label>
                            </div>
                            <button type="submit" className="btn btn-primary width-200" onClick={handleUpdateReportButton}>
                                {balanceSheetRenderText[appContext.locale]["Update report"]}
                            </button>
                        </div>
                    </form>
                </CardBody>
            </Card>
            <Alert isOpen={unbalancedAlert} color="danger">
                {balanceSheetRenderText[appContext.locale]["This balance sheet does not satisfy the accounting equation. Please check that the initial debit and credit values of all accounts are set up correctly."]}
            </Alert>
            <PerfectScrollbar>
                <div className="min-width-md">
                    <div className="d-flex justify-content-between font-weight-semibold text-end">
                        <div>{/*empty div for spacing*/}</div>
                        <div className="text-end d-flex">
                            {columnLabels.map((columnLabel, i) => {
                                return(
                                    <div className="pseudo-td width-175" key={i}>
                                        {columnLabel.label === "Custom"
                                            ? balanceSheetRenderText[appContext.locale]["As of:"] + " " + localizeDate(columnLabel.endDate)
                                            : columnLabel.label
                                        }
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    <div>
                        {(loading || !balanceSheetObjects.length ) 
                            ? <LoadingSpinner big /> 
                            : <> {/**Render balance sheet assets */}
                                <StripedRow className="striped-row font-weight-semibold">
                                    {balanceSheetRenderText[appContext.locale]["Assets"]}
                                </StripedRow>
                                <StripedRow className="striped-row font-weight-semibold indent">
                                    {balanceSheetRenderText[appContext.locale]["Current assets"]}
                                </StripedRow>
                                {balanceSheetObjects[0].balanceSheetAssets.currentAssetsSubtypeBalances.map(subtypeBalance => {
                                    return (
                                        zeroDebitsMinusCreditsInSubtype(subtypeBalance, "balanceSheetAssets", "currentAssetsSubtypeBalances")
                                            ? null
                                            : <React.Fragment key={subtypeBalance.accountSubtypeId}>
                                                <StripedRow className="justify-content-between indent-2">
                                                    <div>{balanceSheetRenderText[appContext.locale][subtypeBalance.accountSubtypeName]}</div>
                                                    <div className="text-end d-flex">
                                                        {balanceSheetObjects.map((balanceSheet, i) => {
                                                            return(
                                                                <div key={i} className="width-175">
                                                                    {numberAsCurrency(
                                                                        balanceSheet.balanceSheetAssets.currentAssetsSubtypeBalances
                                                                            .find(specificSubtype => specificSubtype.accountSubtypeId === subtypeBalance.accountSubtypeId)
                                                                            .debitsMinusCredits
                                                                    )}
                                                                </div>
                                                            )
                                                        })}
                                                    </div>
                                                </StripedRow>
                                                {detailedView ?
                                                    balanceSheetObjects[0].accountBalances
                                                        .filter(account => account.accountSubtypeId === subtypeBalance.accountSubtypeId)
                                                        .map(account => {
                                                            return (
                                                                zeroDebitsMinusCreditsInAccount(account)
                                                                    ? null
                                                                    : <React.Fragment key={account.accountId}>
                                                                        <StripedRow className="justify-content-between indent-3">
                                                                            <div>{account.accountName}</div>
                                                                            <div className="text-end d-flex">
                                                                                {account.hasChildren 
                                                                                    ? null 
                                                                                    : balanceSheetObjects.map((balanceSheet, i) => {
                                                                                        return(
                                                                                            <div key={i} className="width-175">
                                                                                                {numberAsCurrency(
                                                                                                    balanceSheet.accountBalances
                                                                                                        .find(specificAccount => specificAccount.accountId === account.accountId)
                                                                                                        .debitsMinusCredits
                                                                                                )}
                                                                                            </div>
                                                                                        )
                                                                                })}
                                                                            </div>
                                                                        </StripedRow>
                                                                        {balanceSheetObjects[0].accountBalances
                                                                            .filter(childAccount => childAccount.parentAccountId === account.accountId)
                                                                            .map(childAccount => {
                                                                                return (
                                                                                    zeroDebitsMinusCreditsInAccount(childAccount)
                                                                                        ? null
                                                                                        : <StripedRow className="justify-content-between indent-4" key={childAccount.accountId}>
                                                                                            <div>
                                                                                                {childAccount.accountName}
                                                                                            </div>
                                                                                            <div className="text-end d-flex">
                                                                                                {balanceSheetObjects.map((balanceSheet, i) => {
                                                                                                    return(
                                                                                                        <div key={i} className="width-175">
                                                                                                            {numberAsCurrency(
                                                                                                                balanceSheet.accountBalances
                                                                                                                .find(specificChildAccount => specificChildAccount.accountId === childAccount.accountId)
                                                                                                                .debitsMinusCredits
                                                                                                            )}
                                                                                                        </div>
                                                                                                    )
                                                                                                })}
                                                                                            </div>
                                                                                        </StripedRow>
                                                                                )
                                                                            })
                                                                        }
                                                                    </React.Fragment>
                                                            )
                                                        })
                                                    : null
                                                }
                                            </React.Fragment>
                                    )
                                })}
                                    <StripedRow className="font-weight-semibold indent justify-content-between">
                                        <div>
                                            {balanceSheetRenderText[appContext.locale]["Total current assets"]}
                                        </div>
                                        <div className="text-end d-flex">
                                            {balanceSheetObjects.map((balanceSheet, i) => {
                                                return(
                                                    <div key={i} className="width-175">
                                                        {numberAsCurrency(balanceSheet.balanceSheetAssets.totalCurrentAssets)}
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </StripedRow>
                                    <StripedRow className="font-weight-semibold indent">
                                        {balanceSheetRenderText[appContext.locale]["Non-current assets"]}
                                    </StripedRow>
                                    {balanceSheetObjects[0].balanceSheetAssets.nonCurrentAssetsSubtypeBalances.map(subtypeBalance => {
                                        return (
                                            zeroDebitsMinusCreditsInSubtype(subtypeBalance, "balanceSheetAssets", "nonCurrentAssetsSubtypeBalances")
                                                ? null
                                                : <React.Fragment key={subtypeBalance.accountSubtypeId}>
                                                    <StripedRow className="justify-content-between indent-2">
                                                        <div>{balanceSheetRenderText[appContext.locale][subtypeBalance.accountSubtypeName]}</div>
                                                        <div className="text-end d-flex">
                                                            {balanceSheetObjects.map((balanceSheet, i) => {
                                                                return(
                                                                    <div key={i} className="width-175">
                                                                        {numberAsCurrency(balanceSheet.balanceSheetAssets.nonCurrentAssetsSubtypeBalances.find(specificSubtype => specificSubtype.accountSubtypeId === subtypeBalance.accountSubtypeId).debitsMinusCredits)}
                                                                    </div>
                                                                )
                                                            })}
                                                        </div>
                                                    </StripedRow>
                                                    {detailedView 
                                                        ? balanceSheetObjects[0].accountBalances
                                                            .filter(account => account.accountSubtypeId === subtypeBalance.accountSubtypeId)
                                                            .map(account => {
                                                                return (
                                                                    zeroDebitsMinusCreditsInAccount(account)
                                                                        ? null
                                                                        : <React.Fragment key={account.accountId}>
                                                                            <StripedRow className="justify-content-between indent-3">
                                                                                <div>
                                                                                    {account.accountName}
                                                                                </div>
                                                                                <div className="text-end d-flex">
                                                                                    {account.hasChildren 
                                                                                    ? null 
                                                                                    : balanceSheetObjects.map((balanceSheet, i) => {
                                                                                        return(
                                                                                            <div key={i} className="width-175">
                                                                                                {numberAsCurrency(balanceSheet.accountBalances.find(specificAccount => specificAccount.accountId === account.accountId).debitsMinusCredits)}
                                                                                            </div>
                                                                                        )
                                                                                    })}
                                                                                </div>
                                                                            </StripedRow>
                                                                            {balanceSheetObjects[0].accountBalances
                                                                                .filter(childAccount => childAccount.parentAccountId === account.accountId)
                                                                                .map(childAccount => {
                                                                                    return (
                                                                                        zeroDebitsMinusCreditsInAccount(childAccount)
                                                                                            ? null
                                                                                            : <StripedRow key={childAccount.accountId} className="justify-content-between indent-4">
                                                                                                <div>
                                                                                                    {childAccount.accountName}
                                                                                                </div>
                                                                                                <div className="text-end d-flex">
                                                                                                    {balanceSheetObjects.map((balanceSheet, i) => {
                                                                                                        return(
                                                                                                            <div key={i} className="width-175">
                                                                                                                {numberAsCurrency(balanceSheet.accountBalances.find(specificChildAccount => specificChildAccount.accountId === childAccount.accountId).debitsMinusCredits)}
                                                                                                            </div>
                                                                                                        )
                                                                                                    })}
                                                                                                </div>
                                                                                            </StripedRow>
                                                                                    )
                                                                                })
                                                                            }
                                                                        </React.Fragment>
                                                                )
                                                            })
                                                        : null
                                                    }
                                                </React.Fragment>
                                        )
                                    })}
                                    <StripedRow className="justify-content-between font-weight-semibold indent">
                                        <div>
                                            {balanceSheetRenderText[appContext.locale]["Total non-current assets"]}
                                        </div>
                                        <div className="text-end d-flex">
                                            {balanceSheetObjects.map((balanceSheet, i) => {
                                                return(
                                                    <div key={i} className="width-175">
                                                        {numberAsCurrency(balanceSheet.balanceSheetAssets.totalNonCurrentAssets)}
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </StripedRow>
                                    <StripedRow className="justify-content-between font-weight-semibold">
                                        <div>
                                            {balanceSheetRenderText[appContext.locale]["Total assets"]}
                                        </div>
                                        <div className="text-end d-flex">
                                            {balanceSheetObjects.map((balanceSheet, i) => {
                                                return(
                                                    <div key={i} className="width-175">
                                                        {numberAsCurrency(balanceSheet.balanceSheetAssets.totalAssets)}
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </StripedRow>
                            </>
                        }
                        <StripedRow>
                            <div className="invisible">{/*empty row */}empty row</div>
                        </StripedRow>
                        {(loading || !balanceSheetObjects.length ) 
                            ? <LoadingSpinner big />
                            : <> {/**Render balance sheet liabilities */}
                                <StripedRow className="font-weight-semibold">
                                    {balanceSheetRenderText[appContext.locale]["Liabilities"]}
                                </StripedRow>
                                <StripedRow className="font-weight-semibold indent">
                                    {balanceSheetRenderText[appContext.locale]["Current liabilities"]}
                                </StripedRow>
                                {/** render current liabilities */}
                                {balanceSheetObjects[0].balanceSheetLiabilities.currentLiabilitiesSubtypeBalances.map(subtypeBalance => {
                                    return ( //render one striped row per current liabilities subtype
                                        zeroDebitsMinusCreditsInSubtype(subtypeBalance, "balanceSheetLiabilities", "currentLiabilitiesSubtypeBalances")
                                            ? null
                                            : <React.Fragment key={subtypeBalance.accountSubtypeId}>
                                                <StripedRow className="justify-content-between indent-2">
                                                    <div>{balanceSheetRenderText[appContext.locale][subtypeBalance.accountSubtypeName]}</div>
                                                    <div className="text-end d-flex">
                                                        {balanceSheetObjects.map((balanceSheet, i) => {
                                                            return(
                                                                <div key={i} className="width-175">
                                                                    {numberAsCurrency(balanceSheet.balanceSheetLiabilities.currentLiabilitiesSubtypeBalances.find(specificSubtype => specificSubtype.accountSubtypeId === subtypeBalance.accountSubtypeId).debitsMinusCredits * -1)}
                                                                </div>
                                                            )
                                                        })}
                                                    </div>
                                                </StripedRow>
                                                {detailedView //render detailed view for current liabilities
                                                    ? balanceSheetObjects[0].accountBalances
                                                        .filter(account => account.accountSubtypeId === subtypeBalance.accountSubtypeId)
                                                        .map(account => { //render one striped row per parent account
                                                            return (
                                                                zeroDebitsMinusCreditsInAccount(account)
                                                                    ? null
                                                                    : <React.Fragment key={account.accountId}>
                                                                        <StripedRow className="justify-content-between indent-3">
                                                                            <div>
                                                                                {account.accountName}
                                                                            </div>
                                                                            <div className="text-end d-flex">
                                                                                {account.hasChildren 
                                                                                ? null 
                                                                                : balanceSheetObjects.map((balanceSheet, i) => {
                                                                                    return(
                                                                                        <div key={i} className="width-175">
                                                                                            {numberAsCurrency(balanceSheet.accountBalances.find(specificAccount => specificAccount.accountId === account.accountId).debitsMinusCredits * -1)}
                                                                                        </div>
                                                                                    )
                                                                                })}
                                                                            </div>
                                                                        </StripedRow>
                                                                        {balanceSheetObjects[0].accountBalances //render one striped row per child account
                                                                            .filter(childAccount => childAccount.parentAccountId === account.accountId)
                                                                            .map(childAccount => {
                                                                                return (
                                                                                    zeroDebitsMinusCreditsInAccount(childAccount)
                                                                                        ? null
                                                                                        : <StripedRow className="justify-content-between indent-4" key={childAccount.accountId}>
                                                                                            <div>
                                                                                                {childAccount.accountName}
                                                                                            </div>
                                                                                            <div className="text-end d-flex">
                                                                                                {balanceSheetObjects.map((balanceSheet, i) => {
                                                                                                    return(
                                                                                                        <div key={i} className="width-175">
                                                                                                            {numberAsCurrency(balanceSheet.accountBalances.find(specificChildAccount => specificChildAccount.accountId === childAccount.accountId).debitsMinusCredits * -1)}
                                                                                                        </div>
                                                                                                    )
                                                                                                })}
                                                                                            </div>
                                                                                        </StripedRow>
                                                                                )
                                                                            })
                                                                        }
                                                                    </React.Fragment>
                                                            )
                                                        })
                                                    : null
                                                }
                                            </React.Fragment>
                                    )
                                })}
                                <StripedRow className="font-weight-semibold indent justify-content-between">
                                    <div>
                                        {balanceSheetRenderText[appContext.locale]["Total current liabilities"]}
                                    </div>
                                    <div className="text-end d-flex">
                                        {balanceSheetObjects.map((balanceSheet, i) => {
                                            return(
                                                <div key={i} className="width-175">
                                                    {numberAsCurrency(balanceSheet.balanceSheetLiabilities.totalCurrentLiabilities)}
                                                </div>
                                            )
                                        })}
                                    </div>
                                </StripedRow>
                                <StripedRow className="font-weight-semibold indent">
                                    {balanceSheetRenderText[appContext.locale]["Non-current liabilities"]}
                                </StripedRow>
                                {balanceSheetObjects[0].balanceSheetLiabilities.nonCurrentLiabilitiesSubtypeBalances.map(subtypeBalance => {
                                    return (
                                        zeroDebitsMinusCreditsInSubtype(subtypeBalance, "balanceSheetLiabilities", "nonCurrentLiabilitiesSubtypeBalances")
                                            ? null
                                            : <React.Fragment key={subtypeBalance.accountSubtypeId}>
                                                <StripedRow className="justify-content-between indent-2">
                                                    <div>{balanceSheetRenderText[appContext.locale][subtypeBalance.accountSubtypeName]}</div>
                                                    <div className="text-end d-flex">
                                                        {balanceSheetObjects.map((balanceSheet, i) => {
                                                            return(
                                                                <div key={i} className="width-175">
                                                                    {numberAsCurrency(balanceSheet.balanceSheetLiabilities.nonCurrentLiabilitiesSubtypeBalances.find(specificSubtype => specificSubtype.accountSubtypeId === subtypeBalance.accountSubtypeId).debitsMinusCredits * -1)}
                                                                </div>
                                                            )
                                                        })}
                                                    </div>
                                                </StripedRow>
                                                {detailedView //render detailed view of noncurrent liabilities
                                                    ? balanceSheetObjects[0].accountBalances //render one striped row per parent account
                                                        .filter(account => account.accountSubtypeId === subtypeBalance.accountSubtypeId)
                                                        .map(account => {
                                                            return (
                                                                zeroDebitsMinusCreditsInAccount(account)
                                                                    ? null
                                                                    : <React.Fragment key={account.accountId}>
                                                                        <StripedRow className="justify-content-between indent-3"> 
                                                                            <div>
                                                                                {account.accountName}
                                                                            </div>
                                                                            <div className="text-end d-flex">
                                                                                {account.hasChildren 
                                                                                ? null 
                                                                                : balanceSheetObjects.map((balanceSheet, i) => {
                                                                                    return(
                                                                                        <div key={i} className="width-175">
                                                                                            {numberAsCurrency(balanceSheet.accountBalances.find(specificAccount => specificAccount.accountId === account.accountId).debitsMinusCredits * -1)}
                                                                                        </div>
                                                                                    )
                                                                                })}
                                                                            </div>
                                                                        </StripedRow>
                                                                        {balanceSheetObjects[0].accountBalances //render one striped row per child account
                                                                            .filter(childAccount => childAccount.parentAccountId === account.accountId)
                                                                            .map(childAccount => {
                                                                                return (
                                                                                    zeroDebitsMinusCreditsInAccount(childAccount)
                                                                                        ? null
                                                                                        : <StripedRow className=" justify-content-between indent-4" key={childAccount.accountId}>
                                                                                            <div>
                                                                                                {childAccount.accountName}
                                                                                            </div>
                                                                                            <div className="text-end d-flex">
                                                                                                {balanceSheetObjects.map((balanceSheet, i) => {
                                                                                                    return(
                                                                                                        <div key={i} className="width-175">
                                                                                                            {numberAsCurrency(balanceSheet.accountBalances.find(specificChildAccount => specificChildAccount.accountId === childAccount.accountId).debitsMinusCredits * -1)}
                                                                                                        </div>
                                                                                                    )
                                                                                                })}
                                                                                            </div>
                                                                                        </StripedRow>
                                                                                )
                                                                            })
                                                                        }
                                                                    </React.Fragment>
                                                            )
                                                        })
                                                    : null
                                                }
                                            </React.Fragment>
                                    )
                                })}
                                <StripedRow className="justify-content-between font-weight-semibold indent">
                                    <div>
                                        {balanceSheetRenderText[appContext.locale]["Total non-current liabilities"]}
                                    </div>
                                    <div className="text-end d-flex">
                                        {balanceSheetObjects.map((balanceSheet, i) => {
                                            return(
                                                <div key={i} className="width-175">
                                                    {numberAsCurrency(balanceSheet.balanceSheetLiabilities.totalNonCurrentLiabilities)}
                                                </div>
                                            )
                                        })}
                                    </div>
                                </StripedRow>
                                <StripedRow className="justify-content-between font-weight-semibold">
                                    <div>
                                        {balanceSheetRenderText[appContext.locale]["Total liabilities"]}
                                    </div>
                                    <div className="text-end d-flex">
                                        {balanceSheetObjects.map((balanceSheet, i) => {
                                            return(
                                                <div key={i} className="width-175">
                                                    {numberAsCurrency(balanceSheet.balanceSheetLiabilities.totalLiabilities)}
                                                </div>
                                            )
                                        })}
                                    </div>
                                </StripedRow>
                            </>
                        }
                        <StripedRow>
                            <div className="invisible">{/*empty row */}empty row</div>
                        </StripedRow>
                        {(loading || !balanceSheetObjects.length )
                            ? <LoadingSpinner big />
                            : <>
                                <StripedRow className="striped-row font-weight-semibold">
                                    {balanceSheetRenderText[appContext.locale]["Equity"]}
                                </StripedRow>
                                {/**Render balance sheet equity */}
                                {balanceSheetObjects[0].balanceSheetEquity.equityItemsSubtypeBalances.map(subtypeBalance => {
                                    return (
                                        zeroDebitsMinusCreditsInSubtype(subtypeBalance, "balanceSheetEquity", "equityItemsSubtypeBalances")
                                            ? null
                                            : <React.Fragment key={subtypeBalance.accountSubtypeId}>
                                                <StripedRow className="justify-content-between indent">
                                                    <div>
                                                        {balanceSheetRenderText[appContext.locale][subtypeBalance.accountSubtypeName]}
                                                    </div>
                                                    <div className="text-end d-flex">
                                                        {balanceSheetObjects.map((balanceSheet, i) => {
                                                            return(
                                                                <div key={i} className="width-175">
                                                                    {numberAsCurrency(balanceSheet.balanceSheetEquity.equityItemsSubtypeBalances.find(specificSubtype => specificSubtype.accountSubtypeId === subtypeBalance.accountSubtypeId).debitsMinusCredits * -1)}
                                                                </div>
                                                            )
                                                        })}
                                                    </div>
                                                </StripedRow>
                                                {detailedView ?
                                                    balanceSheetObjects[0].accountBalances
                                                        .filter(account => account.accountSubtypeId === subtypeBalance.accountSubtypeId)
                                                        .map(account => {
                                                            return (
                                                                zeroDebitsMinusCreditsInAccount(account)
                                                                    ? null
                                                                    : <React.Fragment key={account.accountId}>
                                                                        <StripedRow className="justify-content-between indent-2">
                                                                            <div>
                                                                                {account.accountName}
                                                                            </div>
                                                                            <div className="text-end d-flex">
                                                                                {account.hasChildren 
                                                                                ? null 
                                                                                : balanceSheetObjects.map((balanceSheet, i) => {
                                                                                    return(
                                                                                        <div key={i} className="width-175">
                                                                                            {numberAsCurrency(balanceSheet.accountBalances.find(specificAccount => specificAccount.accountId === account.accountId).debitsMinusCredits * -1)}
                                                                                        </div>
                                                                                    )
                                                                                })}
                                                                            </div>
                                                                        </StripedRow>
                                                                        {balanceSheetObjects[0].accountBalances
                                                                            .filter(childAccount => childAccount.parentAccountId === account.accountId)
                                                                            .map(childAccount => {
                                                                                return (
                                                                                    zeroDebitsMinusCreditsInAccount(childAccount)
                                                                                        ? null
                                                                                        : <StripedRow className="justify-content-between indent-4" key={childAccount.accountId}>
                                                                                            <div>
                                                                                                {childAccount.accountName}
                                                                                            </div>
                                                                                            <div className="text-end d-flex">
                                                                                                {balanceSheetObjects.map((balanceSheet, i) => {
                                                                                                    return(
                                                                                                        <div key={i} className="width-175">
                                                                                                            {numberAsCurrency(balanceSheet.accountBalances.find(specificChildAccount => specificChildAccount.accountId === childAccount.accountId).debitsMinusCredits * -1)}
                                                                                                        </div>
                                                                                                    )
                                                                                                })}
                                                                                            </div>
                                                                                        </StripedRow>
                                                                                )
                                                                            })
                                                                        }
                                                                    </React.Fragment>
                                                            )
                                                        })
                                                    : null
                                                }
                                            </React.Fragment>
                                    )
                                })}
                                <StripedRow className="indent font-weight-semibold">
                                        {balanceSheetRenderText[appContext.locale]["Retained Earnings"]}
                                </StripedRow>
                                <StripedRow className="justify-content-between indent-2">
                                    <div>
                                        {balanceSheetRenderText[appContext.locale]["Beginning balances"]}
                                    </div>
                                    <div className="text-end d-flex">
                                        {balanceSheetObjects.map((balanceSheet, i) => {
                                            return(
                                                <div key={i} className="width-175">
                                                    {numberAsCurrency(balanceSheet.balanceSheetEquity.prevPeriodRetainedEarnings)}
                                                </div>
                                            )
                                        })}
                                    </div>
                                </StripedRow>
                                <StripedRow className="justify-content-between indent-2">
                                    <div>
                                        {balanceSheetRenderText[appContext.locale]["Net income for current fiscal period"]}
                                    </div>
                                    <div className="text-end d-flex">
                                        {balanceSheetObjects.map((balanceSheet, i) => {
                                            return(
                                                <div key={i} className="width-175">
                                                    {numberAsCurrency(balanceSheet.balanceSheetEquity.currPeriodNetIncome)}
                                                </div>
                                            )
                                        })}
                                    </div>
                                </StripedRow>
                                <StripedRow className="justify-content-between indent-2">
                                    <div>
                                        {balanceSheetRenderText[appContext.locale]["Dividends for current fiscal period"]}
                                    </div>
                                    <div className="text-end d-flex">
                                        {balanceSheetObjects.map((balanceSheet, i) => {
                                            return(
                                                <div key={i} className="width-175">
                                                    {numberAsCurrency(balanceSheet.balanceSheetEquity.currPeriodDividendsAndEquivalents)}
                                                </div>
                                            )
                                        })}
                                    </div>
                                </StripedRow>
                                <StripedRow className="justify-content-between indent-2 font-weight-semibold">
                                    <div>
                                        {balanceSheetRenderText[appContext.locale]["Ending balances of retained earnings"]}
                                    </div>
                                    <div className="text-end d-flex">
                                        {balanceSheetObjects.map((balanceSheet, i) => {
                                            return(
                                                <div key={i} className="width-175">
                                                    {numberAsCurrency(balanceSheet.balanceSheetEquity.totalRetainedEarnings)}
                                                </div>
                                            )
                                        })}
                                    </div>
                                </StripedRow>
                                <StripedRow className="font-weight-semibold justify-content-between">
                                    <div>
                                        {balanceSheetRenderText[appContext.locale]["Total equity"]}
                                    </div>
                                    <div className="text-end d-flex">
                                        {balanceSheetObjects.map((balanceSheet, i) => {
                                            return(
                                                <div key={i} className="width-175">
                                                    {numberAsCurrency(balanceSheet.balanceSheetEquity.totalEquity)}
                                                </div>
                                            )
                                        })}
                                    </div>
                                </StripedRow>
                            </>
                        }
                    </div>
                </div>
            </PerfectScrollbar>
        </>
    )
}

export default BalanceSheetRender;