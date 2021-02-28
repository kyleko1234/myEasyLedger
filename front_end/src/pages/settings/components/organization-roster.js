import React from 'react';
import axios from 'axios';
import { PageSettings } from '../../../config/page-settings';
import { API_BASE_URL, FIRSTNAME_LASTNAME_LOCALES, PERMISSION_TYPE_OPTIONS } from '../../../utils/constants.js';
import { Link } from 'react-router-dom';
import { Modal, ModalHeader, ModalBody, ModalFooter, Alert } from 'reactstrap';
import Select from 'react-select';
import SweetAlert from 'react-bootstrap-sweetalert';
import { settingsText } from '../../../utils/i18n/settings-text';


function OrganizationRoster(props) {
    //required props: organizationId
    //TODO: currently users may only edit and remove those with lower permissions, i.e. owners cannot edit their own permissions, and may not add others to owner permissions. maybe change this at some point.
    const appContext = React.useContext(PageSettings);
    const permissionTypeOptions = PERMISSION_TYPE_OPTIONS(appContext.locale);
    const ownPermissionForCurrentOrganization = appContext.permissions.find(permission => permission.organization.id == props.organizationId);
    const [loading, setLoading] = React.useState(true);
    const [personInRosterDTOs, setPersonInRosterDTOs] = React.useState(null);
    const [addAPersonModal, setAddAPersonModal] = React.useState(false);
    const [editAPersonModal, setEditAPersonModal] = React.useState(false);
    const [selectedPerson, setSelectedPerson] = React.useState(null);
    const [emailInput, setEmailInput] = React.useState('');
    const [selectedPermissionTypeOption, setSelectedPermissionTypeOption] = React.useState(permissionTypeOptions[0]);

    const [removePersonAlert, setRemovePersonAlert] = React.useState(false);

    const [emailNotFoundAlert, setEmailNotFoundAlert] = React.useState(false);


    React.useEffect(() => {
        fetchRoster(props.organizationId);
    }, [props.organizationId])

    const fetchRoster = async (organizationId) => {
        await axios.get(`${API_BASE_URL}/organization/${organizationId}/person`).then(response => {
            setPersonInRosterDTOs(response.data);
            setLoading(false);
        }).catch(console.log);
    }


    const toggleAddAPersonModal = () => {
        setAddAPersonModal(!addAPersonModal);
        setEmailInput('');
        setSelectedPermissionTypeOption(permissionTypeOptions[0]);
        setEmailNotFoundAlert(false);
    }

    const handleEditAPersonButton = (person) => {
        setSelectedPerson(person);
        setSelectedPermissionTypeOption(permissionTypeOptions.find(option => option.value == person.permissionTypeId));
        setEditAPersonModal(true);
    }
    const toggleEditAPersonModal = () => {
        setEditAPersonModal(!editAPersonModal);
    }
    const toggleRemovePersonAlert = () => {
        setRemovePersonAlert(!removePersonAlert);
    }
    const handleSaveEditAPersonButton = () => {
        let requestBody = {
            permissionTypeId: selectedPermissionTypeOption.value
        };
        axios.patch(`${API_BASE_URL}/permission/${selectedPerson.permissionId}`, requestBody).then(response => {
            console.log(response);
            fetchRoster(props.organizationId);
            toggleEditAPersonModal();
        }).catch(console.log);
    }
    const handleRemoveAPersonButton = () => {
        toggleEditAPersonModal();
        toggleRemovePersonAlert();
    }
    const handleConfirmRemovePersonButton = () => {
        axios.delete(`${API_BASE_URL}/permission/${selectedPerson.permissionId}`).then(response => {
            console.log(response);
            fetchRoster(props.organizationId);
            toggleRemovePersonAlert();
        })
    }
    

    const handleAddAPersonButton = () => {
        let payload = {
            email: emailInput,
            organizationId: props.organizationId,
            permissionTypeId: selectedPermissionTypeOption.value
        }
        axios.post(`${API_BASE_URL}/organization/${props.organizationId}/permission`, payload).then(response => {
            console.log(response);
            fetchRoster(props.organizationId);
            toggleAddAPersonModal();
        }).catch(error => {
            if (error.response) {
                if (error.response.status === 404) {
                    setEmailNotFoundAlert(true);
                }
            }
            console.log(error);
        })
    }

    const handleChangePermissionTypeOption = (selectedOption) => {
        setSelectedPermissionTypeOption(selectedOption);
    }

    return (
        <div className="widget widget-rounded mb-3">
            <div className="widget-header bg-light border-bottom">
                <h4 className="widget-header-title">{"People with access to " + ownPermissionForCurrentOrganization.organization.name}</h4>
                {ownPermissionForCurrentOrganization.permissionType.id >= 3? 
                    <div className="px-3">
                        <Link replace className="icon-link-text-muted" to="#" onClick={toggleAddAPersonModal}>
                            <i className="fa fa-plus"></i>
                        </Link>
                    </div> 
                : null}
            </div>
            <div className="overflow-auto px-2" style={{ height: '300px' }}>
                {loading ? <div className="d-flex justify-content-center fa-3x py-3"><i className="fas fa-circle-notch fa-spin"></i></div> :
                    <table className="table">
                        <thead>
                            <tr>
                                <th>{settingsText[appContext.locale]["Name"]}</th>
                                <th>{settingsText[appContext.locale]["Email"]}</th>
                                <th>{settingsText[appContext.locale]["Permissions"]}</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {personInRosterDTOs.map(person => {
                                return (
                                    <tr key={person.personId}>
                                        <td>{FIRSTNAME_LASTNAME_LOCALES.includes(person.locale) ? person.firstName + " " + person.lastName : person.lastName + " " + person.firstName}</td>
                                        <td>{person.email}</td>
                                        <td>{person.permissionTypeName}</td>
                                        <td>
                                            <Link replace 
                                                className={"icon-link-text-muted" + (person.permissionTypeId < appContext.permissions.find(permission => permission.organization.id == props.organizationId).permissionType.id ? "" : " visibility-hidden")}
                                                to="#" onClick={() => handleEditAPersonButton(person)}>
                                                <i className="fa fa-edit"></i>
                                            </Link>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                }
            </div>
            <button onClick={() => console.log(ownPermissionForCurrentOrganization)}>TEST</button>
            <Modal isOpen={addAPersonModal} toggle={toggleAddAPersonModal} centered={true} size="lg">
                <ModalHeader> {settingsText[appContext.locale]["Add user modal header"](ownPermissionForCurrentOrganization.organization.name)} </ModalHeader>
                <ModalBody>
                    {emailNotFoundAlert ?
                        <Alert color="danger">
                            {settingsText[appContext.locale]["Could not find a user registered to this email."]}
                        </Alert>
                        : null}
                    <form onSubmit={event => {event.preventDefault(); handleAddAPersonButton()}}>
                        <div className="form-group row justify-content-center">
                            <label className="col-form-label col-lg-3">
                                {settingsText[appContext.locale]["Add a user by email:"]}
                            </label>
                            <div className="col-lg-7">
                                <input
                                    className="form-control"
                                    value={emailInput}
                                    onChange={event => {
                                        setEmailInput(event.target.value);
                                    }}
                                />
                            </div>
                        </div>
                    </form>
                    <div className="form-group row justify-content-center"> {/**React-select must exist outside of <form> if we want the form to be submittable with the enter key. */}
                        <label className="col-form-label col-lg-3">
                            {settingsText[appContext.locale]["Permissions for this user"] + ":"}
                            </label>
                        <div className="col-lg-7">
                            <Select
                                options={permissionTypeOptions.filter(option => option.value < ownPermissionForCurrentOrganization.permissionType.id)}
                                value={selectedPermissionTypeOption}
                                isSearchable={true}
                                onChange={handleChangePermissionTypeOption}
                            />
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <button
                        className="btn btn-primary width-10ch"
                        onClick={handleAddAPersonButton}
                    >
                        {settingsText[appContext.locale]["Add"]}
                    </button>
                    <button
                        className="btn btn-white width-10ch"
                        onClick={toggleAddAPersonModal}
                    >
                        {settingsText[appContext.locale]["Cancel"]}
                    </button>
                </ModalFooter>
            </Modal>

            
            <Modal isOpen={editAPersonModal} toggle={toggleEditAPersonModal} centered={true} size="lg">
                <ModalHeader>{settingsText[appContext.locale]["Edit User Privileges"]} </ModalHeader>
                <ModalBody>
                    {selectedPerson?
                    <div>
                        <div className="form-group row justify-content-center">
                            <div className="col-lg-3">
                                {settingsText[appContext.locale]["Name"] + ":"}
                            </div>
                            <div className="col-lg-6">
                                {FIRSTNAME_LASTNAME_LOCALES.includes(selectedPerson.locale)? selectedPerson.firstName + " " + selectedPerson.lastName : selectedPerson.lastName + " " + selectedPerson.firstName}
                            </div>
                        </div>
                        <div className="form-group row justify-content-center">
                            <div className="col-lg-3">
                                {settingsText[appContext.locale]["Email"] + ":"}
                            </div>
                            <div className="col-lg-6">
                                {selectedPerson.email}
                            </div>
                        </div>
                        <div className="form-group row justify-content-center"> {/**React-select must exist outside of <form> if we want the form to be submittable with the enter key. */}
                            <label className="col-form-label col-lg-3">
                                {settingsText[appContext.locale]["Permissions for this user"] + ":"}
                            </label>
                            <div className="col-lg-6">
                                <Select
                                    options={permissionTypeOptions.filter(option => option.value < ownPermissionForCurrentOrganization.permissionType.id)}
                                    value={selectedPermissionTypeOption}
                                    isSearchable={true}
                                    onChange={handleChangePermissionTypeOption}
                                />
                            </div>
                        </div>
                    </div>
                    : <div className="d-flex justify-content-center fa-3x py-3"><i className="fas fa-circle-notch fa-spin"></i></div>}
                </ModalBody>
                <ModalFooter className="justify-content-between">
                        <div>
                            <button className="btn btn-danger width-10ch"
                                onClick={handleRemoveAPersonButton}
                            >
                                {settingsText[appContext.locale]["Remove"]}
                            </button>
                        </div>
                        <div>
                            <button
                                className="btn btn-primary width-10ch"
                                onClick={handleSaveEditAPersonButton}
                            >
                                {settingsText[appContext.locale]["Save"]}
                            </button>
                            <button
                                className="btn btn-white width-10ch m-l-10"
                                onClick={toggleEditAPersonModal}
                            >
                                {settingsText[appContext.locale]["Cancel"]}
                            </button>
                        </div>
                </ModalFooter>
            </Modal>

            {removePersonAlert ?
                <SweetAlert danger showCancel
                    confirmBtnText="Yes, remove this person!"
                    confirmBtnBsStyle="danger"
                    cancelBtnBsStyle="default"
                    cancelBtnText="Cancel"
                    title="Are you sure?"
                    onConfirm={handleConfirmRemovePersonButton}
                    onCancel={toggleRemovePersonAlert}
                >
                    {settingsText[appContext.locale]["Are you sure you want to remove this user?"]}
                </SweetAlert>
                : null}
        </div>

    )
}

export default OrganizationRoster;