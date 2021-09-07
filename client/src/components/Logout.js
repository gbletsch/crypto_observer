import React from 'react'
import { useHistory } from 'react-router-dom'

export const Logout = () => {
    const history = useHistory()

    const handleClick = (e) => {
        document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        history.push('/login')
    }

    return (
        <button
            className='logout__button header__link'
            onClick={(e) => handleClick(e)}
        >
            <h2>Logout</h2>
        </button>
    )
}
