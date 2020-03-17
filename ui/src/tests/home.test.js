/*
import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
*/
import React from 'react';
import { unmountComponentAtNode, render } from 'react-dom';
import { MemoryRouter } from 'react-router-dom';
import { act, Simulate } from 'react-dom/test-utils';

import App from '../App';

describe('test home page rendering', () => {
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

    it('renders home page without without errors', () => {
        act(() => {
            render(
                <MemoryRouter initialEntries={['/']} >
                    <App />
                </MemoryRouter>
                , container);
        });

        const signinButton = document.querySelector('[button-context=home-signin]');
        const signupButton = document.querySelector('[button-context=home-signup]');
        const h1 = document.querySelector('[h1=true]');
        const intro = document.querySelector('[intro=true]');

        expect(signinButton.textContent).toBe('Have an account ? Signin');
        expect(signupButton.textContent).toBe('Create an account now');
        expect(h1.textContent).toBe('My Diary');
        expect(intro.textContent).toBe('Welcome to My Diary, a safe, fast and reliable online journal to pen your thoughts');
    });

    it('navigates to signin page from home page without without errors', async () => {
        act(() => {
            render(
                <MemoryRouter initialEntries={['/']} >
                    <App />
                </MemoryRouter>
                , container);
        });

        act(() => {
            const homeSigninLink = document.querySelector('[button-context=home-signin]');
            Simulate.click(homeSigninLink);
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
        expect(emailLabel.textContent).toBe('Email/Username');
        expect(passwordLabel.textContent).toBe('Password');
        expect(submitSignin.textContent).toBe('Submit');
        expect(inputs.length).toBe(2);
    });

    it('navigates to signup page from home page without without errors', async () => {
        act(() => {
            render(
                <MemoryRouter initialEntries={['/']} >
                    <App />
                </MemoryRouter>
                , container);
        });

        
        act(() => {
            const homeSignupLink = document.querySelector('[button-context=home-signup]');
            Simulate.click(homeSignupLink);
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
});
