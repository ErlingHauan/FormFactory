import React from 'react';
import {render, screen} from '@testing-library/react';
import {App} from './App';
import {MemoryRouter} from "react-router";


describe('App component', () => {
    it("renders Login when accessing '/'", () => {
        render(
            <MemoryRouter>
                <App/>
            </MemoryRouter>
        )

        const title = screen.getByRole("heading", {name: "Log in"});

        expect(title).toBeInTheDocument();
    })

    it("renders Login when accessing '/login'", () => {
        render(
            <MemoryRouter initialEntries={['/login']}>
                <App/>
            </MemoryRouter>
        )

        const title = screen.getByRole("heading", {name: "Log in"});

        expect(title).toBeInTheDocument();
    })

    it("renders Signup when accessing '/signup'", () => {
        render(
            <MemoryRouter initialEntries={['/signup']}>
                <App/>
            </MemoryRouter>
        )

        const title = screen.getByRole("heading", {name: "Sign up"});

        expect(title).toBeInTheDocument();
    })

    it("renders Form Builder when accessing '/form-builder'", () => {
        render(
            <MemoryRouter initialEntries={['/form-builder']}>
                <App/>
            </MemoryRouter>
        )

        const title = screen.getByRole("heading", {name: "Form Builder"});

        expect(title).toBeInTheDocument();
    })

    it("renders footer and header when accessing '/'", () => {
        render(
            <MemoryRouter>
                <App/>
            </MemoryRouter>
        );

        const header = screen.getByRole("banner");
        const footer = screen.getByRole("contentinfo");

        expect(header).toHaveTextContent("Form Factory");
        expect(footer).toHaveTextContent("Designsystemet");
    })

    it("renders footer and header when not accessing '/'", () => {
        render(
            <MemoryRouter initialEntries={['/form-builder']}>
                <App/>
            </MemoryRouter>
        );

        const header = screen.getByRole("banner");
        const footer = screen.getByRole("contentinfo");

        expect(header).toHaveTextContent("Form Factory");
        expect(footer).toHaveTextContent("Designsystemet");
    })
});
