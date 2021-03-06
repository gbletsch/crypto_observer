import React, { useContext, useEffect, useState } from "react";
import coinList from "../resources/coinList.json"; // from coingecko
import { BalanceContext } from "../context/BalanceContext";
import { findLastEntries } from "../functions/handleDate";

export const Balance = () => {
  const { dailyBalance, priceData } = useContext(BalanceContext);

  const [usdPrice, setUsdPrice] = useState(0);
  const [brlPrice, setBrlPrice] = useState(0);
  const [btcPrice, setBtcPrice] = useState(0);

  useEffect(() => {
    const lastBal = findLastEntries(dailyBalance)[0];
    const symbolArr = lastBal.map((bal) => bal.symbol.toLowerCase());

    const rawId = coinList.filter(
      (coin) =>
        symbolArr.includes(coin.symbol) &&
        !coin.id.includes("-") &&
        coin.symbol !== "BTC"
    );
    const dict = {};
    rawId.forEach((e) => {
      dict[e.symbol] = e.id;
    });
    dict["usd"] = "dolar";
    dict["matic"] = "matic";
    dict["crv"] = "crv";

    // console.log(priceData);

    let totalUsd = 0;
    let totalBrl = 0;
    let totalBtc = 0;
    lastBal.forEach((e) => {
      console.log(e);
      // console.log(priceData[dict[e.symbol.toLowerCase()]]);
      const code = dict[e.symbol]; //.toLowerCase()];
      totalUsd += e.amount * priceData[dict[e.symbol.toLowerCase()]]?.usd;
      console.log(e.amount, code, priceData[code]?.usd);
      totalBrl += e.amount * priceData[dict[e.symbol.toLowerCase()]]?.brl;
      totalBtc += e.amount * priceData[dict[e.symbol.toLowerCase()]]?.btc;
    });
    console.log(totalUsd);
    setUsdPrice(totalUsd);
    setBrlPrice(totalBrl);
    setBtcPrice(totalBtc);
  }, [dailyBalance, priceData]);

  return (
    <div className="balance">
      <h3 className="balance__title">Latest Balance</h3>
      <h1 className="balance__text">
        USD <span>{usdPrice.toFixed(2)}</span>
      </h1>
      <h1 className="balance__text">
        BRL <span>{brlPrice.toFixed(2)}</span>
      </h1>
      <h1 className="balance__text">
        BTC <span>{btcPrice.toFixed(2)}</span>
      </h1>
    </div>
  );
};
