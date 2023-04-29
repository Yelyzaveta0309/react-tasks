import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react';
import { SignUp } from './SignUp';
import '@testing-library/jest-dom';
import { signUp } from '../services/firebase';

jest.mock('../services/firebase', () => ({
  signUp: jest.fn(),
}));

describe('SignUp', () => {

  it('renders the SignUp form', () => {
    const { getByText } = render(<SignUp />);
    expect(getByText('Sign Up')).toBeInTheDocument();
    expect(getByText('Логин:')).toBeInTheDocument();
    expect(getByText('Пароль:')).toBeInTheDocument();
    expect(getByText('sign up')).toBeInTheDocument();
  });

  it('should render correctly', () => {
    const { container } = render(<SignUp />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('calls signUp function with correct arguments when form is submitted', async () => {
    const { getByLabelText, getByText } = render(<SignUp />);
    const emailInput = getByLabelText('Логин:');
    const passwordInput = getByLabelText('Пароль:');
    const submitButton = getByText('sign up');

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(signUp).toHaveBeenCalledWith('test@example.com', 'password123');
    });
  });

  it('should show error message when sign up fails', async () => {
    const errorMessage = 'Sign up failed';
    const mockSignUp = signUp as jest.MockedFunction<typeof signUp>;
    mockSignUp.mockRejectedValueOnce(new Error(errorMessage));
    const { getByLabelText, getByText } = render(<SignUp />);

    const emailInput = getByLabelText('Логин:');
    const passwordInput = getByLabelText('Пароль:');
    const signUpButton = getByText('sign up');

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'test1234' } });
    fireEvent.click(signUpButton);

    await waitFor(() => {
      expect(mockSignUp).toHaveBeenCalledWith('test@example.com', 'test1234');
      expect(getByText(errorMessage)).toBeInTheDocument();
    });
  });

});
