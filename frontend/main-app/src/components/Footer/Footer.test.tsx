import React from 'react';
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import {Footer} from "./Footer";

it('loads and displays footer', async () => {
    // Arrange
    render(<Footer/>);

    // Act
    const githubLink = await screen.getByRole("link", {name: "Form Factory at GitHub"});
    const akselLink = await screen.getByRole("link", {name: "Icons by Aksel"});
    const bgjarLink = await screen.getByRole("link", {name: "Background pattern by BGJar"});
    const designsystemetLink = await screen.getByRole("link", {name: "Components and colors by Designsystemet"});

    // Assert
    expect(githubLink).toHaveAttribute('href', 'https://github.com/ErlingHauan/FormFactory');
    expect(akselLink).toHaveAttribute('href', 'https://aksel.nav.no/');
    expect(bgjarLink).toHaveAttribute('href', 'https://bgjar.com/');
    expect(designsystemetLink).toHaveAttribute('href', 'https://www.designsystemet.no/');
});