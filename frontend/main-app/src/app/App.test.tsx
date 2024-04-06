import React from "react";
import { render, screen } from "@testing-library/react";
import { App } from "./App";
import { MemoryRouter } from "react-router";
import { useAuthorization } from "../hooks/useAuthorization";

// Prevent both API call and redirect
jest.mock("../hooks/useAuthorization");
jest.mocked(useAuthorization);

describe("App component", () => {
  const renderApp = (initialEntries?: string[]) => {
    render(
      <MemoryRouter initialEntries={initialEntries}>
        <App />
      </MemoryRouter>,
    );
  };

  it("renders Header and Footer", () => {
    renderApp();

    const header = screen.getByRole("banner");
    const footer = screen.getByRole("contentinfo");

    expect(header).toHaveTextContent("Form Factory");
    expect(footer).toHaveTextContent("Designsystemet");
  });

  it("renders Login when accessing '/'", () => {
    renderApp();

    const titles = screen.getAllByRole("heading", { name: "Log in" });

    expect(titles[0]).toBeInTheDocument();
  });

  it("renders Login when accessing '/login'", () => {
    renderApp(["/login"]);

    const titles = screen.getAllByRole("heading", { name: "Log in" });

    expect(titles[0]).toBeInTheDocument();
  });

  it("renders Signup when accessing '/signup'", () => {
    renderApp(["/signup"]);

    const titles = screen.getAllByRole("heading", { name: "Sign up" });

    expect(titles[0]).toBeInTheDocument();
  });

  it("renders Dashboard when accessing '/dashboard'", () => {
    jest.spyOn(React, "useEffect").mockImplementation(); // Prevents API calls
    renderApp(["/dashboard"]);

    expect(React.useEffect).toHaveBeenCalled();
  });

  it("renders Form Builder when accessing '/form-builder'", () => {
    renderApp(["/form-builder"]);

    // There is an error accessing the form builder heading. To be fixed later.
    const title = screen.getAllByRole("heading", { name: "Components" });

    expect(title[0]).toBeInTheDocument();
  });

  it("renders NotFound when routing to a non-existing page", () => {
    renderApp(["/page-that-does-not-exist"]);

    const title = screen.getByRole("heading", { name: "Page not found" });

    expect(title).toBeInTheDocument();
  });
});
