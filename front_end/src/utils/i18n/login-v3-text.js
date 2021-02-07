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
        "Copyright text": `\u00a9 2021 MyEasyLedger.tw All Rights Reserved.`
    },
    "zh-TW": {
        "App description 1": "APP 描述",
        "Invalid email or password.": "輸入的電郵或密碼有誤。",
        "Email not verified": "您使用的電郵還未經確認，請檢視寄到該電郵的確認指示以完成確認程序。",
        "Click here to send a new verification email.": "點此再次寄出確認電郵指示到你的電郵址。",
        "Verification email sent!": "確認電郵已寄出！",
        "Email Address": "電郵",
        "Password": "密碼",
        "Sign me in": "登入",
        "Not a member": <div>還没有帳號嗎？點擊 <Link to="/user/register-v3" className="text-success">這個連結</Link> 建立一個使用帳號。</div>,
        "Copyright text": `\u00a9 2021 MyEasyLedger.tw 版權所有。`
    }

}