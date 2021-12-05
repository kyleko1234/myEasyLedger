import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { PageSettings } from '../../../config/page-settings';
import { LOCALE_OPTIONS } from '../../../utils/constants';
import { registerV3Text } from '../../../utils/i18n/register-v3-text';

function AcceptInvitation(props) {
    const appContext = React.useContext(PageSettings);
    const token = useParams().token;
    const defaultLocale = useParams().locale;

    React.useEffect(() => {
        let mounted = true;
        appContext.handleSetPageSidebar(false);
		appContext.handleSetPageHeader(false);
        if (defaultLocale) {
            if (defaultLocale === "en-US" || defaultLocale == "zh-TW") {
                appContext.handleSetLocale(defaultLocale);
            }
        }
        return (() => {
            appContext.handleSetPageSidebar(true);
            appContext.handleSetPageHeader(true);    
            mounted = false;
        })
    })

    return (
        <div className="login-page" style={{ backgroundImage: 'url(/assets/img/login-bg/login-bg-12.jpg)' }}>
            <div className="login-left">
                <div className="login-left-caption">
                    <div className="login-left-caption-title">my<b>Easy</b>Ledger</div>
                    <p>
                        {registerV3Text[appContext.locale]["App description"]}
                    </p>
                </div>
            </div>
            <div className="login-right overflow-auto">
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
                    {registerV3Text[appContext.locale]["Copyright text"]}
                </p>
            </div>
        </div>
    );

}

export default AcceptInvitation;