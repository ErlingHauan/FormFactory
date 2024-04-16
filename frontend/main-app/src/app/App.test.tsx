import React from "react";
import { render, screen } from "@testing-library/react";
import { App } from "./App";
import { MemoryRouter } from "react-router";
import { useUserSession } from "../hooks/useUserSession";
import { FormBuilderContextProvider } from "../../../form-builder/src/context/FormBuilderContextProvider";

const mockedUser = {
  id: "string",
  email: "string",
  password: "string",
  organization: "string",
};

// useUserSession is mocked because the Header/UserDropdown component uses it
jest.mock("../hooks/useUserSession");
jest.mocked(useUserSession).mockReturnValue({ user: mockedUser, isLoading: false });

describe("App component", () => {
  const renderApp = (initialEntries?: string[]) => {
    render(
      <MemoryRouter initialEntries={initialEntries}>
        <FormBuilderContextProvider>
          <App />
        </FormBuilderContextProvider>
      </MemoryRouter>,
    );
  };

  it("renders Header and Footer", () => {
    renderApp();

    const header = screen.getByRole("banner");
    const footer = screen.getByRole("contentinfo");

    expect(header).toHaveTextContent("Form Factory");
    expect(footer).toHaveTextContent("footer_form.factory.designsystem.link");
  });

  it("renders Login when accessing '/'", () => {
    renderApp();

    const titles = screen.getAllByRole("heading", { name: "login_page.title" });

    expect(titles[0]).toBeInTheDocument();
  });

  it("renders Login when accessing '/login'", () => {
    renderApp(["/login"]);

    const titles = screen.getAllByRole("heading", { name: "login_page.title" });

    expect(titles[0]).toBeInTheDocument();
  });

  it("renders Signup when accessing '/signup'", () => {
    renderApp(["/signup"]);

    const titles = screen.getAllByRole("heading", { name: "signup_page.title" });

    expect(titles[0]).toBeInTheDocument();
  });

  // TODO: Write a better test for Dashboard
  it("renders Dashboard when accessing '/dashboard'", async () => {
    jest.spyOn(React, "useEffect").mockImplementation(); // Prevents API calls

    renderApp(["/dashboard"]);

    expect(React.useEffect).toHaveBeenCalled();
  });

  it("renders NotFound when routing to a non-existing page", () => {
    renderApp(["/page-that-does-not-exist"]);

    const title = screen.getByRole("heading", { name: "not_found.title.page" });

    expect(title).toBeInTheDocument();
  });
});
