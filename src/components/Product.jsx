import React, { useState, useEffect } from 'react';
import { createOrder } from '../services/firebaseService';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext'; // Added this import

const Product = ({ choosenProduct }) => {
  const { addToCart } = useCart();
  const { currentUser } = useAuth(); // Added this line to get currentUser
  const [selectedColor, setSelectedColor] = useState(choosenProduct.colors[0]);
  const [selectedSize, setSelectedSize] = useState(42);
  const [isPaymentOpen, setPaymentOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setSelectedColor(choosenProduct.colors[0]);
  }, [choosenProduct]);

  const handleColorChange = (color, index) => {
    setSelectedColor(color);
  };

  const handleSizeClick = (size) => {
    setSelectedSize(size);
  };

  const handleAddToCart = async () => {
    console.log('🔘 Add to Cart button clicked');
    console.log('Current user for cart:', currentUser);
    
    if (!currentUser) {
      alert('Please sign in to add items to your cart!');
      return;
    }

    setLoading(true);
    
    const success = await addToCart(choosenProduct, selectedColor, selectedSize, 1);
    
    if (success) {
      alert('✅ Added to cart successfully! 🛒');
    } else {
      alert('❌ Failed to add to cart. Please try again.');
    }
    setLoading(false);
  };

  const handleBuyNow = async () => {
    console.log('🔘 BUY NOW button clicked!');
    console.log('Current user:', currentUser);
    console.log('User authenticated:', !!currentUser);
    
    if (!currentUser) {
      alert('Please sign in to place an order!');
      return;
    }

    setLoading(true);
    
    const orderData = {
      userId: currentUser.uid,
      productId: choosenProduct.id,
      productTitle: choosenProduct.title,
      productPrice: choosenProduct.price,
      selectedSize,
      selectedColor: selectedColor.code,
      productImage: selectedColor.img,
      quantity: 1,
      totalAmount: choosenProduct.price
    };

    console.log('📦 Order data:', orderData);

    try {
      const orderId = await createOrder(orderData);
      console.log('✅ Order created with ID:', orderId);
      
      if (orderId) {
        setPaymentOpen(true);
        alert('Order created successfully! 🎉');
      } else {
        alert('Failed to create order. Please try again.');
      }
    } catch (error) {
      console.error('❌ Error creating order:', error);
      console.error('Error details:', {
        code: error.code,
        message: error.message,
        stack: error.stack
      });
      alert('Error: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleClosePayment = () => {
    setPaymentOpen(false);
  };

  const handleConfirmOrder = () => {
    // Here you would typically process the payment
    alert('Order confirmed! Thank you for your purchase.');
    setPaymentOpen(false);
  };

  return (
    <div className="product">
      <img 
        src={selectedColor.img} 
        alt={choosenProduct.title}
        className="productImg" 
      />
      <div className="productDetails">
        <h1 className="productTitle">{choosenProduct.title}</h1>
        <h2 className="productPrice">Rs.{choosenProduct.price}</h2>
        <p className="productDesc">
          Nike Air Force is a range of athletic shoes made by Nike. It was created by designer Bruce Kilgore and was the first basketball shoe to use Nike's "Air" technology. The shoe is offered in low-, mid- and high-top styles.
        </p>
        
        <div className="colorButtonRow">
          <div className="colors">
            {choosenProduct.colors.map((color, index) => (
              <div
                key={index}
                className="color"
                style={{ backgroundColor: color.code }}
                onClick={() => handleColorChange(color, index)}
              ></div>
            ))}
          </div>
        </div>
        
        <div className="sizes">
          {[41, 42, 43].map((size) => (
            <div
              key={size}
              className="size"
              style={{
                backgroundColor: selectedSize === size ? 'black' : 'white',
                color: selectedSize === size ? 'white' : 'black'
              }}
              onClick={() => handleSizeClick(size)}
            >
              {size}
            </div>
          ))}
        </div>

        {/* User Authentication Status (for debugging) */}
        {process.env.NODE_ENV === 'development' && (
          <div style={{ 
            fontSize: '12px', 
            color: '#666', 
            marginBottom: '10px',
            padding: '5px',
            backgroundColor: '#f0f0f0',
            borderRadius: '3px'
          }}>
            Debug: User {currentUser ? `signed in as ${currentUser.email}` : 'not signed in'}
          </div>
        )}

        {/* BUTTONS SIDE BY SIDE */}
        <div className="buttonRow">
          <button 
            className="productButton"
            onClick={handleBuyNow}
            disabled={loading}
          >
            {loading ? 'Processing...' : 'BUY NOW'}
          </button>
          
          <button 
            className="addToCartButton"
            onClick={handleAddToCart}
            disabled={loading}
          >
            {loading ? 'Adding...' : 'ADD TO CART 🛒'}
          </button>
        </div>
      </div>

      {/* Payment Modal */}
      {isPaymentOpen && (
        <div className="payment" style={{ display: 'flex' }}>
          <div 
            className="close"
            onClick={handleClosePayment}
          >
            ✕
          </div>
          <span className="payTitle">Order Confirmation</span>
          <div style={{ margin: '20px 0' }}>
            <strong>Product:</strong> {choosenProduct.title}<br/>
            <strong>Size:</strong> {selectedSize}<br/>
            <strong>Color:</strong> {selectedColor.code}<br/>
            <strong>Price:</strong> Rs.{choosenProduct.price}<br/>
            <strong>Total:</strong> Rs.{choosenProduct.price}
          </div>
          <span className="payTitle">Shipping Information</span>
          <input type="text" className="payInput" placeholder="Name and Surname" required />
          <input type="tel" className="payInput" placeholder="Phone Number" required />
          <input type="text" className="payInput" placeholder="Address" required />
          <input type="text" className="payInput" placeholder="City" required />
          <input type="text" className="payInput" placeholder="Postal Code" required />
          <button 
            className="payButton"
            onClick={handleConfirmOrder}
          >
            Confirm Order
          </button>
        </div>
      )}
    </div>
  );
};

export default Product;
