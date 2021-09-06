import React, { useContext, useState } from 'react'
// import { v4 as uuidv4 } from 'uuid'
// import { getDefaultTodayDate } from '../functions/handleDate'
import { SaveAsJson } from './SaveAsJson'

import { GlobalContext } from '../context/GlobalState'

export const AddBalance = () => {
    const { addBalance, dailyBalance } = useContext(GlobalContext)

    const [symbol, setSymbol] = useState('')
    const [amount, setAmount] = useState(0)
    const [description, setDescription] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        addBalance({
            symbol,
            amount: +amount, // '+' sign to enter a number
            description
        })
    }


    return (
        <div className='add_balance'>
            <h3>Add today's balance</h3>
            <form onSubmit={handleSubmit} className="add_balance__form">
                <div className="add_balance__form__control">
                    <label
                        className='add_balance__form__label'
                        htmlFor="symbol"
                    >
                        Symbol
                    </label>
                    <input
                        className='add_balance__form__input'
                        value={symbol}
                        onChange={(e) => setSymbol(e.target.value)}
                        type="text"
                        name="symbol"
                        placeholder='coin symbol'
                    />
                </div>
                <div className="add_balance__form__control">
                    <label
                        className='add_balance__form__label'
                        htmlFor="amount"
                    >
                        Amount
                    </label>
                    <input
                        className='add_balance__form__input'
                        value={amount}
                        onChange={e => setAmount(e.target.value)}
                        type="number"
                        step='any'
                        name="amount"
                        placeholder='amount'
                    />
                </div>
                <div className="add_balance__form__control">
                    <label
                        className='add_balance__form__label'
                        htmlFor="description"
                    >
                        Description
                    </label>
                    <input
                        className='add_balance__form__input'
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        type="text"
                        name="description"
                        placeholder='description'
                    />
                </div>
                <button className="add_balance__button">Add balance</button>
            </form>
            <SaveAsJson text='Save balance to JSON file' filename='dailyBalance' jsonData={dailyBalance} />
        </div>
    )
}
