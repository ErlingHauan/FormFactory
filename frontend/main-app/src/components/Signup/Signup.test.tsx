import React from 'react';
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import {Signup} from "./Signup";

describe("Signup component", () => {
    it('loads and displays signup component', () => {
        // Arrange
        render(<Signup/>);

        // Act
        const title = screen.getByRole("heading", {name: "Sign up"});
        const emailField = screen.getByLabelText("E-mail");
        const orgField = screen.getByLabelText("Organization");
        const passwordField = screen.getByLabelText("Password");
        const passwordRepeatField = screen.getByLabelText("Repeat password");
        const signupButton = screen.getByRole("button", {name: "Sign up"});
        const loginLink = screen.getByRole("link", {name: "Go to the log in page"});

        // Assert
        expect(title).toBeInTheDocument();
        expect(emailField).toHaveValue("");
        expect(orgField).toHaveValue("");
        expect(passwordField).toHaveValue("");
        expect(passwordRepeatField).toHaveValue("");
        expect(signupButton).toBeInTheDocument();
        expect(loginLink).toHaveAttribute("href", "/login");
    });
})
