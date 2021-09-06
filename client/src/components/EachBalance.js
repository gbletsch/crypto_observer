import React, { useContext } from 'react'
import { handleDate } from '../functions/handleDate'

import { GlobalContext } from '../context/GlobalState'

export const EachBalance = ({ balance }) => {
    const { deleteBalance } = useContext(GlobalContext)
    return (
        <li className="balance_item__item">
            <span className="balance_item__item__span">{handleDate(balance.createdAt)}</span>
            <span className="balance_item__item__span balance_item__item__span__center">{balance.symbol}</span>
            <span className="balance_item__item__span balance_item__item__span__center">{balance.description}</span>
            <span className="balance_item__item__span balance_item__item__span__last">{balance.amount.toFixed(2)}</span>
            <button
                className="balance_item__delete_btn"
                onClick={() => deleteBalance(balance._id)}
            >
                x
            </button>
        </li>
    )
}
