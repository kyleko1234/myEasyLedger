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
			<div id="sidebar" className="sidebar">
				<PerfectScrollbar className="height-full" options={{suppressScrollX: true, wheelPropagation: false}}>
					<div className="sidebar-header">
						{sidebarText[this.context.locale]["Navigation"]}
					</div>

					{this.context.currentOrganizationId 
                        ? (this.context.isEnterprise
                            ? enterpriseMenu.map(menuItem => {
                                return (
                                    <Link 
                                        key={menuItem.path} 
                                        to={menuItem.path} 
                                        className={"sidebar-item " + (menuItem.relevantBasePaths.includes(this.props.location.pathname.split("/")[1])? " active" : "")}
                                        onClick={(window.innerWidth < 768? (this.context.toggleHiddenSidebar) : null)}
                                    >
                                        <i className={menuItem.icon}></i>
                                        {sidebarText[this.context.locale][menuItem.title]}
                                    </Link>
                                )
                            })
                            : personalMenu.map(menuItem => {
                                return (
                                    <Link 
                                        key={menuItem.path} 
                                        to={menuItem.path} 
                                        className={"sidebar-item " + (menuItem.relevantBasePaths.includes(this.props.location.pathname.split("/")[1])? " active" : "")}
                                        onClick={(window.innerWidth < 768? (this.context.toggleHiddenSidebar) : null)}
                                    >
                                        <i className={menuItem.icon}></i>
                                        {sidebarText[this.context.locale][menuItem.title]}
                                    </Link>
                                )
                            })
                        )
                        : <div className="sidebar-item active">
                            <i className="fas fa-grip-horizontal"></i>
                            {sidebarText[this.context.locale]["Dashboard"]}
                        </div>
                    }
				</PerfectScrollbar>
			</div>
		)
	}
}

export default withRouter(Sidebar);
