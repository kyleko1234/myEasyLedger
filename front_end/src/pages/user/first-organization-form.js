import React from 'react';
import { PageSettings } from '../../config/page-settings';
import { LOCALE_OPTIONS } from '../../utils/constants';
import { registerV3Text } from '../../utils/i18n/register-v3-text';
import Select from 'react-select';
import { Alert } from 'reactstrap';
import {Link} from 'react-router-dom';


function FirstOrganizationForm(props) {
    //required props: organizationNameInput, setOrganizationNameInput, selectedCurrency, setSelectedCurrency, currencyOptions,
    //  isEnterprise, setIsEnterprise, agreeInput, setAgreeInput, setStepNumber, submitForm, somethingWentWrongAlert, setSomethingWentWrongAlert
    const appContext = React.useContext(PageSettings);
    const [agreeAlert, setAgreeAlert] = React.useState(false);
    const handleIsEnterpriseRadioChange = (event) => {
        props.setIsEnterprise(event.target.value === "true"? true : false);
    }
    const validateForm = event => {
        event.preventDefault();
        setAgreeAlert(false);
        if (!props.agreeInput) {
            setAgreeAlert(true);
            return;
        }
        props.submitForm(event);
    }

    return(
        <div className="slide-in">
            <h1 className="register-header">
                {registerV3Text[appContext.locale]["Sign Up"]}
                <small>{registerV3Text[appContext.locale]["Create your first EasyLedger."]}</small>
                {props.somethingWentWrongAlert ? <Alert color="danger">{registerV3Text[appContext.locale]["Something went wrong. Please try again later."]}</Alert> : null}
            </h1>
            <div className="register-content">
                <form className="margin-bottom-0" onSubmit={event => validateForm(event)}>
                    <label className="control-label">{registerV3Text[appContext.locale]["EasyLedger Name"]} <span className="text-danger">*</span></label>
                    <div className="row m-b-15">
                        <div className="col-md-12">
                            <input type="text" className="form-control" placeholder={registerV3Text[appContext.locale]["EasyLedger Name"]} required value={props.organizationNameInput} onChange={event => props.setOrganizationNameInput(event.target.value)}/>
                        </div>
                    </div>
                    <label className="control-label">{registerV3Text[appContext.locale]["Currency"]}<span className="text-danger">*</span></label>
                    <div className="row m-b-15">
                        <div className="col-md-12">
                            <Select
                                options={props.currencyOptions}
                                value={props.selectedCurrency}
                                isSearchable={true}
                                onChange={(selectedOption) => {
                                    props.setSelectedCurrency(selectedOption);
                                }}
                            />
                        </div>
                    </div>
                    {/*<div className="checkbox checkbox-css m-b-30">
                        <div className="checkbox checkbox-css m-b-30">
                            <input type="checkbox" id="is_enterprise_checkbox" value={props.isEnterprise} onChange={() => props.setIsEnterprise(!props.isEnterprise)} />
                            <label htmlFor="is_enterprise_checkbox">
                                isEnterprise
                            </label> 
                        </div>
                    </div> */}
                    <label>{registerV3Text[appContext.locale]["Create an EasyLedger for:"]}</label>
                    <div className="row m-b-15 p-l-25">
                        <div className="col-md-12 radio radio-css m-b-5">
                            <input type="radio" id="is-enterprise-true" name="is-enterprise-radio" value={true} checked={props.isEnterprise === true} onChange={handleIsEnterpriseRadioChange}/>
                            <label htmlFor="is-enterprise-true">
                                <div className="p-l-5">{registerV3Text[appContext.locale]["Enterprise use"]}</div>
                            </label>
                        </div>
                        <div className="col-md-12 radio radio-css">
                            <input type="radio" id="is-enterprise-false" name="is-enterprise-radio" value={false} checked={props.isEnterprise === false} onChange={handleIsEnterpriseRadioChange}/>
                            <label htmlFor="is-enterprise-false">
                                <div className="p-l-5">{registerV3Text[appContext.locale]["Personal use"]}</div>
                            </label>
                        </div>       
                    </div>
                    <div className="checkbox checkbox-css m-b-30">
                        <div className="checkbox checkbox-css m-b-30">
                            <input type="checkbox" id="agreement_checkbox" value={props.agreeInput} onChange={() => props.setAgreeInput(!props.agreeInput)} />
                            <label htmlFor="agreement_checkbox">
                                {registerV3Text[appContext.locale]["Agreement text"]}
                                {/** TODO: terms and conditions lol */}
                            </label> 
                        </div>
                    </div>
                    {agreeAlert ? <Alert color="danger">{registerV3Text[appContext.locale]["Please agree."]}</Alert> : null}

                    <div className="register-buttons">
                        <button type="submit" className="btn btn-primary btn-block btn-lg">{registerV3Text[appContext.locale]["Sign Up"]}</button>
                    </div>
                    <div className="m-t-20 p-b-40 text-inverse">
                        {registerV3Text[appContext.locale]["Already a member"]}
                    </div>
                    <div>
                        {LOCALE_OPTIONS.map(localeOption => {
                            return(
                                appContext.locale == localeOption.value? 
                                <b key={localeOption.value} className="mr-3 font-weight-600">{localeOption.label}</b> : 
                                <Link key={localeOption.value} replace to="#" onClick={() => appContext.handleSetLocale(localeOption.value)} className="mr-3">{localeOption.label}</Link>
                            )
                        })}
                    </div>
                    <hr />
                    <p className="text-center">
                        {registerV3Text[appContext.locale]["Copyright text"]}
                    </p>
                </form>
            </div>
        </div>

    )
}
export default FirstOrganizationForm;