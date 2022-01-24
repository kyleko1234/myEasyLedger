import React from 'react';
import axios from 'axios';
import {PageSettings} from '../../../config/page-settings.js';
import {API_BASE_URL, LOCALE_OPTIONS, CURRENCY_OPTIONS} from '../../../utils/constants.js';
import NewAccountForm from './new-account-form.js';
import FirstOrganizationForm from './first-organization-form.js';
import RegistrationSuccessful from './registration-successful.js';
import NetworkErrorHandler from '../../../components/network-error/network-error-handler.js';

function RegisterController(props) {
    //required props: history
    const appContext = React.useContext(PageSettings);
    const axiosRegistrationInstance = axios.create();
    const defaultCurrencyValue = LOCALE_OPTIONS.find(localeOption => localeOption.value === appContext.locale).defaultCurrency;

    const [firstNameInput, setFirstNameInput] = React.useState('');
    const [lastNameInput, setLastNameInput] = React.useState('');
    const [emailInput, setEmailInput] = React.useState('');
    const [reEnterEmailInput, setReEnterEmailInput] = React.useState('');
    const [organizationNameInput, setOrganizationNameInput] = React.useState('');
    const [passwordInput, setPasswordInput] = React.useState('');
    const [reEnterPasswordInput, setReEnterPasswordInput] = React.useState('');
    const [agreeInput, setAgreeInput] = React.useState(true);
    const currencyOptions = CURRENCY_OPTIONS(appContext.locale);
    const [selectedCurrency, setSelectedCurrency] = React.useState(currencyOptions.find(option => option.value == (defaultCurrencyValue ? defaultCurrencyValue : "USD")));
    const [isEnterprise, setIsEnterprise] = React.useState(false);
    const [stepNumber, setStepNumber] = React.useState(1);
    const [somethingWentWrongAlert, setSomethingWentWrongAlert] = React.useState(false);

    const submitForm = async event => {
        event.preventDefault();

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

        await axiosRegistrationInstance.post(`${API_BASE_URL}/auth/signup`, requestBody).then(response => {
            console.log(response);
            setStepNumber(3);  
        }).catch(response => {
            if (response && response.response.data.message == "Email is already taken!") {
                setSomethingWentWrongAlert(true);
            }
        }) 
    }

    const handleChangeLocale = newLocale => {
        appContext.handleSetLocale(newLocale);
        let localeCurrency = LOCALE_OPTIONS.find(localeOption => localeOption.value === newLocale).defaultCurrency;
        let tempCurrencyOptions = CURRENCY_OPTIONS(newLocale);
        //the previous line is necessary because of React's async setState behavior; React will not update currencyOptions to the new locale before the next line is executed
        setSelectedCurrency(tempCurrencyOptions.find(option => option.value == (localeCurrency ? localeCurrency : "USD")));
    }

    return (
        <>
            {stepNumber === 1
            ?   <NewAccountForm
                    firstNameInput={firstNameInput} setFirstNameInput={setFirstNameInput}
                    lastNameInput={lastNameInput} setLastNameInput={setLastNameInput}
                    emailInput={emailInput} setEmailInput={setEmailInput}
                    reEnterEmailInput={reEnterEmailInput} setReEnterEmailInput={setReEnterEmailInput}
                    passwordInput={passwordInput} setPasswordInput={setPasswordInput}
                    reEnterPasswordInput={reEnterPasswordInput} setReEnterPasswordInput={setReEnterPasswordInput}
                    setStepNumber={setStepNumber} axiosInstance={axiosRegistrationInstance}
                    handleChangeLocale={handleChangeLocale}
                />
            : null}
            {stepNumber === 2
            ?   <FirstOrganizationForm
                    organizationNameInput={organizationNameInput} setOrganizationNameInput={setOrganizationNameInput}
                    selectedCurrency={selectedCurrency} setSelectedCurrency={setSelectedCurrency} currencyOptions={currencyOptions}
                    isEnterprise={isEnterprise} setIsEnterprise={setIsEnterprise}
                    agreeInput={agreeInput} setAgreeInput={setAgreeInput}
                    setStepNumber={setStepNumber} submitForm={submitForm}
                    somethingWentWrongAlert={somethingWentWrongAlert} setSomethingWentWrongAlert={setSomethingWentWrongAlert}
                    handleChangeLocale={handleChangeLocale}
                />
            : null}
            {stepNumber === 3
            ? <RegistrationSuccessful/>
            : null}
            <NetworkErrorHandler axiosInstance={axiosRegistrationInstance} />
        </>
    )
}

export default RegisterController;