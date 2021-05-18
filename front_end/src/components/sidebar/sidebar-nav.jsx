import React from 'react';
import { Route } from 'react-router-dom';
import { PageSettings } from './../../config/page-settings.js';
import SidebarNavList from './sidebar-nav-list.jsx';
import {personalMenu, enterpriseMenu} from './menu.jsx';
import {sidebarText} from '../../utils/i18n/sidebar-text.js';

class SidebarNav extends React.Component {
	static contextType = PageSettings;
	
	constructor(props) {
		super(props);
		this.state = {
			active: -1,
			clicked: -1,
			menus: []
		};
	}

	handleExpand(e, i, match) {
		e.preventDefault();

		if (this.state.clicked === -1 && match) {
			this.setState(state => ({
				active: -1,
				clicked: 1
			}));
		} else {
			this.setState(state => ({
				active: (this.state.active === i ? -1 : i),
				clicked: 1
			}));
		}
	}
  
	render() {
		return (
			<ul className="nav">
				<li className="nav-header">{sidebarText[this.context.locale]["Navigation"]}</li>
				{this.context.isEnterprise? 
					enterpriseMenu.map((menu, i) => (
						<Route path={menu.path} exact={menu.exact} key={i} children={({ match }) => (
							<SidebarNavList
								data={menu} 
								key={i} 
								expand={(e) => this.handleExpand(e, i, match)}
								active={i === this.state.active} 
								clicked={this.state.clicked}
							/>
						)} />
					)):
					personalMenu.map((menu, i) => (
						<Route path={menu.path} exact={menu.exact} key={i} children={({ match }) => (
							<SidebarNavList
								data={menu} 
								key={i} 
								expand={(e) => this.handleExpand(e, i, match)}
								active={i === this.state.active} 
								clicked={this.state.clicked}
							/>
						)} />
					))
				}
			</ul>
		);
	}
}

export default SidebarNav;