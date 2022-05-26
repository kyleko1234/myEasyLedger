import React from 'react';
import { useHistory } from 'react-router';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { PageSettings } from '../../config/page-settings';
import { sidebarText } from '../../utils/i18n/sidebar-text';

function PersonDropdown(props) {
    const appContext = React.useContext(PageSettings);
    const history = useHistory();

    const [isOpen, setIsOpen] = React.useState(false);
    const toggle = () => setIsOpen(!isOpen);

    return(
        <div className={props.className}>
            <Dropdown isOpen={isOpen} toggle={toggle}>
                <DropdownToggle caret color="white" className="border-0 header-icon font-size-larger">
                    <i className="far fa-user-circle"></i>
                </DropdownToggle>
                <DropdownMenu className="shadow" end>
                    <DropdownItem text>
                        <div className="fw-semibold">
                                {appContext.firstName + " " + appContext.lastName} 
                        </div>
                        <div className="small text-muted">
                            {appContext.email}
                        </div>
                    </DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem onClick={() => history.push("/account-settings")}>
                        <i className="fas fa-cog me-2"></i>{sidebarText[appContext.locale]["Account Settings"]}
                    </DropdownItem>
                    <DropdownItem onClick={appContext.logout}>
                        <i className="fas fa-sign-out-alt me-2"></i>{sidebarText[appContext.locale]["Sign Out"]}
                    </DropdownItem>
                </DropdownMenu>
            </Dropdown>
        </div>
    )
}

PersonDropdown.defaultProps = {
    className: ""
}

export default PersonDropdown;
