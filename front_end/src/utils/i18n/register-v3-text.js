import React from 'react';
import {Link} from 'react-router-dom';

export const registerV3Text = {
    "en-US": {
        "App description": "App description",
        "Sign Up": "Sign Up",
        "Create your myEasyLedger Account.": "Create your myEasyLedger Account.",
        "Name": "Name",
        "First name": "First name",
        "Last name": "Last name",
        "Email": "Email",
        "Email address": "Email address",
        "Email is already taken.": "Email is already taken.",
        "Re-enter Email": "Re-enter Email",
        "Re-enter email address": "Re-enter email address",
        "Email does not match.": "Email does not match.",
        "EasyLedger Name": "EasyLedger Name",
        "Password": "Password",
        "Re-enter Password": "Re-enter Password",
        "Password does not match.": "Password does not match.",
        "Agreement text": <div>By clicking Sign Up, you agree to our <Link to="#" className="text-primary">Terms</Link> and that you have read our <Link to="#" className="text-primary">Data Policy</Link>, including our <Link to="#" className="text-primary">Cookie Use</Link>.</div>,
        "Please agree.": "Please agree.",
        "Already a member": <div>Already a member? Click <Link to="/user/login/form" className="text-primary">here</Link> to login.</div>,
        "Copyright text": "\u00A9 2021 MyEasyLedger.tw All Rights Reserved.",

        "Next": "Next",
        "Create your first EasyLedger.": "Create your first EasyLedger.",
        "Something went wrong. Please try again later.": "Something went wrong. Please try again later.",
    },
    "zh-TW": {
        "App description": "APP 描述",
        "Sign Up": "建立新使用帳號",
        "Create your myEasyLedger Account.": "建立一個新的 myEasyLedger 帳號。",
        "Name": "您的名字",
        "First name": "名",
        "Last name": "姓",
        "Email": "您的電子郵箱",
        "Email address": "電郵址",
        "Email is already taken.": "該電郵已有 myEasyLedger 的帳號在使用中。",
        "Re-enter Email": "再次輸入電郵址",
        "Re-enter email address": "再一次輸入你的電郵址",
        "Email does not match.": "輸入的電郵址前後不符。",
        "EasyLedger Name": "TRANSLATION",
        "Password": "密碼",
        "Re-enter Password": "再一次輸入你的密碼",
        "Password does not match.": "輸入的密碼前後不符。",
        "Agreement text": <div>點擊要建立新帳號，即表示您同意了我們的 <Link to="#" className="text-primary">使用條款</Link> 也讀了我們的 <Link to="#" className="text-primary">資料政策</Link>，包抱 <Link to="#" className="text-primary">Cookie 的使用</Link>。</div>,
        "Please agree.": "請同意。",
        "Already a member": <div>已經有帳號了嗎？點擊 <Link to="/user/login/form" className="text-primary">這裡</Link> 就可以登入。</div>,
        "Copyright text": "\u00A9 2021 MyEasyLedger.tw 版權所有。"
    }
}