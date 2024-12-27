import React from 'react';
import './Features.css';
import { FaChartLine, FaDollarSign, FaNetworkWired, FaSearch, FaCoins, FaStar } from 'react-icons/fa'; // Example icons

const Features = () => {
  return (
    <div className="features-container">
      <h2>Features of CryptoPlace</h2>

      <div className="features-list">
        <div className="feature-item">
          <FaChartLine className="feature-icon" />
          <h3>Real-time Price Chart</h3>
          <p>Track live cryptocurrency prices with interactive price charts for in-depth analysis.</p>
        </div>

        <div className="feature-item">
          <FaDollarSign className="feature-icon" />
          <h3>Current Price</h3>
          <p>View the current price of cryptocurrencies in your chosen currency (USD, INR, EUR, etc.).</p>
        </div>

        <div className="feature-item">
          <FaNetworkWired className="feature-icon" />
          <h3>Market Cap</h3>
          <p>Monitor the total market capitalization of your favorite cryptocurrencies.</p>
        </div>

        <div className="feature-item">
          <FaCoins className="feature-icon" />
          <h3>24-Hour Price Change</h3>
          <p>Get the latest 24-hour price change to see the performance of cryptocurrencies.</p>
        </div>

        <div className="feature-item">
          <FaStar className="feature-icon" />
          <h3>Track Your Favorite Cryptocurrency</h3>
          <p>Save and monitor your favorite cryptocurrencies for quick and easy access.</p>
        </div>

        <div className="feature-item">
          <FaSearch className="feature-icon" />
          <h3>Search Bar</h3>
          <p>Easily find any cryptocurrency by name or symbol using the built-in search functionality.</p>
        </div>
      </div>
    </div>
  );
};

export default Features;
