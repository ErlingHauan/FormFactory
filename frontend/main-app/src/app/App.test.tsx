import React from "react";
import { render, screen } from "@testing-library/react";
import { App } from "./App";
import { MemoryRouter } from "react-router";

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

    const title = screen.getByRole("heading", { name: "Sign up" });

    expect(title).toBeInTheDocument();
  });

  it("renders Form Builder when accessing '/form-builder'", () => {
    renderApp();

    const title = screen.getByRole("link", { name: "Form Builder" });

    expect(title).toBeInTheDocument();
  });

  it("renders NotFound when routing to a non-existing page", () => {
    renderApp(["/page-that-does-not-exist"]);

    const title = screen.getByRole("heading", { name: "Page not found" });

    expect(title).toBeInTheDocument();
  });
});
