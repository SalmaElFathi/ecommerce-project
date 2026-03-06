import { formatMoney } from '../../utils/Money';
import { DeliveryOptions } from './DeliveryOptions';

export function OrderSummary({cart,deliveryOption}){
    return (
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

                                        <DeliveryOptions deliveryOption={deliveryOption} cartItem={cartItem}/>
                                    </div>
                                </div>
                            )
                        })
                        }


                    </div>
    );
}