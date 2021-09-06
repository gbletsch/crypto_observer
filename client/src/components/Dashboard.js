import React, { useEffect } from 'react'

import { Balance } from './Balance'
import { CoinsCrops } from './CoinsCrops'
import { AddBalance } from './AddBalance'
import { AddCrops } from './AddCrops'
import { BalancesList } from './BalancesList'
import { CropsList } from './CropsList'

import { GlobalProvider } from '../context/GlobalState'
import { useHistory } from 'react-router-dom'

import client from '../axios'

export const Dashboard = () => {
    const history = useHistory()

    useEffect(() => {
        client.get('user')
            .then(response => {
                if (response.data.success) {
                    console.log(`${response.data.user.email} logged`)
                } else {
                    history.push('/login')
                }
            })
            .catch(error => {
                console.log(error)
                history.push('/login')
            })

    }, [history])

    return (
        <GlobalProvider>
            <Balance />
            <CoinsCrops />
            <AddBalance />
            <BalancesList />
            <AddCrops />
            <CropsList />
        </GlobalProvider>
    )
}