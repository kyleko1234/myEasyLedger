import React from 'react';
import { PageSettings } from '../../config/page-settings.js';
import RegisterV3Render from './register-v3-render.js';
import { registerV3Text } from '../../utils/i18n/register-v3-text.js';

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
            <div className="login-page" style={{ backgroundImage: 'url(/assets/img/login-bg/login-bg-12.jpg)' }}>
                <div className="login-left">
                    <div className="login-left-caption">
                        <div className="login-left-caption-title">my<b>Easy</b>Ledger</div>
                        <p>
                            {registerV3Text[this.context.locale]["App description"]}
                        </p>
                    </div>
                </div>
                <div className="login-right overflow-auto">
                    <RegisterV3Render history={this.props.history} />
                </div>
            </div>

        );
    }
}

export default RegisterV3;