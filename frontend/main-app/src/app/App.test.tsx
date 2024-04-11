import React from "react";
import { render, screen } from "@testing-library/react";
import { App } from "./App";
import { MemoryRouter } from "react-router";
import { useAuthorization } from "../hooks/useAuthorization";
import { useUserSession } from "../hooks/useUserSession";
import { useGetForm } from "../../../form-builder/src/hooks/useGetForm";
import { FormBuilderContext } from "form-builder/src/context";

const mockedUser = {
  id: "string",
  email: "string",
  password: "string",
  organization: "string",
};

const mockedForm = {
  id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  user: "user@example.com",
  organization: "string",
  title: "string",
  description: "string",
  status: "string",
  published: "2024-04-11T07:58:48.939Z",
  expires: "2024-04-11T07:58:48.939Z",
  components: [],
};

jest.mock("../hooks/useUserSession");
jest.mocked(useUserSession).mockReturnValue({ user: mockedUser, isLoading: false });

jest.mock("../../../form-builder/src/hooks/useGetForm");
jest.mocked(useGetForm).mockReturnValue(mockedForm);

jest.mock("../hooks/useAuthorization");
jest.mocked(useAuthorization);

describe("App component", () => {
  const renderApp = (initialEntries?: string[]) => {
    render(
      <MemoryRouter initialEntries={initialEntries}>
        <FormBuilderContext.Provider
          value={{
            form: mockedForm,
            setForm: jest.fn(),
          }}
        >
          <App />
        </FormBuilderContext.Provider>
      </MemoryRouter>,
    );
  };

  it("renders Header and Footer", () => {
    renderApp();

    const header = screen.getByRole("banner");
    const footer = screen.getByRole("contentinfo");

    expect(header).toHaveTextContent("Form Factory");
    expect(footer).toHaveTextContent("Components and colors by Designsystemet");
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

  it("renders NotFound when routing to a non-existing page", () => {
    renderApp(["/page-that-does-not-exist"]);

    const title = screen.getByRole("heading", { name: "Page not found" });

    expect(title).toBeInTheDocument();
  });
});
