import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import axios from 'axios';
import { PageSettings } from '../../config/page-settings';
import { settingsText } from '../../utils/i18n/settings-text';
import { API_BASE_URL } from '../../utils/constants';

function AppearanceSettingsModal(props) {
//required props: isOpen, toggle
    const appContext = React.useContext(PageSettings);
    const [selectedAppearance, setSelectedAppearance] = React.useState(appContext.appearance);
    const handleChangeAppearance = event => {
        setSelectedAppearance(event.target.value);
    }
    const handleSaveButton = async (event) => {
        event.preventDefault();
        let requestBody = {
            appearance: selectedAppearance
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
                    {settingsText[appContext.locale]["Appearance Settings"]}
                </ModalHeader>
                <ModalBody>
                    <div className="px-3 py-3">
                            <form className="mb-3 row" onSubmit={handleSaveButton}>
                                <div className="col-xl-4">
                                    <div className="form-check">
                                        <input 
                                            type="radio" 
                                            className="form-check-input"
                                            value={"system"} 
                                            id="appearance-system" 
                                            name="is-enterprise" 
                                            checked={selectedAppearance === "system"} 
                                            onChange={handleChangeAppearance} 
                                        />
                                        <label className="form-check-label mx-2" htmlFor="appearance-system">
                                            {settingsText[appContext.locale]["System"]}
                                        </label>
                                    </div>
                                    <div className="form-check">
                                        <input 
                                            type="radio" 
                                            className="form-check-input"
                                            value={"light"} 
                                            id="appearance-light" 
                                            name="is-enterprise" 
                                            checked={selectedAppearance === "light"} 
                                            onChange={handleChangeAppearance} 
                                        />
                                        <label className="mx-2 form-check-label" htmlFor="appearance-light">
                                            {settingsText[appContext.locale]["Light"]}
                                        </label>
                                    </div>
                                    <div className="form-check">
                                        <input 
                                            type="radio" 
                                            value={"dark"} 
                                            className="form-check-input"
                                            id="appearance-dark" 
                                            name="is-enterprise" 
                                            checked={selectedAppearance === "dark"} 
                                            onChange={handleChangeAppearance} 
                                        />
                                        <label className="mx-2 form-check-label" htmlFor="appearance-dark">
                                            {settingsText[appContext.locale]["Dark"]}
                                        </label>
                                    </div>
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

