import axios from 'axios';
import { useState } from 'react';
import { formatMoney } from "../../utils/Money";

export function CartItemDetails({ cartItem, loadCart }) {
    const [isUpdating, setIsUpdating] = useState(false);
    const [quantity, setQuantity] = useState(cartItem.quantity); 
    const [error, setError] = useState('');

    const deleteCartItem = async () => {
        if (!confirm('Are you sure you want to delete this item?')) return;
        
        try {
            await axios.delete(`/api/cart-items/${cartItem.productId}`);
            await loadCart();
        } catch (error) {
            console.error('Delete error:', error);
            setError('Failed to delete item');
        }
    };

    const startEditing = () => {
        setQuantity(cartItem.quantity);  
        setIsUpdating(true);
        setError('');
    };

    const updateQuantity = async () => {
        if (quantity < 1) {
            setError('Quantity must be at least 1');
            return;
        }

        if (quantity === cartItem.quantity) {
            setIsUpdating(false);
            return;
        }

        try {
            await axios.put(`/api/cart-items/${cartItem.productId}`, {
                quantity: quantity  
            });
            await loadCart();
            setIsUpdating(false);
            setError('');
        } catch (error) {
            console.error('Update error:', error);
            setError('Failed to update quantity');
        }
    };

    const handleOnChange = (event) => {
        const newValue = event.target.value;
        if (newValue === '' || /^\d+$/.test(newValue)) {
            setQuantity(newValue === '' ? '' : Number(newValue)); 
        }
    };

    const cancelUpdate = () => {
        setQuantity(cartItem.quantity);  
        setIsUpdating(false);
        setError('');
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            updateQuantity();  
        } else if (event.key === 'Escape') {
            cancelUpdate();    
        }
    };

    return (
        <>
            <img 
                className="product-image"
                src={cartItem.product.image} 
                alt={cartItem.product.name}
            />

            <div className="cart-item-details">
                <div className="product-name">
                    {cartItem.product.name}
                </div>
                <div className="product-price">
                    {formatMoney(cartItem.product.priceCents)}
                </div>

                {error && (
                    <div style={{ color: 'red', fontSize: '12px', margin: '5px 0' }}>
                        {error}
                    </div>
                )}

                <div className="product-quantity">
                    {!isUpdating ? (
                        <span>
                            Quantity: 
                            <span className="quantity-label"> {cartItem.quantity}</span>
                            
                            <span 
                                className="update-quantity-link link-primary"
                                onClick={startEditing}
                                style={{ marginLeft: '10px', cursor: 'pointer' }}
                            >
                                Update
                            </span>
                            
                            <span 
                                className="delete-quantity-link link-primary"
                                onClick={deleteCartItem}
                                style={{ marginLeft: '10px', cursor: 'pointer' }}
                            >
                                Delete
                            </span>
                        </span>
                    ) : (
                        <span>
                            Quantity: 
                            <input 
                                type="text" 
                                value={quantity} 
                                onChange={handleOnChange}
                                onKeyDown={handleKeyDown}
                                style={{ width: '50px', margin: '0 5px' }}
                                autoFocus
                            />
                            <button 
                                onClick={updateQuantity}
                                style={{ marginRight: '5px' }}
                                disabled={quantity < 1}
                            >
                                Save
                            </button>
                            <button onClick={cancelUpdate}>
                                Cancel
                            </button>
                        </span>
                    )}
                </div>
            </div>
        </>
    );
}