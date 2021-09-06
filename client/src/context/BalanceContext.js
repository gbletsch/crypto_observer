import React, { createContext, useEffect, useState } from 'react'
import client from '../axios'

export const BalanceContext = createContext()

const BalanceContextProvider = (props) => {
    const [dailyBalance, setDailyBalance] = useState([])
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
        <BalanceContext.Provider value={{ dailyBalance, addBalance, deleteBalance, loadingBalance }}>
            {props.children}
        </BalanceContext.Provider>
    )
}

export default BalanceContextProvider
