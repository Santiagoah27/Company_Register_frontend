import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import Login from '../pages/Login.jsx';
import useAuth from "../hooks/useAuth.jsx";
import { BrowserRouter  } from 'react-router-dom';

jest.mock("../hooks/useAuth.jsx", () => ({
  __esModule: true,
  default: jest.fn(),
}));


test("renders login form and checks input fields", () => {
  useAuth.mockReturnValue({
    setAuth: jest.fn(),
  });

  render(<BrowserRouter ><Login /></BrowserRouter>);
  const emailInput = screen.getByLabelText('Email');
  const passwordInput = screen.getByLabelText('Password');

  fireEvent.change(emailInput, { target: { value: 'user@example.com' } });
  fireEvent.change(passwordInput, { target: { value: 'password123' } });

  expect(emailInput.value).toBe('user@example.com');
  expect(passwordInput.value).toBe('password123');
});
