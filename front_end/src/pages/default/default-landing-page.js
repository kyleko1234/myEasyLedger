import React from 'react';
import { Redirect } from 'react-router-dom';
import { ACCESS_TOKEN } from '../../utils/constants';
import Dashboard from '../dashboard/dashboard';
import LoginPage from '../user/login/login-page';

function DefaultLandingPage(props) {
    let userJwt = localStorage.getItem(ACCESS_TOKEN);
    return(
        userJwt
            ? <Redirect to="/dashboard"/>
            : <Redirect to="user/login/form"/>
    )
}

export default DefaultLandingPage;