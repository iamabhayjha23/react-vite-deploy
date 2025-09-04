import React, { useState } from 'react';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setSubmitMessage('Thank you for your message! We\'ll get back to you within 24 hours.');
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
      setIsSubmitting(false);
      setTimeout(() => setSubmitMessage(''), 5000);
    }, 1000);
  };

  return (
    <div className="contact-page">
      {/* Header Section */}
      <div className="contact-header">
        <h1 className="contact-title">CONTACT US</h1>
        <p className="contact-subtitle">Get in touch with our Nike experts</p>
      </div>

      {/* Main Content */}
      <div className="contact-main">
        <div className="contact-container">
          
          {/* Contact Info */}
          <div className="contact-info">
            <h2>Get In Touch</h2>
            <p>Have questions about sizing, new releases, or need help with your order?</p>
            
            <div className="contact-methods">
              <div className="contact-method">
                <div className="method-icon">📍</div>
                <div className="method-details">
                  <h3>Visit Our Store</h3>
                  <p>123 Nike Street<br/>Shoe District, NY 10001</p>
                  <p><em>Mon-Fri: 9AM-9PM | Sat-Sun: 10AM-8PM</em></p>
                </div>
              </div>

              <div className="contact-method">
                <div className="method-icon">📞</div>
                <div className="method-details">
                  <h3>Call Us</h3>
                  <p><strong>+1 (555) 123-4567</strong></p>
                  <p><em>Available: Mon-Fri 8AM-8PM</em></p>
                </div>
              </div>

              <div className="contact-method">
                <div className="method-icon">✉️</div>
                <div className="method-details">
                  <h3>Email Us</h3>
                  <p><strong>support@nikeshoestore.com</strong></p>
                  <p><em>Response within 24 hours</em></p>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="social-section">
              <h3>Follow Us</h3>
              <div className="social-links">
                <a href="#" className="social-link">Facebook</a>
                <a href="#" className="social-link">Instagram</a>
                <a href="#" className="social-link">Twitter</a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="contact-form-container">
            <h2>Send Message</h2>
            
            {submitMessage && (
              <div className="success-message">
                {submitMessage}
              </div>
            )}

            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-field">
                  <label>Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Your full name"
                  />
                </div>
                <div className="form-field">
                  <label>Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-field">
                  <label>Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
                <div className="form-field">
                  <label>Subject *</label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select subject</option>
                    <option value="general">General Inquiry</option>
                    <option value="sizing">Size & Fit</option>
                    <option value="orders">Order Status</option>
                    <option value="returns">Returns</option>
                  </select>
                </div>
              </div>

              <div className="form-field">
                <label>Message *</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="5"
                  placeholder="Tell us how we can help you..."
                ></textarea>
              </div>

              <button 
                type="submit" 
                className="submit-btn"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Info Cards */}
      <div className="info-section">
        <div className="info-cards">
          <div className="info-card">
            <h3>🚚 Free Shipping</h3>
            <p>Free shipping on orders over $75</p>
          </div>
          <div className="info-card">
            <h3>🔄 Easy Returns</h3>
            <p>30-day return policy</p>
          </div>
          <div className="info-card">
            <h3>👟 Expert Help</h3>
            <p>Nike shoe specialists</p>
          </div>
          <div className="info-card">
            <h3>⚡ Fast Support</h3>
            <p>24-hour response time</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
