import React, { useContext } from 'react'
import { Link, useHistory, Redirect } from 'react-router-dom'
import UserContext from '../context/User'
export const Logout = () => {
    const history = useHistory()
    const user = useContext(UserContext)

    const handleClick = (e) => {
        user.setEmail('')
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
