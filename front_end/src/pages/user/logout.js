import React from 'react';
import { withRouter } from 'react-router-dom';
import { PageSettings } from './../../config/page-settings.js';
import LoginV3Render from './login-v3-render.js';

class Logout extends React.Component {
	static contextType = PageSettings;
  
	componentDidMount() {
        this.context.logout();
	}
  
	render() {
		return (
            <h1>Logging out...</h1>
        );
	}
}

export default Logout;