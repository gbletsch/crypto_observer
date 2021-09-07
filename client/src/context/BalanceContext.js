import React, { createContext, useEffect, useState } from 'react'
import client from '../axios'
import coinList from '../resources/coinList.json' // from coingecko
import { findLastEntries } from '../functions/handleDate'

export const BalanceContext = createContext()

const BalanceContextProvider = (props) => {
    const [dailyBalance, setDailyBalance] = useState([])
    const [priceData, setPriceData] = useState({})
    const [loadingBalance, setLoadingBalance] = useState(true)

    useEffect(() => {
        client.get('balance')
            .then(response => {
                if (!response.data.success) {
                    console.log('balance got an enpty array')
                    return
                }
                setDailyBalance(response.data.data)
                setLoadingBalance(false)
            })
            .catch(error => console.log(error))
    }, [])

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
        // https://www.coingecko.com/pt/api/documentation
        // const coinListUrl = 'https://api.coingecko.com/api/v3/coins/list'
        // const coinData = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=300&page=1&sparkline=false&price_change_percentage=1h%2C24h%2C7d%2C14d%2C30d%2C200d%2C1y'
        fetch(simplePriceUrl)
            .then(response => response.json())
            .then(json => {

                json['dolar'] = {
                    usd: 1,
                    brl: json.bitcoin.brl / json.bitcoin.usd,
                    btc: 1 / json.bitcoin.usd
                }
                setPriceData(json)
            })
            .catch(error => console.log(error))

    }, [dailyBalance])



    const addBalance = (newBalance) => {
        client.post('balance', { ...newBalance })
            .then(response => {
                if (response.data.success) {
                    setDailyBalance([...dailyBalance, response.data.data])
                }
            })
            .catch(error => console.log(error))
    }

    const deleteBalance = (id) => {
        client.delete(`balance/${id}`)
            .then(() => {
                setDailyBalance(dailyBalance.filter(c => c._id !== id))
            })
            .catch(error => console.log(error))
    }


    return (
        <BalanceContext.Provider value={{
            dailyBalance,
            addBalance,
            deleteBalance,
            loadingBalance,
            priceData
        }}>
            {props.children}
        </BalanceContext.Provider>
    )
}

export default BalanceContextProvider
