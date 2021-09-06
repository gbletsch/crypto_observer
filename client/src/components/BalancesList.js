import React, { useContext, useEffect } from 'react'
import { EachBalance } from './EachBalance'
import { findLastEntries } from '../functions/handleDate'

import { GlobalContext } from '../context/GlobalState'

export const BalancesList = () => {
    const { dailyBalance, getBalance, balanceLoading } = useContext(GlobalContext)

    useEffect(() => {
        getBalance()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    if (balanceLoading) (
        <h1>Loading...</h1>
    )

    return (
        <div className='balances_list'>
            <h3 className="balances_list__title">
                Latest entries
            </h3>
            <ul className="balances_list__list">
                {
                    findLastEntries(dailyBalance)[0].map(balance => (
                        <EachBalance key={balance._id} balance={balance} />
                    ))
                }
                {
                    findLastEntries(dailyBalance)[1].map(balance => (
                        <EachBalance key={balance._id} balance={balance} />
                    ))
                }
            </ul>
        </div>
    )
}
