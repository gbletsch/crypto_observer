const Balance = require('../models/Balance')

// @desc Get all balance data
// @route GET /api/v1/balance
// @access Public
exports.getBalance = async (req, res, next) => {
    try {
        const filter = {}
        const balance = await Balance.find(filter)

        return res
            .status(200)
            .json({
                success: true,
                count: balance.length,
                data: balance
            })
    } catch (error) {
        return res
            .status(500)
            .json({
                success: false,
                error: 'Error retrieving balance data'
            })
    }
}

// @desc Add balance
// @route POST /api/v1/balance
// @access Public
exports.addBalance = async (req, res, next) => {
    try {
        const { symbol, amount, description } = req.body


        const bal = await Balance.create(req.body)

        return res
            .status(201)
            .json({
                success: true,
                data: bal
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
                error: 'could not creatre new balance entry'
            })

    }
}

// @desc Delete balance
// @route DELETE /api/v1/balance/:id
// @access Public
exports.deleteBalance = async (req, res, next) => {
    try {
        const bal = await Balance.findById(req.params.id)
        if (!bal) {
            return res
                .status(404)
                .json({
                    success: false,
                    error: 'entry not found'
                })
        }
        await bal.remove()

        return res
            .status(200)
            .json({
                success: true,
                data: bal
            })
    } catch (error) {
        return res
            .status(500)
            .json({
                success: false,
                error
            })
    }
}
