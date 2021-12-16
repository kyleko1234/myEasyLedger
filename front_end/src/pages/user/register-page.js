import React from 'react';
import { PageSettings } from '../../config/page-settings.js';
import RegisterV3Render from './register-v3-render.js';
import { registerV3Text } from '../../utils/i18n/register-v3-text.js';
import { REGISTER_BG_URL } from '../../utils/constants.js';
import LoginPageSkeleton from './components/login-page-skeleton.js';

class RegisterPage extends React.Component {
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
            <LoginPageSkeleton backgroundImage={REGISTER_BG_URL}>
                <RegisterV3Render history={this.props.history} />
            </LoginPageSkeleton>
        );
    }
}

export default RegisterPage;