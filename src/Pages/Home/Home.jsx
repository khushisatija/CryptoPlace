import React, { useContext, useState, useEffect } from 'react';
import './Home.css';
import { CoinContext } from '../../Context/CoinContext';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Home = () => {
  const { allCoin, currency } = useContext(CoinContext);
  const [displayCoin, setDisplayCoin] = useState([]);
  const [visibleCount, setVisibleCount] = useState(10);
  const [input, setInput] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const [trackedCoins, setTrackedCoins] = useState({}); // Track coins individually by ID

  // Fetch tracked coins from localStorage on load
  useEffect(() => {
    const savedTrackedCoins = JSON.parse(localStorage.getItem('trackedCoins')) || {};
    setTrackedCoins(savedTrackedCoins);
  }, []);

  useEffect(() => {
    if (Array.isArray(allCoin)) {
      setDisplayCoin(allCoin);
    }
  }, [allCoin]);


  useEffect(() => {
    if (location.pathname === '/') {
      setDisplayCoin(allCoin);
      setInput('');
      setVisibleCount(10);
    }
  }, [location, allCoin]);

  const handleSeeMore = () => {
    setVisibleCount((prevCount) => prevCount + 10);
  };

  const inputHandler = (event) => {
    setInput(event.target.value);
  };

  const searchHandler = (event) => {
    event.preventDefault();
    const coins = allCoin.filter((item) =>
      item.name.toLowerCase().includes(input.toLowerCase())
    );
    setDisplayCoin(coins);
    setVisibleCount(10);
  };

  // Toggle the tracked coin status (Add or Remove)
  const toggleTrack = (coinId) => {
    setTrackedCoins((prevState) => {
      const updatedState = {
        ...prevState,
        [coinId]: !prevState[coinId], // Toggle true/false value
      };

      // Save updated tracked coins to localStorage
      localStorage.setItem('trackedCoins', JSON.stringify(updatedState));

      return updatedState;
    });
  };

  // Notify user about price change (only for tracked coins)
  const notifyChange = (coin) => {
    console.log(`Notifying price change for ${coin.name}: ${Math.floor(coin.price_change_percentage_24h * 100) / 100}%`); // Debugging log
    toast.info(`${coin.name}'s 24H Change: ${Math.floor(coin.price_change_percentage_24h * 100) / 100}%`, {
      position: "top-right",
      autoClose: 8000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      style: {
        backgroundColor: coin.price_change_percentage_24h > 0 ? '#4caf50' : '#f44336', // Green for positive, Red for negative change
        color: '#fff', // White text color
      }
    });
  };
  

  // Inside the useEffect for notification handling:
useEffect(() => {
  const interval = setInterval(async () => {
    const trackedIds = Object.keys(trackedCoins).filter((id) => trackedCoins[id]);

    if (trackedIds.length === 0) return;

    const updatedCoins = allCoin; // Fresh data from CoinGecko
    const savedTrackedCoins = JSON.parse(localStorage.getItem('trackedCoins')) || {};

    updatedCoins.forEach((coin) => {
      if (savedTrackedCoins[coin.id]) {
        const oldCoin = savedTrackedCoins[coin.id]; // Retrieve the old coin data (price)
        
        // Debugging: Checking the comparison values
        console.log('Checking coin:', coin.id, oldCoin);

        // Compare the old price with the new price
        if (oldCoin && oldCoin.price_change_percentage_24h !== coin.price_change_percentage_24h) {
          notifyChange(coin); // Notify price change if there's a difference
        }
      }
    });

    // Update the saved tracked coins with the fresh data for future comparison
    updatedCoins.forEach((coin) => {
      if (savedTrackedCoins[coin.id]) {
        savedTrackedCoins[coin.id] = coin; // Store the latest coin data
      }
    });

    // Save updated tracked coins back to localStorage
    localStorage.setItem('trackedCoins', JSON.stringify(savedTrackedCoins));

    setDisplayCoin(updatedCoins); // Update the displayed coins after fetching fresh data
  }, 30000); // Runs every 30 seconds to fetch new data

  return () => clearInterval(interval); // Cleanup the interval on component unmount
}, [trackedCoins, allCoin]);

  
  return (
    <div className="home">
      <div className="hero">
        <h1>
          Largest <br />
          Crypto Marketplace
        </h1>
        <p>
          Welcome to the world's largest cryptocurrency marketplace. Sign up to explore more about cryptos.
        </p>
        <form onSubmit={searchHandler}>
          <input
            type="text"
            list="coinlist"
            value={input}
            onChange={inputHandler}
            placeholder="Search crypto.."
          />
          <datalist id="coinlist">
            {allCoin.map((item) => (
              <option key={item.id} value={item.name} />
            ))}
          </datalist>
          <button type="submit">Search</button>
        </form>
      </div>

      <div className="crypto-table">
        <div className="table-layout">
          <p>#</p>
          <p>Coins</p>
          <p className='price-heading'>Price</p>
          <p className='h24-heading'>24H Change</p>
          <p className="market-cap" >Market Cap</p>
          <p  className='action-heading'>Action</p>
        </div>

        {displayCoin.length === 0 ? (
          <p className="no-results">No coins match your search.</p>
        ) : (
          displayCoin.slice(0, visibleCount).map((item) => (
            <div className="table-layout" key={item.id}>
              <p>{item.market_cap_rank}</p>
              <Link to={`/coin/${item.id}`}>
                <div>
                  <img src={item.image} alt={item.name} />
                  <p>{`${item.name} - ${item.symbol.toUpperCase()}`}</p>
                </div>
              </Link>
              <Link to={`/coin/${item.id}`}>
                <p>
                  {currency.symbol}
                  {item.current_price.toLocaleString()}
                </p>
              </Link>
              <Link to={`/coin/${item.id}`}>
                <p id="24h-change"
                  className={item.price_change_percentage_24h > 0 ? 'green' : 'red'}
                  style={{ textAlign: 'center' }}
                >
                  {Math.floor(item.price_change_percentage_24h * 100) / 100}%
                </p>
              </Link>
              <Link to={`/coin/${item.id}`}>
                <p className="market-cap">
                  {currency.symbol}
                  {item.market_cap.toLocaleString()}
                </p>
              </Link>
              <button
                className="action-button"
                style={{
                  backgroundColor: trackedCoins[item.id] ? 'green' : '#ac4343',
                }}
                onClick={() => toggleTrack(item.id)} // Pass the coin ID
              >
                {trackedCoins[item.id] ? 'Tracking' : 'Track'}
              </button>
            </div>
          ))
        )}

        {visibleCount < displayCoin.length && (
          <div className="see-more-container">
            <button className="see-more-button" onClick={handleSeeMore}>
              See More
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
