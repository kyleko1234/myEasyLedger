import React from 'react';
import { Link } from 'react-router-dom';
import { PageSettings } from '../../../config/page-settings';
import { LOCALE_OPTIONS } from '../../../utils/constants';

function LocaleSwitcher(props) {
    const appContext = React.useContext(PageSettings);
    
    return (
        <div>
            {LOCALE_OPTIONS.map(localeOption => {
                return (
                    appContext.locale == localeOption.value ?
                        <b key={localeOption.value} className="me-3 fw-semibold">{localeOption.label}</b> :
                        <Link key={localeOption.value} replace to="#" onClick={() => appContext.handleSetLocale(localeOption.value)} className="me-3">{localeOption.label}</Link>
                )
            })}
        </div>
    )
}

export default LocaleSwitcher;