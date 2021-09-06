const express = require('express')
const router = express.Router()
const { getBalance, addBalance, deleteBalance } = require('../controllers/balance')

router
    .route('/')
    .get(getBalance)
    .post(addBalance)

router
    .route('/:id')
    .delete(deleteBalance)

module.exports = router