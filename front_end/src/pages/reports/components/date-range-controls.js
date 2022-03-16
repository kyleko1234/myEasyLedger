import React from 'react';
import { Alert, Card, CardBody } from 'reactstrap';
import { PageSettings } from '../../../config/page-settings';
import { incomeStatementRenderText } from '../../../utils/i18n/income-statement-render-text';
import Select from 'react-select';
import { Link } from 'react-router-dom';


function DateRangeControls({datesToRequest, invalidDateAlert, handleUpdateReportButton, handleRemoveDateRangeButton, dateRangePresets, handleSelectDateRangePreset, handleChangeStartDate, handleChangeEndDate, detailedView, toggleDetailedView, handleCompareButton }) {
    const appContext = React.useContext(PageSettings);
    
    return(
        <Card className="very-rounded shadow-sm bg-light my-4">
            <CardBody className="">
                <Alert isOpen={invalidDateAlert} color="danger">
                    {incomeStatementRenderText[appContext.locale]["Invalid date(s) selected."]}
                </Alert>
                <form onSubmit={handleUpdateReportButton}>
                    <div className="mb-2">
                        <h2 className="h5 my-0">{incomeStatementRenderText[appContext.locale]["Options"]}</h2>
                    </div>
                    <div className="d-none d-md-block">
                        {datesToRequest.map((dateObject, i) => {
                            return (
                                <div key={i}>
                                    {datesToRequest.length > 1
                                    ?   <div className="font-weight-semibold my-1 d-flex align-items-center">
                                            {incomeStatementRenderText[appContext.locale]["Date range"] + " " + (i + 1)}
                                            <button className="btn btn-light py-0 px-1 mx-1 border-0" onClick={() => handleRemoveDateRangeButton(i)}>
                                                <i className="ion ion-md-close fa-fw"></i>
                                            </button>
                                        </div>
                                    : null}
                                    <div className="d-flex w-100 align-items-center mb-2">
                                        <Select
                                            className="col-4 px-0"
                                            classNamePrefix="form-control"
                                            options={dateRangePresets}
                                            menuPortalTarget={document.body}
                                            menuShouldScrollIntoView={false}
                                            styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                                            onChange={selectedOption => handleSelectDateRangePreset(selectedOption, i)}
                                            placeholder={"Custom"}
                                            value={datesToRequest[i].label === "Custom" ? null : dateRangePresets.find(preset => preset.label == datesToRequest[i].label)}
                                        />
                                        <label className="my-0 text-right col-1 px-2">{incomeStatementRenderText[appContext.locale]["From:"]} </label>
                                        <input type="date" placeholder={incomeStatementRenderText[appContext.locale]["yyyy-mm-dd"]} className="form-control col-3" value={datesToRequest[i].startDate} onChange={event => handleChangeStartDate(event.target.value, i)} />
                                        <label className="my-0 text-right col-1 px-2">{incomeStatementRenderText[appContext.locale]["To:"]} </label>
                                        <input type="date" placeholder={incomeStatementRenderText[appContext.locale]["yyyy-mm-dd"]} className="form-control col-3" value={datesToRequest[i].endDate} onChange={event => handleChangeEndDate(event.target.value, i)} />
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    <div className="d-md-none">
                        {datesToRequest.map((dateObject, i) => {
                            return (
                                <div key={i}>
                                    <div className="d-flex my-1 justify-content-between">
                                        <div className="font-weight-semibold d-flex align-items-center">
                                            {incomeStatementRenderText[appContext.locale]["Date range"] + (datesToRequest.length > 1? (" " + (i + 1)) : "" )}
                                            <button className={"btn btn-light py-0 px-1 mx-1 border-0 " + (datesToRequest.length > 1 ? "" : " invisible")} onClick={() => handleRemoveDateRangeButton(i)}>
                                                <i className="ion ion-md-close fa-fw"></i>
                                            </button>
                                        </div>
                                        <Select
                                            className="col-6 px-0"
                                            classNamePrefix="form-control"
                                            options={dateRangePresets}
                                            menuPortalTarget={document.body}
                                            menuShouldScrollIntoView={false}
                                            styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                                            onChange={selectedOption => handleSelectDateRangePreset(selectedOption, i)}
                                            placeholder={"Custom"}
                                            value={datesToRequest[i].label === "Custom" ? null : dateRangePresets.find(preset => preset.label == datesToRequest[i].label)}
                                        />
                                    </div>
                                    <div className="d-flex justify-content-between text-left align-items-center my-1">
                                        <label className="my-0 col-3 px-0">
                                            {incomeStatementRenderText[appContext.locale]["From:"]} 
                                        </label>
                                        <input 
                                            type="date" 
                                            placeholder={incomeStatementRenderText[appContext.locale]["yyyy-mm-dd"]}
                                            className="form-control" 
                                            value={datesToRequest[i].startDate} 
                                            onChange={event => handleChangeStartDate(event.target.value, i)} 
                                        />
                                    </div>
                                    <div className="d-flex justify-content-between text-left align-items-center mb-2">
                                        <label className="my-0 col-3 px-0">
                                            {incomeStatementRenderText[appContext.locale]["To:"]} 
                                        </label>
                                        <input 
                                            type="date" 
                                            placeholder={incomeStatementRenderText[appContext.locale]["yyyy-mm-dd"]}
                                            className="form-control" 
                                            value={datesToRequest[i].endDate} 
                                            onChange={event => handleChangeEndDate(event.target.value, i)} 
                                        />
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    {datesToRequest.length < 3
                        ?   <div className="mb-2">
                                <Link replace to="#" onClick={handleCompareButton} className="text-decoration-none">
                                    <i className="ion ion-md-add"></i> {incomeStatementRenderText[appContext.locale]["Compare"]}
                                </Link>
                            </div>
                        : null
                    }
                    <div className="d-flex align-items-center justify-content-between mt-2">
                        <div className="custom-control custom-switch">
                            <input type="checkbox" id="detailedViewCheckbox" className="custom-control-input" value={detailedView} onChange={toggleDetailedView} />
                            <label htmlFor="detailedViewCheckbox" className="my-0 custom-control-label">{incomeStatementRenderText[appContext.locale]["Detailed View"]}</label>
                        </div>
                        <button type="submit" className="btn btn-primary width-200" onClick={handleUpdateReportButton}>
                            {incomeStatementRenderText[appContext.locale]["Update report"]}
                        </button>
                    </div>
                </form>
            </CardBody>
        </Card>
    )
}

export default DateRangeControls;