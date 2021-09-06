import React, { useContext } from 'react'
import { handleDate } from '../functions/handleDate'

import { CropsContext } from '../context/CropsContext'

export const EachCrops = ({ crops }) => {
    const { deleteCrops } = useContext(CropsContext)

    return (
        <li className="balance_item__item">
            <span className="balance_item__item__span">{handleDate(crops.createdAt)}</span>
            <span className="balance_item__item__span balance_item__item__span__center">{crops.symbol}</span>
            <span className="balance_item__item__span balance_item__item__span__center">{crops.description}</span>
            <span className="balance_item__item__span balance_item__item__span__last">{crops.amount.toFixed(2)}</span>
            <button
                className="balance_item__delete_btn"
                onClick={() => deleteCrops(crops._id)}
            >
                x
            </button>
        </li>
    )
}
