import React from 'react';
import { useHistory } from 'react-router';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { PageSettings } from '../../config/page-settings';

function PersonDropdown(props) {
    const appContext = React.useContext(PageSettings);
    const history = useHistory();

    const [isOpen, setIsOpen] = React.useState(false);
    const toggle = () => setIsOpen(!isOpen);
    return(
        <div className={props.className}>
            <Dropdown isOpen={isOpen} toggle={toggle}>
                <DropdownToggle caret color="white">
                    <i className="far fa-user-circle"></i>
                </DropdownToggle>
                <DropdownMenu>
                    <DropdownItem text>
                        <div className="font-weight-600">{appContext.firstName + " " + appContext.lastName}</div>
                    </DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem onClick={() => history.push("/settings")}>
                        Settings
                    </DropdownItem>
                    <DropdownItem onClick={appContext.logout}>
                        Sign Out
                    </DropdownItem>
                </DropdownMenu>
            </Dropdown>
        </div>
    )
}

export default PersonDropdown;

PersonDropdown.defaultProps = {
    className: ""
}