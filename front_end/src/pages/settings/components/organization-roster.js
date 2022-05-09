import React from 'react';
import axios from 'axios';
import { PageSettings } from '../../../config/page-settings';
import { API_BASE_URL, FIRSTNAME_LASTNAME_LOCALES, PERMISSION_TYPE_OPTIONS } from '../../../utils/constants.js';
import { Link } from 'react-router-dom';
import { Modal, ModalHeader, ModalBody, ModalFooter, Alert, Card, CardBody, CardTitle } from 'reactstrap';
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

    const [invitePersonAlert, setInvitePersonAlert] = React.useState(false);
    const toggleInvitePersonAlert = () => setInvitePersonAlert(!invitePersonAlert);
    
    const [removePersonAlert, setRemovePersonAlert] = React.useState(false);


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
        //TODO build email validation
        let requestBody = { 
            email: emailInput,
            organizationId: props.organizationId,
            permissionTypeId: selectedPermissionTypeOption.value
        }
        axios.post(`${API_BASE_URL}/organization/${props.organizationId}/permission`, requestBody).then(response => {
            console.log(response);
            fetchRoster(props.organizationId);
            toggleAddAPersonModal();
        }).catch(error => {
            if (error.response) {
                if (error.response.status === 404) {
                    setInvitePersonAlert(true);
                }
            }
            console.log(error);
        })
    }

    const handleChangePermissionTypeOption = (selectedOption) => {
        setSelectedPermissionTypeOption(selectedOption);
    }

    const handleInvitePersonButton = () => {
        setInvitePersonAlert(false);
        setLoading(true);
        let requestBody = {
            permissionTypeId: selectedPermissionTypeOption.value,
            email: emailInput,
            locale: appContext.locale
        }
        axios.post(`${API_BASE_URL}/organization/${props.organizationId}/invitation`, requestBody).then(response => {
            console.log(response);
            fetchRoster(props.organizationId);
            setAddAPersonModal(false);
            setLoading(false);
        }).catch(() => {
            setLoading(false);
        }); 
    }

    return (
        <Card className="very-rounded shadow-sm">
            <CardBody>
                <CardTitle className="fw-semibold">
                    <div className="tr d-flex align-items-center justify-content-between">
                        <div className="fw-semibold">
                            {settingsText[appContext.locale]["People with access to"](ownPermissionForCurrentOrganization.organization.name)}
                        </div>
                        <div className="d-none d-sm-inline-block">
                            {ownPermissionForCurrentOrganization.permissionType.id >= 3 ?
                                <button className="btn btn-primary" onClick={toggleAddAPersonModal}>
                                    {settingsText[appContext.locale]["Add a person"]}
                                </button>
                                : null}
                        </div>
                    </div>
                    <div className="d-sm-none my-2">
                            {ownPermissionForCurrentOrganization.permissionType.id >= 3 ?
                                <button className="btn d-block w-100 btn-primary" onClick={toggleAddAPersonModal}>
                                    {settingsText[appContext.locale]["Add a person"]}
                                </button>
                                : null}
                        </div>
                </CardTitle>
                <div className="overflow-auto" style={{ height: '300px' }}>
                    {loading ? <div className="d-flex justify-content-center fa-3x py-3"><i className="fas fa-circle-notch fa-spin"></i></div> :
                        <div>
                            <div className="pseudo-table d-none d-md-block">
                                <div className="pseudo-thead">
                                    <div className="bg-light pseudo-tr border rounded d-flex">
                                        <div className="pseudo-th col-3">{settingsText[appContext.locale]["Name"]}</div>
                                        <div className="pseudo-th col-4">{settingsText[appContext.locale]["Email"]}</div>
                                        <div className="pseudo-th col-4">{settingsText[appContext.locale]["Permissions"]}</div>
                                        <div className="pseudo-th col-1"></div>
                                    </div>
                                </div>
                                <div className="pseudo-tbody">
                                    {personInRosterDTOs.map(person => {
                                        return (
                                            <div className="pseudo-tr d-flex" key={person.personId}>
                                                <div className="pseudo-td col-3">{settingsText[appContext.locale]["parseName"](person.firstName, person.lastName)}</div>
                                                <div className="pseudo-td col-4">{person.email}</div>
                                                <div className="pseudo-td col-4">{person.permissionTypeId ? permissionTypeOptions.find(permission => permission.value == person.permissionTypeId).label : null}</div>
                                                <div className="pseudo-td col-1">
                                                    <Link replace
                                                        className={"text-muted" + (person.permissionTypeId < ownPermissionForCurrentOrganization.permissionType.id ? " " : " invisible")}
                                                        to="#" onClick={() => handleEditAPersonButton(person)}>
                                                        <i className="fa fa-edit"></i>
                                                    </Link>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                            <div className="pseudo-table d-md-none border-top">
                                {personInRosterDTOs.map(person => {
                                    return(
                                        <div className="pseudo-tr d-flex align-items-center justify-content-between" key={person.personId}>
                                            <div className="pseudo-td">
                                                <div className="fw-semibold">
                                                    {settingsText[appContext.locale]["parseName"](person.firstName, person.lastName)}
                                                </div>
                                                <div className="font-size-compact">
                                                    {person.email}
                                                </div>
                                            </div>
                                            <div className="pseudo-td">
                                                {person.permissionTypeName}
                                            </div>
                                            <div className="pseudo-td">
                                                <Link replace
                                                    className={"text-muted" + (person.permissionTypeId < appContext.permissions.find(permission => permission.organization.id == props.organizationId).permissionType.id ? "" : " visibility-hidden")}
                                                    to="#" onClick={() => handleEditAPersonButton(person)}>
                                                    <i className="fa fa-edit"></i>
                                                </Link>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    }
                </div>
                <Modal isOpen={addAPersonModal} toggle={toggleAddAPersonModal} centered={true} size="lg">
                    <ModalHeader> {settingsText[appContext.locale]["Add user modal header"](ownPermissionForCurrentOrganization.organization.name)} </ModalHeader>
                    <ModalBody>
                        <form onSubmit={event => { event.preventDefault(); handleAddAPersonButton() }}>
                            <div className="mb-3 row justify-content-center">
                                <label className="col-form-label col-lg-3">
                                    {settingsText[appContext.locale]["Add a user by email:"]}
                                </label>
                                <div className="col-lg-7">
                                    <input
                                        type="email"
                                        className="form-control"
                                        value={emailInput}
                                        onChange={event => {
                                            setEmailInput(event.target.value);
                                        }}
                                    />
                                </div>
                            </div>
                        </form>
                        <div className="mb-3 row justify-content-center"> {/**React-select must exist outside of <form> if we want the form to be submittable with the enter key. */}
                            <label className="col-form-label col-lg-3">
                                {settingsText[appContext.locale]["Permissions for this user"] + ":"}
                            </label>
                            <div className="col-lg-7">
                                <Select
                                    classNamePrefix="form-control"
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
                            type="submit"
                            className="btn btn-primary width-10ch"
                            onClick={handleAddAPersonButton}
                        >
                            {loading? <i className="fas fa-circle-notch fa-spin"></i> : settingsText[appContext.locale]["Add"]}
                        </button>
                        <button
                            type="button"
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
                        {selectedPerson ?
                            <div>
                                <div className="mb-3 row justify-content-center">
                                    <div className="col-lg-3">
                                        {settingsText[appContext.locale]["Name"] + ":"}
                                    </div>
                                    <div className="col-lg-6">
                                        {FIRSTNAME_LASTNAME_LOCALES.includes(selectedPerson.locale) ? selectedPerson.firstName + " " + selectedPerson.lastName : selectedPerson.lastName + " " + selectedPerson.firstName}
                                    </div>
                                </div>
                                <div className="mb-3 row justify-content-center">
                                    <div className="col-lg-3">
                                        {settingsText[appContext.locale]["Email"] + ":"}
                                    </div>
                                    <div className="col-lg-6">
                                        {selectedPerson.email}
                                    </div>
                                </div>
                                <div className="mb-3 row justify-content-center"> {/**React-select must exist outside of <form> if we want the form to be submittable with the enter key. */}
                                    <label className="col-form-label col-lg-3">
                                        {settingsText[appContext.locale]["Permissions for this user"] + ":"}
                                    </label>
                                    <div className="col-lg-6">
                                        <Select
                                            classNamePrefix="form-control"
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
                                className="btn btn-white width-10ch ms-2"
                                onClick={toggleEditAPersonModal}
                            >
                                {settingsText[appContext.locale]["Cancel"]}
                            </button>
                        </div>
                    </ModalFooter>
                </Modal>

                {removePersonAlert ?
                    <SweetAlert danger showCancel
                        confirmBtnText={settingsText[appContext.locale]["Yes, remove this person!"]}
                        confirmBtnBsStyle="danger"
                        cancelBtnBsStyle="default"
                        cancelBtnText={settingsText[appContext.locale]["Cancel"]}
                        title={settingsText[appContext.locale]["Are you sure?"]}
                        onConfirm={handleConfirmRemovePersonButton}
                        onCancel={toggleRemovePersonAlert}
                    >
                        {settingsText[appContext.locale]["Are you sure you want to remove this user?"]}
                    </SweetAlert>
                    : null}

                {invitePersonAlert ?
                    <SweetAlert primary showCancel
                        confirmBtnText={settingsText[appContext.locale]["Yes, invite this person!"]}
                        confirmBtnBsStyle="primary"
                        cancelBtnBsStyle="default"
                        cancelBtnText={settingsText[appContext.locale]["Cancel"]}
                        title={settingsText[appContext.locale]["Invite this person to myEasyLedger?"]}
                        onConfirm={handleInvitePersonButton}
                        onCancel={toggleInvitePersonAlert}
                    >
                        {settingsText[appContext.locale]["This email address is not registered with myEasyLedger. Invite this person to use myEasyLedger and collaborate on this EasyLedger?"]}
                    </SweetAlert>
                    : null}

            </CardBody>
        </Card>

    )
}

export default OrganizationRoster;