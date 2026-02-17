const mongoose = require('mongoose');

const connect_db = async () => {
    try {
        const connected = await mongoose.connect(process.env.MONGODB_CONNECTION_STRING, {
            dbName: process.env.MONGODB_DATABASE_NAME
        })
        return console.log(`🔑 MongoDB: ${connected.connection.db.databaseName}`);
    } catch (e) {
        return process.exit(1);
    }
}

module.exports = connect_db;