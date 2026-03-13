import dayjs from "dayjs";
export function DeliveryDate({deliveryOption,cartItem}) {
    const deliveryoption=deliveryOption.find(option=>cartItem.deliveryOptionId===option.id);
    const date=dayjs(deliveryoption.estimatedDeliveryTimeMs).format('dddd, MMMM D')
    return (
        <div className="delivery-date">
            Delivery date: {date}
        </div>
    );
}