import React from 'react';
import { PageSettings } from './config/page-settings.js';

import Header from './components/header/header.jsx';
import Sidebar from './components/sidebar/sidebar.jsx';
import Content from './components/content/content.jsx';
import { ACCESS_TOKEN, API_BASE_URL} from './utils/constants.js';
import jwt_decode from 'jwt-decode';
import interceptors from "./utils/interceptors"; //interceptors for API requests, used for auth purposes. keep this as an unused import.
import axios from 'axios';


class App extends React.Component {

	constructor(props) {
		super(props);

		this.toggleHiddenSidebar = () => {
			this.setState({
				pageSidebarHidden: !this.state.pageSidebarHidden
			})
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

		this.handleWindowResize = () => {
            if (this.state.isAuthenticated) {
                this.setState({
                    pageSidebarHidden: window.innerWidth > 1199.98? false : true
                })    
            }
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

        this.setColorSchemeToSystemPreference = () => {
            if (this.state.appearance === 'system') {
                if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
                    this.setState({
                        colorScheme: 'dark'
                    })
                } else {
                    this.setState({
                        colorScheme: 'light'
                    })
                }
            }
        }
	
		this.fetchUserInfo = async (id) => {
			await axios.get(`${API_BASE_URL}/person/${id}`).then(async response => { //it is very important to await the completion of this function otherwise you will make many http requests with null organizationId or personIds
                let objectToSetToState = {
                    personId: response.data.id,
					permissions: (response.data.permissions
                        ? response.data.permissions.sort((permission1, permission2) => permission1.organization.name.toLowerCase() < permission2.organization.name.toLowerCase() ? -1 : 1)
                        : []),
					firstName: response.data.firstName,
					lastName: response.data.lastName,
					email: response.data.email,
					locale: response.data.locale,
                }
                if (response.data.permissions && (response.data.permissions.length > 0)) {
                    if (!response.data.currentOrganizationId) {
                        let requestBody = {
                            currentOrganizationId: response.data.permissions[0].organization.id
                        }
                        await axios.patch(`${API_BASE_URL}/person/${id}`, requestBody);
                        await this.fetchUserInfo(id);
                        return;
                    } else {
                        let currentPermission = response.data.permissions.find(permission => permission.organization.id == response.data.currentOrganizationId)
                        objectToSetToState.currentOrganizationId = response.data.currentOrganizationId;
                        objectToSetToState.currentPermissionTypeId = currentPermission.permissionType.id;
                        objectToSetToState.currentOrganizationName = currentPermission.organization.name;
                        objectToSetToState.currency = currentPermission.organization.currency;
                        objectToSetToState.isEnterprise = currentPermission.organization.isEnterprise;
                    }
                }
                if (response.data.appearance === 'system') {
                    this.setColorSchemeToSystemPreference();
                } else {
                    objectToSetToState.colorScheme = response.data.appearance;
                }
                this.setState(objectToSetToState);
			}).catch(console.log);
		}

		this.handleSetLocale = (value) => {
			this.setState({locale: value});
		}

		this.logout = () => {
			localStorage.clear();
            window.location.href = window.location.origin + "/user/login/form";
		}
		
		this.state = {
			pageHeader: true,
			handleSetPageHeader: this.handleSetPageHeader,
			
			pageSidebar: true,
			pageSidebarHidden: window.innerWidth > 768? false : true,
			handleSetPageSidebar: this.handleSetPageSidebar,
			toggleMobileSidebar: this.toggleMobileSidebar,
			toggleHiddenSidebar: this.toggleHiddenSidebar,
						
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
			locale: (navigator.language
                    ? (navigator.language.includes("zh")
                            ? "zh-TW"
                            : "en-US"
                    )
                    : "en-US"
            ),
            appearance: 'system',
            colorScheme: 'light',
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
        this.setColorSchemeToSystemPreference();
		window.addEventListener('resize', this.handleWindowResize);
        if (window.matchMedia) { //apparently some people still use safari 12
            try {
                window.matchMedia('(prefers-color-scheme: dark)')
                        .addEventListener('change', this.setColorSchemeToSystemPreference)
            } catch (error) {
                console.log(error);
            }
        }
	}

    componentDidUpdate(prevState) {
        if (this.state.colorScheme != prevState.colorScheme) {
            if (this.state.colorScheme === 'dark') {
                document.body.classList.add('dark-mode')
            } else {
                document.body.classList.remove('dark-mode')
            }
        }
    }

	componentWillUnmount() {
		window.removeEventListener('resize', this.handleWindowResize);
        if (window.matchMedia) {
            try {
                window.matchMedia('(prefers-color-scheme: dark)')
                        .removeEventListener('change', this.setColorSchemeToSystemPreference)    
            } catch (error) {
                console.log(error);
            }
        }
	}
	
	render() {
		return (
			<PageSettings.Provider value={this.state}>
				<div className={
					'page-sidebar-fixed ' + 
					(this.state.pageHeader ? 'page-header-fixed ' : '') + 
					(this.state.pageSidebar ? '' : 'page-without-sidebar ') + 
					(this.state.pageSidebarToggled ? 'page-sidebar-toggled ' : '') +
					(this.state.pageSidebarHidden? 'page-sidebar-hidden ' : '') 
				}>
					{this.state.pageHeader && !this.state.isLoading && this.state.isAuthenticated && (<Header />)}
					{this.state.pageSidebar && !this.state.isLoading && this.state.isAuthenticated && (<Sidebar />)}
					{this.state.pageContent && !this.state.isLoading && (<Content />)}
				</div>
			</PageSettings.Provider>
		)
	}
}

export default App;