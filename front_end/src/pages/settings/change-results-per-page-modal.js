import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import axios from 'axios';
import { PageSettings } from '../../config/page-settings';
import { settingsText } from '../../utils/i18n/settings-text';
import { API_BASE_URL, RESULTS_PER_PAGE_OPTIONS } from '../../utils/constants';
import Select from 'react-select';

function ChangeResultsPerPageModal(props) {
//required props: isOpen, toggle
    const appContext = React.useContext(PageSettings);
    const [selectedResultsPerPage, setSelectedResultsPerPage] = React.useState(appContext.resultsPerPage);
    const handleChangeResultsPerPageOption = (selectedOption) => {
        setSelectedResultsPerPage(selectedOption.value);
        console.log(selectedOption);
    }
    const handleSaveButton = async (event) => {
        event.preventDefault();
        let requestBody = {
            resultsPerPage: selectedResultsPerPage
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
                    {settingsText[appContext.locale]["Results per Page"]}
                </ModalHeader>
                <ModalBody>
                    <div className="px-3 py-3">
                            <form className="mb-3 row" onSubmit={handleSaveButton}>
                                <label className="col-sm-8 col-form-label">
                                    {settingsText[appContext.locale]["Number of results to display per page"]}
                                </label>
                                <div className="col-sm-4">
                                    <Select
                                        classNamePrefix="form-control"
                                        options={RESULTS_PER_PAGE_OPTIONS}
                                        onChange={handleChangeResultsPerPageOption}
                                        value={RESULTS_PER_PAGE_OPTIONS.find(option => option.value == selectedResultsPerPage)}
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

export default ChangeResultsPerPageModal;

