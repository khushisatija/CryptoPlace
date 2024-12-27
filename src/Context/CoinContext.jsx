import { createContext, useEffect, useState } from "react";

export const CoinContext = createContext();

const CoinContextProvider = (props) => {

    const [allCoin, setAllCoin] = useState([]);
    const [currency, setCurrency] = useState({name: "usd", symbol: "$"});
const fetchAllCoin = async () => {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      'x-cg-demo-api-key': 'CG-JtTmBh6AuvDbGZrPGdy7f2jA',
    },
  };

  try {
    const response = await fetch(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency.name}`,
      options
    );
    const data = await response.json();
    setAllCoin(data); // Update context state
    return data; // Return fetched data
  } catch (err) {
    console.error(err);
    return [];
  }
};
    useEffect(()=>{fetchAllCoin()},[currency])

    const contextValue={
        allCoin, currency, setCurrency
    };

 return (
    <CoinContext.Provider value={contextValue}>
        {props.children}
    </CoinContext.Provider>
 )
}

export default CoinContextProvider;