import React from 'react';
import { unmountComponentAtNode, render } from 'react-dom';
import { MemoryRouter } from 'react-router-dom'
import { act, Simulate } from 'react-dom/test-utils';

import App from '../App';
import { UserInputs, UserRes } from './utils';

describe('test signup component rendering', () => {
    let container;

    beforeEach(() => {
        container = document.createElement('div');
        document.body.appendChild(container);
    });

    afterEach(() => {
        
    })

    afterEach(() => {
        unmountComponentAtNode(container);
        container.remove();
        container = null;
    });

    it('renders signup page without with errors', () => {
        act(() => {
            render(
                <MemoryRouter initialEntries={['/signup']} >
                    <App />
                </MemoryRouter>
                , container);
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

    it('navigates to signin page from signup without errors', async () => {
        act(() => {
            render(
                <MemoryRouter initialEntries={['/signup']} >
                    <App />
                </MemoryRouter>
                , container);
        });


        act(() => {
            const signinLink = document.querySelector('[button-context=signin]');
            Simulate.click(signinLink);
        });

        const h1 = document.querySelector('[h1=true]');
        const signupLink = document.querySelector('[button-context=signup]');
        const signinLegendTitle = document.querySelector('legend');
        const labels = document.querySelectorAll('label');
        const emailLabel = document.querySelector('[label-name=user]');
        const passwordLabel = document.querySelector('[label-name=password]');
        const submitSignin = document.querySelector('[button-context=submit-signin]');
        const inputs = document.querySelectorAll('input');

        expect(h1.textContent).toBe('My Diary');
        expect(signupLink.textContent).toBe('Signup');
        expect(signinLegendTitle.textContent).toBe('Sign in');
        expect(labels.length).toBe(2);
        expect(emailLabel.textContent).toBe('Email / Username');
        expect(passwordLabel.textContent).toBe('Password');
        expect(submitSignin.textContent).toBe('Submit');
        expect(inputs.length).toBe(2);

    });

    it('navigates to dashboard page from signup page if signup is successful', async () => {
        act(() => {
            render(
                <MemoryRouter initialEntries={['/signup']} >
                    <App />
                </MemoryRouter>
                , container);
        });

            const fullNameInput = document.querySelector('input[name=fullName]');
            const usernameInput = document.querySelector('input[name=username]');
            const emailInput = document.querySelector('input[name=email]');
            const passwordInput = document.querySelector('input[name=password]');
            const signupForm = document.querySelector('#signup-form');

            jest.spyOn(global, "fetch").mockImplementation(() =>
                Promise.resolve({
                    json: () => Promise.resolve(UserRes.token),
                })
            );

            await act(async () => {
                Simulate.change(fullNameInput, { target: { value: UserInputs.fullName } });
                Simulate.change(usernameInput, { target: { value: UserInputs.username } });
                Simulate.change(emailInput, { target: { value: UserInputs.email } });
                Simulate.change(passwordInput, { target: { value: UserInputs.password } });
                Simulate.submit(signupForm);
            })        

        const h1 = document.querySelector('[h1=true]');
        const dashboardSignout = document.querySelector('[button-context=dashboard]');

        expect(h1.textContent).toBe('My Diary');
        expect(dashboardSignout.textContent).toBe('Signout');

        global.fetch.mockRestore();
    });
});