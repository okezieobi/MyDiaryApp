import React from 'react';
import { useHistory } from 'react-router-dom'
import { HomeComponent } from '../components';

const Home = () => {
    const history = useHistory();

    const signinLink = () => history.push('/signin');
    const signupLink = () => history.push('/signup');

    return <HomeComponent signinLink={signinLink} signupLink={signupLink} />
}

export default Home;
