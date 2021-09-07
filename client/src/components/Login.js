import React, { useContext, useState } from 'react'
import { client } from '../axios'
import { UserContext } from '../context/UserContext'
import { useHistory } from 'react-router-dom'

export const Login = () => {
    const { setUser } = useContext(UserContext)
    const history = useHistory()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()

        client.post('login', { email, password })
            .then(response => {
                if (!response.data.success) {
                    alert('unauthorized')
                    history.push('/login')
                } else {
                    setUser(response.data.data)
                    history.push('/')
                }
            })
            .catch(error => console.log(error))

        /*if (!data.success) {
            alert('Ops, wrong credentials')
            return
        }

        user.setEmail(data.user.email)

        localStorage.setItem('token', 'Bearer ' + data.token)*/
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
