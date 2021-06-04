import React from 'react';
import { withRouter, Route, Link} from 'react-router-dom';
import { PageSettings } from './../../config/page-settings.js';
import LoginV3Render from './login-v3-render.js';
import { loginV3Text } from '../../utils/i18n/login-v3-text';
import ForgotPassword from './forgot-password.js';
import {LOCALE_OPTIONS} from '../../utils/constants.js';
//Login page
class LoginV3 extends React.Component {
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
			<div className="login-page" style={{ backgroundImage: 'url(/assets/img/login-bg/login-bg-11.jpg)' }} >
				<div className="login-left" >
					<div className="login-left-caption">
						<div className="login-left-caption-title"> my<b>Easy</b>Ledger</div>
						<p>
							{loginV3Text[this.context.locale]["App description 1"]}
						</p>
					</div>
				</div>
				<div className="login-right overflow-auto">
						<Route path="/user/login/form">
							<LoginV3Render history={this.props.history}/>
						</Route>
						<Route path="/user/login/forgot">
							<ForgotPassword />
						</Route>
						<div>
							{LOCALE_OPTIONS.map(localeOption => {
								return (
									this.context.locale == localeOption.value ?
										<b key={localeOption.value} className="mr-3 font-weight-600">{localeOption.label}</b> :
										<Link key={localeOption.value} replace to="#" onClick={() => this.context.handleSetLocale(localeOption.value)} className="mr-3">{localeOption.label}</Link>
								)
							})}
						</div>
						<hr width="100%"/>
						<p className="text-center text-grey-darker">
							{loginV3Text[this.context.locale]["Copyright text"]}
						</p>
				</div>
			</div>
		)
	}
}

export default withRouter(LoginV3);