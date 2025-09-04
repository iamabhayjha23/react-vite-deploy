import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { logOut, getUserSearchHistory, getUserOrders } from '../services/authService';

const UserDashboard = ({ isOpen, onClose }) => {
  const { currentUser } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [searchHistory, setSearchHistory] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen && currentUser) {
      loadUserData();
    }
  }, [isOpen, currentUser]);

  const loadUserData = async () => {
    if (!currentUser) return;
    
    setLoading(true);
    try {
      const [history, userOrders] = await Promise.all([
        getUserSearchHistory(currentUser.uid),
        getUserOrders(currentUser.uid)
      ]);
      
      setSearchHistory(history);
      setOrders(userOrders);
    } catch (error) {
      console.error('Error loading user data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logOut();
      onClose();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  if (!isOpen || !currentUser) return null;

  return (
    <div className="dashboard-overlay">
      <div className="dashboard-modal">
        <div className="dashboard-header">
          <h2>My Account</h2>
          <button className="dashboard-close" onClick={onClose}>✕</button>
        </div>

        <div className="dashboard-content">
          <div className="dashboard-tabs">
            <button 
              className={activeTab === 'profile' ? 'tab-active' : ''}
              onClick={() => setActiveTab('profile')}
            >
              Profile
            </button>
            <button 
              className={activeTab === 'orders' ? 'tab-active' : ''}
              onClick={() => setActiveTab('orders')}
            >
              Orders ({orders.length})
            </button>
            <button 
              className={activeTab === 'history' ? 'tab-active' : ''}
              onClick={() => setActiveTab('history')}
            >
              Search History
            </button>
          </div>

          <div className="dashboard-tab-content">
            {activeTab === 'profile' && (
              <div className="profile-tab">
                <div className="user-info">
                  <div className="user-avatar">
                    {currentUser.displayName 
                      ? currentUser.displayName.split(' ').map(n => n[0]).join('').toUpperCase()
                      : currentUser.email[0].toUpperCase()
                    }
                  </div>
                  <div className="user-details">
                    <h3>{currentUser.displayName || 'Nike Customer'}</h3>
                    <p>{currentUser.email}</p>
                    <p>Member since {new Date(currentUser.metadata.creationTime).toLocaleDateString()}</p>
                  </div>
                </div>
                <button className="logout-btn" onClick={handleLogout}>
                  Sign Out
                </button>
              </div>
            )}

            {activeTab === 'orders' && (
              <div className="orders-tab">
                {loading ? (
                  <div className="loading">Loading orders...</div>
                ) : orders.length === 0 ? (
                  <div className="empty-state">
                    <p>No orders yet</p>
                    <p>Start shopping to see your orders here!</p>
                  </div>
                ) : (
                  <div className="orders-list">
                    {orders.map((order) => (
                      <div key={order.id} className="order-item">
                        <div className="order-header">
                          <span className="order-id">Order #{order.id.substring(0, 8)}</span>
                          <span className="order-date">
                            {new Date(order.createdAt.seconds * 1000).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="order-details">
                          <p><strong>{order.productTitle}</strong></p>
                          <p>Size: {order.selectedSize} | Color: {order.selectedColor}</p>
                          <p>Quantity: {order.quantity}</p>
                          <p className="order-total">Total: Rs.{order.totalAmount}</p>
                          <span className={`order-status ${order.status}`}>
                            {order.status || 'Pending'}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'history' && (
              <div className="history-tab">
                {loading ? (
                  <div className="loading">Loading search history...</div>
                ) : searchHistory.length === 0 ? (
                  <div className="empty-state">
                    <p>No search history</p>
                    <p>Your search queries will appear here</p>
                  </div>
                ) : (
                  <div className="search-history">
                    <h4>Recent Searches</h4>
                    <div className="search-tags">
                      {searchHistory.map((query, index) => (
                        <span key={index} className="search-tag">
                          {query}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
