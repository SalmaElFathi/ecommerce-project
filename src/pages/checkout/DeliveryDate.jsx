import dayjs from "dayjs";
export function DeliveryDate({ deliveryOption, cartItem }) {
    if (!deliveryOption || !cartItem) return <div className="delivery-date">Loading...</div>;
    const selectedOption = deliveryOption.find(
        option => option.id === cartItem.deliveryOptionId
    );

    if (!selectedOption) {
        return <div className="delivery-date">Delivery date: Not selected</div>;
    }
    const date = dayjs(selectedOption.estimatedDeliveryTimeMs).format('dddd, MMMM D');
    return (
        <div className="delivery-date">
            Delivery date: {date}
        </div>
    );
}