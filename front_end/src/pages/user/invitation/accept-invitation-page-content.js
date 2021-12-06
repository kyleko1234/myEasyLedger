import React from 'react';

//required props: hasCompletedSetup
function AcceptInvitationPageContent(hasCompletedSetup) {
    const appContext = React.useContext(PageSettings);

    switch(hasCompletedSetup) {
        case "true": 
            return (
                <div>
                    This account has already been set up. Please click here to log in.
                </div>
            )
        case "false": 
        case "failure":
        default:
            return (
                <div>
                    This invitation link is invalid. Please click here to return to the login page.
                </div>
            )
    }
}

export default AcceptInvitationPageContent;