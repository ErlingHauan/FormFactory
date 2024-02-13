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
    const title = screen.getByRole("heading", { name: "Log in" });
    const emailField = screen.getByRole("textbox", { name: "E-mail" });
    const passwordField = screen.getByLabelText("Password");
    const loginButton = screen.getByRole("button", { name: "Log in" });
    const signupLink = screen.getByRole("link", { name: "Go to the sign up page" });

    // Assert
    expect(title).toBeInTheDocument();
    expect(emailField).toHaveValue("");
    expect(passwordField).toHaveValue("");
    expect(loginButton).toBeInTheDocument();
    expect(signupLink).toHaveAttribute("href", "/signup");
  });
});
