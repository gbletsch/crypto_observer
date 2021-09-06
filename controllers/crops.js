const Crops = require('../models/Crops')

// @desc Get all crops data
// @route GET /api/v1/balance
// @access Public
exports.getCrops = async (req, res, next) => {
    try {
        const filter = {}
        const crops = await Crops.find(filter)

        return res
            .status(200)
            .json({
                success: true,
                count: crops.length,
                data: crops
            })
    } catch (error) {
        return res
            .status(500)
            .json({
                success: false,
                error: 'Error retrieving crops data'
            })
    }
}

// @desc Add crops
// @route POST /api/v1/crops
// @access Public
exports.addCrops = async (req, res, next) => {
    try {
        // const { symbol, amount, description } = req.body
        const cr = await Crops.create(req.body)

        return res
            .status(201)
            .json({
                success: true,
                data: cr
            })

    } catch (error) {
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(val => val.message)

            return res
                .status(400)
                .json({
                    success: false,
                    error: messages
                })
        }

        return res
            .status(500)
            .json({
                success: false,
                error: 'could not creatre new crops entry'
            })

    }
}

// @desc Delete crops
// @route DELETE /api/v1/crops/:id
// @access Public
exports.deleteCrops = async (req, res, next) => {
    try {
        const cr = await Crops.findById(req.params.id)
        if (!cr) {
            return res
                .status(404)
                .json({
                    success: false,
                    error: 'entry not found'
                })
        }
        await cr.remove()

        return res
            .status(200)
            .json({
                success: true,
                data: cr
            })
    } catch (error) {
        return res
            .status(500)
            .json({
                success: false,
                error: 'could not delete crops entry'
            })
    }
}
