import React from 'react';
import { withRouter, Route } from 'react-router-dom';
import { PageSettings } from '../../../config/page-settings.js';
import LoginContent from './login-content.js';
import ForgotPassword from './forgot-password.js';
import LoginPageSkeleton from '../components/login-page-skeleton.js';
//Login page
class LoginPage extends React.Component {
	static contextType = PageSettings;

	componentDidMount() {
		this.context.handleSetPageSidebar(false);
		this.context.handleSetPageHeader(false);
	}

	componentWillUnmount() {
		this.context.handleSetPageSidebar(true);
		this.context.handleSetPageHeader(true);
	}


	render() {
		return (
            <LoginPageSkeleton>
                <Route path="/user/login/form">
                    <LoginContent history={this.props.history}/>
                </Route>
                <Route path="/user/login/forgot">
                    <ForgotPassword />
                </Route>
            </LoginPageSkeleton>		)
	}
}

export default withRouter(LoginPage);