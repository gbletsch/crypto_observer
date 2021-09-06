const bcrypt = require("bcrypt");
const User = require('../models/Users');
const jwt = require("jsonwebtoken");
const colors = require('colors')

const defaultErrorPayload = {
    success: false,
    error: "Unauthenticated"
}

function setPassword(value) {
    return bcrypt.hashSync(value, 10);
}

function generateJwt(id) {
    const token = jwt.sign(
        { id },
        process.env.JWT_KEY,
        { expiresIn: "24h" },
    )
    return token
}

// @desc register new user
// @route POST api/v1/register
// @access public
async function register(req, res, next) {
    try {
        const { email, password } = req.body;

        const existUser = await User.findOne({
            email
        })

        if (existUser) {
            return res.json({
                success: false,
                error: 'email already exists'
            })
        }

        const user = await User.create({
            email,
            password: setPassword(password)
        });

        const id = user._id.toString()
        const token = generateJwt(id)

        res
            .cookie('token', token)
            .json({
                success: true,
                user: {
                    email: user.email
                },
            }
            );
    } catch (error) {
        return res
            .status(500)
            .json({
                success: false,
                error: 'server error'
            })
    }
}

// @desc get user from cookie token
// @route GET /api/v1/user
// @access logged users
function getUser(req, res, next) {
    const token = req.cookies.token

    if (!token) {
        return res.json({
            success: false,
            error: 'do not have token'
        })
    }

    const payload = jwt.verify(token, process.env.JWT_KEY)

    User.findById(payload.id)
        .then(user => {
            if (!user) {
                return res.json({
                    success: false,
                    error: 'user not found'
                })
            }
            return res.json({
                success: true,
                user: { email: user.email }
            })
        })
        .catch(error => {
            console.log('Error on getUser', error)
            return res
                .status(500)
                .json({
                    success: false,
                    error: 'server error'
                })
        })
}

// @desc login user
// @route POST api/v1/login
// @access public
async function login(req, res, next) {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({
            email
        });

        if (!user) {
            return res.json(defaultErrorPayload)
        }

        if (bcrypt.compareSync(password, user.password)) {
            req.session.user = user

            const id = user._id.toString()
            const token = generateJwt(id)

            res
                .cookie('token', token)
                .json({
                    success: true,
                    user: {
                        email: user.email
                    },
                    token,
                });
        } else {
            return res.json(defaultErrorPayload);
        }
    } catch (error) {
        return res
            .status(500)
            .json({
                success: false,
                error: 'server error'
            })
    }
}

module.exports = {
    register,
    login,
    getUser
}