import React from 'react';
import { Link } from 'react-router-dom';
import ToggleMobileSidebarButton from '../../components/sidebar/toggle-mobile-sidebar-button';
import Select from 'react-select';
import { PageSettings } from '../../config/page-settings';
import { settingsText } from '../../utils/i18n/settings-text';
import axios from 'axios';
import { API_BASE_URL, LOCALE_OPTIONS } from '../../utils/constants'
import LanguageSettingsModal from './language-settings-modal';
import ChangePasswordModal from './change-password-modal';
function Settings() {
    const appContext = React.useContext(PageSettings);

    const [languageSettingsModal, setLanguageSettingsModal] = React.useState(false);
    const toggleLanguageSettingsModal = () => {
        setLanguageSettingsModal(!languageSettingsModal);
    }
    const [changePasswordModal, setChangePasswordModal] = React.useState(false);
    const toggleChangePasswordModal = () => {
        setChangePasswordModal(!changePasswordModal);
    }

    return (
        <div>
            <ol className="breadcrumb float-xl-right">
                <li className="breadcrumb-item"><Link to="/">{settingsText[appContext.locale]["Home"]}</Link></li>
                <li className="breadcrumb-item active">{settingsText[appContext.locale]["Settings"]}</li>
            </ol>
            <h1 className="page-header">
                {settingsText[appContext.locale]["Settings"]}
                <ToggleMobileSidebarButton className="d-md-none float-right " />
            </h1>
            <div className="widget widget-rounded widget-list widget-list-rounded m-b-15">
                <div className="widget-header bg-light border-bottom">
                    <h4 className="widget-header-title">{settingsText[appContext.locale]["Personal Settings"]}</h4>
                </div>
                <Link replace to="#" className="widget-list-item bg-white" onClick={toggleLanguageSettingsModal}>
                    <div className="widget-list-content px-3">
                        <div className="widget-list-title">{settingsText[appContext.locale]["Language Settings"]}</div>
                    </div>
                    <div className="m-r-10 widget-list-action text-right">
                        <i className="fa fa-angle-right fa-lg text-muted"></i>
                    </div>
                </Link>
                <Link replace to="#" className="widget-list-item bg-white" onClick={toggleChangePasswordModal}>
                    <div className="widget-list-content px-3">
                        <div className="widget-list-title">{settingsText[appContext.locale]["Change Password"]}</div>
                    </div>
                    <div className="m-r-10 widget-list-action text-right">
                        <i className="fa fa-angle-right fa-lg text-muted"></i>
                    </div>
                </Link>
            </div>
            {appContext.permissions.filter(permission => permission.permissionType.id >= 3).length == 0 ? null : //only show this widget if user administrates at least one organization
                <div className="widget widget-rounded widget-list widget-list-rounded m-b-30">
                    <div className="widget-header bg-light border-bottom">
                        <h4 className="widget-header-title">{settingsText[appContext.locale]["Manage my EasyLedgers..."]}</h4>
                    </div>
                    {appContext.permissions.map(permission => {
                        return (
                            <Link key={permission.id} to={`/manage-easyledger/${permission.organization.id}`} className="widget-list-item bg-white">
                                <div className="widget-list-content px-3">
                                    <div className="widget-list-title">{permission.organization.name}</div>
                                </div>
                                <div className="m-r-10 widget-list-action text-right">
                                    <i className="fa fa-angle-right fa-lg text-muted"></i>
                                </div>
                            </Link>
                        )
                    })}
                </div>
            }
            <LanguageSettingsModal isOpen={languageSettingsModal} toggle={toggleLanguageSettingsModal}/>
            <ChangePasswordModal isOpen={changePasswordModal} toggle={toggleChangePasswordModal} />
        </div>

    )
}

export default Settings;