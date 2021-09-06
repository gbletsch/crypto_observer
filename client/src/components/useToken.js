import { useState } from "react";

export default function useToken() {
    const getToken = () => {
        const tokenString = localStorage.getItem('crypto-observer-token')
        const userToken = JSON.parse(tokenString)
        return userToken?.token
    }

    const [token, setToken] = useState(getToken())

    const saveToken = (userToken) => {
        localStorage.setItem('crypto-observer-token', JSON.stringify(userToken))
        setToken(userToken.token)
    }

    return {
        setToken: saveToken,
        token
    }
}