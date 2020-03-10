import React from 'react';
import { unmountComponentAtNode } from 'react-dom';
import { MemoryRouter } from 'react-router-dom'
import HomeComponent from '../components/users/home';
import { act } from 'react-dom/test-utils';
import { render } from '@testing-library/react';

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

    it('renders home page without with errors', () => {
        act(() => {
            render(
                <MemoryRouter>
                    <HomeComponent/>
                </MemoryRouter>
                , container);
        });
        const h1 = document.querySelector("[header=title]");
        expect(h1.textContent).toBe('My Diary'); 
        const homeMessage = document.querySelector('[home-message=message]');
        expect(homeMessage.textContent).toBe('Welcome to My Diary, an safe, fast and reliable online journal to pen your thoughts');
        const headerButton = document.querySelector('[button-text=text]');
        expect(headerButton.textContent).toBe('Have an account ? Signin');
    });
});