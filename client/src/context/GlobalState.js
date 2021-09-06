import React, { createContext, useReducer } from 'react'
// import { dailyBalance } from '../data/dailyBalance'
// import { cropsHarvested } from '../data/cropsHarvested'
import { AppReducer } from './AppReducer'
import client from '../axios'

// import cropsHarvested from '../data/cropsHarvested.json'
// import dailyBalance from '../data/dailyBalance.json'

// initial state
const initialState = {
    dailyBalance: [],
    cropsHarvested: [],
    error: null,
    balanceLoading: true,
    cropsLoading: true
}

// create context
export const GlobalContext = createContext(initialState)

// Provider component
export const GlobalProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AppReducer, initialState)

    /*useEffect(() => {
        localStorage.setItem('crypto_observer_state', JSON.stringify(state))
    }, [state])*/

    // actions
    /*const getBalance = async () => {
        try {
            const token = localStorage.getItem('crypto-observer-token')
            const bal = await client.get('balance', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            dispatch({
                type: 'GET_BALANCE',
                payload: bal.data.data
            })
        } catch (error) {
            dispatch({
                type: 'BALANCE_ERROR',
                payload: error //.response.data.error
            })
        }
    }
    
        const deleteBalance = async (id) => {
        try {
            await client.delete(`balance/${id}`)

            dispatch({
                type: 'DELETE_BALANCE',
                payload: id
            })
        } catch (error) {
            dispatch({
                type: 'BALANCE_ERROR',
                payload: error //.response.data.error
            })
        }

    }

    const addBalance = async (balance) => {
        try {
            const response = await client.post('balance', {
                ...balance
            })
            dispatch({
                type: 'ADD_BALANCE',
                payload: response.data.data
            })
        } catch (error) {
            dispatch({
                type: 'BALANCE_ERROR',
                payload: error //.response.data.error
            })
        }
    }
*/

    const getCrops = async () => {
        try {
            const cr = await client.get('crops')

            dispatch({
                type: 'GET_CROPS',
                payload: cr.data.data
            })
        } catch (error) {
            dispatch({
                type: 'CROPS_ERROR',
                payload: error //.response.data.error
            })
        }
    }


    const deleteCrops = async (id) => {
        try {
            await client.delete(`crops/${id}`)

            dispatch({
                type: 'DELETE_CROPS',
                payload: id
            })
        } catch (error) {
            dispatch({
                type: 'CROPS_ERROR',
                payload: error //.response.data.error
            })
        }
    }

    const addCrops = async (crops) => {
        try {
            const response = await client.post('crops', {
                ...crops
            })

            dispatch({
                type: 'ADD_CROPS',
                payload: response.data.data
            })
        } catch (error) {
            dispatch({
                type: 'CROPS_ERROR',
                payload: error //.response.data.error
            })
        }
    }

    return (
        <GlobalContext.Provider
            value={{
                // dailyBalance: state.dailyBalance,
                cropsHarvested: state.cropsHarvested,
                error: state.error,
                // balanceLoading: state.balanceLoading,
                cropsLoading: state.cropsLoading,
                // getBalance,
                // deleteBalance,
                // addBalance,
                getCrops,
                deleteCrops,
                addCrops
            }}
        >
            {children}
        </GlobalContext.Provider>
    )
}