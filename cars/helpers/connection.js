require("dotenv").config();
const mongoose = require('mongoose');

module.exports.connectionToDatabase = async (event, context) => {
    return new Promise(async (resolve, reject) => {
        try {
            await mongoose.connect(process.env.MONGODB_URL);
            console.log("Database connected successfully.");
            resolve(true);
        }
        catch (error) {
            console.log(`Error connecting to the database: ${error}`);
            reject(false);
        }
    })
}