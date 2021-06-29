import React from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../../../utils/constants';
import { PageSettings } from '../../../config/page-settings';
import { balanceSheetRenderText } from '../../../utils/i18n/balance-sheet-render-text.js';
import { Card, CardBody } from 'reactstrap';
import Select from 'react-select';
import { Link } from 'react-router-dom';

function BalanceSheetRender() {
    const appContext = React.useContext(PageSettings);

    const today = new Date().toISOString().split('T')[0];
    const [endDate, setEndDate] = React.useState(today);
    const [loading, setLoading] = React.useState(true);

    const [detailedView, setDetailedView] = React.useState(false);
    const toggleDetailedView = () => setDetailedView(!detailedView);

    const [asOfDate, setAsOfDate] = React.useState("");
    const [prevPeriodEndDate, setPrevPeriodEndDate] = React.useState("");
    const [currPeriodStartDate, setCurrPeriodStartDate] = React.useState("");
    const [balanceSheetAssets, setBalanceSheetAssets] = React.useState(null);
    const [balanceSheetLiabilities, setBalanceSheetLiabilities] = React.useState(null);
    const [balanceSheetEquity, setBalanceSheetEquity] = React.useState(null);
    const [balanceSheetObjects, setBalanceSheetObjects] = React.useState([]);

    const [endDatesToRequest, setEndDatesToRequest] = React.useState([{label: "FY" + today.split('-')[0], endDate:today}]);
    const [dateRangePresets, setDateRangePresets] = React.useState([]);

    const [accountBalances, setAccountBalances] = React.useState([]);

    const handleChangeDate = (date, i) => {
        let newEndDatesToRequestArray = endDatesToRequest.slice();
        newEndDatesToRequestArray[i] = (
            {label: "Custom", endDate: date}
        )
        setEndDatesToRequest(newEndDatesToRequestArray);
        setEndDate(date);
    }

    const numberAsCurrency = (number) => {
        if (number == 0) {
            return new Intl.NumberFormat(appContext.locale, { style: 'currency', currency: appContext.currency }).format(0);
        }
        return new Intl.NumberFormat(appContext.locale, { style: 'currency', currency: appContext.currency }).format(number)
    }

    const requestBalanceSheetObjects = async arrayToStoreObjects => {
        for (const endDateObject of endDatesToRequest) {
            await axios.get(`${API_BASE_URL}/organization/${appContext.currentOrganizationId}/reports/balanceSheet/${endDateObject.endDate}`).then(response => {
                arrayToStoreObjects.push(response.data); //TODO make sure this preserves order correctly
            })
        }
    }

    React.useEffect(() => {
        async function fetchData() {
            setLoading(true);
            await axios.get(`${API_BASE_URL}/organization/${appContext.currentOrganizationId}/dateRangePresetsUpToDate/${today}`).then(response => {
                let formattedPresets = response.data.map(preset => {
                    return {
                        value: preset.name,
                        label: preset.name,
                        object: preset
                    }
                })
                setDateRangePresets(formattedPresets);
            })
            let fetchedBalanceSheetObjects = []
            await requestBalanceSheetObjects(fetchedBalanceSheetObjects);
            setBalanceSheetObjects(fetchedBalanceSheetObjects);
            setLoading(false);
        }
        fetchData();
    }, [endDatesToRequest])

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
            label: "FY" + today.split('-')[0], 
            endDate:today}
        )
        setEndDatesToRequest(endDatesArray);
    }
    
    const handleRemoveDateRangeButton = i => {
        let endDatesArray = endDatesToRequest.slice();
        endDatesArray.splice(i, 1);
        setEndDatesToRequest(endDatesArray);
    }

    return (
        <>
            <Card className="bg-light shadow-sm very-rounded my-4">
                <CardBody>
                    <h2 className="h5">{balanceSheetRenderText[appContext.locale]["Options"]}</h2>
                    <div>
                        {endDatesToRequest.map((endDateObject, i) => {
                            return(
                                <div className="mb-2" key={i}>
                                    { endDatesToRequest.length > 1 
                                    ?   <div className="font-weight-600 my-1 d-flex align-items-center">
                                            {balanceSheetRenderText[appContext.locale]["Date range"] + " " + (i + 1)}
                                            <button className="btn btn-light py-0 px-1 mx-1 border-0" onClick={() => handleRemoveDateRangeButton(i)}><i className="ion ion-md-close fa-fw"></i></button>
                                        </div> 
                                    : null}
                                    <div className="d-flex w-100 align-items-center" key={i}>
                                        <Select
                                            className="col-4 px-0"
                                            options={dateRangePresets}
                                            menuPortalTarget={document.body}
                                            menuShouldScrollIntoView={false}
                                            styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                                            onChange={selectedOption => handleSelectDateRangePreset(selectedOption, i)}
                                            placeholder={"Custom"}
                                            value={endDatesToRequest[i].label === "Custom" ? null : dateRangePresets.find(preset => preset.label == endDatesToRequest[i].label)}
                                        />
                                        <label className="col-2 px-1 px-sm-2 text-right my-0">{balanceSheetRenderText[appContext.locale]["As of:"]} </label>
                                        <input type="date" className=" col-6 form-control align-self-center" value={endDatesToRequest[i].endDate} onChange={event => handleChangeDate(event.target.value, i)} />
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    {endDatesToRequest.length < 3
                    ?   <div className="mb-2">
                            <Link replace to="#" onClick={handleCompareButton} className="text-decoration-none"><i className="ion ion-md-add"></i> {balanceSheetRenderText[appContext.locale]["Compare"]}</Link>
                        </div>
                    : null}
                    <div className="custom-control custom-switch">
                        <input type="checkbox" id="detailedViewCheckbox" className="custom-control-input" value={detailedView} onChange={toggleDetailedView} />
                        <label htmlFor="detailedViewCheckbox" className="my-0 custom-control-label">{balanceSheetRenderText[appContext.locale]["Detailed View"]}</label>
                    </div>
                </CardBody>
            </Card>
            <div className="overflow-auto">
                <div className="min-width-lg">
                    <div className="d-flex justify-content-between font-weight-600 text-right">
                        <div>{/*empty div for spacing*/}</div>
                        <div className="text-right d-flex">
                        {
                            endDatesToRequest.map((endDateObject, i) => {
                                return(
                                    <div className="td width-175" key={i}>
                                        {endDateObject.label === "Custom"
                                        ? balanceSheetRenderText[appContext.locale]["As of:"] + " " + endDateObject.endDate
                                        : endDateObject.label}
                                    </div>
                                )
                            })
                        }
                        </div>
                    </div>
                    <div>
                        {(loading || !balanceSheetObjects.length ) ? <div className="d-flex justify-content-center fa-3x py-3"><i className="fas fa-circle-notch fa-spin"></i></div> :
                            <>
                                <div className="striped-row font-weight-600">{balanceSheetRenderText[appContext.locale]["Assets"]}</div>
                                <div className="striped-row font-weight-600 indent">{balanceSheetRenderText[appContext.locale]["Current assets"]}</div>
                                {balanceSheetObjects[0].balanceSheetAssets.currentAssetsSubtypeBalances.map(subtypeBalance => {
                                    return (
                                        <React.Fragment key={subtypeBalance.accountSubtypeId}>
                                            <div className="striped-row justify-content-between indent-2">
                                                <div>{balanceSheetRenderText[appContext.locale][subtypeBalance.accountSubtypeName]}</div>
                                                <div className="text-right d-flex">
                                                    {balanceSheetObjects.map((balanceSheet, i) => {
                                                        return(
                                                            <div key={i} className="width-175">
                                                                {numberAsCurrency(balanceSheet.balanceSheetAssets.currentAssetsSubtypeBalances.find(specificSubtype => specificSubtype.accountSubtypeId === subtypeBalance.accountSubtypeId).debitsMinusCredits)}
                                                            </div>
                                                        )
                                                    })}
                                                </div>
                                            </div>
                                            {detailedView ?
                                                balanceSheetObjects[0].accountBalances
                                                    .filter(account => account.accountSubtypeId === subtypeBalance.accountSubtypeId)
                                                    .map(account => {
                                                        return (
                                                            <React.Fragment key={account.accountId}>
                                                                <div className="striped-row justify-content-between indent-3">
                                                                    <div>{account.accountName}</div>
                                                                    <div className="text-right d-flex">
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
                                                                </div>
                                                                {balanceSheetObjects[0].accountBalances
                                                                    .filter(childAccount => childAccount.parentAccountId === account.accountId)
                                                                    .map(childAccount => {
                                                                        return (
                                                                            <div className="striped-row justify-content-between indent-4" key={childAccount.accountId}>
                                                                                <div>
                                                                                    {childAccount.accountName}
                                                                                </div>
                                                                                <div className="text-right d-flex">
                                                                                    {balanceSheetObjects.map((balanceSheet, i) => {
                                                                                        return(
                                                                                            <div key={i} className="width-175">
                                                                                                {numberAsCurrency(balanceSheet.accountBalances.find(specificChildAccount => specificChildAccount.accountId === childAccount.accountId).debitsMinusCredits)}
                                                                                            </div>
                                                                                        )
                                                                                    })}
                                                                                </div>
                                                                            </div>
                                                                        )
                                                                    })
                                                                }
                                                            </React.Fragment>
                                                        )
                                                    })
                                                : null}
                                        </React.Fragment>
                                    )
                                })}
                                <div className="striped-row font-weight-600 indent-3 justify-content-between">
                                    <div>
                                        {balanceSheetRenderText[appContext.locale]["Total current assets"]}
                                    </div>
                                    <div className="text-right d-flex">
                                        {balanceSheetObjects.map((balanceSheet, i) => {
                                            return(
                                                <div key={i} className="width-175">
                                                    {numberAsCurrency(balanceSheet.balanceSheetAssets.totalCurrentAssets)}
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                                <div className="striped-row font-weight-600 indent">{balanceSheetRenderText[appContext.locale]["Non-current assets"]}</div>
                                {balanceSheetObjects[0].balanceSheetAssets.nonCurrentAssetsSubtypeBalances.map(subtypeBalance => {
                                    return (
                                        <React.Fragment key={subtypeBalance.accountSubtypeId}>
                                            <div className="striped-row justify-content-between indent-2">
                                                <div>{balanceSheetRenderText[appContext.locale][subtypeBalance.accountSubtypeName]}</div>
                                                <div className="text-right d-flex">
                                                    {balanceSheetObjects.map((balanceSheet, i) => {
                                                        return(
                                                            <div key={i} className="width-175">
                                                                {numberAsCurrency(balanceSheet.balanceSheetAssets.nonCurrentAssetsSubtypeBalances.find(specificSubtype => specificSubtype.accountSubtypeId === subtypeBalance.accountSubtypeId).debitsMinusCredits)}
                                                            </div>
                                                        )
                                                    })}
                                                </div>
                                            </div>
                                            {detailedView ?
                                                balanceSheetObjects[0].accountBalances
                                                    .filter(account => account.accountSubtypeId === subtypeBalance.accountSubtypeId)
                                                    .map(account => {
                                                        return (
                                                            <React.Fragment key={account.accountId}>
                                                                <div className="striped-row justify-content-between indent-3">
                                                                    <div>
                                                                        {account.accountName}
                                                                    </div>
                                                                    <div className="text-right d-flex">
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
                                                                </div>
                                                                {balanceSheetObjects[0].accountBalances
                                                                    .filter(childAccount => childAccount.parentAccountId === account.accountId)
                                                                    .map(childAccount => {
                                                                        return (
                                                                            <div key={childAccount.accountId} className="striped-row justify-content-between indent-4">
                                                                                <div>
                                                                                    {childAccount.accountName}
                                                                                </div>
                                                                                <div className="text-right d-flex">
                                                                                    {balanceSheetObjects.map((balanceSheet, i) => {
                                                                                        return(
                                                                                            <div key={i} className="width-175">
                                                                                                {numberAsCurrency(balanceSheet.accountBalances.find(specificChildAccount => specificChildAccount.accountId === childAccount.accountId).debitsMinusCredits)}
                                                                                            </div>
                                                                                        )
                                                                                    })}
                                                                                </div>
                                                                            </div>
                                                                        )
                                                                    })
                                                                }
                                                            </React.Fragment>
                                                        )
                                                    })
                                                : null}
                                        </React.Fragment>
                                    )
                                })}
                                <div className="striped-row justify-content-between font-weight-600 indent">
                                    <div>
                                        {balanceSheetRenderText[appContext.locale]["Total non-current assets"]}
                                    </div>
                                    <div className="text-right d-flex">
                                        {balanceSheetObjects.map((balanceSheet, i) => {
                                            return(
                                                <div key={i} className="width-175">
                                                    {numberAsCurrency(balanceSheet.balanceSheetAssets.totalNonCurrentAssets)}
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                                <div className="striped-row justify-content-between font-weight-600">
                                    <div>
                                        {balanceSheetRenderText[appContext.locale]["Total assets"]}
                                    </div>
                                    <div className="text-right d-flex">
                                        {balanceSheetObjects.map((balanceSheet, i) => {
                                            return(
                                                <div key={i} className="width-175">
                                                    {numberAsCurrency(balanceSheet.balanceSheetAssets.totalAssets)}
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                            </>
                        }
                        <div className="striped-row"><div className="invisible">{/*empty row */}empty row</div></div>
                        {(loading || !balanceSheetObjects.length ) ? <div className="d-flex justify-content-center fa-3x py-3"><i className="fas fa-circle-notch fa-spin"></i></div> :
                            <>
                                <div className="striped-row font-weight-600">{balanceSheetRenderText[appContext.locale]["Liabilities"]}</div>
                                <div className="striped-row font-weight-600 indent">{balanceSheetRenderText[appContext.locale]["Current liabilities"]}</div>
                                {balanceSheetObjects[0].balanceSheetLiabilities.currentLiabilitiesSubtypeBalances.map(subtypeBalance => {
                                    return (
                                        <React.Fragment key={subtypeBalance.accountSubtypeId}>
                                            <div className="striped-row justify-content-between indent-2">
                                                <div>{balanceSheetRenderText[appContext.locale][subtypeBalance.accountSubtypeName]}</div>
                                                <div className="text-right d-flex">
                                                    {balanceSheetObjects.map((balanceSheet, i) => {
                                                        return(
                                                            <div key={i} className="width-175">
                                                                {numberAsCurrency(balanceSheet.balanceSheetLiabilities.currentLiabilitiesSubtypeBalances.find(specificSubtype => specificSubtype.accountSubtypeId === subtypeBalance.accountSubtypeId).debitsMinusCredits * -1)}
                                                            </div>
                                                        )
                                                    })}
                                                </div>
                                            </div>
                                            {detailedView ?
                                                balanceSheetObjects[0].accountBalances
                                                    .filter(account => account.accountSubtypeId === subtypeBalance.accountSubtypeId)
                                                    .map(account => {
                                                        return (
                                                            <React.Fragment key={account.accountId}>
                                                                <div className="striped-row justify-content-between indent-3">
                                                                    <div>
                                                                        {account.accountName}
                                                                    </div>
                                                                    <div className="text-right d-flex">
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
                                                                </div>
                                                                {balanceSheetObjects[0].accountBalances
                                                                    .filter(childAccount => childAccount.parentAccountId === account.accountId)
                                                                    .map(childAccount => {
                                                                        return (
                                                                            <div className="striped-row justify-content-between indent-4" key={childAccount.accountId}>
                                                                                <div>
                                                                                    {childAccount.accountName}
                                                                                </div>
                                                                                <div className="text-right d-flex">
                                                                                    {balanceSheetObjects.map((balanceSheet, i) => {
                                                                                        return(
                                                                                            <div key={i} className="width-175">
                                                                                                {numberAsCurrency(balanceSheet.accountBalances.find(specificChildAccount => specificChildAccount.accountId === childAccount.accountId).debitsMinusCredits * -1)}
                                                                                            </div>
                                                                                        )
                                                                                    })}
                                                                                </div>
                                                                            </div>
                                                                        )
                                                                    })
                                                                }
                                                            </React.Fragment>
                                                        )
                                                    })
                                                : null}
                                        </React.Fragment>
                                    )
                                })}
                                <div className="striped-row font-weight-600 indent-3 justify-content-between">
                                    <div>
                                        {balanceSheetRenderText[appContext.locale]["Total current liabilities"]}
                                    </div>
                                    <div className="text-right d-flex">
                                        {balanceSheetObjects.map((balanceSheet, i) => {
                                            return(
                                                <div key={i} className="width-175">
                                                    {numberAsCurrency(balanceSheet.balanceSheetLiabilities.totalCurrentLiabilities)}
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                                <div className="striped-row font-weight-600 indent">{balanceSheetRenderText[appContext.locale]["Non-current liabilities"]}</div>
                                {balanceSheetObjects[0].balanceSheetLiabilities.nonCurrentLiabilitiesSubtypeBalances.map(subtypeBalance => {
                                    return (
                                        <React.Fragment key={subtypeBalance.accountSubtypeId}>
                                            <div className="striped-row justify-content-between indent-2">
                                                <div>{balanceSheetRenderText[appContext.locale][subtypeBalance.accountSubtypeName]}</div>
                                                <div className="text-right d-flex">
                                                    {balanceSheetObjects.map((balanceSheet, i) => {
                                                        return(
                                                            <div key={i} className="width-175">
                                                                {numberAsCurrency(balanceSheet.balanceSheetLiabilities.nonCurrentLiabilitiesSubtypeBalances.find(specificSubtype => specificSubtype.accountSubtypeId === subtypeBalance.accountSubtypeId).debitsMinusCredits * -1)}
                                                            </div>
                                                        )
                                                    })}
                                                </div>
                                            </div>
                                            {detailedView ?
                                                balanceSheetObjects[0].accountBalances
                                                    .filter(account => account.accountSubtypeId === subtypeBalance.accountSubtypeId)
                                                    .map(account => {
                                                        return (
                                                            <React.Fragment key={account.accountId}>
                                                                <div className="striped-row justify-content-between indent-3">
                                                                    <div>
                                                                        {account.accountName}
                                                                    </div>
                                                                    <div className="text-right d-flex">
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
                                                                </div>
                                                                {balanceSheetObjects[0].accountBalances
                                                                    .filter(childAccount => childAccount.parentAccountId === account.accountId)
                                                                    .map(childAccount => {
                                                                        return (
                                                                            <div className="striped-row justify-content-between indent-4" key={childAccount.accountId}>
                                                                                <div>
                                                                                    {childAccount.accountName}
                                                                                </div>
                                                                                <div className="text-right d-flex">
                                                                                    {balanceSheetObjects.map((balanceSheet, i) => {
                                                                                        return(
                                                                                            <div key={i} className="width-175">
                                                                                                {numberAsCurrency(balanceSheet.accountBalances.find(specificChildAccount => specificChildAccount.accountId === childAccount.accountId).debitsMinusCredits * -1)}
                                                                                            </div>
                                                                                        )
                                                                                    })}
                                                                                </div>
                                                                            </div>
                                                                        )
                                                                    })
                                                                }
                                                            </React.Fragment>
                                                        )
                                                    })
                                                : null}
                                        </React.Fragment>
                                    )
                                })}
                                <div className="striped-row justify-content-between font-weight-600 indent">
                                    <div>
                                        {balanceSheetRenderText[appContext.locale]["Total non-current liabilities"]}
                                    </div>
                                    <div className="text-right d-flex">
                                        {balanceSheetObjects.map((balanceSheet, i) => {
                                            return(
                                                <div key={i} className="width-175">
                                                    {numberAsCurrency(balanceSheet.balanceSheetLiabilities.totalNonCurrentLiabilities)}
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                                <div className="striped-row justify-content-between font-weight-600">
                                    <div>
                                        {balanceSheetRenderText[appContext.locale]["Total liabilities"]}
                                    </div>
                                    <div className="text-right d-flex">
                                        {balanceSheetObjects.map((balanceSheet, i) => {
                                            return(
                                                <div key={i} className="width-175">
                                                    {numberAsCurrency(balanceSheet.balanceSheetLiabilities.totalLiabilities)}
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                            </>
                        }
                        <div className="striped-row"><div className="invisible">{/*empty row */}empty row</div></div>
                        {(loading || !balanceSheetObjects.length ) ? <div className="d-flex justify-content-center fa-3x py-3"><i className="fas fa-circle-notch fa-spin"></i></div> :
                            <>
                                <div className="striped-row font-weight-600">{balanceSheetRenderText[appContext.locale]["Equity"]}</div>
                                {balanceSheetObjects[0].balanceSheetEquity.equityItemsSubtypeBalances.map(subtypeBalance => {
                                    return (
                                        <React.Fragment key={subtypeBalance.accountSubtypeId}>
                                            <div className="striped-row justify-content-between indent">
                                                <div>
                                                    {balanceSheetRenderText[appContext.locale][subtypeBalance.accountSubtypeName]}
                                                </div>
                                                <div className="text-right d-flex">
                                                    {balanceSheetObjects.map((balanceSheet, i) => {
                                                        return(
                                                            <div key={i} className="width-175">
                                                                {numberAsCurrency(balanceSheet.balanceSheetEquity.equityItemsSubtypeBalances.find(specificSubtype => specificSubtype.accountSubtypeId === subtypeBalance.accountSubtypeId).debitsMinusCredits * -1)}
                                                            </div>
                                                        )
                                                    })}
                                                </div>
                                            </div>
                                            {detailedView ?
                                                balanceSheetObjects[0].accountBalances
                                                    .filter(account => account.accountSubtypeId === subtypeBalance.accountSubtypeId)
                                                    .map(account => {
                                                        return (
                                                            <React.Fragment key={account.accountId}>
                                                                <div className="striped-row justify-content-between indent-2">
                                                                    <div>
                                                                        {account.accountName}
                                                                    </div>
                                                                    <div className="text-right d-flex">
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
                                                                </div>
                                                                {balanceSheetObjects[0].accountBalances
                                                                    .filter(childAccount => childAccount.parentAccountId === account.accountId)
                                                                    .map(childAccount => {
                                                                        return (
                                                                            <div className="striped-row justify-content-between indent-4" key={childAccount.accountId}>
                                                                                <div>
                                                                                    {childAccount.accountName}
                                                                                </div>
                                                                                <div className="text-right d-flex">
                                                                                    {balanceSheetObjects.map((balanceSheet, i) => {
                                                                                        return(
                                                                                            <div key={i} className="width-175">
                                                                                                {numberAsCurrency(balanceSheet.accountBalances.find(specificChildAccount => specificChildAccount.accountId === childAccount.accountId).debitsMinusCredits * -1)}
                                                                                            </div>
                                                                                        )
                                                                                    })}
                                                                                </div>
                                                                            </div>
                                                                        )
                                                                    })
                                                                }
                                                            </React.Fragment>
                                                        )
                                                    })
                                                : null}
                                            <div className="striped-row indent font-weight-600">{balanceSheetRenderText[appContext.locale]["Retained Earnings"]}</div>
                                            <div className="striped-row justify-content-between indent-2">
                                                <div>{balanceSheetRenderText[appContext.locale]["Beginning balances"]}</div>
                                                <div className="text-right d-flex">
                                                    {balanceSheetObjects.map((balanceSheet, i) => {
                                                        return(
                                                            <div key={i} className="width-175">
                                                                {numberAsCurrency(balanceSheet.balanceSheetEquity.prevPeriodRetainedEarnings)}
                                                            </div>
                                                        )
                                                    })}
                                                </div>
                                            </div>
                                            <div className="striped-row justify-content-between indent-2">
                                                <div>{balanceSheetRenderText[appContext.locale]["Net income for current fiscal period"]}</div>
                                                <div className="text-right d-flex">
                                                    {balanceSheetObjects.map((balanceSheet, i) => {
                                                        return(
                                                            <div key={i} className="width-175">
                                                                {numberAsCurrency(balanceSheet.balanceSheetEquity.currPeriodNetIncome)}
                                                            </div>
                                                        )
                                                    })}
                                                </div>
                                            </div>
                                            <div className="striped-row justify-content-between indent-2">
                                                <div>{balanceSheetRenderText[appContext.locale]["Dividends for current fiscal period"]}</div>
                                                <div className="text-right d-flex">
                                                    {balanceSheetObjects.map((balanceSheet, i) => {
                                                        return(
                                                            <div key={i} className="width-175">
                                                                {numberAsCurrency(balanceSheet.balanceSheetEquity.currPeriodDividendsAndEquivalents)}
                                                            </div>
                                                        )
                                                    })}
                                                </div>
                                            </div>
                                            <div className="striped-row justify-content-between indent-3 font-weight-600">
                                                <div>{balanceSheetRenderText[appContext.locale]["Ending balances of retained earnings"]}</div>
                                                <div className="text-right d-flex">
                                                    {balanceSheetObjects.map((balanceSheet, i) => {
                                                        return(
                                                            <div key={i} className="width-175">
                                                                {numberAsCurrency(balanceSheet.balanceSheetEquity.totalRetainedEarnings)}
                                                            </div>
                                                        )
                                                    })}
                                                </div>
                                            </div>
                                            <div className="striped-row font-weight-600 justify-content-between">
                                                <div>{balanceSheetRenderText[appContext.locale]["Total equity"]}</div>
                                                <div className="text-right d-flex">
                                                    {balanceSheetObjects.map((balanceSheet, i) => {
                                                        return(
                                                            <div key={i} className="width-175">
                                                                {numberAsCurrency(balanceSheet.balanceSheetEquity.totalEquity)}
                                                            </div>
                                                        )
                                                    })}
                                                </div>
                                            </div>
                                        </React.Fragment>
                                    )
                                })}
                            </>
                        }
                    </div>
                </div>
            </div>
        </>


    )
}

export default BalanceSheetRender;