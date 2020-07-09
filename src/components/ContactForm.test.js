import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import ContactForm from './ContactForm';

test('ContactForm renders without errors', () => {
    /// Arrange
    render(<ContactForm />);
});

test('ContactForm takes input', () => {
    /// Arrange
    render(<ContactForm />);

    /// Act
    // get inputs
    const fNameInput = screen.getByLabelText(/first name/i);
    const lNameInput = screen.getByLabelText(/last name/i);
    const emailInput = screen.getByLabelText(/email/i);
    const messageInput = screen.getByLabelText(/message/i);

    // input text
    fireEvent.change(fNameInput, { target: { value: 'John' } });
    fireEvent.change(lNameInput, { target: { value: 'Smith' } });
    fireEvent.change(emailInput, { target: { value: 'js@email.com' } });
    fireEvent.change(messageInput, { target: { value: 'Hello World!' } });

    /// Assert
    screen.getByDisplayValue(/john/i);
    screen.getByDisplayValue(/smith/i);
    screen.getByDisplayValue(/js@email.com/i);
    screen.getByDisplayValue(/Hello World!/i);
});

test('ContactForm takes input, submits, displays output', async () => {
    /// Arrange
    act(() => {
        render(<ContactForm />);
    });
    const expectedOutput = [
        `"firstName": "John"`,
        `"lastName": "Smith"`,
        `"email": "js@email.com"`,
        `"message": "Hello World!"`
    ];

    /// Act
    // get inputs
    const fNameInput = screen.getByLabelText(/first name/i);
    const lNameInput = screen.getByLabelText(/last name/i);
    const emailInput = screen.getByLabelText(/email/i);
    const messageInput = screen.getByLabelText(/message/i);
    const submitButton = screen.getByTestId('submit-button');

    // input text
    fireEvent.change(fNameInput, { target: { value: 'John' } });
    fireEvent.change(lNameInput, { target: { value: 'Smith' } });
    fireEvent.change(emailInput, { target: { value: 'js@email.com' } });
    fireEvent.change(messageInput, { target: { value: 'Hello World!' } });

    // submit button
    await act(async () => {
        await fireEvent.click(submitButton);
    });

    /// Assert
    // check output
    const output = screen.getByTestId('output');
    expectedOutput.forEach(row => expect(output).toHaveTextContent(row));
});