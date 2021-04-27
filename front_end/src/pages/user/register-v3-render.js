import React from 'react';
import axios from 'axios';
import { Alert } from 'reactstrap';
import {Link} from 'react-router-dom';
import {PageSettings} from '../../config/page-settings.js';
import {API_BASE_URL, LOCALE_OPTIONS, CURRENCY_OPTIONS} from '../../utils/constants.js';
import {registerV3Text} from '../../utils/i18n/register-v3-text';
import Select from 'react-select';
import NewAccountForm from './new-account-form.js';
import FirstOrganizationForm from './first-organization-form.js';

function RegisterV3Render(props) {
    //required props: history
    const appContext = React.useContext(PageSettings);
    const axiosRegistrationInstance = axios.create();

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
    const [stepNumber, setStepNumber] = React.useState(1);
    const [somethingWentWrongAlert, setSomethingWentWrongAlert] = React.useState(false);

    const submitForm = event => {
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

        axiosRegistrationInstance.post(`${API_BASE_URL}/auth/signup`, requestBody).then(response => {
            console.log(response);
            setStepNumber(3);  
        }).catch(response => {
            if (response && response.response.data.message == "Email is already taken!") {
                setSomethingWentWrongAlert(true);
            }
        })
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
                />
            : null}
        </>
    )
}

export default RegisterV3Render;