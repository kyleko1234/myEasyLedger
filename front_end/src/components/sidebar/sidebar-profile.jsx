import React from 'react';
import { Link } from 'react-router-dom';
import { PageSettings } from './../../config/page-settings.js';
import {API_BASE_URL} from '../../utils/constants.js';
import axios from 'axios';
import {sidebarText} from '../../utils/i18n/sidebar-text.js';

class SidebarProfile extends React.Component {
	static contextType = PageSettings;

	constructor(props) {
		super(props);

		this.getUserInfo = () => {
			this.setState({loading: true}, () => {
				axios.get(`${API_BASE_URL}/person/${this.context.personId}`).then(response => {
					this.context.handleSetCurrentOrganizationId(response.data.organizations[0].id);
					this.setState({userInfo: response.data}, () => {
						this.setState({loading: false});
					});
				}).catch(console.log);	
			});
		}

		this.state = {
			profileActive: 0,
			loading: true,
			userInfo: null,
			organizationsExpanded: false
		};
		this.handleProfileExpand = this.handleProfileExpand.bind(this);
		this.toggleExpandOrganizations = this.toggleExpandOrganizations.bind(this);
	}

	componentDidMount() {
		if (this.context.isAuthenticated) {
			this.getUserInfo();
		}
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
  
	render() {
		return (
			<PageSettings.Consumer>
				{({pageSidebarMinify, logout, locale, organizations, currentOrganizationId, handleSetCurrentOrganizationId}) => (
					this.state.loading ? 
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
									<div className="image">
										<img src="/assets/img/user/user-13.jpg" alt="" />
									</div>
									<div className="info">
										<b className="caret pull-right"></b>
										{this.state.userInfo.firstName + " " + this.state.userInfo.lastName} 
										<small>{this.state.userInfo.organizations[0].name}</small>
									</div>
								</Link>
							</li>
							<li>
								<ul className={"nav nav-profile " + (this.state.profileActive && !pageSidebarMinify ? "d-block " : "")}>
									<li className={"has-sub " + (this.state.organizationsExpanded? "expand" : "closed")}>
										<Link replace to="#" onClick={this.toggleExpandOrganizations}><i className="fa fa-book"></i> {sidebarText[locale]["My EasyLedgers"]} <b className="caret"></b></Link>
											<ul className={"sub-menu "+ (this.state.organizationsExpanded? "d-block" : "")}>
												{organizations.map(organization => {
													return(
														<li key={organization.id} className={currentOrganizationId == organization.id? "bg-white-transparent-1 expand": ""}><Link replace to="#" onClick={() => handleSetCurrentOrganizationId(organization.id)}>{organization.name}</Link></li>
													)
												})}
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

export default SidebarProfile;