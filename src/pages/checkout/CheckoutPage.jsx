import axios from 'axios';
import { useState, useEffect } from 'react'
import { CheckoutHeader } from './CheckoutHeader';
import { OrderSummary } from './OrderSummary';
import './CheckoutPage.css';
import { PaymentSummary } from './PaymentSummary';
export function CheckoutPage({ cart }) {
    const [deliveryOption, setDeliveryOptions] = useState([]);
    const [paymentSummary, setPaymentSummary] = useState(null);
    useEffect(() => {
        const fetchCheckoutData=async()=> {
            let response=axios.get('/api/delivery-options?expand=estimatedDeliveryTime');
            setDeliveryOptions(response.data); 
            response=axios.get('/api/payment-summary');
            setPaymentSummary(response.data);

        }
        
          fetchCheckoutData();
    }
        , [])
    return (
        <>
            <title>Checkout</title>
            <link rel="icon" type="image/svg+xml" href="cart-favicon.png" />
            <CheckoutHeader />
            <div className="checkout-page">
                <div className="page-title">Review your order</div>

                <div className="checkout-grid">
                  <OrderSummary cart={cart} deliveryOption={deliveryOption}/>
                    {paymentSummary &&
                       <PaymentSummary paymentSummary={paymentSummary} />

                    }

                </div>
            </div>
        </>)
}