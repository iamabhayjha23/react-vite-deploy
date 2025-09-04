import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import './Cart.css';

const Cart = () => {
  const { cartItems, cartCount, cartTotal, updateCartItem, removeFromCart, clearCart, loading } = useCart();
  const [isOpen, setIsOpen] = useState(false);

  const handleQuantityChange = (cartItemId, newQuantity) => {
    updateCartItem(cartItemId, parseInt(newQuantity));
  };

  const handleRemoveItem = (cartItemId) => {
    removeFromCart(cartItemId);
  };

  const handleClearCart = () => {
    if (window.confirm('Are you sure you want to clear your cart?')) {
      clearCart();
    }
  };

  return (
    <>
      {/* Cart Icon/Button */}
      <div className="cart-icon" onClick={() => setIsOpen(true)}>
        <span className="cart-emoji">🛒</span>
        {cartCount > 0 && (
          <span className="cart-badge">{cartCount}</span>
        )}
      </div>

      {/* Cart Modal */}
      {isOpen && (
        <div className="cart-overlay">
          <div className="cart-modal">
            <div className="cart-header">
              <h2>Shopping Cart ({cartCount} items)</h2>
              <button 
                className="cart-close"
                onClick={() => setIsOpen(false)}
              >
                ✕
              </button>
            </div>

            <div className="cart-content">
              {loading && <div className="cart-loading">Loading...</div>}
              
              {cartItems.length === 0 ? (
                <div className="cart-empty">
                  <p>Your cart is empty</p>
                  <button 
                    className="continue-shopping"
                    onClick={() => setIsOpen(false)}
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                <>
                  <div className="cart-items">
                    {cartItems.map((item) => (
                      <div key={item.id} className="cart-item">
                        <img 
                          src={item.productImage} 
                          alt={item.productTitle}
                          className="cart-item-image"
                        />
                        <div className="cart-item-details">
                          <h4>{item.productTitle}</h4>
                          <p>Color: {item.selectedColor.code}</p>
                          <p>Size: {item.selectedSize}</p>
                          <p className="cart-item-price">Rs.{item.productPrice}</p>
                        </div>
                        <div className="cart-item-controls">
                          <div className="quantity-controls">
                            <button 
                              onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                              disabled={item.quantity <= 1}
                            >
                              -
                            </button>
                            <span className="quantity">{item.quantity}</span>
                            <button 
                              onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                            >
                              +
                            </button>
                          </div>
                          <button 
                            className="remove-item"
                            onClick={() => handleRemoveItem(item.id)}
                          >
                            Remove
                          </button>
                        </div>
                        <div className="cart-item-total">
                          Rs.{item.productPrice * item.quantity}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="cart-footer">
                    <div className="cart-total">
                      <h3>Total: Rs.{cartTotal}</h3>
                    </div>
                    <div className="cart-actions">
                      <button 
                        className="clear-cart"
                        onClick={handleClearCart}
                      >
                        Clear Cart
                      </button>
                      <button 
                        className="checkout-btn"
                        onClick={() => {
                          alert('Checkout functionality coming soon!');
                          // Here you would navigate to checkout
                        }}
                      >
                        Checkout
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Cart;
