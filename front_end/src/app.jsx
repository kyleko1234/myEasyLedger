import React from 'react';
import { PageSettings } from './config/page-settings.js';

import Header from './components/header/header.jsx';
import Sidebar from './components/sidebar/sidebar.jsx';
import Content from './components/content/content.jsx';
import Footer from './components/footer/footer.jsx';
import FloatSubMenu from './components/float-sub-menu/float-sub-menu.jsx';
import { ACCESS_TOKEN, API_BASE_URL} from './utils/constants.js';
import jwt_decode from 'jwt-decode';
import interceptors from "./utils/interceptors"; //interceptors for API requests, used for auth purposes.
import axios from 'axios';


class App extends React.Component {

	constructor(props) {
		super(props);

		this.toggleMobileSidebar = (e) => {
			this.setState(state => ({
				pageSidebarToggled: !this.state.pageSidebarToggled
			}));
		}
		this.handleSetPageSidebar = (value) => {
			this.setState(state => ({
				pageSidebar: value
			}));
		}
		
		this.handleSetPageHeader = (value) => {
			this.setState(state => ({
				pageHeader: value
			}));
		}

		this.checkForAuthentication = () => { //TODO refactor to ensure that setstate works correctly
			this.setState({isLoading: true}, async () => {
				let jwtToken = localStorage.getItem(ACCESS_TOKEN);
				if (jwtToken) {
					let decodedJwtToken = jwt_decode(jwtToken);
					await this.fetchUserInfo(decodedJwtToken.sub) //it is important to await the completion of this function, otherwise you will make many http calls with null personId or organizationIds
					this.setState({
						isAuthenticated: true
					}, () => this.setState({isLoading: false}));
					console.log("authenticated with bearer " + jwtToken);
				} else {
					this.setState({
						isAuthenticated: false,
						isLoading: false
					});
					console.log("not authenticated");
				}	
			})
		}

		this.fetchUserInfo = async (id) => {
			await axios.get(`${API_BASE_URL}/person/${id}`).then(response => { //it is very important to await the completion of this function otherwise you will make many http requests with null organizationId or personIds
				this.setState({
					personId: id,
					permissions: response.data.permissions.sort((permission1, permission2) => permission1.organization.name.toLowerCase() < permission2.organization.name.toLowerCase() ? -1 : 1),
					firstName: response.data.firstName,
					lastName: response.data.lastName,
					email: response.data.email,
					locale: response.data.locale,
					currentOrganizationId: (response.data.currentOrganizationId? response.data.currentOrganizationId: response.data.permissions[0].organization.id)
				}, () => {
					let currentPermission = this.state.permissions.find(permission => permission.organization.id == this.state.currentOrganizationId)
					this.setState({
						currentPermissionTypeId: currentPermission.permissionType.id,
						currentOrganizationName: currentPermission.organization.name,
						currency: currentPermission.organization.currency,
						isEnterprise: currentPermission.organization.isEnterprise
					})
				})	
			}).catch(console.log);
		}

		this.handleSetLocale = (value) => {
			this.setState({locale: value});
		}

		this.logout = () => {
			localStorage.clear();
			console.log("logging out");
			this.checkForAuthentication();
		}
		
		this.state = {
			pageHeader: true,
			handleSetPageHeader: this.handleSetPageHeader,
			
			pageSidebar: true,
			pageSidebarWide: true,
			pageSidebarToggled: false,
			handleSetPageSidebar: this.handleSetPageSidebar,
			toggleMobileSidebar: this.toggleMobileSidebar,
						
			pageContent: true,
									
			fetchUserInfo: this.fetchUserInfo,
			isAuthenticated: false,
			isLoading: true,
			personId: null,
			firstName: '',
			lastName: '',
			email: '',
			currentOrganizationId: null,
			permissions: null,
			locale: 'en-US',
			handleSetLocale: this.handleSetLocale, //setting a user's locale should call PATCH /person/{personId} and then fetchUserInfo(personId); however, changing the locale on the registration/login pages should call handleSetLocale()

			currentOrganizationName: '',
			currentPermissionTypeId: null,
			currency: 'USD',
			isEnterprise: false,

			checkForAuthentication: this.checkForAuthentication,
			logout: this.logout

		};
	}
	
	componentDidMount() {
		this.checkForAuthentication();
	}
	
	render() {
		return (
			<PageSettings.Provider value={this.state}>
				<div className={
					'page-sidebar-fixed page-container ' + 
					(this.state.pageHeader ? 'page-header-fixed ' : '') + 
					(this.state.pageSidebar ? '' : 'page-without-sidebar ') + 
					(this.state.pageSidebarWide ? 'page-with-wide-sidebar ' : '') +
					(this.state.pageSidebarToggled ? 'page-sidebar-toggled ' : '') 
				}>
					{this.state.pageHeader && (<Header />)}
					{this.state.pageSidebar && !this.state.isLoading && this.state.isAuthenticated && (<Sidebar />)}
					{this.state.pageContent && !this.state.isLoading && (<Content />)}
				</div>
			</PageSettings.Provider>
		)
	}
}

export default App;