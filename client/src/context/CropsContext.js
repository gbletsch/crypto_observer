import React, { createContext, useEffect, useState } from 'react'
import { client } from '../axios'

export const CropsContext = createContext()

function CropsContextProvider(props) {
    const [cropsHarvested, setCropsHarvested] = useState([])
    const [loadingCrops, setLoadingCrops] = useState(true)

    useEffect(() => {
        client.get('crops')
            .then(response => {
                if (!response.data.success) {
                    console.log('crops retrieve an empty array');
                    return
                }
                setCropsHarvested(response.data.data)
                setLoadingCrops(false)
            })
            .catch(error => console.log(error))
    }, [])

    const addCrops = (newCrops) => {
        client.post('crops', { ...newCrops })
            .then(response => {
                if (response.data.success) {
                    setCropsHarvested([...cropsHarvested, response.data.data])
                }
            })
            .catch(error => console.log(error))
    }

    const deleteCrops = (id) => {
        client.delete(`crops/${id}`)
            .then(() => {
                setCropsHarvested(cropsHarvested.filter(c => c._id !== id))
            })
            .catch(error => console.log(error))
    }

    return (
        <CropsContext.Provider value={{ cropsHarvested, addCrops, deleteCrops, loadingCrops }}>
            {props.children}
        </CropsContext.Provider>
    )
}

export default CropsContextProvider
