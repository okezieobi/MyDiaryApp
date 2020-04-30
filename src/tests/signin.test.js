import React from 'react';
import { unmountComponentAtNode, render } from 'react-dom';
import { MemoryRouter } from 'react-router-dom'
import { act, Simulate } from 'react-dom/test-utils';

import App from '../App';
import { inputs, successRes, errorRes } from './utils';

describe('test signup component rendering', () => {
    let container;
    
    beforeEach(() => {
        container = document.createElement('div');
        document.body.appendChild(container);
    });

    afterEach(() => {
        unmountComponentAtNode(container);
        container.remove();
        container = null;
    });

    it('renders signin page without with errors', () => {
        act(() => {
            render(
                <MemoryRouter initialEntries={['/signin']}>
                    <App/>
                </MemoryRouter>
                , container);
        });

        const h1 = document.querySelector('[h1=true]');
        const signupLink = document.querySelector('[button-context=signup]');
        const signinLegendTitle = document.querySelector('legend');
        const labels = document.querySelectorAll('label');
        const userLabel = document.querySelector('[label-name=user]');
        const passwordLabel = document.querySelector('[label-name=password]');
        const submitSignin = document.querySelector('[button-context=submit-signin]');
        const inputs = document.querySelectorAll('input');

        expect(h1.textContent).toBe('My Diary');
        expect(signupLink.textContent).toBe('Signup');
        expect(signinLegendTitle.textContent).toBe('Sign in');
        expect(labels.length).toBe(2);
        expect(userLabel.textContent).toBe('Email / Username');
        expect(passwordLabel.textContent).toBe('Password');
        expect(submitSignin.textContent).toBe('Submit');
        expect(inputs.length).toBe(2);
    });

    it('navigates to signup page from signin page without errors', async () => {
        act(() => {
            render(
                <MemoryRouter initialEntries={['/signin']}>
                    <App/>
                </MemoryRouter>
                , container);
        });

        act(() => {
            const signupLink = document.querySelector('[button-context=signup]');
            Simulate.click(signupLink);
        });

        const h1 = document.querySelector('[h1=true]');
        const signinLink = document.querySelector('[button-context=signin]');
        const signupLegendTitle = document.querySelector('legend');
        const labels = document.querySelectorAll('label');
        const fullNameLabel = document.querySelector('[label-name=fullName]');
        const usernameLabel = document.querySelector('[label-name=username]');
        const emailLabel = document.querySelector('[label-name=email]');
        const passwordLabel = document.querySelector('[label-name=password]');
        const submitSignup = document.querySelector('[button-context=submit-signup]');
        const inputs = document.querySelectorAll('input');

        expect(h1.textContent).toBe('My Diary');
        expect(signinLink.textContent).toBe('Signin');
        expect(signupLegendTitle.textContent).toBe('Sign up');
        expect(labels.length).toBe(4);
        expect(fullNameLabel.textContent).toBe('Full Name');
        expect(usernameLabel.textContent).toBe('Username');
        expect(emailLabel.textContent).toBe('Email');
        expect(passwordLabel.textContent).toBe('Password');
        expect(submitSignup.textContent).toBe('Submit');
        expect(inputs.length).toBe(4);
    });

    it('navigates to dashboard page from signin page if signup is successful', async () => {
        act(() => {
            render(
                <MemoryRouter initialEntries={['/signin']} >
                    <App />
                </MemoryRouter>
                , container);
        });

            const userInput = document.querySelector('input[name=user]');
            const passwordInput = document.querySelector('input[name=password]');
            const signinForm = document.querySelector('#signin-form');

            jest.spyOn(global, "fetch").mockImplementation(() =>
                Promise.resolve({
                    json: () => Promise.resolve(successRes),
                })
            );

            await act(async () => {
                Simulate.change(userInput, { target: { value: inputs.email || inputs.username } });
                Simulate.change(passwordInput, { target: { value: inputs.password } });                
                Simulate.submit(signinForm);
            })        

        const h1 = document.querySelector('[h1=true]');
        const dashboardSignout = document.querySelector('[button-context=dashboard]');

        expect(h1.textContent).toBe('My Diary');
        expect(dashboardSignout.textContent).toBe('Signout');
        
        global.fetch.mockRestore();
    });


    it('displays error message at signup page if signup is unsuccessful', async () => {
        act(() => {
            render(
                <MemoryRouter initialEntries={['/signin']} >
                    <App />
                </MemoryRouter>
                , container);
        });

            const signinForm = document.querySelector('#signin-form');

            jest.spyOn(global, "fetch").mockImplementation(() =>
                Promise.resolve({
                    json: () => Promise.resolve(errorRes),
                })
            );

            await act(async () => {
                Simulate.submit(signinForm);
            })        

        const h1 = document.querySelector('[h1=true]');
        const authError = document.querySelector('[auth-error=signin]');

        expect(h1.textContent).toBe('My Diary');
        expect(authError.textContent).toBe(errorRes.error);

        global.fetch.mockRestore();
    });
});