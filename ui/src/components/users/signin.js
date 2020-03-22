import React, { useState } from 'react';
import { useHistory, Redirect } from 'react-router-dom'
import { AuthRequest, SigninComponent, HandleInputChange } from '../components';

const Signin = () => {
    const history = useHistory();
    const [isAuthenticated, setAuth] = useState(false);
    const [error, setError] = useState(null);
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');

    const handleUserChange = (event) => HandleInputChange(event, setUser);
    const handlePasswordChange = (event) => HandleInputChange(event, setPassword);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { error, token } = await AuthRequest({
            user: user,
            password: password,
        }, '/api/v1/auth/signin');
        if (error) {
            setError(error);
        } else {
            localStorage.setItem('token', token);
            setAuth(true);
        }
    }

    const signupLink = () => history.push('/signup');

        if (isAuthenticated) return <Redirect to='/dashboard' push={true} />
        return <SigninComponent signupLink={signupLink} error={error}
        handleSubmit={handleSubmit} handleUserChange={handleUserChange}
        handlePasswordChange={handlePasswordChange} />
}

export default Signin;
