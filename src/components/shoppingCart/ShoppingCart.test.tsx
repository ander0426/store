import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit'
import { ShoppingCart } from './ShoppingCart';
import { cartReducer } from '../../reducers/cartReducer';

jest.mock('react-redux', () => ({
    ...jest.requireActual('react-redux'),
  }));

describe('ShoppingCart', () => {
    let store;

    beforeEach(() => {
        store = configureStore({
          reducer: {
            cart: cartReducer,
          },
          preloadedState: {
            cart: {
              cart: [
                {
                  id: 1,
                  quantity: 2,
                  img: 'product-image.jpg',
                },
                {
                  id: 2,
                  quantity: 1,
                  img: 'another-product-image.jpg',
                },
              ],
            },
          },
        });
    });

  test('renders shopping cart items', () => {
    const { getByText, getAllByRole } = render(
        <Provider store={store}>
          <ShoppingCart />
        </Provider>
      );
    const quantityElements = getAllByRole('listitem');
    expect(quantityElements).toHaveLength(2);

   

    const productImages = getAllByRole('img');
    expect(productImages).toHaveLength(2);
    expect(productImages[0]).toHaveAttribute('src', 'product-image.jpg');
    expect(productImages[1]).toHaveAttribute('src', 'another-product-image.jpg');

    const totalAmount = getByText('Total:');
    const amountValue = getByText('$25.50');
    expect(totalAmount).toBeInTheDocument();
    expect(amountValue).toBeInTheDocument();
  });

  test('renders payment form with correct attributes', () => {
    const { container } = render(
        <Provider store={store}>
          <ShoppingCart />
        </Provider>
      );
    
    const formElement = container.querySelector('form');
    expect(formElement).toHaveAttribute(
      'action',
      'https://checkout.wompi.co/p/'
    );
    expect(formElement).toHaveAttribute('method', 'GET');

    const publicKeyInput = container.querySelector(
      'input[name="public-key"]'
    );
    expect(publicKeyInput).toHaveAttribute(
      'value',
      'pub_test_GZlevgVBlUIA4Aq8jcYjNPJBJEnbitYV'
    );

    const currencyInput = container.querySelector('input[name="currency"]');
    expect(currencyInput).toHaveAttribute('value', 'COP');

    const amountInCentsInput = container.querySelector(
      'input[name="amount-in-cents"]'
    );
    expect(amountInCentsInput).toHaveAttribute('value', '100000');

    const referenceInput = container.querySelector('input[name="reference"]');
    expect(referenceInput).toHaveAttribute('value', 'sdasdasd');

    const submitButton = container.querySelector('button[type="submit"]');
    expect(submitButton).toHaveTextContent('Pagar con Wompi');
    expect(submitButton).toHaveClass('waybox-button');
  });
});