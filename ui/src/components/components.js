import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faUser, faKey, faEnvelope, faUserCheck } from '@fortawesome/free-solid-svg-icons';
import logLevel from 'loglevel';

const DisplayErrors = (error) => logLevel.error(error);

const HandleInputChange = (event, setState) => setState(event.target.value);

const FetchApi = async (inputData = {}, url = '', requestMethod = '', auth = '') => {
        try {
                const response = await fetch(url,
                        {
                                method: requestMethod,
                                body: JSON.stringify(inputData),
                                headers: {
                                        'Content-Type': 'application/json',
                                        'token': auth,
                                },
                        });
                return response.json();
        } catch (error) {
                return DisplayErrors(error);
        }
}

const AuthRequest = (data = {}, url = '') => FetchApi(data, url, 'POST', null);

const Header = (props) =>
        <header className={props.headerClass}>
                <h1 h1='true' className='h1'><FontAwesomeIcon className='header-icon' icon={faBook} />My Diary</h1>
                <Button buttonContext={props.headerButtonContext} click={props.headerClick} buttonType='button' buttonClass={props.headerButtonClass} buttonTitle={props.headerButtonTitle} buttonId={props.buttonContextId} />
        </header>

const Button = (props) => <button button-context={props.buttonContext} onClick={props.click} onSubmit={props.submit} type={props.buttonType} id={props.buttonId} className={props.buttonClass}>{props.buttonTitle}</button>


const Input = (props) =>
        <div className='input-container'>
                <label label-name={props.labelName} className={props.labelClass}>{props.inputLabel} <FontAwesomeIcon className='label-icon' icon={props.inputIcon} /></label>
                <input className={props.inputClass} onChange={props.trackValue} type={props.inputType} id={props.inputId} placeholder={props.placeholder} name={props.inputName} ></input>
        </div>


const Legend = (props) => <legend className='legend'>{props.formTitle}</legend>

const SubmitButton = (props) => <div className='input-container'><div className={props.submitContainerClass}></div><Button buttonContext={props.submitButtonContext} buttonType='submit' buttonTitle='Submit' buttonClass={props.submitButtonClass} /></div>

const Error = (props) => <div auth-error={props.authError} className='auth-error'>{props.errorInfo}</div>

const SignupComponent = (props) =>
        <div className='backgroundTwo backgroundProps'>
                <Header headerButtonContext='signin' headerClick={props.signinLink} headerClass="header" headerButtonTitle='Signin' headerButtonClass='title-button' buttonContextId='signin' />
                <Error authError='signup' errorInfo={props.error} />
                <main className='main'>
                        <form onSubmit={props.handleSubmit} id='signup-form' className='signup-form'>
                                <Legend formTitle='Sign up' />
                                <Input labelClass='label' inputIcon={faUser} labelName='fullName' inputClass='signup-input' trackValue={props.handleFullNameChange} inputLabel='Full Name' inputType='text' inputId='fullName' placeholder='Enter full name here' inputName='fullName' />
                                <Input labelClass='label' inputIcon={faUserCheck} labelName='username' inputClass='signup-input' trackValue={props.handleUsernameChange} inputLabel='Username' inputType='text' inputId='username' placeholder='Enter username here' inputName='username' />
                                <Input labelClass='label' inputIcon={faEnvelope} labelName='email' inputClass='signup-input' trackValue={props.handleEmailChange} inputLabel='Email' inputType='text' inputId='email' placeholder='Enter email here' inputName='email' />
                                <Input labelClass='label' inputIcon={faKey} labelName='password' inputClass='signup-input' trackValue={props.handlePasswordChange} inputLabel='Password' inputType='password' inputId='password' placeholder='Enter password here' inputName='password' />
                                <SubmitButton submitButtonContext='submit-signup' submitButtonClass='signup-submit-button' />
                        </form>
                </main>
        </div>

const SigninComponent = (props) =>
        <div className='backgroundThree backgroundProps'>
                <Header headerButtonContext='signup' headerClick={props.signupLink} headerClass="header" headerButtonTitle='Signup' headerButtonClass='title-button' buttonContextId='signup' />
                <Error errorInfo={props.error} />
                <main className='main'>
                        <form onSubmit={props.handleSubmit} id='signin' className='signin-form'>
                                <Legend formTitle='Sign in' />
                                <Input labelClass='label' inputIcon={faUser} labelName='user' inputClass='signin-input' trackValue={props.handleUserChange} inputLabel='Email / Username' inputType='text' inputId='user' placeholder='Enter email or username here' inputName='user' />
                                <Input labelClass='label' inputIcon={faKey} labelName='password' inputClass='signin-input' trackValue={props.handlePasswordChange} inputLabel='Password' inputType='password' inputId='password' placeholder='Enter password here' inputName='password' />
                                <SubmitButton submitButtonContext='submit-signin' submitButtonClass='signin-submit-button' />
                        </form>
                </main>
        </div>

const HomeComponent = (props) =>
        <div className='backgroundOne backgroundProps'>
                <Header headerButtonContext='home-signin' headerClick={props.signinLink} headerClass='home-header' headerButtonClass='home-title-button' headerButtonTitle='Have an account ? Signin' />
                <main className='home-main'>
                        <h3 intro='true' className='home-intro' >Welcome to My Diary, a safe, fast and reliable online journal to pen your thoughts</h3>
                        <Button buttonContext='home-signup' click={props.signupLink} buttonType='click' buttonId='signup-home' buttonClass='home-button' buttonTitle='Create an account now' />
                </main>
        </div>

const DashboardComponent = (props) =>
        <div className=''>
                <Header headerButtonContext='dashboard' headerClass='header' headerButtonClass='title-button' headerButtonTitle='Signout' buttonContextId='signout' />
                <main className='main'>
                        <section className='dashboard'>{props.token}</section>
                </main>
        </div>

export {
        HandleInputChange, DashboardComponent,
        AuthRequest, SignupComponent, SigninComponent, HomeComponent,
}