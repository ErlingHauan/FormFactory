import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Header } from "./Header";
import { MemoryRouter } from "react-router";

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
    const formBuilderLink = screen.getByRole("link", { name: "Form Builder" });

    // Assert
    expect(title).toBeInTheDocument();
    expect(titleLink).toHaveAttribute("href", "/");
    expect(formBuilderLink).toHaveAttribute("href", "/form-builder");
  });
});
