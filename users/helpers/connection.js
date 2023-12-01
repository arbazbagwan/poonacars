require("dotenv").config();
const mongoose = require('mongoose');

module.exports.connectionToDatabase = async (event, context) => {
    return new Promise(async (resolve, reject) => {
        try {
            mongoose.connect(process.env.MONGODB_URL)
                .then(() => {
                    console.log("Database connected successfully.");
                    resolve(true);
                })
                .catch((error) => {
                    console.error(`Error connecting to the database: ${error}`);
                    reject(false);
                });
        }
        catch (error) {
            console.error(`Error connecting to the database: ${error}`);
            reject(false);
        }
    })
}