import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { saveSearchQuery } from '../services/authService'; // ✅ From authService
import { searchProducts } from '../services/firebaseService'; // ✅ From firebaseService
import AuthModal from './AuthModal';
import UserDashboard from './UserDashboard';

const Navbar = ({ onMenuItemClick, onSearchResults, onClearSearch }) => {
  const { currentUser } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showDashboard, setShowDashboard] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  // Debounced search effect
  useEffect(() => {
    if (!searchQuery.trim()) {
      onClearSearch();
      return;
    }

    const searchTimeout = setTimeout(async () => {
      setIsSearching(true);
      
      try {
        const results = await searchProducts(searchQuery);
        onSearchResults(results, searchQuery);
        
        // Save search query for logged-in users
        if (currentUser && searchQuery.trim()) {
          await saveSearchQuery(currentUser.uid, searchQuery.trim());
        }
      } catch (error) {
        console.error('Search error:', error);
      } finally {
        setIsSearching(false);
      }
    }, 500); // 500ms debounce

    return () => clearTimeout(searchTimeout);
  }, [searchQuery, currentUser, onSearchResults, onClearSearch]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    onClearSearch();
  };

  return (
    <nav>
      <div className="navTop">
        <div className="storeBrand">
          <div className="storeName">.sneakers</div>
        </div>

        <div className="search">
          <input 
            className="searchInput" 
            type="text" 
            placeholder="Search Nike shoes..." 
            value={searchQuery}
            onChange={handleSearchChange}
          />
          {searchQuery && (
            <button 
              className="clear-search-btn"
              onClick={handleClearSearch}
            >
              ✕
            </button>
          )}
          {isSearching && (
            <div className="search-loading-indicator">
              <div className="mini-spinner"></div>
            </div>
          )}
        </div>
        
        <div className="userSection">
          {currentUser ? (
            <div className="userMenu">
              <button 
                className="userBtn"
                onClick={() => setShowDashboard(true)}
              >
                👤 {currentUser.displayName?.split(' ')[0] || 'Account'}
              </button>
            </div>
          ) : (
            <button 
              className="signInBtn"
              onClick={() => setShowAuthModal(true)}
            >
              Sign In
            </button>
          )}
        </div>
      </div>
      
      <div className="navBottom">
        <div className="menuItem" onClick={() => onMenuItemClick(0)}>AIR FORCE</div>
        <div className="menuItem" onClick={() => onMenuItemClick(1)}>JORDAN</div>
        <div className="menuItem" onClick={() => onMenuItemClick(2)}>BLAZER</div>
        <div className="menuItem" onClick={() => onMenuItemClick(3)}>CRATER</div>
        <div className="menuItem" onClick={() => onMenuItemClick(4)}>HIPPIE</div>
      </div>

      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)} 
      />
      
      <UserDashboard 
        isOpen={showDashboard} 
        onClose={() => setShowDashboard(false)} 
      />
    </nav>
  );
};

export default Navbar;
