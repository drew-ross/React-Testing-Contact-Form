import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ContactForm from './ContactForm';

test('ContactForm renders without errors', () => {
    /// Arrange
    render(<ContactForm />);
});

test('ContactForm takes input and renders expected output', () => {
    /// Arrange
    render(<ContactForm />);

    /// Act
    const fNameInput = screen.getByLabelText(/first name/i);
    const lNameInput = screen.getByLabelText(/last name/i);
    const emailInput = screen.getByLabelText(/email/i);
    const messageInput = screen.getByLabelText(/message/i);

    /// Assert
})