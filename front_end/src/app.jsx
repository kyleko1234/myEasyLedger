import React from 'react';
import { PageSettings } from './config/page-settings.js';

import Header from './components/header/header.jsx';
import Sidebar from './components/sidebar/sidebar.jsx';
import SidebarRight from './components/sidebar-right/sidebar-right.jsx';
import TopMenu from './components/top-menu/top-menu.jsx';
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

		this.toggleSidebarMinify = (e) => {
			e.preventDefault();
			if (this.state.pageSidebarMinify) {
				this.setState(state => ({
					pageFloatSubMenuActive: false
				}));
			}
			this.setState(state => ({
				pageSidebarMinify: !this.state.pageSidebarMinify
			}));
		}
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
		this.handleSetPageSidebarMinified = (value) => {
			this.setState(state => ({
				pageSidebarMinify: value
			}));
		}
		this.handleSetPageSidebarWide = (value) => {
			this.setState(state => ({
				pageSidebarWide: value
			}));
		}
		this.handleSetPageSidebarLight = (value) => {
			this.setState(state => ({
				pageSidebarLight: value
			}));
		}
		this.handleSetPageSidebarTransparent = (value) => {
			this.setState(state => ({
				pageSidebarTransparent: value
			}));
		}
		this.handleSetPageSidebarSearch = (value) => {
			this.setState(state => ({
				pageSidebarSearch: value
			}));
		}
		
		this.toggleRightSidebar = (e) => {
			e.preventDefault();
			this.setState(state => ({
				pageRightSidebarCollapsed: !this.state.pageRightSidebarCollapsed
			}));
		}
		this.toggleMobileRightSidebar = (e) => {
			e.preventDefault();
			this.setState(state => ({
				pageMobileRightSidebarToggled: !this.state.pageMobileRightSidebarToggled
			}));
		}
		this.handleSetPageRightSidebar = (value) => {
			this.setState(state => ({
				pageRightSidebar: value
			}));
		}
		
		var floatSubMenuRemove;
		var floatSubMenuCalculate;
		var floatSubMenuRemoveTime = 250;
		this.handleFloatSubMenuOnMouseOver = (e) => {
			clearTimeout(floatSubMenuRemove);
			clearTimeout(floatSubMenuCalculate);
		}
		this.handleFloatSubMenuOnMouseOut = (e) => {
			floatSubMenuRemove = setTimeout(() => {
				this.setState(state => ({
					pageFloatSubMenuActive: false
				}));
			}, floatSubMenuRemoveTime);
		}
		this.handleSidebarOnMouseOver = (e, menu) => {
			if (this.state.pageSidebarMinify) {
				if (menu.children) {
					var left = (document.getElementById('sidebar').offsetWidth + document.getElementById('sidebar').offsetLeft) + 'px';
					
					clearTimeout(floatSubMenuRemove);
					clearTimeout(floatSubMenuCalculate);
			
					this.setState(state => ({
						pageFloatSubMenu: menu,
						pageFloatSubMenuActive: true,
						pageFloatSubMenuLeft: left
					}));
					
					var offset = e.currentTarget.offsetParent.getBoundingClientRect();
					
					floatSubMenuCalculate = setTimeout(() => {
						var targetTop = offset.top;
						var windowHeight = window.innerHeight;
						var targetHeight = document.querySelector('.float-sub-menu-container').offsetHeight;
						var top, bottom, arrowTop, arrowBottom, lineTop, lineBottom;
						
						if ((windowHeight - targetTop) > targetHeight) {
							top = offset.top + 'px';
							bottom = 'auto';
							arrowTop = '20px';
							arrowBottom = 'auto';
							lineTop = '20px';
							lineBottom = 'auto';
						} else {
							var aBottom = (windowHeight - targetTop) - 21;
							top = 'auto';
							bottom = '0';
							arrowTop = 'auto';
							arrowBottom = aBottom + 'px';
							lineTop = '20px';
							lineBottom = aBottom + 'px';
						}
						
						this.setState(state => ({
							pageFloatSubMenuTop: top,
							pageFloatSubMenuBottom: bottom,
							pageFloatSubMenuLineTop: lineTop,
							pageFloatSubMenuLineBottom: lineBottom,
							pageFloatSubMenuArrowTop: arrowTop,
							pageFloatSubMenuArrowBottom: arrowBottom,
							pageFloatSubMenuOffset: offset
						}));
					}, 0);
					
				} else {
					floatSubMenuRemove = setTimeout(() => {
						this.setState(state => ({
							pageFloatSubMenu: '',
							pageFloatSubMenuActive: false
						}));
					}, floatSubMenuRemoveTime);
				}
			}
		}
		this.handleSidebarOnMouseOut = (e) => {
			if (this.state.pageSidebarMinify) {
				floatSubMenuRemove = setTimeout(() => {
					this.setState(state => ({
						pageFloatSubMenuActive: false
					}));
				}, floatSubMenuRemoveTime);
			}
		}
		this.handleFloatSubMenuClick = () => {
			if (this.state.pageSidebarMinify) {
				const windowHeight = window.innerHeight;
				const targetHeight = document.getElementById('float-sub-menu').offsetHeight;
				const targetTop = this.state.pageFloatSubMenuOffset.top;
				const top = ((windowHeight - targetTop) > targetHeight) ? targetTop : 'auto';
				const left = (this.state.pageFloatSubMenuOffset.left + document.getElementById('sidebar').offsetWidth) + 'px';
				const bottom = ((windowHeight - targetTop) > targetHeight) ? 'auto' : '0';
				const arrowTop = ((windowHeight - targetTop) > targetHeight) ? '20px' : 'auto';
				const arrowBottom = ((windowHeight - targetTop) > targetHeight) ? 'auto' : ((windowHeight - targetTop) - 21) + 'px';
				const lineTop = ((windowHeight - targetTop) > targetHeight) ? '20px' : 'auto';
				const lineBottom = ((windowHeight - targetTop) > targetHeight) ? 'auto' : ((windowHeight - targetTop) - 21) + 'px';
			
				this.setState(state => ({
					pageFloatSubMenuTop: top,
					pageFloatSubMenuLeft: left,
					pageFloatSubMenuBottom: bottom,
					pageFloatSubMenuLineTop: lineTop,
					pageFloatSubMenuLineBottom: lineBottom,
					pageFloatSubMenuArrowTop: arrowTop,
					pageFloatSubMenuArrowBottom: arrowBottom
				}));
			}
		}
		
		this.handleSetPageContent = (value) => {
			this.setState(state => ({
				pageContent: value
			}));
		}
		this.handleSetPageContentClass = (value) => {
			this.setState(state => ({
				pageContentClass: value
			}));
		}
		this.handleSetPageContentFullHeight = (value) => {
			this.setState(state => ({
				pageContentFullHeight: value
			}));
		}
		this.handleSetPageContentFullWidth = (value) => {
			this.setState(state => ({
				pageContentFullWidth: value
			}));
		}
		this.handleSetPageContentInverseMode = (value) => {
			this.setState(state => ({
				pageContentInverseMode: value
			}));
		}
		
		this.handleSetPageHeader = (value) => {
			this.setState(state => ({
				pageHeader: value
			}));
		}
		this.handleSetPageHeaderMegaMenu = (value) => {
			this.setState(state => ({
				pageHeaderMegaMenu: value
			}));
		}
		this.handleSetPageHeaderLanguageBar = (value) => {
			this.setState(state => ({
				pageHeaderLanguageBar: value
			}));
		}
		
		this.handleSetPageFooter = (value) => {
			this.setState(state => ({
				pageFooter: value
			}));
		}
		this.handleSetPageTopMenu = (value) => {
			this.setState(state => ({
				pageTopMenu: value
			}));
		}
		this.toggleMobileTopMenu = (e) => {
			e.preventDefault();
			this.setState(state => ({
				pageMobileTopMenu: !this.state.pageMobileTopMenu
			}));
		}
		this.handleSetPageTwoSidebar = (value) => {
			this.setState(state => ({
				pageTwoSidebar: value
			}));
		}
		this.handleSetPageBoxedLayout = (value) => {
			if (value === true) {
				document.body.classList.add('boxed-layout');
			} else {
				document.body.classList.remove('boxed-layout');
			}
		}
		this.handleSetBodyWhiteBg = (value) => {
			if (value === true) {
				document.body.classList.add('bg-white');
			} else {
				document.body.classList.remove('bg-white');
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
			pageHeader: false,
			pageheaderMegaMenu: false,
			pageHeaderLanguageBar: false,
			hasScroll: false,
			handleSetPageHeader: this.handleSetPageHeader,
			handleSetPageHeaderLanguageBar: this.handleSetPageHeaderLanguageBar,
			handleSetPageHeaderMegaMenu: this.handleSetPageHeaderMegaMenu,
			
			pageSidebar: true,
			pageSidebarWide: true,
			pageSidebarLight: false,
			pageSidebarMinify: false,
			pageSidebarToggled: false,
			pageSidebarTransparent: false,
			pageSidebarSearch: false,
			handleSetPageSidebar: this.handleSetPageSidebar,
			handleSetPageSidebarWide: this.handleSetPageSidebarWide,
			handleSetPageSidebarLight: this.handleSetPageSidebarLight,
			handleSetPageSidebarMinified: this.handleSetPageSidebarMinified,
			handleSetPageSidebarTransparent: this.handleSetPageSidebarTransparent,
			handleSetPageSidebarSearch: this.handleSetPageSidebarSearch,
			handleSidebarOnMouseOut: this.handleSidebarOnMouseOut,
			handleSidebarOnMouseOver: this.handleSidebarOnMouseOver,
			toggleSidebarMinify: this.toggleSidebarMinify,
			toggleMobileSidebar: this.toggleMobileSidebar,
			
			pageFloatSubMenuActive: false,
			pageFloatSubMenu: '',
			pageFloatSubMenuTop: 'auto',
			pageFloatSubMenuLeft: 'auto',
			pageFloatSubMenuBottom: 'auto',
			pageFloatSubMenuLineTop: 'auto',
			pageFloatSubMenuLineBottom: 'auto',
			pageFloatSubMenuArrowTop: 'auto',
			pageFloatSubMenuArrowBottom: 'auto',
			pageFloatSubMenuOffset: '',
			handleFloatSubMenuOnMouseOver: this.handleFloatSubMenuOnMouseOver,
			handleFloatSubMenuOnMouseOut: this.handleFloatSubMenuOnMouseOut,
			handleFloatSubMenuClick: this.handleFloatSubMenuClick,
			
			pageContent: true,
			pageContentClass: '',
			pageContentFullHeight: false,
			pageContentFullWidth: false,
			pageContentInverseMode: false,
			handleSetPageContent: this.handleSetPageContent,
			handleSetPageContentClass: this.handleSetPageContentClass,
			handleSetPageContentFullHeight: this.handleSetPageContentFullHeight,
			handleSetPageContentFullWidth: this.handleSetPageContentFullWidth,
			handleSetPageContentInverseMode: this.handleSetPageContentInverseMode,
			
			pageFooter: false,
			handleSetPageFooter: this.handleSetPageFooter,
			
			pageTopMenu: false,
			pageMobileTopMenu: false,
			toggleMobileTopMenu: this.toggleMobileTopMenu,
			handleSetPageTopMenu: this.handleSetPageTopMenu,
			
			pageTwoSidebar: false,
			handleSetPageTwoSidebar: this.handleSetPageTwoSidebar,
			
			pageRightSidebar: false,
			pageRightSidebarToggled: true,
			pageMobileRightSidebarToggled: false,
			toggleRightSidebar: this.toggleRightSidebar,
			toggleMobileRightSidebar: this.toggleMobileRightSidebar,
			handleSetPageRightSidebar: this.handleSetPageRightSidebar,
			
			handleSetBodyWhiteBg: this.handleSetBodyWhiteBg,
			handleSetPageBoxedLayout: this.handleSetPageBoxedLayout,

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
	window.addEventListener('scroll', this.handleScroll)
	this.checkForAuthentication();
  }

  componentWillUnmount() {
	window.removeEventListener('scroll', this.handleScroll)
  }
  
  handleScroll = () => {
  	if (window.scrollY > 0) {
  		this.setState(state => ({
				hasScroll: true
			}));
  	} else {
  		this.setState(state => ({
				hasScroll: false
			}));
  	}
  	var elm = document.getElementsByClassName('nvtooltip');
  	for (var i = 0; i < elm.length; i++) {
  		elm[i].classList.add('d-none');
  	}
  }
	
	render() {
		return (
			<PageSettings.Provider value={this.state}>
				<div className={
					'fade page-sidebar-fixed show page-container ' + 
					(this.state.pageHeader ? 'page-header-fixed ' : '') + 
					(this.state.pageSidebar ? '' : 'page-without-sidebar ') + 
					(this.state.pageRightSidebar ? 'page-with-right-sidebar ' : '') +
					(this.state.pageSidebarWide ? 'page-with-wide-sidebar ' : '') +
					(this.state.pageSidebarLight ? 'page-with-light-sidebar ' : '') +
					(this.state.pageSidebarMinify ? 'page-sidebar-minified ' : '') + 
					(this.state.pageSidebarToggled ? 'page-sidebar-toggled ' : '') + 
					(this.state.pageTopMenu ? 'page-with-top-menu ' : '') + 
					(this.state.pageContentFullHeight ? 'page-content-full-height ' : '') + 
					(this.state.pageTwoSidebar ? 'page-with-two-sidebar ' : '') + 
					(this.state.pageRightSidebarCollapsed ? 'page-right-sidebar-collapsed ' : '') + 
					(this.state.pageMobileRightSidebarToggled ? 'page-right-sidebar-toggled ' : '') + 
					(this.state.hasScroll ? 'has-scroll ' : '')
				}>
					{this.state.pageHeader && (<Header />)}
					{this.state.pageSidebar && !this.state.isLoading && this.state.isAuthenticated && (<Sidebar />)}
					{this.state.pageTwoSidebar && !this.state.isLoading && this.state.isAuthenticated &&(<SidebarRight />)}
					{this.state.pageTopMenu && !this.state.isLoading && this.state.isAuthenticated &&(<TopMenu />)}
					{this.state.pageContent && !this.state.isLoading && (<Content />)}
					{this.state.pageFooter && !this.state.isLoading && this.state.isAuthenticated &&(<Footer />)}
					{this.state.pageSidebarMinify && <FloatSubMenu />}
				</div>
			</PageSettings.Provider>
		)
	}
}

export default App;