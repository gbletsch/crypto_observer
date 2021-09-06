import React, { useContext, useEffect, useState } from 'react'
import coinList from '../data/coinList.json' // from coingecko

//import { GlobalContext } from '../context/GlobalState'
import { BalanceContext } from '../context/BalanceContext'

import { findLastEntries } from '../functions/handleDate'

// https://www.coingecko.com/pt/api/documentation
// const coinListUrl = 'https://api.coingecko.com/api/v3/coins/list'
// const coinData = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=300&page=1&sparkline=false&price_change_percentage=1h%2C24h%2C7d%2C14d%2C30d%2C200d%2C1y'

export const Balance = () => {
    const { dailyBalance, loadingBalance } = useContext(BalanceContext)

    const [usdPrice, setUsdPrice] = useState(0)
    const [brlPrice, setBrlPrice] = useState(0)
    const [btcPrice, setBtcPrice] = useState(0)
    const [loading, setLoading] = useState(true) // tirar essa merda qdo arrumar os contexts

    useEffect(() => {
        const lastBal = findLastEntries(dailyBalance)[0]
        const symbolArr = lastBal.map(bal => bal.symbol.toLowerCase())

        const rawId = coinList
            .filter(coin => symbolArr
                .includes(coin.symbol) && !coin.id.includes('-') && coin.symbol !== 'BTC')

        const dict = {}
        rawId.forEach(e => {
            dict[e.symbol] = e.id
        })
        dict['usd'] = 'dolar'

        const ids = rawId.map(e => e.id).join()
        const simplePriceUrl = `https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,${ids}&vs_currencies=usd,brl,btc`
        fetch(simplePriceUrl)
            .then(response => response.json())
            .then(json => {

                json['dolar'] = {
                    usd: 1,
                    brl: json.bitcoin.brl / json.bitcoin.usd,
                    btc: 1 / json.bitcoin.usd
                }
                let totalUsd = 0
                let totalBrl = 0
                let totalBtc = 0
                lastBal.forEach(e => {
                    totalUsd += e.amount * json[dict[e.symbol.toLowerCase()]].usd
                    totalBrl += e.amount * json[dict[e.symbol.toLowerCase()]].brl
                    totalBtc += e.amount * json[dict[e.symbol.toLowerCase()]].btc
                })
                setUsdPrice(totalUsd)
                setBrlPrice(totalBrl)
                setBtcPrice(totalBtc)
            })

        setLoading(false)
    }, [dailyBalance])


    if (loadingBalance || loading) {
        return <h1>Loading...</h1>
    }

    return (
        <div className='balance'>
            <h4 className='balance__title'>Latest Balance</h4>
            <h1 className="balance__text">USD <span>{usdPrice.toFixed(2)}</span></h1>
            <h1 className="balance__text">BRL <span>{brlPrice.toFixed(2)}</span></h1>
            <h1 className="balance__text">BTC <span>{btcPrice.toFixed(2)}</span></h1>
        </div>
    )
}
