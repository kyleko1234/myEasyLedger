import React from 'react';
import { PageSettings } from '../../config/page-settings.js';
import { REGISTER_BG_URL } from '../../utils/constants.js';
import LoginPageSkeleton from './components/login-page-skeleton.js';
import RegisterController from './register-controller.js';

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
                <RegisterController history={this.props.history} />
            </LoginPageSkeleton>
        );
    }
}

export default RegisterPage;