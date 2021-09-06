const express = require('express')
const router = express.Router()
const { getCrops, addCrops, deleteCrops } = require('../controllers/crops')

router
    .route('/')
    .get(getCrops)
    .post(addCrops)

router
    .route('/:id')
    .delete(deleteCrops)

module.exports = router