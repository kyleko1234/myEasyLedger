import React from 'react';
import axios from 'axios';
import { Alert } from 'reactstrap';
import {Link} from 'react-router-dom';
import {PageSettings} from '../../config/page-settings.js';
import {API_BASE_URL, LOCALE_OPTIONS, CURRENCY_OPTIONS} from '../../utils/constants.js';
import {registerV3Text} from '../../utils/i18n/register-v3-text';
import Select from 'react-select';

function RegisterV3Render(props) {
    //required props: history
    const appContext = React.useContext(PageSettings);

    const [firstNameInput, setFirstNameInput] = React.useState('');
    const [lastNameInput, setLastNameInput] = React.useState('');
    const [emailInput, setEmailInput] = React.useState('');
    const [reEnterEmailInput, setReEnterEmailInput] = React.useState('');
    const [organizationNameInput, setOrganizationNameInput] = React.useState('');
    const [passwordInput, setPasswordInput] = React.useState('');
    const [reEnterPasswordInput, setReEnterPasswordInput] = React.useState('');
    const [agreeInput, setAgreeInput] = React.useState(false);
    const currencyOptions = CURRENCY_OPTIONS(appContext.locale);
    const [selectedCurrency, setSelectedCurrency] = React.useState(currencyOptions.find(option => option.value == "USD"));
    const [isEnterprise, setIsEnterprise] = React.useState(true);

    const [emailMatchAlert, setEmailMatchAlert] = React.useState(false);
    const [emailTakenAlert, setEmailTakenAlert] = React.useState(false);
    const [passwordMatchAlert, setPasswordMatchAlert] = React.useState(false);
    const [agreeAlert, setAgreeAlert] = React.useState(false);

    const handleSubmit = event => {
        event.preventDefault();
        setEmailMatchAlert(false);
        setEmailTakenAlert(false);
        setPasswordMatchAlert(false);
        setAgreeAlert(false);

        if (emailInput !== reEnterEmailInput) {
            setEmailMatchAlert(true);
            return;
        }

        if (passwordInput !== reEnterPasswordInput) {
            setPasswordMatchAlert(true);
            return;
        }

        if (!agreeInput) {
            setAgreeAlert(true);
            return;
        }

        let requestBody = {
            firstName: firstNameInput,
            lastName: lastNameInput,
            email: emailInput,
            reEnterEmail: reEnterEmailInput,
            password: passwordInput,
            reEnterPassword: reEnterPasswordInput,
            agree: agreeInput,
            organizationName: organizationNameInput,
            locale: appContext.locale,
            isEnterprise: isEnterprise,
            currency: selectedCurrency.value
        }

        axios.post(`${API_BASE_URL}/auth/signup`, requestBody).then(response => {
             props.history.push('/user/registration-successful')  
        }).catch(response => {
            if (response && response.response.data.message == "Email is already taken!") {
                setEmailTakenAlert(true);
            }
        })
        
    }

    return (
        <div className="register register-with-news-feed">
            <div className="news-feed">
                <div className="news-image" style={{ backgroundImage: 'url(/assets/img/login-bg/login-bg-9.jpg)' }}></div>
                <div className="news-caption">
                    <h4 className="caption-title"><b>Easy</b> Ledger App</h4>
                    <p>
                        {registerV3Text[appContext.locale]["App description"]}
                    </p>
                </div>
            </div>
            <div className="right-content">
                <h1 className="register-header">
                    {registerV3Text[appContext.locale]["Sign Up"]}
                    <small>{registerV3Text[appContext.locale]["Create your Easy Ledger Account."]}</small>
                </h1>
                <div className="register-content">
                    <form className="margin-bottom-0" onSubmit={event => handleSubmit(event)}>
                        <label className="control-label">{registerV3Text[appContext.locale]["Name"]} <span className="text-danger">*</span></label>
                        <div className="row row-space-10">
                            <div className="col-md-6 m-b-15">
                                <input type="text" className="form-control" placeholder={registerV3Text[appContext.locale]["First name"]} required value={firstNameInput} onChange={event => setFirstNameInput(event.target.value)} />
                            </div>
                            <div className="col-md-6 m-b-15">
                                <input type="text" className="form-control" placeholder={registerV3Text[appContext.locale]["Last name"]} required value={lastNameInput} onChange={event => setLastNameInput(event.target.value)}/>
                            </div>
                        </div>
                        <label className="control-label">{registerV3Text[appContext.locale]["Email"]} <span className="text-danger">*</span></label>
                        <div className="row m-b-15">
                            <div className="col-md-12">
                                <input type="email" className="form-control" placeholder={registerV3Text[appContext.locale]["Email address"]} required value={emailInput} onChange={event => setEmailInput(event.target.value)}/>
                            </div>
                        </div>
                        {emailTakenAlert? <Alert color="danger">{registerV3Text[appContext.locale]["Email is already taken."]}</Alert> : null}
                        <label className="control-label">{registerV3Text[appContext.locale]["Re-enter Email"]} <span className="text-danger">*</span></label>
                        <div className="row m-b-15">
                            <div className="col-md-12">
                                <input type="email" className="form-control" placeholder={registerV3Text[appContext.locale]["Re-enter email address"]} required value={reEnterEmailInput} onChange={event => setReEnterEmailInput(event.target.value)}/>
                            </div>
                        </div>
                        {emailMatchAlert ? <Alert color="danger">{registerV3Text[appContext.locale]["Email does not match."]}</Alert> : null}
                        <label className="control-label">{registerV3Text[appContext.locale]["Organization Name"]} <span className="text-danger">*</span></label>
                        <div className="row m-b-15">
                            <div className="col-md-12">
                                <input type="text" className="form-control" placeholder={registerV3Text[appContext.locale]["Organization Name"]} required value={organizationNameInput} onChange={event => setOrganizationNameInput(event.target.value)}/>
                            </div>
                        </div>
                        <label className="control-label">{registerV3Text[appContext.locale]["Password"]} <span className="text-danger">*</span></label>
                        <div className="row m-b-15">
                            <div className="col-md-12">
                                <input type="password" className="form-control" placeholder={registerV3Text[appContext.locale]["Password" ]} required value={passwordInput} onChange={event => setPasswordInput(event.target.value)}/>
                            </div>
                        </div>
                        <label className="control-label">{registerV3Text[appContext.locale]["Re-enter Password"]} <span className="text-danger">*</span></label>
                        <div className="row m-b-15">
                            <div className="col-md-12">
                                <input type="password" className="form-control" placeholder={registerV3Text[appContext.locale]["Password"]} required value={reEnterPasswordInput} onChange={event => setReEnterPasswordInput(event.target.value)}/>
                            </div>
                        </div>
                        {passwordMatchAlert ? <Alert color="danger">{registerV3Text[appContext.locale]["Password does not match."]}</Alert> : null}
                        <label className="control-label">Currency<span className="text-danger">*</span></label>
                        <div className="row m-b-15">
                            <div className="col-md-12">
                                <Select
                                    options={currencyOptions}
                                    value={selectedCurrency}
                                    isSearchable={true}
                                    onChange={(selectedOption) => {
                                        setSelectedCurrency(selectedOption);
                                    }}
                                />
                            </div>
                        </div>
                        <div className="checkbox checkbox-css m-b-30">
                            <div className="checkbox checkbox-css m-b-30">
                                <input type="checkbox" id="is_enterprise_checkbox" value={isEnterprise} onChange={() => setIsEnterprise(!isEnterprise)} />
                                <label htmlFor="is_enterprise_checkbox">
                                    isEnterprise
                                    {/** TODO: make this look good */}
                                </label> 
                            </div>
                        </div>
                        <div className="checkbox checkbox-css m-b-30">
                            <div className="checkbox checkbox-css m-b-30">
                                <input type="checkbox" id="agreement_checkbox" value={agreeInput} onChange={() => setAgreeInput(!agreeInput)} />
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
        </div>
    )
}

export default RegisterV3Render;