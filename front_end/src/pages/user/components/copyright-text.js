import React from 'react';
import { PageSettings } from '../../../config/page-settings';
import { loginV3Text } from '../../../utils/i18n/login-v3-text';

function CopyrightText(props) {
    const appContext = React.useContext(PageSettings)
    return(
        <p className="text-center text-grey-darker">
            {loginV3Text[appContext.locale]["Copyright text"]}
        </p>
    )
}

export default CopyrightText;