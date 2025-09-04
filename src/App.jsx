import React, { useState, useEffect } from 'react';
import { getProducts } from './services/firebaseService';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Slider from './components/Slider';
import Features from './components/Features';
import Product from './components/Product';
import Gallery from './components/Gallery';
import NewSeason from './components/NewSeason';
import Footer from './components/Footer';
import Cart from './components/Cart';
import Contact from './pages/Contact';
import SearchResults from './components/SearchResults';
import { addMoreSneakersToFirebase } from './utils/addMoreSneakers'; // Add this line
import './App.css';

function App() {
  const [products, setProducts] = useState([]);
  const [choosenProduct, setChoosenProduct] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loading, setLoading] = useState(true);
  const [showContact, setShowContact] = useState(false);
  
  // Search states
  const [searchResults, setSearchResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [showSearchResults, setShowSearchResults] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      console.log('Fetching products from Firebase...');
      const firebaseProducts = await getProducts();
      
      if (firebaseProducts.length === 0) {
        console.log('No products found, adding default sneakers...');
        // Uncomment this line to add more sneakers (run once)
        // await addMoreSneakersToFirebase();
        setLoading(false);
        return;
      }
      
      setProducts(firebaseProducts);
      setChoosenProduct(firebaseProducts[0]);
      setLoading(false);
    };

    fetchProducts();
  }, []);

  const handleMenuItemClick = (index) => {
    if (products[index]) {
      setCurrentSlide(index);
      setChoosenProduct(products[index]);
      setShowContact(false);
      handleClearSearch(); // Clear search when navigating
    }
  };

  const handleSearchResults = (results, term) => {
    setSearchResults(results);
    setSearchTerm(term);
    setShowSearchResults(true);
    setShowContact(false);
  };

  const handleClearSearch = () => {
    setSearchResults([]);
    setSearchTerm('');
    setShowSearchResults(false);
  };

  const handleProductSelect = (product) => {
    const productIndex = products.findIndex(p => p.id === product.id);
    if (productIndex !== -1) {
      setCurrentSlide(productIndex);
      setChoosenProduct(product);
    }
    handleClearSearch();
  };

  const handleContactClick = () => {
    setShowContact(true);
    handleClearSearch();
  };

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        fontSize: '24px',
        background: '#111',
        color: 'white'
      }}>
        Loading sneakers...
      </div>
    );
  }

  return (
    <AuthProvider>
      <CartProvider>
        <div className="App">
          <Cart />
          
          <Navbar 
            onMenuItemClick={handleMenuItemClick}
            onSearchResults={handleSearchResults}
            onClearSearch={handleClearSearch}
          />

          {showContact ? (
            <>
              <button 
                onClick={() => setShowContact(false)}
                style={{
                  position: 'fixed',
                  top: '20px',
                  left: '20px',
                  background: '#2a7a4b',
                  color: 'white',
                  padding: '10px 20px',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  zIndex: 1000
                }}
              >
                ← Back to Home
              </button>
              <Contact />
            </>
          ) : showSearchResults ? (
            <SearchResults
              searchResults={searchResults}
              searchTerm={searchTerm}
              onProductSelect={handleProductSelect}
              onClearSearch={handleClearSearch}
              isSearching={isSearching}
            />
          ) : (
            <>
              <Slider currentSlide={currentSlide} />
              <Features />
              <Product choosenProduct={choosenProduct} />
              <Gallery />
              <NewSeason />
            </>
          )}
          
          <Footer onContactClick={handleContactClick} />
        </div>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
