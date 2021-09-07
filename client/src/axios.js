import axios from 'axios'

export const client = axios.create({
    baseURL: '/api/v1', // 'http://localhost:5000/api/v1/',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    }
})

// https://www.coingecko.com/pt/api/documentation
// const coinListUrl = 'https://api.coingecko.com/api/v3/coins/list'
// const coinData = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=300&page=1&sparkline=false&price_change_percentage=1h%2C24h%2C7d%2C14d%2C30d%2C200d%2C1y'
// const simplePriceUrl = `https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,${ids}&vs_currencies=usd,brl,btc`
export const clientCoingecko = axios.create({
    baseURL: 'https://api.coingecko.com/api/v3/simple/price'
})