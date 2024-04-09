import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Header } from "./Header";
import { MemoryRouter } from "react-router";
import { useUser } from "../../hooks/useUser";

const mockedUser = {
  id: "string",
  email: "string",
  password: "string",
  organization: "string",
};

jest.mock("../../hooks/useUser");
jest.mocked(useUser).mockReturnValue({ user: mockedUser, isLoading: false });

describe("Header component", () => {
  it("loads and displays Header Component", async () => {
    // Arrange
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>,
    );

    // Act
    const title = screen.getByRole("heading", { name: "Form Factory" });
    const titleLink = screen.getByRole("link", { name: "Form Factory" });
    const dashboardLink = screen.getByRole("link", { name: "dashboard" });
    const formBuilderLink = screen.getByRole("link", { name: "form_builder" });

    // Assert
    expect(title).toBeInTheDocument();
    expect(titleLink).toHaveAttribute("href", "/");
    expect(dashboardLink).toHaveAttribute("href", "/dashboard");
    expect(formBuilderLink).toHaveAttribute("href", "/form-builder");
  });
});
