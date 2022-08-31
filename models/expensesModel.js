const mongoose = require('mongoose')

// initializing a mongoose schema
const ExpensesSchema = new mongoose.Schema({
    userId: String,
    title: String,
    cost: Number,
    date: {
        type: String,
        default: Date.now
    }
})

module.exports = mongoose.model('expenses', ExpensesSchema)