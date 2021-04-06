import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { PageSettings } from './../../config/page-settings.js';
import {API_BASE_URL, FIRSTNAME_LASTNAME_LOCALES} from '../../utils/constants.js';
import axios from 'axios';
import {sidebarText} from '../../utils/i18n/sidebar-text.js';

class SidebarProfile extends React.Component {
	static contextType = PageSettings;

	constructor(props) {
		super(props);

		this.state = {
			profileActive: 0,
			organizationsExpanded: false
		};
		this.handleProfileExpand = this.handleProfileExpand.bind(this);
		this.toggleExpandOrganizations = this.toggleExpandOrganizations.bind(this);
		this.handleCollapseAll = this.handleCollapseAll.bind(this);
	}

	handleProfileExpand(e) {
		e.preventDefault();
		this.setState(state => ({
			profileActive: !this.state.profileActive,
		}));
	}

	toggleExpandOrganizations() {
		this.setState(state => ({
			organizationsExpanded: !this.state.organizationsExpanded
		}));
	}

	handleCollapseAll() {
		this.setState(state => ({
			profileActive: 0, 
			organizationsExpanded: false
		}))
	}

	async handleChangeCurrentOrganization(organizationId) {
		let requestBody = {
			currentOrganizationId: parseInt(organizationId)
		}
		await axios.patch(`${API_BASE_URL}/person/${this.context.personId}`, requestBody).then(response => {
			console.log(response);
		}).catch(console.log);
		await this.context.fetchUserInfo(this.context.personId);
		this.handleCollapseAll();
		this.props.history.push("/");
	}
  
	render() {
		return (
			<PageSettings.Consumer>
				{({pageSidebarMinify, logout, isLoading, locale, permissions, currentOrganizationId, currentOrganizationName, 
					firstName, lastName}) => (
					isLoading ? 
						<ul className="nav">
							<li className="nav-profile">
								<i className="fas fa-circle-notch fa-spin fa-3x"></i> 
							</li>
						</ul>
						:
						<ul className="nav">
							<li className={"nav-profile " + (this.state.profileActive ? "expand " : "")}>
								<Link replace to="/" onClick={this.handleProfileExpand}>
									<div className="cover with-shadow"></div>
									{/*<div className="image">
										<img src="/assets/img/user/user-13.jpg" alt="" />
									</div>*/}
									<div className="info">
										<b className="caret pull-right"></b>
										{FIRSTNAME_LASTNAME_LOCALES.includes(locale)? 
											firstName + " " + lastName : lastName + " " + firstName} 
										<small>{currentOrganizationName}</small>
									</div>
								</Link>
							</li>
							<li>
								<ul className={"nav nav-profile " + (this.state.profileActive && !pageSidebarMinify ? "d-block " : "")}>
									<li className={"has-sub " + (this.state.organizationsExpanded? "expand" : "closed")}>
										<Link replace to="#" onClick={this.toggleExpandOrganizations}><i className="fa fa-book"></i> {sidebarText[locale]["My EasyLedgers"]} <b className="caret"></b></Link>
											<ul className={"sub-menu "+ (this.state.organizationsExpanded? "d-block" : "")}>
												{permissions.map(permission => {
													return(
														<li key={permission.organization.id} className={currentOrganizationId == permission.organization.id? "bg-white-transparent-1 expand": ""}>
															<Link replace to="#" onClick={() => this.handleChangeCurrentOrganization(permission.organization.id)}>{permission.organization.name}</Link>
														</li>
													)
												})}
												<li>
													<Link replace to="/create-a-new-easyledger" onClick={this.handleCollapseAll}><i className="ion ion-md-add"></i>{" "}<i>{sidebarText[locale]["Create a new EasyLedger..."]}</i></Link>
												</li>
											</ul>
									</li>
									<li><Link to="/settings"><i className="fa fa-cog"></i> {sidebarText[locale]["Settings"]}</Link></li>
									<li><Link to="#" onClick={logout}><i className="fa fa-sign-out-alt"></i> {sidebarText[locale]["Sign Out"]}</Link></li>
								</ul>
							</li>
						</ul>
					
				)}
			</PageSettings.Consumer>
		)
	}
}

export default withRouter(SidebarProfile);;