import React from 'react';

const Header = (props) =>
        <header className={props.headerClass}>
                <h1 className='h1'>My Diary</h1>
                <Button click={props.headerClick} buttonType='button' buttonClass={props.headerButtonClass} buttonTitle={props.headerButtonTitle} buttonId={props.buttonContextId} />
        </header>

const Button = (props) => <button onClick={props.click} onSubmit={props.submit} type={props.buttonType} id={props.buttonId} className={props.buttonClass}>{props.buttonTitle}</button>


const Input = (props) =>
        <div className='input-container'>
                <label className={props.labelClass}>{props.inputLabel}</label>
                <input className={props.inputClass} onChange={props.trackValue} type={props.inputType} id={props.inputId} placeholder={props.placeholder} name={props.inputName} ></input>
        </div>


const Legend = (props) => <legend className='legend'>{props.formTitle}</legend>

const SubmitButton = (props) => <div className='input-container'><div className={props.submitContainerClass}>&nbsp;</div><Button buttonType='submit' buttonTitle='Submit' buttonClass={props.submitButtonClass} /></div>

const Error = (props) => <div className='auth-error'>{props.errorInfo}</div>

export { Header, SubmitButton, Input, Legend, Error, Button }