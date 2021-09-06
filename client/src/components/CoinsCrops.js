import React, { useContext, useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { findLastEntries } from '../functions/handleDate'

import { GlobalContext } from '../context/GlobalState'

export const CoinsCrops = () => {
    const { dailyBalance, cropsHarvested } = useContext(GlobalContext)
    const [cropsArray, setCropsArray] = useState({})
    const [balArray, setBalArray] = useState({})
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const lastBal = findLastEntries(dailyBalance)[0]
        const lastCr = findLastEntries(cropsHarvested)[0]
        const balConsolidated = {}
        const cropsConsolidated = {}

        lastBal.forEach(c => {
            if (!balConsolidated.hasOwnProperty(c.symbol)) {
                balConsolidated[c.symbol] = 0
            }
            balConsolidated[c.symbol] += c.amount
        });

        lastCr.forEach(c => {
            if (!cropsConsolidated.hasOwnProperty(c.symbol)) {
                cropsConsolidated[c.symbol] = 0
            }
            cropsConsolidated[c.symbol] += c.amount
        });

        const tempCropsArray = []
        for (const record in cropsConsolidated) {
            if (record) {
                tempCropsArray.push({ key: uuidv4(), symbol: record, amount: cropsConsolidated[record] })
            }
        }
        setCropsArray(tempCropsArray)

        const tempBalArray = []
        for (const record in balConsolidated) {
            if (record) {
                tempBalArray.push({ key: uuidv4(), symbol: record, amount: balConsolidated[record] })
            }
        }
        setBalArray(tempBalArray)
        setLoading(false)
    }, [dailyBalance, cropsHarvested])

    if (loading) {
        return <h1>Loading...</h1>
    }

    return (
        <div className='coinscrops'>
            <div className='coinscrops__section coinscrops__section__left'>
                <h4 className='coinscrops__title'>Coins</h4>
                <ul className='coinscrops__list'>
                    {
                        balArray.map(bal => (
                            <li
                                className="coinscrops__text"
                                key={bal.key}
                            >
                                <span>{bal.symbol}</span>
                                <span>{bal.amount.toFixed(2)}</span>
                            </li>
                        ))
                    }
                </ul>
            </div>
            <div className='coinscrops__section'>
                <h4 className='coinscrops__title'>Crops</h4>
                <ul className='coinscrops__list'>
                    {
                        cropsArray.map(crops => (
                            <li
                                className="coinscrops__text"
                                key={crops.key}
                            >
                                <span>{crops.symbol}</span>
                                <span>{crops.amount.toFixed(2)}</span>
                            </li>
                        ))
                    }
                </ul>
            </div>
        </div>
    )
}
