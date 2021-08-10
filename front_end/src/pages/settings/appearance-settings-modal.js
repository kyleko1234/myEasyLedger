import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import axios from 'axios';
import { PageSettings } from '../../config/page-settings';
import { settingsText } from '../../utils/i18n/settings-text';
import { API_BASE_URL, LOCALE_OPTIONS } from '../../utils/constants';
import Select from 'react-select';

function AppearanceSettingsModal(props) {
//required props: isOpen, toggle
    const appContext = React.useContext(PageSettings);
    const [selectedAppearance, setSelectedAppearance] = React.useState(appContext.appearance);
    const handleChangeLocaleOption = (selectedOption) => {
        setSelectedLocale(selectedOption.value);
    }
    const handleSaveButton = async (event) => {
        event.preventDefault();
        let requestBody = {
            locale: selectedLocale
        }
        await axios.patch(`${API_BASE_URL}/person/${appContext.personId}`, requestBody).then(response => {
            console.log(response);
        }).catch(console.log);
        await appContext.fetchUserInfo(appContext.personId);
        props.toggle();
    }
    return(
        <>
            <Modal isOpen={props.isOpen} toggle={props.toggle} centered={true} >
                <ModalHeader>
                    {settingsText[appContext.locale]["Language Settings"]}
                </ModalHeader>
                <ModalBody>
                    <div className="px-3 py-3">
                            <form className="form-group row" onSubmit={handleSaveButton}>
                                <label className="col-sm-3 col-form-label">
                                    {settingsText[appContext.locale]["Language"]}
                                </label>
                                <div className="col-sm-9">
                                    <Select
                                        options={LOCALE_OPTIONS}
                                        onChange={handleChangeLocaleOption}
                                        value={LOCALE_OPTIONS.find(localeOption => localeOption.value == selectedLocale)}
                                        menuPortalTarget={document.body}
                                        styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                                        menuPlacement={'auto'}
                                    />
                                </div>
                            </form>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <button type="submit" className="btn btn-primary width-10ch" onClick={handleSaveButton}>{settingsText[appContext.locale]["Save"]}</button>
                    <button type="button" className="btn btn-white width-10ch" onClick={props.toggle}>{settingsText[appContext.locale]["Cancel"]}</button>
                </ModalFooter>
            </Modal>
        </>
    )
}

export default AppearanceSettingsModal;

