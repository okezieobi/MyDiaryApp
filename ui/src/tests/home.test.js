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
import { unmountComponentAtNode } from 'react-dom';
import { MemoryRouter, Route } from 'react-router-dom'
import App from '../App';
import { act } from 'react-dom/test-utils';
import { render } from '@testing-library/react';

describe('test home page rendering', () => {
    let container = null;
    beforeEach(() => {
        container = document.createElement('div');
        document.body.appendChild(container);
    });

    afterEach(() => {
        unmountComponentAtNode(container);
        container.remove();
        container = null;
    });

    it('test signup and signin without without errors', () => {
        act(() => {
            let history, location;
            render(
                <MemoryRouter initialEntries={['/']} >
                    <App />
                    <Route
                        path="*"
                        render={({ history, location }) => {
                            history = history;
                            location = location;
                            return null;
                        }}
                    />
                </MemoryRouter>
                , container);
        });
        const signinButton = document.querySelector('#signin-home');
        expect(signinButton.textContent).toBe('Have an account ? Signin');
        signinButton.dispatchEvent(new MouseEvent('click', { bubbles: true }))
        expect(location.pathname).toBe("/signin");

        act(() => {
            let history, location;
            render(
                <MemoryRouter initialEntries={['/']} >
                    <App />
                    <Route
                        path="*"
                        render={({ history, location }) => {
                            history = history;
                            location = location;
                            return null;
                        }}
                    />
                </MemoryRouter>
                , container);
        });
        const signupButton = document.querySelector('#signup-home');
        expect(signupButton.textContent).toBe('Create an account now');
        // signupButton.dispatchEvent(new MouseEvent('click', { bubbles: true }))
        // expect(location.pathname).toBe("/signup");
    });
});
