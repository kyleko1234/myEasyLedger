import React from 'react';
import { Redirect } from 'react-router-dom';
import { ACCESS_TOKEN } from '../../utils/constants';
import Dashboard from '../dashboard/dashboard';
import LoginV3 from '../user/login-v3';

function DefaultLandingPage(props) {
    let userJwt = localStorage.getItem(ACCESS_TOKEN);
    return(
        userJwt
            ? <Redirect to="/dashboard"/>
            : <Redirect to="user/login/form"/>
    )
}

export default DefaultLandingPage;