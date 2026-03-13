import { CartItemDetails } from './CartItemDetails';
import { DeliveryOptions } from './DeliveryOptions';
import { DeliveryDate } from './DeliveryDate';
export function OrderSummary({ cart, deliveryOption, loadCart }) {
    return (
        <div className="order-summary">
            {cart.map(cartItem => {
                return (
                    <div key={cartItem.id} className="cart-item-container">
                        <div className="cart-item-details-grid">
                            <DeliveryDate deliveryOption={deliveryOption} cartItem={cartItem} />
                            <CartItemDetails cartItem={cartItem} loadCart={loadCart} />
                            <DeliveryOptions deliveryOption={deliveryOption} cartItem={cartItem} loadCart={loadCart} />
                        </div>
                    </div>
                )
            })
            }
        </div>
    );
}