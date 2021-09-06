import axios from 'axios'

const client = axios.create({
    baseURL: '/api/v1', // 'http://localhost:5000/api/v1/',
    withCredentials: true
})

export default client