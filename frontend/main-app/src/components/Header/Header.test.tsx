import React from 'react';
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import {Header} from "./Header";

describe("Header component", () => {
    it('loads and displays Header Component', async () => {
        // Arrange
        render(<Header/>);

        // Act
        const title = await screen.getByRole("heading", {name: "Form Factory"})
        const titleLink = await screen.getByRole("link", {name: "Form Factory"});
        const homeLink = await screen.getByRole("link", {name: "Home"});
        const formBuilderLink = await screen.getByRole("link", {name: "Form Builder"});

        // Assert
        expect(title).toBeInTheDocument();
        expect(titleLink).toHaveAttribute('href', '/');
        expect(homeLink).toHaveAttribute('href', '/');
        expect(formBuilderLink).toHaveAttribute('href', '/form-builder');
    });
})
