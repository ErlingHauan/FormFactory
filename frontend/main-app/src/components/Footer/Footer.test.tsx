import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Footer } from "./Footer";

describe("Footer component", () => {
  it("loads and displays Footer component", async () => {
    // Arrange
    render(<Footer />);

    // Act
    const githubLink = await screen.getByRole("link", { name: "footer_form.factory.gitHub.link" });
    const akselLink = await screen.getByRole("link", {
      name: "footer_form.factory.aksel.icons.link",
    });
    const bgjarLink = await screen.getByRole("link", {
      name: "footer_form.factory.background.pattern.BGJar.link",
    });
    const designsystemetLink = await screen.getByRole("link", {
      name: "footer_form.factory.designsystem.link",
    });

    // Assert
    expect(githubLink).toHaveAttribute("href", "https://github.com/ErlingHauan/FormFactory");
    expect(akselLink).toHaveAttribute("href", "https://aksel.nav.no/");
    expect(bgjarLink).toHaveAttribute("href", "https://bgjar.com/");
    expect(designsystemetLink).toHaveAttribute("href", "https://www.designsystemet.no/");
  });
});
