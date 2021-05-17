import React from 'react';
import { Link } from 'react-router-dom';
import DropdownNotification from './dropdown/notification.jsx';
import DropdownLanguage from './dropdown/language.jsx';
import DropdownProfile from './dropdown/profile.jsx';
import SearchForm from './search/form.jsx';
import DropdownMegaMenu from './dropdown/mega.jsx';

import { PageSettings } from './../../config/page-settings.js';

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
				{({toggleMobileSidebar, pageSidebar}) => (
					<div id="header" className="header">
						<div className="d-flex align-items-center">
							<Link to="/" className="header-logo">my<b>Easy</b>Ledger</Link>
							{pageSidebar && (
									<button type="button" className="btn btn-white mx-3" onClick={toggleMobileSidebar}>
										<i className="fas fa-bars"></i>
									</button>
								)}
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
