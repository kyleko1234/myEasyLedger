import React from 'react';
import { Link } from 'react-router-dom';
import { PageSettings } from '../../../config/page-settings';
import { registerV3Text } from '../../../utils/i18n/register-v3-text';
import AcceptInvitationForm from './accept-invitation-form';

//required props: hasCompletedSetup
function AcceptInvitationPageContent({hasCompletedSetup, token, email}) {
    const appContext = React.useContext(PageSettings);
    const [completed, setCompleted] = React.useState(false);

    switch (hasCompletedSetup) {
        case "true": 
            return (
                <div className="mb-3">
                    <p>
                        {registerV3Text[appContext.locale]["This account has already been set up."]} <br/>
                        {registerV3Text[appContext.locale]["Please click here to return to the login page."]}
                    </p>
                </div>
            )
        case "false": 
            if (completed) {
                return (
                    <div className="mt-5 mb-5 pb-5 text-inverse">
                        <p>{registerV3Text[appContext.locale]["You've finished setting up your account!"]}</p>
                        <Link to="/user/login/form" className="text-primary">{registerV3Text[appContext.locale]["Return to login page."]}</Link>
                    </div>
                )
            } else {
                return (
                    <AcceptInvitationForm
                        token={token}
                        setCompleted={setCompleted}
                        email={email}
                    />
                )
            }
        case "failure":
        default:
            return (
                <div className="mb-3">
                    <p>
                        {registerV3Text[appContext.locale]["This invitation link is invalid."]} <br/>
                        {registerV3Text[appContext.locale]["Please click here to return to the login page."]}
                    </p>
                </div>
            )
    }
}

export default AcceptInvitationPageContent;