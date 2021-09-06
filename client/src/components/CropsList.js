import React, { useContext, useEffect } from 'react'

import { GlobalContext } from '../context/GlobalState'
import { EachCrops } from './EachCrops'
import { findLastEntries } from '../functions/handleDate'

export const CropsList = () => {
    const { cropsHarvested, getCrops, cropsLoading } = useContext(GlobalContext)

    useEffect(() => {
        getCrops()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    if (cropsLoading) {
        return <h1>Loading...</h1>
    }

    return (
        <div className='balances_list'>
            <h3 className="balances_list__title">
                Latest crops
            </h3>
            <ul className="balances_list__list">
                {
                    findLastEntries(cropsHarvested)[0].map(crops => (
                        <EachCrops key={crops._id} crops={crops} />
                    ))
                }
                {
                    findLastEntries(cropsHarvested)[1].map(crops => (
                        <EachCrops key={crops._id} crops={crops} />
                    ))
                }
            </ul>
        </div>
    )
}
