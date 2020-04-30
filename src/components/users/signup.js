import React, { useState } from 'react';
import { useHistory, Redirect } from 'react-router-dom'
import { AuthRequest, SignupComponent, HandleInputChange } from '../components';

const Signup = () => {
    const history = useHistory();
    const [isAuthenticated, setAuth] = useState(false);
    const [error, setError] = useState(null);
    const [fullName, setFullName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleFullNameChange = (event) => HandleInputChange(event, setFullName);
    const handleUsernameChange = (event) => HandleInputChange(event, setUsername);
    const handleEmailChange = (event) => HandleInputChange(event, setEmail);
    const handlePasswordChange = (event) => HandleInputChange(event, setPassword);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { error, token } = await AuthRequest({
            fullName: fullName,
            username: username,
            email: email,
            password: password,
        }, '/api/v1/auth/signup');
        if (error) {
            setError(error);
        } else {
            localStorage.setItem('token', token);
            setAuth(true);
        }
    }

    const signinLink = () => history.push('/signin');

        if (isAuthenticated) return <Redirect to='/dashboard' push={true} />
        return <SignupComponent signinLink={signinLink}
        error={error} handleSubmit={handleSubmit} handleFullNameChange={handleFullNameChange}
        handleEmailChange={handleEmailChange} handleUsernameChange={handleUsernameChange}
        handlePasswordChange={handlePasswordChange} />
}

export default Signup;
