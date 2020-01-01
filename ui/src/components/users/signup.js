import React from 'react';
// import { sendRequest } from './helpers'
import { Header, SubmitButton, Input, Legend } from '../components';

export default class Signup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            userData: {},
            isComponentVisible: true,
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        window.location = '/dashboard';
    }

    /*
    componentDidMount() {
        const signupRequest = sendRequest('signup', '/api/v1/auth/signup', 'POST');
        if (signupRequest.ok) {
            this.setState({
                isLoaded: true,
                userData: signupRequest.json().data,
            })
        } else {
            this.setState({
                error: signupRequest.json().error
            })
        }
    }
    */

    render() {
        return (
             <div className=''>
                <Header headerButtonTitle='Signin' buttonContextId='signin' />
                <main className='main'>
                        <form onSubmit={this.handleSubmit} id='signup' className='form'>
                                <Legend formTitle='Sign up' />
                                        <Input inputLabel='Full Name' inputType='text' inputId='fullName' placeholder='Full Name' inputName='fullName' />
                                        <Input inputLabel='Username' inputType='text' inputId='username' placeholder='Username' inputName='username' />
                                        <Input inputLabel='Email' inputType='text' inputId='email' placeholder='Email' inputName='email' />
                                        <Input inputLabel='Password' inputType='text' inputId='password' placeholder='Password' inputName='password' />
                                        <SubmitButton />
                        </form>
                </main>
        </div>
        )
    }
}
