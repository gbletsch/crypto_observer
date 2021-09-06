import React, { useContext, useState } from 'react'
import client from '../axios'
import { useHistory } from 'react-router-dom'
import UserContext from '../context/User'

const loginUser = async (credentials) => {
    try {
        const config = {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
            }
        }
        const response = await client.post('login', credentials, config)
        return response.data

    } catch (error) {
        console.log(error)
    }
}

export const Login = () => {
    const history = useHistory()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const user = useContext(UserContext)

    const handleSubmit = async (e) => {
        e.preventDefault()
        const data = await loginUser({
            email,
            password
        })

        if (!data.success) {
            alert('Ops, wrong credentials')
            return
        }

        user.setEmail(data.user.email)

        localStorage.setItem('token', 'Bearer ' + data.token)
        history.push('/')
    }

    return (
        <div className='login'>
            <h3>Please Log In</h3>
            <form>
                <label className='login__form__label' htmlFor='email'>
                    Email
                </label>
                <input
                    className='login__form__input'
                    type="email"
                    name="email"
                    id="email"
                    onChange={e => setEmail(e.target.value)}
                    value={email}
                />
                <label className='login__form__label' htmlFor="password">
                    Password
                </label>
                <input
                    className='login__form__input'
                    type="password"
                    name="password"
                    id="password"
                    onChange={e => setPassword(e.target.value)}
                    value={password}
                />
                <div>
                    <button
                        className='login__form__button'
                        type='submit'
                        onClick={e => handleSubmit(e)}
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>
    )
}
