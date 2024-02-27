import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Signup } from "./Signup";
import { MemoryRouter } from "react-router";

describe("Signup component", () => {
  it("loads and displays Signup component", () => {
    // Arrange
    render(
      <MemoryRouter>
        <Signup />
      </MemoryRouter>,
    );

    // Act
    const title = screen.getByRole("heading", { name: "signup_page.title" });
    const emailField = screen.getByRole("textbox", { name: "signup_page.email.label" });
    const orgField = screen.getByRole("textbox", { name: "signup_page.organization.label" });
    const passwordField = screen.getByLabelText("signup_page.password.label");
    const passwordRepeatField = screen.getByLabelText("signup_page.password.repeat.label");
    const signupButton = screen.getByRole("button", { name: "signup_page.signup.button" });
    const loginLink = screen.getByRole("link", { name: "signup_page.go.to.login.button" });

    // Assert
    expect(title).toBeInTheDocument();
    expect(emailField).toHaveValue("");
    expect(orgField).toHaveValue("");
    expect(passwordField).toHaveValue("");
    expect(passwordRepeatField).toHaveValue("");
    expect(signupButton).toBeInTheDocument();
    expect(loginLink).toHaveAttribute("href", "/login");
  });
});
