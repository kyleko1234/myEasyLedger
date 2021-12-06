import axios from 'axios';
import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { PageSettings } from '../../config/page-settings';
import { API_BASE_URL, LOCALE_OPTIONS } from '../../utils/constants';
import { loginV3Text } from '../../utils/i18n/login-v3-text';
import { verificationText } from '../../utils/i18n/verification-text';

function Verification(props) {
    const appContext = React.useContext(PageSettings);
    const verificationToken = useParams().verificationToken;
    const defaultLocale = useParams().locale;
    const [firstName, setFirstName] = React.useState("Kyle");
    const [lastName, setLastName] = React.useState("Ko");
    const [verificationResult, setVerificationResult] = React.useState("");
    
    React.useEffect(() => {
        if (defaultLocale) {
            if (defaultLocale === "en-US" || defaultLocale == "zh-TW") {
                appContext.handleSetLocale(defaultLocale);
            }
        }
        axios.get(`${API_BASE_URL}/verification/${verificationToken}`).then(response => {
            setFirstName(response.data.firstName);
            setLastName(response.data.lastName);
            setVerificationResult(response.data.verificationResult);
        }).catch(console.log);
    }, [verificationToken])


    return (
        <div className="login-page" style={{ backgroundImage: 'url(/assets/img/login-bg/login-bg-11.jpg)' }} >
            <div className="login-left" >
                <div className="login-left-caption">
                    <div className="login-left-caption-title"> my<b>Easy</b>Ledger</div>
                    <p>
                        {loginV3Text[appContext.locale]["App description"]}
                    </p>
                </div>
            </div>
            <div className="login-right overflow-auto">
                <div className="login-header mb-3">
                    my<b>Easy</b>Ledger
                </div>
                <div className="login-content mb-5">
                    {verificationResult
                        ? verificationText[appContext.locale][verificationResult](firstName, lastName)
                        : <div className="d-flex justify-content-center"><i className="fa-3x fas fa-circle-notch fa-spin"></i></div>
                    }
                </div>
                <div>
                    {LOCALE_OPTIONS.map(localeOption => {
                        return (
                            appContext.locale == localeOption.value ?
                                <b key={localeOption.value} className="mr-3 font-weight-600">{localeOption.label}</b> :
                                <Link key={localeOption.value} replace to="#" onClick={() => appContext.handleSetLocale(localeOption.value)} className="mr-3">{localeOption.label}</Link>
                        )
                    })}
                </div>
                <hr width="100%"/>
                <p className="text-center text-grey-darker">
                    {loginV3Text[appContext.locale]["Copyright text"]}
                </p>
            </div>
        </div>
    )
}

export default Verification;