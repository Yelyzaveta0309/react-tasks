import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { SignIn } from './SignIn';
import { logIn } from '../services/firebase';
import '@testing-library/jest-dom';

jest.mock('../services/firebase');

describe('SignIn', () => {
  test('calls logIn with email and password when form is submitted', async () => {
    const email = 'test@test.com';
    const password = 'testPassword';
    const logInMock = logIn as jest.Mock;

    render(<SignIn />);

    const emailInput = screen.getByLabelText('Логин:');
    const passwordInput = screen.getByLabelText('Пароль:');
    const submitButton = screen.getByText('sign in');

    fireEvent.change(emailInput, { target: { value: email } });
    fireEvent.change(passwordInput, { target: { value: password } });

    fireEvent.click(submitButton);

    expect(logInMock).toHaveBeenCalledWith(email, password);
  });

  test('displays error message when logIn fails', async () => {
    const error = new Error('test error');
    const logInMock = logIn as jest.Mock;
    logInMock.mockRejectedValueOnce(error);

    render(<SignIn />);

    const submitButton = screen.getByText('sign in');

    fireEvent.click(submitButton);

    const errorMessage = await screen.findByText('test error');
    expect(errorMessage).toBeInTheDocument();
  });
});
