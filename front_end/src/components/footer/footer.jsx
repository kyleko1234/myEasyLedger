import React from 'react';
import { PageSettings } from '../../config/page-settings';
import {loginV3Text} from '../../utils/i18n/login-v3-text';

class Footer extends React.Component {
	static contextType = PageSettings;
	
	render() {
		return (
			<div id="footer" className="footer">
				{loginV3Text[this.context.locale]["Copyright text"]}
			</div>
		)
	}
}

export default Footer;