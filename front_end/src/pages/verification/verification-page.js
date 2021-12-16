import axios from 'axios';
import React from 'react';
import { Link, useParams } from 'react-router-dom';
import LoadingSpinner from '../../components/misc/loading-spinner';
import { PageSettings } from '../../config/page-settings';
import { API_BASE_URL, LOCALE_OPTIONS } from '../../utils/constants';
import { loginV3Text } from '../../utils/i18n/login-v3-text';
import { verificationText } from '../../utils/i18n/verification-text';
import LoginHeader from '../user/components/login-header';
import LoginPageSkeleton from '../user/components/login-page-skeleton';

function VerificationPage(props) {
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
        <LoginPageSkeleton>
            <LoginHeader className="mb-3"/>
            <div className="mb-5">
                {verificationResult
                    ? verificationText[appContext.locale][verificationResult](firstName, lastName)
                    : <div className="d-flex justify-content-center">
                        <LoadingSpinner big />
                    </div>
                }
            </div>
        </LoginPageSkeleton>
    )
}

export default VerificationPage;