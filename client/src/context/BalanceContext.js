import React, { createContext, useEffect, useState } from "react";
import { client, clientCoingecko } from "../axios";
import { findLastEntries } from "../functions/handleDate";
import { addDolarSymbol, fetchCoingeckoIds } from "../functions/coinGecko";

export const BalanceContext = createContext();

const BalanceContextProvider = (props) => {
  const [dailyBalance, setDailyBalance] = useState([]);
  const [priceData, setPriceData] = useState({});
  const [loadingBalance, setLoadingBalance] = useState(true);

  useEffect(() => {
    client
      .get("balance")
      .then((response) => {
        if (!response.data.success) {
          console.log("balance got an enpty array");
          return;
        }
        setDailyBalance(response.data.data);
        setLoadingBalance(false);
      })
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    const lastBal = findLastEntries(dailyBalance)[0];
    const symbolArr = lastBal.map((bal) => bal.symbol.toLowerCase());
    const ids = fetchCoingeckoIds(symbolArr);
    // console.log(ids);
    // console.log(
    //   `https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,${ids}&vs_currencies=usd,brl,btc`
    // );
    clientCoingecko
      .get(`?ids=bitcoin,${ids}&vs_currencies=usd,brl,btc`)
      .then((response) => response.data)
      .then((data) => {
        data = addDolarSymbol(data);
        data.matic = data["matic-network"];
        data.crv = data["curve-dao-token"];
        setPriceData(data);
      })
      .catch((error) => console.log(error));
  }, [dailyBalance]);

  const addBalance = (newBalance) => {
    client
      .post("balance", { ...newBalance })
      .then((response) => {
        if (response.data.success) {
          setDailyBalance([...dailyBalance, response.data.data]);
        }
      })
      .catch((error) => console.log(error));
  };

  const deleteBalance = (id) => {
    client
      .delete(`balance/${id}`)
      .then(() => {
        setDailyBalance(dailyBalance.filter((c) => c._id !== id));
      })
      .catch((error) => console.log(error));
  };

  return (
    <BalanceContext.Provider
      value={{
        dailyBalance,
        addBalance,
        deleteBalance,
        loadingBalance,
        priceData,
      }}
    >
      {props.children}
    </BalanceContext.Provider>
  );
};

export default BalanceContextProvider;
