import React from 'react';

const AuthHeader = (props) =>
        <header className='header'>
                <h1 className='h1'>My Diary</h1>
                <Button buttonClass='title-button' buttonTitle={props.headerButtonTitle} />
        </header>

const Button = (props) => <button className={props.buttonClass}>{props.buttonTitle}</button>


const Input = (props) =>
        <div className='input-container'>
                <label className='label'>{props.inputLabel}</label>
                <input className='input' type={props.inputType} id={props.inputId} placeholder={props.placeholder} name={props.inputName}></input>
        </div>


const Legend = (props) => <legend className='legend'>{props.formTitle}</legend>

const SubmitButton = () => <div className='input-container'><div className='breaking-space'>&nbsp;</div><Button buttonTitle='Submit' buttonClass='submit-button' /></div>

const SignupComponent = () =>
        <>
                <AuthHeader headerButtonTitle='Signin' />
                <main className='main'>
                        <form className='form'>
                                <Legend formTitle='Sign up' />
                                        <Input inputLabel='Full Name' inputType='text' inputId='fullName' placeholder='Full Name' inputName='fullName' />
                                        <Input inputLabel='Username' inputType='text' inputId='username' placeholder='Username' inputName='username' />
                                        <Input inputLabel='Email' inputType='text' inputId='email' placeholder='Email' inputName='email' />
                                        <Input inputLabel='Password' inputType='text' inputId='password' placeholder='Password' inputName='password' />
                                        <SubmitButton />
                        </form>
                </main>
        </>


export { SignupComponent }