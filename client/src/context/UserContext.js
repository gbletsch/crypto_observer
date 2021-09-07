import React, { createContext, useState, useEffect } from 'react'
import { client } from '../axios'

export const UserContext = createContext()

const UserContextProvider = (props) => {
    const [user, setUser] = useState({})

    useEffect(() => {
        client.get('user')
            .then(response => {
                if (!response.data.success) {
                    setUser({})
                }
                setUser(response.data.data)
            })
            .catch(error => console.log(error))
    }, [])

    // TODO: implement addUser and deleteUser


    return (
        <UserContext.Provider value={{ user, setUser }}>
            {props.children}
        </UserContext.Provider>
    )
}

export default UserContextProvider
