import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import UserContext from '../context/User'
import { Logout } from './Logout'

export const Header = () => {

    const user = useContext(UserContext)

    return (
        <div className="header">
            <Link className='header__link' to='/' >
                <h2>
                    Crypto Observer
                </h2>
            </Link>

            {
                user.email ? <Logout />
                    : (
                        <Link className='header__link' to='/login'>
                            <h2>Login</h2>
                        </Link>
                    )

            }

            {/*
            <Link className='header__link' to='/register'>
                <h2>Register</h2>
            </Link>
            */}
        </div>
    )
}
