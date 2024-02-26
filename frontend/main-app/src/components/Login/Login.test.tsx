import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Login } from "./Login";
import { MemoryRouter } from "react-router";

describe("Login component", () => {
  it("loads and displays Login component", () => {
    // Arrange
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>,
    );

    // Act
    const title = screen.getByRole("heading", { name: "login_page.title" });
    const emailField = screen.getByRole("textbox", { name: "signup_page.email.label" });
    const passwordField = screen.getByLabelText("signup_page.password.label");
    const loginButton = screen.getByRole("button", { name: "login_page.login.button" });
    const signupLink = screen.getByRole("link", { name: "login_page.signup.button" });

    // Assert
    expect(title).toBeInTheDocument();
    expect(emailField).toHaveValue("");
    expect(passwordField).toHaveValue("");
    expect(loginButton).toBeInTheDocument();
    expect(signupLink).toHaveAttribute("href", "/signup");
  });
});
