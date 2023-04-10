import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import CompanyForm from '../components/CompanyForm';
import useCompanies from '../hooks/useCompanies.jsx';
import { BrowserRouter  } from 'react-router-dom';

jest.mock("../hooks/useCompanies.jsx", () => ({
  __esModule: true,
  default: jest.fn(),
}));

test('renders company form and checks input fields', () => {
  useCompanies.mockReturnValue({
    showAlert: jest.fn(),
    alert: {},
    submitCompany: jest.fn(),
    company: {}
  });
  
  render(<BrowserRouter><CompanyForm /></BrowserRouter>);
  const companyNameInput = screen.getByLabelText('Nombre de la empresa');
  const addressInput = screen.getByLabelText('Dirección');
  const nitInput = screen.getByLabelText('NIT');
  const phoneInput = screen.getByLabelText('Teléfono');

  fireEvent.change(companyNameInput, { target: { value: 'Empresa Ejemplo' } });
  fireEvent.change(addressInput, { target: { value: 'Calle 123 #45-67' } });
  fireEvent.change(nitInput, { target: { value: '123456789' } });
  fireEvent.change(phoneInput, { target: { value: '+57 123 4567890' } });

  expect(companyNameInput.value).toBe('Empresa Ejemplo');
  expect(addressInput.value).toBe('Calle 123 #45-67');
  expect(nitInput.value).toBe('123456789');
  expect(phoneInput.value).toBe('+57 123 4567890');
});
