import React from 'react';
import {render, screen} from '@testing-library/react';
import {App} from './App';
import {MemoryRouter} from "react-router-dom";


describe('App component', () => {
    test("Login page renders when accessing '/'", () => {
        render(
            <MemoryRouter>
                <App/>
            </MemoryRouter>
        )

        const title = screen.getByRole("heading", {name: "Log in"});

        expect(title).toBeInTheDocument();
    })

    test("Sign up page renders when accessing '/signup'", () => {
        render(
            <MemoryRouter initialEntries={['/signup']}>
                <App/>
            </MemoryRouter>
        )

        const title = screen.getByRole("heading", {name: "Sign up"});

        expect(title).toBeInTheDocument();
    })
});
