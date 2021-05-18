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
									<button type="button" className="btn btn-white mx-1" onClick={toggleHiddenSidebar}>
										<i className="fas fa-bars"></i>
									</button>
								)}
						</div>
						<div className="d-flex align-items-center mr-3">
							<PersonDropdown className="mr-2"/>
							<EasyledgersDropdown/>
						</div>
						{/*<ul className="navbar-nav navbar-right">
							<SearchForm />
							<DropdownNotification />
							
							{pageHeaderLanguageBar && (
								<DropdownLanguage />
							)}
							
							<DropdownProfile />
							
							</ul> */}
					</div>
				)}
			</PageSettings.Consumer>
		)
	}
}

export default Header;
