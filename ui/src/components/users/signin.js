import React from 'react';
import fetch from '../../helpers/fetch';
import helpers from '../../helpers/helper';
import { Header, SubmitButton, Input, Legend, Error } from '../components';
import { Redirect } from 'react-router-dom';

export default class Signin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: '',
            password: '',
            error: null,
            isAuthenticated: false,
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.redirectToSignup = this.redirectToSignup.bind(this);
    }

    handleInputChange(event) {
        this.setState({ [event.target.name]: event.target.value })

    }

    async handleSubmit(e) {
        e.preventDefault();
        const { error, token } = await fetch.authRequest({
            user: this.state.user,
            password: this.state.password,
        }, '/api/v1/auth/signin');
        if (error) {
            this.setState({
                error,
            });
        } else {
            localStorage.setItem('token', token);
            this.setState({ isAuthenticated: true });
        }
    }

    redirectToSignup() {
        return helpers.loadPage('/signup');
    }

    render() {
        const { isAuthenticated, error } = this.state;

        if (isAuthenticated) return <Redirect to='/dashboard' push={true} />
        return (
            <div className='backgroundThree backgroundProps'>
                <Header headerClick={this.redirectToSignup} headerClass="header" headerButtonTitle='Signup' headerButtonClass='title-button' buttonContextId='signup' />
                <Error errorInfo={error} />
                <main className='main'>
                    <form onSubmit={this.handleSubmit} id='signin' className='form'>
                        <Legend formTitle='Sign in' />
                        <Input inputClass='signin-input' trackValue={this.handleInputChange} inputLabel='Email/Username' inputType='text' inputId='user' placeholder='Email or Username' inputName='user' />
                        <Input inputClass='signin-input' trackValue={this.handleInputChange} inputLabel='Password' inputType='password' inputId='password' placeholder='Password' inputName='password' />
                        <SubmitButton submitContainerClass='signin-braking-space' submitButtonClass='signin-submit-button' />
                    </form>
                </main>
            </div>
        );
    }
}