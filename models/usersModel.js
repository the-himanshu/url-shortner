const mongoose = require('mongoose')

// initializing a mongoose schema
const UsersSchema = new mongoose.Schema({
    email: String,
    password: String,
    username: String,
    createdAt: {
        type: String,
        default: Date.now
    }
})

module.exports = mongoose.model('user', UsersSchema)