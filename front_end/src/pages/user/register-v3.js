import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import {PageSettings} from '../../config/page-settings.js';
import RegisterV3Render from './register-v3-render.js';

class RegisterV3 extends React.Component {
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
		return <RegisterV3Render history={this.props.history}/>;
	}
}

export default RegisterV3;