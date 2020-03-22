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

const Header = ({ headerClass, headerButtonContext, headerClick, headerButtonClass, headerButtonTitle, buttonContextId }) =>
        <header className={headerClass}>
                <h1 h1='true' className='h1'><FontAwesomeIcon className='header-icon' icon={faBook} />My Diary</h1>
                <Button buttonContext={headerButtonContext} click={headerClick} buttonType='button' buttonClass={headerButtonClass} buttonTitle={headerButtonTitle} buttonId={buttonContextId} />
        </header>

const Button = ({ buttonContext, click, submit, buttonType, buttonClass, buttonId, buttonTitle }) => <button button-context={buttonContext} onClick={click} onSubmit={submit} type={buttonType} id={buttonId} className={buttonClass}>{buttonTitle}</button>


const Input = ({ labelName, labelClass, inputLabel, inputClass, trackValue, inputType, inputIcon, inputId, placeholder, inputName, }) =>
        <div className='input-container'>
                <label label-name={labelName} className={labelClass}>{inputLabel}<FontAwesomeIcon className='label-icon' icon={inputIcon} /></label>
                <input className={inputClass} onChange={trackValue} type={inputType} id={inputId} placeholder={placeholder} name={inputName} ></input>
        </div>


const Legend = ({ formTitle }) => <legend className='legend'>{formTitle}</legend>

const SubmitButton = ({ submitContainerClass, submitButtonContext, submitButtonClass }) => <div className='input-container'><div className={submitContainerClass}></div><Button buttonContext={submitButtonContext} buttonType='submit' buttonTitle='Submit' buttonClass={submitButtonClass} /></div>

const Error = ({ authError, errorInfo }) => <div auth-error={authError} className='auth-error'>{errorInfo}</div>

const SignupComponent = ({ signinLink, error, handleSubmit, handleFullNameChange, handleEmailChange, handleUsernameChange, handlePasswordChange }) =>
        <div className='backgroundTwo backgroundProps'>
                <Header headerButtonContext='signin' headerClick={signinLink} headerClass="header" headerButtonTitle='Signin' headerButtonClass='title-button' buttonContextId='signin' />
                <Error authError='signup' errorInfo={error} />
                <main className='main'>
                        <form onSubmit={handleSubmit} id='signup-form' className='signup-form'>
                                <Legend formTitle='Sign up' />
                                <Input labelClass='label' inputIcon={faUser} labelName='fullName' inputClass='signup-input' trackValue={handleFullNameChange} inputLabel='Full Name' inputType='text' inputId='fullName' placeholder='Enter full name here' inputName='fullName' />
                                <Input labelClass='label' inputIcon={faUserCheck} labelName='username' inputClass='signup-input' trackValue={handleUsernameChange} inputLabel='Username' inputType='text' inputId='username' placeholder='Enter username here' inputName='username' />
                                <Input labelClass='label' inputIcon={faEnvelope} labelName='email' inputClass='signup-input' trackValue={handleEmailChange} inputLabel='Email' inputType='text' inputId='email' placeholder='Enter email here' inputName='email' />
                                <Input labelClass='label' inputIcon={faKey} labelName='password' inputClass='signup-input' trackValue={handlePasswordChange} inputLabel='Password' inputType='password' inputId='password' placeholder='Enter password here' inputName='password' />
                                <SubmitButton submitButtonContext='submit-signup' submitButtonClass='signup-submit-button' />
                        </form>
                </main>
        </div>

const SigninComponent = ({ signupLink, error, handleSubmit, handleUserChange, handlePasswordChange }) =>
        <div className='backgroundThree backgroundProps'>
                <Header headerButtonContext='signup' headerClick={signupLink} headerClass="header" headerButtonTitle='Signup' headerButtonClass='title-button' buttonContextId='signup' />
                <Error authError='signin' errorInfo={error} />
                <main className='main'>
                        <form onSubmit={handleSubmit} id='signin-form' className='signin-form'>
                                <Legend formTitle='Sign in' />
                                <Input labelClass='label' inputIcon={faUser} labelName='user' inputClass='signin-input' trackValue={handleUserChange} inputLabel='Email / Username' inputType='text' inputId='user' placeholder='Enter email or username here' inputName='user' />
                                <Input labelClass='label' inputIcon={faKey} labelName='password' inputClass='signin-input' trackValue={handlePasswordChange} inputLabel='Password' inputType='password' inputId='password' placeholder='Enter password here' inputName='password' />
                                <SubmitButton submitButtonContext='submit-signin' submitButtonClass='signin-submit-button' />
                        </form>
                </main>
        </div>

const HomeComponent = ({ signinLink, signupLink }) =>
        <div className='backgroundOne backgroundProps'>
                <Header headerButtonContext='home-signin' headerClick={signinLink} headerClass='home-header' headerButtonClass='home-title-button' headerButtonTitle='Have an account ? Signin' />
                <main className='home-main'>
                        <h3 intro='true' className='home-intro' >Welcome to My Diary, a safe, fast and reliable online journal to pen your thoughts</h3>
                        <Button buttonContext='home-signup' click={signupLink} buttonType='click' buttonId='signup-home' buttonClass='home-button' buttonTitle='Create an account now' />
                </main>
        </div>

const DashboardComponent = ({ token }) =>
        <div className=''>
                <Header headerButtonContext='dashboard' headerClass='header' headerButtonClass='title-button' headerButtonTitle='Signout' buttonContextId='signout' />
                <main className='main'>
                        <section className='dashboard'>{token}</section>
                </main>
        </div>

export {
        HandleInputChange, DashboardComponent,
        AuthRequest, SignupComponent, SigninComponent, HomeComponent,
}