const mongoose = require('mongoose')

const dbConnection = () => {
    // connect with db
    mongoose.connect(process.env.DB_URI)
        .then(connection => {
            console.log(`database connected: ${connection.connection.host}`)
        })
        .catch(err => {
            console.log(`database error: ${err}`)
            process.exit(1)
        })
}

module.exports = dbConnection