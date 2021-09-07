export const fetchCoingeckoIds = (arrayOfSymbols) => {
    const coinList = require('../resources/coinList.json') // from coingecko
    const rawId = coinList
        .filter(coin => (
            arrayOfSymbols.includes(coin.symbol)
            && !coin.id.includes('-')
            && coin.symbol !== 'BTC'
        ))
    const dict = {}
    rawId.forEach(e => {
        dict[e.symbol] = e.id
    })
    dict['usd'] = 'dolar'
    const ids = rawId.map(e => e.id).join()
    return ids
}

export const addDolarSymbol = (data) => {
    data['dolar'] = {
        usd: 1,
        brl: data.bitcoin.brl / data.bitcoin.usd,
        btc: 1 / data.bitcoin.usd
    }
    return data
}
