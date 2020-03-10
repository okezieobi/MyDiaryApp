import React from 'react';
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
                <h1 header='title' className='h1'>My Diary</h1>
                <Button click={props.headerClick} buttonType='button' buttonClass={props.headerButtonClass} buttonTitle={props.headerButtonTitle} buttonId={props.buttonContextId} />
        </header>

const Button = (props) => <button button-text='text' onClick={props.click} onSubmit={props.submit} type={props.buttonType} id={props.buttonId} className={props.buttonClass}>{props.buttonTitle}</button>


const Input = (props) =>
        <div className='input-container'>
                <label className={props.labelClass}>{props.inputLabel}</label>
                <input className={props.inputClass} onChange={props.trackValue} type={props.inputType} id={props.inputId} placeholder={props.placeholder} name={props.inputName} ></input>
        </div>


const Legend = (props) => <legend className='legend'>{props.formTitle}</legend>

const SubmitButton = (props) => <div className='input-container'><div className={props.submitContainerClass}>&nbsp;</div><Button buttonType='submit' buttonTitle='Submit' buttonClass={props.submitButtonClass} /></div>

const Error = (props) => <div className='auth-error'>{props.errorInfo}</div>

const SignupComponent = (props) =>
        <div className='backgroundTwo backgroundProps'>
                <Header headerClick={props.signinLink} headerClass="header" headerButtonTitle='Signin' headerButtonClass='title-button' buttonContextId='signin' />
                <Error errorInfo={props.error} />
                <main className='main'>
                        <form onSubmit={props.handleSubmit} id='signup' className='form'>
                                <Legend formTitle='Sign up' />
                                <Input inputClass='signup-input' trackValue={props.handleFullNameChange} inputLabel='Full Name' inputType='text' inputId='fullName' placeholder='Full Name' inputName='fullName' />
                                <Input inputClass='signup-input' trackValue={props.handleUsernameChange} inputLabel='Username' inputType='text' inputId='username' placeholder='Username' inputName='username' />
                                <Input inputClass='signup-input' trackValue={props.handleEmailChange} inputLabel='Email' inputType='text' inputId='email' placeholder='Email' inputName='email' />
                                <Input inputClass='signup-input' trackValue={props.handlePasswordChange} inputLabel='Password' inputType='password' inputId='password' placeholder='Password' inputName='password' />
                                <SubmitButton submitContainerClass='signup-breaking-space' submitButtonClass='signup-submit-button' />
                        </form>
                </main>
        </div>

const SigninComponent = (props) =>
        <div className='backgroundThree backgroundProps'>
                <Header headerClick={props.signupLink} headerClass="header" headerButtonTitle='Signup' headerButtonClass='title-button' buttonContextId='signup' />
                <Error errorInfo={props.error} />
                <main className='main'>
                        <form onSubmit={props.handleSubmit} id='signin' className='form'>
                                <Legend formTitle='Sign in' />
                                <Input inputClass='signin-input' trackValue={props.handleUserChange} inputLabel='Email/Username' inputType='text' inputId='user' placeholder='Email or Username' inputName='user' />
                                <Input inputClass='signin-input' trackValue={props.handlePasswordChange} inputLabel='Password' inputType='password' inputId='password' placeholder='Password' inputName='password' />
                                <SubmitButton submitContainerClass='signin-braking-space' submitButtonClass='signin-submit-button' />
                        </form>
                </main>
        </div>

const HomeComponent = (props) =>
        <div className='backgroundOne backgroundProps'>
                <Header headerClick={props.signinLink} headerClass='home-header' headerButtonClass='home-title-button' headerButtonTitle='Have an account ? Signin' />
                <main className='home-main'>
                        <h3 home-message='message' className='home-intro' >Welcome to My Diary, an safe, fast and reliable online journal to pen your thoughts</h3>
                        <Button click={props.signupLink} buttonType='click' buttonClass='home-button' buttonTitle='Create an account now' />
                </main>
        </div>

const DashboardComponent = (props) =>
        <div className=''>
                <Header headerClass='header' headerButtonClass='title-button' headerButtonTitle='Signout' buttonContextId='signout' />
                <main className='main'>
                        <section className='dashboard'>{props.token}</section>
                </main>
        </div>

export {
        HandleInputChange, DashboardComponent,
        AuthRequest, SignupComponent, SigninComponent, HomeComponent,
}