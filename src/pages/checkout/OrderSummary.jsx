import { CartItemDetails } from './CartItemDetails';
import { DeliveryOptions } from './DeliveryOptions';
import { DeliveryDate } from './DeliveryDate';
export function OrderSummary({cart,deliveryOption}){
    return (
          <div className="order-summary">
                        {cart.map(cartItem => {
                            return (
                                <div key={cartItem.id} className="cart-item-container">
                                    

                                    <div className="cart-item-details-grid">
                                        <DeliveryDate />
                                        <CartItemDetails cartItem={cartItem} />
                                        <DeliveryOptions deliveryOption={deliveryOption} cartItem={cartItem}/>
                                    </div>
                                </div>
                            )
                        })
                        }


                    </div>
    );
}