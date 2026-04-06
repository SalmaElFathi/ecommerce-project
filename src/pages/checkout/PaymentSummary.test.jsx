import { it, expect, describe, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import {PaymentSummary} from './PaymentSummary'
import axios from 'axios';
//import { Location } from './Location';
vi.mock('axios');
describe('payment summary tests', () => {
    let loadCart;
    let paymentSummary;
    beforeEach(() => {
        loadCart = vi.fn();
        paymentSummary = {
            totalItems: 3,
            productCostCents: 4275,
            shippingCostCents: 499,
            totalCostBeforeTaxCents: 4774,
            taxCents: 477,
            totalCostCents: 5251
        };
        axios.get.mockImplementation(async(url)=>{
            if(url==='/api/orders'){
                return {
                    data:paymentSummary
                }
            }
        } )
    })

    it('display the correct details', () => {
        render(
            <MemoryRouter>
                <PaymentSummary paymentSummary={paymentSummary} loadCart={loadCart} />
            </MemoryRouter>
        )
        const paymentSummaryProduct = screen.getByTestId('payment-summary-product');
        expect(paymentSummaryProduct).toHaveTextContent('$42.75');
        const paymentSummaryShipping = screen.getByTestId('payment-summary-shipping');
        expect(paymentSummaryShipping).toHaveTextContent('$4.99');
        const paymentSummaryBeforeTax = screen.getByTestId('payment-summary-total-before-tax');
        expect(paymentSummaryBeforeTax).toHaveTextContent('$47.74');
        const paymentSummaryTax = screen.getByTestId('payment-summary-tax');
        expect(paymentSummaryTax).toHaveTextContent('$4.77');
        const paymentSummaryTotal = screen.getByTestId('payment-summary-total');
        expect(paymentSummaryTotal).toHaveTextContent('$52.51');
    })
    it('place an order',async ()=>{
        render(
            <MemoryRouter>
                <PaymentSummary paymentSummary={paymentSummary} loadCart={loadCart}/>
              {/*<Location />*/ } 
            </MemoryRouter>
        );
        const createOrderButton=screen.getByTestId('create-order')
        await createOrderButton.click();
        expect(axios.post).toHaveBeenCalledWith('/api/orders')
       // const urlPath=screen.getByTestId('url-path');
       // expect(urlPath.toHaveTextContent('/orders'));
    })
})