import React from 'react';
import { Link } from 'react-router-dom';

export const verificationText = {
    
    "en-US": {
        "success": (firstName, lastName) => {
            return(
                <>
                    <p className="font-size-larger font-weight-bold">
                        Hello {firstName + " " + lastName}.
                    </p>
                    <p>
                        Welcome to myEasyLedger. Your account has been verified!
                    </p>
                    <p>
                        <Link to="/user/login/form">Please click here to log in.</Link>
                    </p>
                </>
            )
        },
        "failure": () => {
            return(
                <>
                    <p className="font-size-larger font-weight-bold">
                        We're sorry.
                    </p>
                    <p>
                        This verification link is invalid.
                    </p>
                    <p>
                        Only the most recent verification link sent to your email will work, so check your email to see if there is a newer verification link!
                    </p>
                </>
            )
        },
        "expired": (firstName, lastName) => {
            return(
                <>
                    <p className="font-size-larger font-weight-bold">
                        Hello {firstName + " " + lastName}.
                    </p>
                    <p>
                        This verification link has expired.
                    </p>
                    <p>
                        Don't worry, we've sent you a new one! It should be arriving in your inbox soon.
                    </p>
                </>
            )
        }
    }, 
    "zh-TW": {
        "success": (firstName, lastName) => {
            return(
                <>
                    <p className="font-size-larger font-weight-bold">
                        Hello {firstName + " " + lastName}.
                    </p>
                    <p>
                        Welcome to myEasyLedger. Your account has been verified!
                    </p>
                    <p>
                        <Link to="/user/login/form">Please click here to log in.</Link>
                    </p> {/** TRANSLATION */}
                </>
            )
        },
        "failure": () => {
            return(
                <>
                    <p className="font-size-larger font-weight-bold">
                        We're sorry.
                    </p>
                    <p>
                        This verification link is invalid.
                    </p>
                    <p>
                        Only the most recent verification link sent to your email will work, so check your email to see if there is a newer verification link!
                    </p> {/** TRANSLATION */}
                </>
            )
        },
        "expired": (firstName, lastName) => {
            return(
                <>
                    <p className="font-size-larger font-weight-bold">
                        Hello {firstName + " " + lastName}.
                    </p>
                    <p>
                        This verification link has expired.
                    </p>
                    <p>
                        Don't worry, we've sent you a new one! It should be arriving in your inbox soon.
                    </p> {/** TRANSLATION */}
                </>
            )
        }
    }, 
}
