const mongoose = require('mongoose')

const CropsSchema = new mongoose.Schema({
    symbol: {
        type: String,
        trim: true,
        required: [true, 'Please add the coin symbol']
    },
    amount: {
        type: Number,
        required: [true, 'Please add a valid amount']
    },
    description: {
        type: String,
        trim: true,
        required: [true, 'Please add some description']
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Crops', CropsSchema)
