const mongoose = require('mongoose')

// initializing a mongoose schema
const URLSchema = new mongoose.Schema({
    urlCode: String,
    longUrl: String,
    shortUrl: String,
    date: {
        type: String,
        default: Date.now
    }
})

module.exports = mongoose.model('Url', URLSchema)