import axios from 'axios';
import React from 'react';
import { Link, useParams } from 'react-router-dom';
import LoadingSpinner from '../../../components/misc/loading-spinner';
import { PageSettings } from '../../../config/page-settings';
import { API_BASE_URL, LOCALE_OPTIONS, REGISTER_BG_URL } from '../../../utils/constants';
import { registerV3Text } from '../../../utils/i18n/register-v3-text';
import LoginPageSkeleton from '../components/login-page-skeleton';
import AcceptInvitationPageContent from './accept-invitation-page-content';

function AcceptInvitation(props) {
    const appContext = React.useContext(PageSettings);
    const token = useParams().token;
    const defaultLocale = useParams().locale;
    const [loading , setLoading] = React.useState(true);
    const [hasCompletedSetup, setHasCompletedSetup] = React.useState('');
    const [email, setEmail] = React.useState('');

    React.useEffect(() => {
        let mounted = true;
        appContext.handleSetPageSidebar(false);
		appContext.handleSetPageHeader(false);
        if (defaultLocale) {
            if (defaultLocale === "en-US" || defaultLocale == "zh-TW") {
                appContext.handleSetLocale(defaultLocale);
            }
        }
        if (mounted) {
            setLoading(true);
        }
        axios.get(`${API_BASE_URL}/acceptInvitation/hasCompletedSetup/${token}`).then(response => {
            if (mounted) {
                setHasCompletedSetup(response.data.hasCompletedSetup);
                if (response.data.email) {
                    setEmail(response.data.email);
                }
                setLoading(false);
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
            {loading
                ? <div className="d-flex justify-content-center mb-5">
                    <LoadingSpinner big/>
                </div>
                : <AcceptInvitationPageContent 
                    hasCompletedSetup={hasCompletedSetup}
                    token={token}
                    email={email}
                />

            }
        </LoginPageSkeleton>
    );

}

export default AcceptInvitation;