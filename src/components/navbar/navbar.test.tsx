import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Navbar } from './Navbar';

describe('Navbar', () => {
  // Mock de las funciones y propiedades necesarias
  const handleClickCart = jest.fn();
  const cartShowMock = false;

  beforeEach(() => {
    render(
      <Navbar
        handleClickCart={handleClickCart}
        cartShow={cartShowMock}
      />
    );
  });

  it('renders the navbar correctly', () => {
    // Verificar que el componente se renderiza correctamente
    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });


  it('renders the cart cost', () => {
    // Verificar que el costo del carrito se renderiza correctamente
    expect(screen.getByText('$25.50')).toBeInTheDocument();
  });


  // Agrega más pruebas según sea necesario

});