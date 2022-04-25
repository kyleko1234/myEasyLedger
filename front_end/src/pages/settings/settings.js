import React from 'react';
import { Link } from 'react-router-dom';
import { PageSettings } from '../../config/page-settings';
import { settingsText } from '../../utils/i18n/settings-text';
import LanguageSettingsModal from './language-settings-modal';
import ChangePasswordModal from './change-password-modal';
import { Card, CardBody, CardTitle } from 'reactstrap';
import AppearanceSettingsModal from './appearance-settings-modal';
import ChangeNameModal from './change-name-modal';
import ChangeResultsPerPageModal from './change-results-per-page-modal';
import LoadingSpinner from '../../components/misc/loading-spinner';
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
    const [appearanceSettingsModal, setAppearanceSettingsModal] = React.useState(false);
    const toggleAppearanceSettingsModal = () => {
        setAppearanceSettingsModal(!appearanceSettingsModal);
    }
    const [changeNameModal, setChangeNameModal] = React.useState(false);
    const toggleChangeNameModal = () => {
        setChangeNameModal(!changeNameModal);
    }

    const [changeResultsPerPageModal, setChangeResultsPerPageModal] = React.useState(false);
    const toggleChangeResultsPerPageModal = () => {
        setChangeResultsPerPageModal(!changeResultsPerPageModal);
    }

    return (
        <div>
            <h1 className="page-header">
                {settingsText[appContext.locale]["Settings"]}
            </h1>
            <Card className="very-rounded mb-3 shadow-sm">
                <CardBody>
                    <CardTitle className="font-weight-600">{settingsText[appContext.locale]["Personal Settings"]}</CardTitle>
                    <div>
                        <Link replace to="#" className="tr d-flex justify-content-between align-items-center" onClick={toggleLanguageSettingsModal}>
                            <div className="indent td">{settingsText[appContext.locale]["Language Settings"]}</div>
                            <div className="pe-2 text-muted">
                                <i className="fas fa-angle-right"></i>
                            </div>
                        </Link>
                        <Link replace to="#" className="tr d-flex justify-content-between align-items-center" onClick={toggleAppearanceSettingsModal}>
                            <div className="indent td">{settingsText[appContext.locale]["Appearance Settings"]}</div>
                            <div className="text-muted pe-2">
                                <i className="fas fa-angle-right"></i>
                            </div>
                        </Link>
                        <Link replace to="#" className="tr d-flex justify-content-between align-items-center" onClick={toggleChangePasswordModal}>
                            <div className="indent td">{settingsText[appContext.locale]["Change Password"]}</div>
                            <div className="text-muted pe-2">
                                <i className="fas fa-angle-right"></i>
                            </div>
                        </Link>
                        <Link replace to="#" className="tr d-flex justify-content-between align-items-center" onClick={toggleChangeNameModal}>
                            <div className="indent td">{settingsText[appContext.locale]["Change Name"]}</div>
                            <div className="text-muted pe-2">
                                <i className="fas fa-angle-right"></i>
                            </div>
                        </Link>
                        <Link replace to="#" className="tr d-flex justify-content-between align-items-center" onClick={toggleChangeResultsPerPageModal}>
                            <div className="indent td">{settingsText[appContext.locale]["Results per Page"]}</div>
                            <div className="text-muted pe-2">
                                <i className="fas fa-angle-right"></i>
                            </div>
                        </Link>
                    </div>
                </CardBody>
            </Card>
            {appContext.permissions 
                ? appContext.permissions.filter(permission => permission.permissionType.id >= 3).length == 0 
                    ? null  //only show this widget if user administrates at least one organization
                    : <Card className="very-rounded shadow-sm">
                        <CardBody>
                            <CardTitle className="font-weight-600">
                                {settingsText[appContext.locale]["Manage my EasyLedgers..."]}
                            </CardTitle>
                            <div>
                                {appContext.permissions.map(permission => {
                                    return (
                                        <Link key={permission.id} to={`/manage-easyledger/${permission.organization.id}`} className="tr d-flex justify-content-between align-items-center">
                                            <div className="indent td">{permission.organization.name}</div>
                                            <div className="pe-2 text-muted">
                                                <i className="fas fa-angle-right"></i>
                                            </div>
                                        </Link>
                                    )
                                })}
                            </div>
                        </CardBody>
                    </Card>
                : <div className="d-flex width-100 justify-content-center">
                    <LoadingSpinner big />
                </div>
            }
            <LanguageSettingsModal isOpen={languageSettingsModal} toggle={toggleLanguageSettingsModal}/>
            <AppearanceSettingsModal isOpen={appearanceSettingsModal} toggle={toggleAppearanceSettingsModal}/>
            <ChangePasswordModal isOpen={changePasswordModal} toggle={toggleChangePasswordModal} />
            <ChangeNameModal isOpen={changeNameModal} toggle={toggleChangeNameModal} />
            <ChangeResultsPerPageModal isOpen={changeResultsPerPageModal} toggle={toggleChangeResultsPerPageModal} />
        </div>

    )
}

export default Settings;