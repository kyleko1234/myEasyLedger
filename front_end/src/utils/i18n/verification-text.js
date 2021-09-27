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
                        {lastName + firstName}你好。
                    </p>
                    <p>
                        歡迎來到 myEasyLedger，你新開的帳戶用的電郵址已通過驗證無誤！
                    </p>
                    <p>
                        <Link to="/user/login/form">請點本連結以登入你的帳戶。</Link>
                    </p>
                </>
            )
        },
        "failure": () => {
            return(
                <>
                    <p className="font-size-larger font-weight-bold">
                        不好意思。
                    </p>
                    <p>
                        你點擊的驗證連結無效！
                    </p>
                    <p>
                        寄到你電郵信箱中只有最新的一個驗證連結會是有效的，請在你的電郵信箱中，點擊當中最新的連結以完成驗證。
                    </p>
                </>
            )
        },
        "expired": (firstName, lastName) => {
            return(
                <>
                    <p className="font-size-larger font-weight-bold">
                        {lastName + firstName}你好。
                    </p>
                    <p>
                        你點擊的驗證連結已過期！
                    </p>
                    <p>
                        別擔心，我們已經又寄了一個新連結到你的電郵信箱，不久後你就會收到了。
                    </p>
                </>
            )
        }
    }, 
}
