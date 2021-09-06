import React, { useContext, useState } from 'react'
import { SaveAsJson } from './SaveAsJson'
import { CropsContext } from '../context/CropsContext'

export const AddCrops = () => {
    const { cropsHarvested, addCrops } = useContext(CropsContext)

    const [symbol, setSymbol] = useState('')
    const [amount, setAmount] = useState(0)
    const [description, setDescription] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        const newCrops = {
            symbol,
            amount: +amount, // '+' sign to enter a number
            description
        }
        addCrops(newCrops)
    }


    return (
        <div className='add_balance'>
            <h3>Add today's crops</h3>
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
                <button className="add_balance__button">Add crops</button>
            </form>
            <SaveAsJson text='Save crops to JSON file' filename='cropsHarvested' jsonData={cropsHarvested} />
        </div>
    )
}
