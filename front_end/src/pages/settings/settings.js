import React from 'react';
import {Link} from 'react-router-dom';
import ToggleMobileSidebarButton from '../../components/sidebar/toggle-mobile-sidebar-button';
import Select from 'react-select';
import { PageSettings } from '../../config/page-settings';
import {settingsText} from '../../utils/i18n/settings-text';
import axios from 'axios';
import {API_BASE_URL} from '../../utils/constants'
function Settings() {
    const appContext = React.useContext(PageSettings);
    const [selectedLocale, setSelectedLocale] = React.useState(appContext.locale);
    
    const localeOptions = [
        {value: "en-US", label: "English (US)"},
        {value: "zh-TW", label: "中文 (繁體)"}
    ];

    const handleChangeLocaleOption = (selectedOption) => {
        setSelectedLocale(selectedOption.value);
    }

    const handleSaveButton = () => {
        let payload = {
            locale: selectedLocale
        }
        axios.patch(`${API_BASE_URL}/person/${appContext.personId}`, payload).then(response => {
            console.log(response);
            appContext.fetchUserInfo(appContext.personId);
        })
    }

    return(
        <div>
            <ol className="breadcrumb float-xl-right">
                <li className="breadcrumb-item"><Link to="/">{settingsText[appContext.locale]["Home"]}</Link></li>
                <li className="breadcrumb-item active">{settingsText[appContext.locale]["Settings"]}</li>
            </ol>
            <h1 className="page-header">
                    {settingsText[appContext.locale]["Settings"]} 
                    <ToggleMobileSidebarButton className="d-md-none float-right "/>
            </h1>
            <div className="widget widget-rounded px-3 py-3">
                <div className="form-group row">
                    <label className="col-md-2 col-form-label">
                        {settingsText[appContext.locale]["Language"]}
                    </label>
                    <div className="col-md-4">
                        <Select
                            options={localeOptions}
                            onChange={handleChangeLocaleOption}
                            value={localeOptions.find(localeOption => localeOption.value == selectedLocale)}
                            menuPortalTarget={document.body}
                            styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                            menuPlacement={'auto'}
                        />
                    </div>
                </div>
                <button className="btn btn-primary width-125" onClick={handleSaveButton}>{settingsText[appContext.locale]["Save"]}</button>
            </div>
        </div>
    )
}

export default Settings;