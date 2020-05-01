import React from 'react';
import { useHistory } from 'react-router-dom'
import HomeComponent from '../containers/home';

export default () => {
    const history = useHistory();

    const signinLink = () => history.push('/signin');
    const signupLink = () => history.push('/signup');

    return <HomeComponent signinLink={signinLink} signupLink={signupLink} />
}
