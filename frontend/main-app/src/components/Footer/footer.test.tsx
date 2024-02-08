import React from 'react';
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import {Footer} from "./Footer";

test('loads and displays footer', async () => {
    // Arrange
    render(<Footer />);

    // Act
    const link = await screen.findByText('Form Factory at GitHub');

    // Assert
    expect(link).toHaveAttribute('href', 'https://github.com/ErlingHauan/FormFactory');
});