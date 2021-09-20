import React from 'react';
import { Link } from 'react-router-dom';
import { PageSettings } from './../../config/page-settings.js';
import EasyledgersDropdown from './easyledgers-dropdown.js';
import PersonDropdown from './person-dropdown.js';

class Header extends React.Component {
	constructor(props) {
		super(props);
		this.toggleMegaMenu = this.toggleMegaMenu.bind(this);
		this.state = { collapseMegaMenu: false };
	}

	toggleMegaMenu() {
		this.setState({ collapseMegaMenu: !this.state.collapseMegaMenu });
	}
	render() {
		return (
			<PageSettings.Consumer>
				{({toggleHiddenSidebar, pageSidebar}) => (
					<div id="header" className="header d-flex justify-content-between">
						<div className="d-flex align-items-center">
							<Link to="/" className="header-logo">my<b>Easy</b>Ledger</Link>
							{pageSidebar && (
									<button type="button" className="btn btn-white border-0 mx-1 font-size-larger" onClick={toggleHiddenSidebar}>
										<i className="fas fa-bars"></i>
									</button>
								)}
						</div>
						<div className="d-flex align-items-center mr-3">
							<PersonDropdown className="mr-1"/>
							<EasyledgersDropdown/>
						</div>
					</div>
				)}
			</PageSettings.Consumer>
		)
	}
}

export default Header;
