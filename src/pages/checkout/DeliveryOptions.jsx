import { formatMoney } from "../../utils/Money";
import dayjs from 'dayjs';
export function DeliveryOptions({deliveryOption,cartItem}){
    return (<div className="delivery-options">
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


                                        </div>);
}