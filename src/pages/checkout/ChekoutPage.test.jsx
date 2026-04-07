import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, beforeEach, vi, expect } from 'vitest';
import { CheckoutPage } from './CheckoutPage';
import axios from 'axios';
import { MemoryRouter } from 'react-router-dom';

vi.mock('axios');

vi.mock('./OrderSummary', () => ({
  OrderSummary: () => <div data-testid="order-summary" />
}));

vi.mock('./PaymentSummary', () => ({
  PaymentSummary: () => <div data-testid="payment-summary" />
}));

vi.mock('./CheckoutHeader', () => ({
  CheckoutHeader: () => <div />
}));

describe('CheckoutPage tests', () => {
  let cart;
  let loadCart;

  beforeEach(() => {
    vi.clearAllMocks();
    cart = [{ id: 1 }];
    loadCart = vi.fn();

    axios.get
      .mockResolvedValueOnce({ data: [] })   
      .mockResolvedValueOnce({ data: { total: 100 } }); 
  });

  it('displays correctly', async () => {
    render(
      <MemoryRouter>
        <CheckoutPage cart={cart} loadCart={loadCart} />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByTestId('order-summary')).toBeInTheDocument();
      expect(screen.getByTestId('payment-summary')).toBeInTheDocument();
    });

    expect(axios.get).toHaveBeenNthCalledWith(
      1,
      '/api/delivery-options?expand=estimatedDeliveryTime'
    );
    expect(axios.get).toHaveBeenNthCalledWith(2, '/api/payment-summary');
  });
});