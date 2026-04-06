import axios from 'axios';
import { useNavigate } from 'react-router';
import { formatMoney } from '../../utils/Money';

export function PaymentSummary({ paymentSummary, loadCart }) {
    const navigate = useNavigate();

    const createOrder = async () => {
        try {
            await axios.post('/api/orders');
        } catch (error) {
            console.error('error adding an order ' + error);
        }
        await loadCart();
        navigate('/orders')
    }
    return (
        <><div className="payment-summary">
            <div className="payment-summary-title">
                Payment Summary
            </div>

            <div className="payment-summary-row"
            data-testid="payment-summary-product">
                <div>Items ({paymentSummary.totalItems}):</div>
                <div className="payment-summary-money">{formatMoney(paymentSummary.productCostCents)}</div>
            </div>

            <div className="payment-summary-row "
            data-testid="payment-summary-shipping">
                <div>Shipping &amp; handling:</div>
                <div className="payment-summary-money">{formatMoney(paymentSummary.shippingCostCents)}</div>
            </div>

            <div className="payment-summary-row subtotal-row"
            data-testid="payment-summary-total-before-tax">
                <div>Total before tax:</div>
                <div className="payment-summary-money">{formatMoney(paymentSummary.totalCostBeforeTaxCents)}</div>
            </div>

            <div className="payment-summary-row"
            data-testid="payment-summary-tax">
                <div>Estimated tax (10%):</div>
                <div className="payment-summary-money">{formatMoney(paymentSummary.taxCents)}</div>
            </div>

            <div className="payment-summary-row total-row"
            data-testid="payment-summary-total">
                <div>Order total:</div>
                <div className="payment-summary-money">{formatMoney(paymentSummary.totalCostCents)}</div>
            </div>

            <button className="place-order-button button-primary"
            data-testid="create-order"
                onClick={createOrder}>
                Place your order
            </button>
        </div>
        </>
    );
}




