import React from 'react';
import { withRouter } from 'react-router-dom';
import { PageSettings } from './../../config/page-settings.js';
import LoginV3Render from './login-v3-render.js';

class LoginV3 extends React.Component {
	static contextType = PageSettings;
  
	componentDidMount() {
		this.context.handleSetPageSidebar(false);
		this.context.handleSetPageHeader(false);
		this.context.handleSetBodyWhiteBg(true);
	}

	componentWillUnmount() {
		this.context.handleSetPageSidebar(true);
		//this.context.handleSetPageHeader(true);
		this.context.handleSetBodyWhiteBg(false);
	}
  
	render() {
		return (
			<LoginV3Render history={this.props.history}/>
		)
	}
}

export default withRouter(LoginV3);