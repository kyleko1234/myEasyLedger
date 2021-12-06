import axios from 'axios';
import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { PageSettings } from '../../../config/page-settings';
import { API_BASE_URL, LOCALE_OPTIONS, REGISTER_BG_URL } from '../../../utils/constants';
import { registerV3Text } from '../../../utils/i18n/register-v3-text';
import LoginPageSkeleton from '../components/login-page-skeleton';

function AcceptInvitation(props) {
    const appContext = React.useContext(PageSettings);
    const token = useParams().token;
    const defaultLocale = useParams().locale;
    const [hasCompletedSetup, setHasCompletedSetup] = React.useState('');

    React.useEffect(() => {
        let mounted = true;
        appContext.handleSetPageSidebar(false);
		appContext.handleSetPageHeader(false);
        if (defaultLocale) {
            if (defaultLocale === "en-US" || defaultLocale == "zh-TW") {
                appContext.handleSetLocale(defaultLocale);
            }
        }
        axios.get(`${API_BASE_URL}/acceptInvitation/hasCompletedSetup/${token}`).then(response => {
            if (mounted) {
                setHasCompletedSetup(response.data.hasCompletedSetup);
            }
        }).catch(console.log);

        return (() => {
            appContext.handleSetPageSidebar(true);
            appContext.handleSetPageHeader(true);    
            mounted = false;
        })
    }, [])

    return (
        <LoginPageSkeleton backgroundImage={REGISTER_BG_URL}>

        </LoginPageSkeleton>
    );

}

export default AcceptInvitation;