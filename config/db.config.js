// importing the mongoose package
const mongoose = require('mongoose')

// declare a Database string URI
const DB_URI = process.env.MONGO_URIconsole.log("🚀 ~ file: db.config.js ~ line 6 ~ DB_URI", DB_URI)

// creating a database connection
mongoose.connect(DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const connection = mongoose.connection
module.exports = connection