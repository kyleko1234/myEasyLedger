import axios from 'axios';
import React from 'react';
import { useHistory } from 'react-router';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { PageSettings } from '../../config/page-settings';
import { API_BASE_URL, PERMISSION_TYPE_OPTIONS } from '../../utils/constants';
import { sidebarText } from '../../utils/i18n/sidebar-text';

function EasyledgersDropdown(props) {
    const appContext = React.useContext(PageSettings);
    const history = useHistory();
    const permissionTypes = PERMISSION_TYPE_OPTIONS(appContext.locale);

    const [isOpen, setIsOpen] = React.useState(false);
    const toggle = () => setIsOpen(!isOpen);
    
    const handleChangeCurrentOrganization = async (organizationId) => {
        let requestBody = {
            currentOrganizationId: organizationId
        }

        await axios.patch(`${API_BASE_URL}/person/${appContext.personId}`, requestBody);
        appContext.fetchUserInfo(appContext.personId).then(() => {
            history.push("/");
        })
    } 

    return(
        <div className={props.className}>
            <Dropdown isOpen={isOpen} toggle={toggle}>
                <DropdownToggle caret color="white" className="font-size-standard text-nowrap">
                    {appContext.currentOrganizationName}
                </DropdownToggle>
                <DropdownMenu className="shadow" right>
                    <DropdownItem text>
                        <div className="font-weight-600 text-nowrap">
                            {appContext.currentOrganizationName}
                        </div>
                        <div className="small text-muted">
                            {sidebarText[appContext.locale]["Permission level: "]}
                            {permissionTypes.find(permissionType => permissionType.value === appContext.currentPermissionTypeId).label}
                        </div>
                    </DropdownItem>
                    <DropdownItem divider />
                    {appContext.permissions
                        .filter(permission => permission.organization.id !== appContext.currentOrganizationId)
                        .map(permission => {
                            return (
                                <DropdownItem 
                                    key={permission.organization.id} 
                                    onClick={() => handleChangeCurrentOrganization(permission.organization.id)}
                                    className="text-nowrap"
                                >
                                    {permission.organization.name}
                                </DropdownItem>
                            )
                        })
                    }
                    <DropdownItem divider />
                    <DropdownItem 
                        onClick={() => history.push("/create-a-new-easyledger")}
                        className="text-nowrap"
                    >
                        <i className="ion ion-md-add">{/* this may break soon, best to find a replacement for ionicons */}</i>
                        {" "}
                        <em>
                            {sidebarText[appContext.locale]["Create a new EasyLedger..."]}
                        </em>
                    </DropdownItem>
                </DropdownMenu>
            </Dropdown>
        </div>
    )

}
EasyledgersDropdown.defaultProps = {
    className: ""
}
export default EasyledgersDropdown;