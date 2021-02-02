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
				axios.get(`${API_BASE_URL}/person/${this.context.currentUser}`).then(response => {
					this.context.handleSetCurrentOrganization(response.data.organizations[0].id);
					this.setState({userInfo: response.data}, () => {
						this.setState({loading: false});
					});
				}).catch(console.log);	
			});
		}

		this.state = {
			profileActive: 0,
			loading: true,
			userInfo: null
		};
		this.handleProfileExpand = this.handleProfileExpand.bind(this);
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
  
	render() {
		return (
			<PageSettings.Consumer>
				{({pageSidebarMinify, logout}) => (
					this.state.loading ? 
						<ul className="nav">
							<li className="nav-profile">
								<i className="fas fa-circle-notch fa-spin fa-3x"></i> 
							</li>
						</ul>
						:
						<ul className="nav">
							<li className={"nav-profile " + (this.state.profileActive ? "expand " : "")}>
								<Link to="/" onClick={this.handleProfileExpand}>
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
									<li><Link to="/"><i className="fa fa-cog"></i> {sidebarText[this.context.locale]["Settings"]}</Link></li>
									<li><Link to="#" onClick={logout}><i className="fa fa-sign-out-alt"></i> {sidebarText[this.context.locale]["Sign Out"]}</Link></li>
								</ul>
							</li>
						</ul>
					
				)}
			</PageSettings.Consumer>
		)
	}
}

export default SidebarProfile;