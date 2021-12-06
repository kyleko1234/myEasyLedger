import React from 'react';
import { PageSettings } from '../../../config/page-settings';
import AcceptInvitationForm from './accept-invitation-form';

//required props: hasCompletedSetup
function AcceptInvitationPageContent({hasCompletedSetup, token}) {
    const appContext = React.useContext(PageSettings);
    const [completed, setCompleted] = React.useState(false);

    switch (hasCompletedSetup) {
        case "true": 
            return (
                <div>
                    This account has already been set up. Please click here to log in.
                </div>
            )
        case "false": 
            if (completed) {

            } else {
                return (
                    <AcceptInvitationForm
                        token={token}
                        setCompleted={setCompleted}
                    />
                )
            }
        case "failure":
        default:
            return (
                <div>
                    <button onClick={() => console.log(hasCompletedSetup)}></button>
                    This invitation link is invalid. Please click here to return to the login page.
                </div>
            )
    }
}

export default AcceptInvitationPageContent;