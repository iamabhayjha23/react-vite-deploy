import React from 'react';
import './SearchResults.css';

const SearchResults = ({ 
  searchResults, 
  searchTerm, 
  onProductSelect, 
  onClearSearch,
  isSearching 
}) => {
  
  if (isSearching) {
    return (
      <div className="search-results">
        <div className="search-header">
          <h2>Searching...</h2>
        </div>
        <div className="search-loading">
          <div className="loading-spinner"></div>
          <p>Finding sneakers for you...</p>
        </div>
      </div>
    );
  }

  if (!searchTerm) return null;

  return (
    <div className="search-results">
      <div className="search-header">
        <h2>Search Results for "{searchTerm}"</h2>
        <p>{searchResults.length} sneakers found</p>
        <button className="clear-search" onClick={onClearSearch}>
          Clear Search ✕
        </button>
      </div>

      {searchResults.length === 0 ? (
        <div className="no-results">
          <div className="no-results-icon">👟</div>
          <h3>No sneakers found</h3>
          <p>Try searching for:</p>
          <div className="search-suggestions">
            <span>Air Force</span>
            <span>Jordan</span>
            <span>Dunk</span>
            <span>Running</span>
            <span>Classic</span>
          </div>
        </div>
      ) : (
        <div className="search-results-grid">
          {searchResults.map((product) => (
            <div 
              key={product.id} 
              className="search-result-item"
              onClick={() => onProductSelect(product)}
            >
              <img 
                src={product.colors[0]?.img} 
                alt={product.title}
                className="search-result-image" 
              />
              <div className="search-result-details">
                <h3>{product.title}</h3>
                <p className="search-result-price">Rs.{product.price}</p>
                <div className="search-result-colors">
                  {product.colors.map((color, index) => (
                    <div
                      key={index}
                      className="search-color-dot"
                      style={{ backgroundColor: color.code }}
                    ></div>
                  ))}
                </div>
                {product.keywords && (
                  <div className="search-result-keywords">
                    {product.keywords.slice(0, 3).map((keyword, index) => (
                      <span key={index} className="keyword-tag">
                        {keyword}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchResults;
