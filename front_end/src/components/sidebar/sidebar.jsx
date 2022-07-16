import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { PageSettings } from './../../config/page-settings.js';
import { sidebarText } from '../../utils/i18n/sidebar-text.js';
import { enterpriseMenu, personalMenu } from './menu.jsx';
class Sidebar extends React.Component {
	static contextType = PageSettings;
	
	render() {
		return (
			<nav id="sidebar" className="sidebar">
				<PerfectScrollbar className="height-full" options={{suppressScrollX: true, wheelPropagation: false}}>
					<div className="sidebar-header">
						{sidebarText[this.context.locale]["Navigation"]}
					</div>
                    <ul>
                        {this.context.currentOrganizationId 
                            ? (this.context.isEnterprise
                                ? enterpriseMenu.map(menuItem => {
                                    return (
                                        <li                                                 
                                            key={menuItem.path} 
                                        >
                                            <Link 
                                                to={menuItem.path} 
                                                className={"sidebar-item " + (menuItem.relevantBasePaths.includes(this.props.location.pathname.split("/")[1])? " active" : "")}
                                                onClick={(window.innerWidth < 768? (this.context.toggleHiddenSidebar) : null)}
                                            >
                                                <i className={menuItem.icon}></i>
                                                {sidebarText[this.context.locale][menuItem.title]}
                                            </Link>
                                        </li>
                                    )
                                })
                                : personalMenu.map(menuItem => {
                                    return (
                                        <li
                                            key={menuItem.path} 
                                        >
                                            <Link 
                                                to={menuItem.path} 
                                                className={"sidebar-item " + (menuItem.relevantBasePaths.includes(this.props.location.pathname.split("/")[1])? " active" : "")}
                                                onClick={(window.innerWidth < 768? (this.context.toggleHiddenSidebar) : null)}
                                            >
                                                <i className={menuItem.icon}></i>
                                                {sidebarText[this.context.locale][menuItem.title]}
                                            </Link>
                                        </li>
                                    )
                                })
                            )
                            : <div className="sidebar-item active">
                                <i className="fas fa-grip-horizontal"></i>
                                {sidebarText[this.context.locale]["Dashboard"]}
                            </div>
                        }
                    </ul>
				</PerfectScrollbar>
			</nav>
		)
	}
}

export default withRouter(Sidebar);
