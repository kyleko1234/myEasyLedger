import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import {PageSettings} from '../../config/page-settings.js';

class RegistrationSuccessful extends React.Component {
	static contextType = PageSettings;
	
	constructor(props) {
    super(props);
    }

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
            <div className="register register-with-news-feed">
                <div className="news-feed">
                    <div className="news-image" style={{ backgroundImage: 'url(/assets/img/login-bg/login-bg-9.jpg)' }}></div>
                    <div className="news-caption">
                        <h4 className="caption-title"><b>Easy</b> Ledger App</h4>
                        <p>
                            As a Color Admin app administrator, you use the Color Admin console to manage your organization’s account, such as add new users, manage security settings, and turn on the services you want your team to access.
                        </p>
                    </div>
                </div>
                <div className="right-content">
                    <h1 className="register-header">
                        Registration Successful!
                    </h1>
                    <div className="register-content">
                            <div className="m-t-20 m-b-40 p-b-40 text-inverse">
                                <p>A verification email is on its way to your inbox.</p>
                                <Link to="/user/login/form">Return to login page.</Link>
                            </div>
                            <hr />
                            <p className="text-center">
                                &copy; Color Admin All Right Reserved 2020
                            </p>
                    </div>
                </div>
            </div>
        )	}
}

export default RegistrationSuccessful;