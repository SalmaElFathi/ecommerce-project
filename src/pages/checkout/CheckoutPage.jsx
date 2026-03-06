import axios from 'axios';
import dayjs from 'dayjs';
import { useState, useEffect } from 'react'
import { CheckoutHeader } from './CheckoutHeader';
import { formatMoney } from '../../utils/Money';
import './CheckoutPage.css';
export function CheckoutPage({ cart }) {
    const [deliveryOption, setDeliveryOptions] = useState([]);
    const [paymentSummary, setPaymentSummary] = useState(null);
    useEffect(() => {
        axios.get('/api/delivery-options?expand=estimatedDeliveryTime')
            .then((response) => { setDeliveryOptions(response.data); })
        axios.get('/api/payment-summary')
            .then((response) => {
                setPaymentSummary(response.data);
            })
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
                    <div className="order-summary">
                        {cart.map(cartItem => {
                            return (
                                <div key={cartItem.id} className="cart-item-container">
                                    <div className="delivery-date">
                                        Delivery date: Tuesday, June 21
                                    </div>

                                    <div className="cart-item-details-grid">
                                        <img className="product-image"
                                            src={cartItem.product.image} />

                                        <div className="cart-item-details">
                                            <div className="product-name">
                                                Black and Gray Athletic Cotton Socks - 6 Pairs
                                            </div>
                                            <div className="product-price">
                                                {formatMoney(cartItem.product.price)}
                                            </div>
                                            <div className="product-quantity">
                                                <span>
                                                    Quantity: <span className="quantity-label">{cartItem.quantity}</span>
                                                </span>
                                                <span className="update-quantity-link link-primary">
                                                    Update
                                                </span>
                                                <span className="delete-quantity-link link-primary">
                                                    Delete
                                                </span>
                                            </div>
                                        </div>

                                        <div className="delivery-options">
                                            <div className="delivery-options-title">
                                                Choose a delivery option:
                                            </div>
                                            {deliveryOption.map((delivery) => {
                                                const deliveryPrice = delivery.priceCents > 0 ? `${formatMoney(delivery.priceCents)}-Shipping` : 'Free Shipping';
                                                return (<div key={delivery.id} className="delivery-option">
                                                    <input type="radio" checked={delivery.id === cartItem.deliveryOptionId}
                                                        className="delivery-option-input"
                                                        name={`delivery-option-${delivery.id}`} />
                                                    <div>
                                                        <div className="delivery-option-date">
                                                            {dayjs(delivery.estimatedDeliveryTimeMs).format('dddd,MMMM D')}
                                                        </div>
                                                        <div className="delivery-option-price">
                                                            {deliveryPrice}
                                                        </div>
                                                    </div>
                                                </div>);
                                            })}


                                        </div>
                                    </div>
                                </div>
                            )
                        })
                        }


                    </div>
                    {paymentSummary &&
                        <><div className="payment-summary">
                            <div className="payment-summary-title">
                                Payment Summary
                            </div>

                            <div className="payment-summary-row">
                                <div>Items ({paymentSummary.totalItems}):</div>
                                <div className="payment-summary-money">{formatMoney(paymentSummary.productCostCents)}</div>
                            </div>

                            <div className="payment-summary-row">
                                <div>Shipping &amp; handling:</div>
                                <div className="payment-summary-money">{formatMoney(paymentSummary.shippingCostCents)}</div>
                            </div>

                            <div className="payment-summary-row subtotal-row">
                                <div>Total before tax:</div>
                                <div className="payment-summary-money">{formatMoney(paymentSummary.totalCostBeforeTaxCents)}</div>
                            </div>

                            <div className="payment-summary-row">
                                <div>Estimated tax (10%):</div>
                                <div className="payment-summary-money">{formatMoney(paymentSummary.taxCents)}</div>
                            </div>

                            <div className="payment-summary-row total-row">
                                <div>Order total:</div>
                                <div className="payment-summary-money">{formatMoney(paymentSummary.totalCostCents)}</div>
                            </div>

                            <button className="place-order-button button-primary">
                                Place your order
                            </button>
                        </div>
                        </>

                    }

                </div>
            </div>
        </>)
}