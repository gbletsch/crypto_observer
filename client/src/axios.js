import axios from 'axios'

const client = axios.create({
    baseURL: '/api/v1', // 'http://localhost:5000/api/v1/',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    }
})

export default client