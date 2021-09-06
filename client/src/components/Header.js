import React from 'react'
import { Link } from 'react-router-dom'
import { Logout } from './Logout'

export const Header = () => {

    return (
        <div className="header">
            <Link className='header__link' to='/' >
                <h2>
                    Crypto Observer
                </h2>
            </Link>
            <Logout />
        </div>
    )
}
