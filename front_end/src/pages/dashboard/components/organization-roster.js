import React from 'react';
import axios from 'axios';
import { PageSettings } from '../../../config/page-settings';
import {API_BASE_URL, FIRSTNAME_LASTNAME_LOCALES} from '../../../utils/constants.js';


function OrganizationRoster() {
    const appContext = React.useContext(PageSettings);
    const [loading, setLoading] = React.useState(true); 
    const [personInRosterDTOs, setPersonInRosterDTOs] = React.useState(null);

    React.useEffect(() => {
        axios.get(`${API_BASE_URL}/organization/${appContext.currentOrganizationId}/person`).then(response => {
            setPersonInRosterDTOs(response.data);
            setLoading(false);
        })
    }, [appContext.currentOrganizationId])

    return (
        <div className="widget widget-rounded mb-3">
            <div className="widget-header bg-light border-bottom">
                <h4 className="widget-header-title">{appContext.currentOrganizationName + " " + "Roster"}</h4>
            </div>
            <div className="overflow-auto px-2" style={{ height: '300px' }}>
                {loading ? <div className="d-flex justify-content-center fa-3x py-3"><i className="fas fa-circle-notch fa-spin"></i></div> :
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Permissions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {personInRosterDTOs.map(person => {
                                return(
                                    <tr key={person.personId}>
                                        <td>{FIRSTNAME_LASTNAME_LOCALES.includes(person.locale)? person.firstName + " " + person.lastName : person.lastName + " " + person.firstName}</td>
                                        <td>{person.email}</td>
                                        <td>{person.permissionTypeName}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                }
            </div>
        </div>

    )
}

export default OrganizationRoster;