import React from 'react';

const Features = () => {
  return (
    <div className="features">
      <div className="feature">
        <img src="/img/shipping.png" alt="Shipping icon" className="featureIcon" />
        <span className="featureTitle">FREE SHIPPING</span>
        <span className="featureDesc">Free worldwide shipping on all orders.</span>
      </div>
      <div className="feature">
        <img className="featureIcon" src="/img/return.png" alt="Return icon" />
        <span className="featureTitle">30 DAYS RETURN</span>
        <span className="featureDesc">No question return and easy refund in 14 days.</span>
      </div>
      <div className="feature">
        <img className="featureIcon" src="/img/gift.png" alt="Gift card icon" />
        <span className="featureTitle">GIFT CARDS</span>
        <span className="featureDesc">Buy gift cards and use coupon codes easily.</span>
      </div>
      <div className="feature">
        <img className="featureIcon" src="/img/contact.png" alt="Contact icon" />
        <span className="featureTitle">CONTACT US!</span>
        <span className="featureDesc">Keep in touch via email and support system.</span>
      </div>
    </div>
  );
};

export default Features;