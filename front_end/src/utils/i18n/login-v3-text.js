import React from 'react';
import {Link} from 'react-router-dom';

export const loginV3Text = {
    "en-US": {
        "App description 1": "App description",
        "Invalid email or password.": "Invalid email or password.",
        "Email not verified": "The email address for this account has not been verified. Please follow the instructions in your verification email to verify this account.",
        "Click here to send a new verification email.": "Click here to send a new verification email.",
        "Verification email sent!": "Verification email sent!",
        "Email Address": "Email Address",
        "Password": "Password",
        "Sign me in": "Sign me in",
        "Not a member": <div>Not a member yet? Click <Link to="/user/register-v3" className="text-success">here</Link> to register.</div>,
        "Copyright text": `\u00a9 2021 EasyLedger. All Rights Reserved.`
    },
    "zh-TW": {
        "App description 1": "TRANSLATION GOES HERE",
        "Invalid email or password.": "TRANSLATION GOES HERE.",
        "Email not verified": "The email address for this account has not been verified. Please follow the instructions in your verification email to verify this account.",
        "Click here to send a new verification email.": "TRANSLATION GOES HERE.",
        "Verification email sent!": "TRANSLATION GOES HERE!",
        "Email Address": "TRANSLATION GOES HERE",
        "Password": "TRANSLATION GOES HERE",
        "Sign me in": "TRANSLATION GOES HERE",
        "Not a member": <div>Not a member yet? Click <Link to="/user/register-v3" className="text-success">here</Link> to register.</div>,
        "Copyright text": `\u00a9 2021 EasyLedger. All Rights Reserved.`
    }

}