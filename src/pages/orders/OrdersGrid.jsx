import dayjs from "dayjs";
import axios from 'axios';
import BuyAgain from '../../assets/images/icons/buy-again.png'
import { OrdersHeader } from "./OrdersHeader";

export function OrdersGrid({ orders, loadCart }) {

    return (<div className="orders-grid">
        {orders.map(order => {
            const addToCart = async (productId,quantity) => {
                await axios.post('/api/cart-items',
                    {
                        productId: productId,
                        quantity: quantity
                    }
                );
                await loadCart();
            }
            return (
                <div key={order.id} className="order-container">
                    <OrdersHeader order={order} />
                    <div className="order-details-grid">
                        {order.products.map(orderProduct => {
                            return (
                                <>
                                    <div className="product-image-container">
                                        <img src={orderProduct.product.image} />
                                    </div>

                                    <div className="product-details">
                                        <div className="product-name">
                                            {orderProduct.product.name}
                                        </div>
                                        <div className="product-delivery-date">
                                            Arriving on: {dayjs(orderProduct.estimatedDeliveryTimeMs).format('MMMM D')}
                                        </div>
                                        <div className="product-quantity">
                                            Quantity: {orderProduct.quantity}
                                        </div>
                                        <button className="buy-again-button button-primary"
                                            onClick={()=>{addToCart(orderProduct.product.id,orderProduct.quantity)}}>
                                            <img className="buy-again-icon" src={BuyAgain} />
                                            <span className="buy-again-message">Add to Cart</span>
                                        </button>
                                    </div>

                                    <div className="product-actions">
                                        <a href={`/tracking/${order.id}/${orderProduct.productId}`}>
                                            <button className="track-package-button button-secondary">
                                                Track package
                                            </button>
                                        </a>
                                    </div>
                                </>);
                        })

                        }



                    </div>
                </div>
            );
        })

        }



    </div>);

}