import React from 'react';

const Header = (props) =>
        <header className='header'>
                <h1 className='h1'>My Diary</h1>
                <Button buttonType='button' buttonClass='title-button' buttonTitle={props.headerButtonTitle} buttonId={props.buttonContextId} />
        </header>

const Button = (props) => <button type={props.buttonType} id={props.buttonId} className={props.buttonClass}>{props.buttonTitle}</button>


const Input = (props) =>
        <div className='input-container'>
                <label className='label'>{props.inputLabel}</label>
                <input className='input' onChange={props.trackValue} type={props.inputType} id={props.inputId} placeholder={props.placeholder} name={props.inputName} ></input>
        </div>


const Legend = (props) => <legend className='legend'>{props.formTitle}</legend>

const SubmitButton = () => <div className='input-container'><div className='breaking-space'>&nbsp;</div><Button buttonType='submit' buttonTitle='Submit' buttonClass='submit-button' /></div>

const Error = (props) => <div className='auth-error'>{props.errorInfo}</div>

export { Header, SubmitButton, Input, Legend, Error }