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
            <div className="d-flex justify-content-center py-3">
                <i className="fas fa-3x fa-circle-notch fa-spin"></i>
            </div>
        );
	}
}

export default Logout;