import React from 'react';
import {PageSettings} from '../../config/page-settings.js';
import RegisterV3Render from './register-v3-render.js';
import {registerV3Text} from '../../utils/i18n/register-v3-text.js';

class RegisterV3 extends React.Component {
	static contextType = PageSettings;
	
	constructor(props) {
    super(props);
    }

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
			<div className="register register-with-news-feed">
            <div className="news-feed">
                <div className="news-image" style={{ backgroundImage: 'url(/assets/img/login-bg/login-bg-9.jpg)' }}></div>
                <div className="news-caption">
                    <h4 className="caption-title">my<b>Easy</b>Ledger</h4>
                    <p>
                        {registerV3Text[this.context.locale]["App description"]}
                    </p>
                </div>
            </div>
            <div className="right-content overflow-hidden">
				<RegisterV3Render history={this.props.history}/>
            </div>
        </div>

		);
	}
}

export default RegisterV3;