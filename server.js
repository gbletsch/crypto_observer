const cors = require('cors')
const express = require('express')
const session = require('express-session')
const dotenv = require('dotenv')
const colors = require('colors')
const morgan = require('morgan')
const connectDB = require('./config/db')
const path = require('path')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')

dotenv.config({
    path: './config/config.env'
})

connectDB()

const balance = require('./routes/balance')
const crops = require('./routes/crops')
const login = require('./routes/login')
const register = require('./routes/register')
const { getUser } = require('./controllers/user')

const app = express()
app.use(cors())
app.use(cookieParser())
app.use(express.json())
app.use(session({
    secret: 'Shhhh, its a secret...',
    resave: true,
    saveUninitialized: true
}))

const verifyJwt = (req, res, next) => {
    const bearer = req.headers['x-access-token']

    if (!bearer) {
        return res.status(200).json({
            success: false,
            error: "No token provided!"
        });
    }
    const token = bearer.split(' ')[1]

    jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
        if (err) {
            return res.json({
                success: false,
                error: "Unauthorized!"
            });
        }
        req.userId = decoded.id;
        next();
    });
}

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'client', 'build'))) // or 'client/build'
}

const baseUrl = '/api/v1'

app.get(`${baseUrl}/isUserAuth`, verifyJwt, (req, res, next) => {

    return res.status(200).json({
        success: true,
        data: 'authenticated'
    })
})

app.use(`${baseUrl}/user`, getUser)
app.use(`${baseUrl}/login`, login)
app.use(`${baseUrl}/register`, register)
app.use(`${baseUrl}/balance`, balance)
app.use(`${baseUrl}/crops`, crops)

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
})

const PORT = process.env.PORT || 5000

app.listen(
    PORT,
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold)
)

