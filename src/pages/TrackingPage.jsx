import { Link } from 'react-router';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router'; 
import axios from 'axios';
import dayjs from 'dayjs';
import { Header } from '../components/Header';
import './TrackingPage.css';

export function TrackingPage({ cart }) {
    const { orderId, productId } = useParams();
    const [order, setOrder] = useState(null); 
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        const fetchTrackingData = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`/api/orders/${orderId}?expand=products`);
                setOrder(response.data);
            } catch (error) {
                console.error("Error fetching order:", error);
            } finally {
                setLoading(false);
            }
        };
        
        if (orderId) {
            fetchTrackingData();
        }
    }, [orderId]);
    
    const orderProduct = order?.products?.find((orderProduct) => {
        return orderProduct.productId === productId || orderProduct.product?.id === productId;
    });
    
    if (loading) {
        return (
            <>
                <Header cart={cart} />
                <div className="tracking-page">Loading tracking information...</div>
            </>
        );
    }
    
    if (!order) {
        return (
            <>
                <Header cart={cart} />
                <div className="tracking-page">Order not found</div>
            </>
        );
    }
    
    if (!orderProduct) {
        return (
            <>
                <Header cart={cart} />
                <div className="tracking-page">Product not found in this order</div>
            </>
        );
    }
    
    return (
        <>
            <title>Tracking</title>
            <link rel="icon" type="image/svg+xml" href="tracking-favicon.png" />
            <Header cart={cart} />
            <div className="tracking-page">
                <div className="order-tracking">
                    <Link className="back-to-orders-link link-primary" to="/orders">
                        View all orders
                    </Link>

                    <div className="delivery-date">
                        Arriving on {dayjs(orderProduct.estimatedDeliveryTimeMs || order.orderTimeMs).format('dddd D')}
                    </div>

                    <div className="product-info">
                        {orderProduct.product?.name || "Product name not available"}
                    </div>

                    <div className="product-info">
                        Quantity: {orderProduct.quantity}
                    </div>

                    <img 
                        className="product-image" 
                        src={`/${orderProduct.product.image}`}
                        alt={orderProduct.product?.name}
                    />

                    <div className="progress-labels-container">
                        <div className="progress-label">
                            Preparing
                        </div>
                        <div className={`progress-label ${orderProduct.status === 'shipped' ? 'current-status' : ''}`}>
                            Shipped
                        </div>
                        <div className={`progress-label ${orderProduct.status === 'delivered' ? 'current-status' : ''}`}>
                            Delivered
                        </div>
                    </div>

                    <div className="progress-bar-container">
                        <div 
                            className="progress-bar" 
                            style={{ 
                                width: orderProduct.status === 'preparing' ? '0%' : 
                                       orderProduct.status === 'shipped' ? '50%' : 
                                       orderProduct.status === 'delivered' ? '100%' : '0%' 
                            }}
                        ></div>
                    </div>
                </div>
            </div>
        </>
    );
}