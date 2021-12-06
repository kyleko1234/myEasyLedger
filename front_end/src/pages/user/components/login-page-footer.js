import React from 'react';
import { Link } from 'react-router-dom';
import { PageSettings } from '../../../config/page-settings';
import { LOCALE_OPTIONS } from '../../../utils/constants';
import CopyrightText from './copyright-text';

function LoginPageFooter(props) {
    const appContext = React.useContext(PageSettings);

    return (
        <div>
            <LocaleSwitcher />
            <hr width="100%"/>
            <CopyrightText />
        </div>
    )
}