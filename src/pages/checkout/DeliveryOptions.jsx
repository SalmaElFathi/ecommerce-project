import axios from 'axios';
import { formatMoney } from "../../utils/Money";
import dayjs from 'dayjs';

export function DeliveryOptions({ deliveryOption, cartItem, loadCart,date }) {
  return (
    <div className="delivery-options">
      <div className="delivery-options-title">
        Choose a delivery option:
      </div>
      {deliveryOption.map((delivery) => {
        const deliveryPrice = delivery.priceCents > 0
          ? `${formatMoney(delivery.priceCents)}-Shipping`
          : 'Free Shipping';

        const updateDeliveryOptions = async () => {
          await axios.put(`/api/cart-items/${cartItem.productId}`, {
            deliveryOptionId: delivery.id
          });
          await loadCart();
        };
        date=dayjs(delivery.estimatedDeliveryTimeMs).format('dddd, MMMM D');

        return (
          <div key={delivery.id} onClick={updateDeliveryOptions} className="delivery-option">
            <input
              type="radio"
              checked={delivery.id === cartItem.deliveryOptionId}
              onChange={() => {}}
              className="delivery-option-input"
              name={`delivery-option-${cartItem.productId}`} 
            />
            <div>
              <div className="delivery-option-date">
                {date}  
              </div>
              <div className="delivery-option-price">
                {deliveryPrice}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}