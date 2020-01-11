import React from 'react';
import Helpers from '../helpers';
import { Header, SubmitButton, Input, Legend, Error } from '../components';
import { Redirect } from 'react-router-dom';

export default class Signup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            fullName: '',
            username: '',
            email: '',
            password: '',
            isAuthenticated: false,
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(event) {
        this.setState({ [event.target.name]: event.target.value })

    }

    async handleSubmit(e) {
        e.preventDefault();
        const { error, token } = await Helpers.authRequest({
            fullName: this.state.fullName,
            username: this.state.username,
            email: this.state.email,
            password: this.state.password,
        }, '/api/v1/auth/signup', 'POST');
        if (error) {
            this.setState({
                error,
            });
        } else {
            localStorage.setItem('token', token);
            this.setState({ isAuthenticated: true });
        }
    }

    render() {
        const { isAuthenticated, error } = this.state;

        if (isAuthenticated) return <Redirect to='/dashboard' push={true} />
        return (
            <div className='backgroundTwo'>
                <Header headerClass="header" headerButtonTitle='Signin' headerButtonClass='title-button' buttonContextId='signin' />
                <Error errorInfo={error} />
                <main className='main'>
                    <form onSubmit={this.handleSubmit} id='signup' className='form'>
                        <Legend formTitle='Sign up' />
                        <Input trackValue={this.handleInputChange} inputLabel='Full Name' inputType='text' inputId='fullName' placeholder='Full Name' inputName='fullName' />
                        <Input trackValue={this.handleInputChange} inputLabel='Username' inputType='text' inputId='username' placeholder='Username' inputName='username' />
                        <Input trackValue={this.handleInputChange} inputLabel='Email' inputType='text' inputId='email' placeholder='Email' inputName='email' />
                        <Input trackValue={this.handleInputChange} inputLabel='Password' inputType='password' inputId='password' placeholder='Password' inputName='password' />
                        <SubmitButton />
                    </form>
                </main>
            </div>
        )

    }
}
