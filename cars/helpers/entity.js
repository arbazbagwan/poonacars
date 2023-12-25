const {connectionToDatabase} = require('../helpers/connection');
const car = require('../models/cars');

module.exports.create = async (data) => {
    try {
        await connectionToDatabase();
        const cars = new car(data);
        const res = await cars.save();
        console.log(res)
        return { statusCode: 200, body: res };
    } catch (error) {
        this.sendResponse(500, error, 'Some Error Occured!');
    }
}

module.exports.sendResponse = async (status, data, message) => {
    return {
        statusCode: status,
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, DELETE',
            'Access-Control-Allow-Headers': 'Content-Type',
        },
        body: JSON.stringify({
            status: status == 200 ? "success" : "failed",
            message: message ? message : '',
            data: data,
        })
    }
}
