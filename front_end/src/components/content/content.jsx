import React from 'react';
import { Redirect, Route, withRouter } from 'react-router-dom';
import routes from './../../config/page-route.jsx';
import { PageSettings } from './../../config/page-settings.js';

function setTitle(path, routeArray) {
	var pageTitle;
	for (var i=0; i < routeArray.length; i++) {
		if (routeArray[i].path === path) {
			pageTitle = 'myEasyLedger | ' + routeArray[i].title;
		}
	}
	document.title = (pageTitle) ? pageTitle : 'myEasyLedger';
}

class Content extends React.Component {
	componentDidMount() {
		this.props.history.listen(() => {
			setTitle(this.props.history.location.pathname, routes);
		})
	}



  
	render() {
		return (
			<PageSettings.Consumer>
				{({isAuthenticated, isLoading}) => (
					<div className="content">
						{routes.map((route, index) => (
							<Route
								key={index}
								path={route.path}
								exact={route.exact}
								component={route.component}
							/>
						))}
					</div>
				)
			}
			</PageSettings.Consumer>
		);
	}
}

export default withRouter(Content);
