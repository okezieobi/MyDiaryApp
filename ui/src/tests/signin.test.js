import React from 'react';
import { unmountComponentAtNode } from 'react-dom';
import { MemoryRouter } from 'react-router-dom'
import SigninComponent from '../components/users/signin';
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

    it('renders signin page without with errors', () => {
        act(() => {
            render(
                <MemoryRouter>
                    <SigninComponent/>
                </MemoryRouter>
                , container);
        });
        const h1 = document.querySelector("[header=title]");
        expect(h1.textContent).toBe('My Diary'); 
    });
});