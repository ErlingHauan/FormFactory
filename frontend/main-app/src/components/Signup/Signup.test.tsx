import React from "react";
import {render, screen} from "@testing-library/react";
import "@testing-library/jest-dom";
import {Signup} from "./Signup";
import {MemoryRouter} from "react-router";

describe("Signup component", () => {
    it("loads and displays Signup component", () => {
        // Arrange
        render(
            <MemoryRouter>
                <Signup/>
            </MemoryRouter>
        );

        // Act
        const title = screen.getByRole("heading", {name: "Sign up"});
        const emailField = screen.getByRole("textbox", {name: "E-mail"});
        const orgField = screen.getByRole("textbox", {name: "Organization"});
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