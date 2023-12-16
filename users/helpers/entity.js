const { connectionToDatabase } = require('../helpers/connection');
const user = require('../models/user');
var jwt = require("jsonwebtoken");

module.exports.create = async (data) => {
    try {
        await connectionToDatabase();
        const users = new user(data);
        const res = await users.save();
        const { name, email } = res;
        return { statusCode: 200, body: name, email };
    } catch (error) {
        this.sendResponse(500, error, 'Some Error Occured!');
    }
}

module.exports.signin = async (data) => {
    try {
        connectionToDatabase().then((data, error) => {
            if (error) {
                return this.sendResponse(500, error);
            }
        }).catch((error) => {
            this.sendResponse(500, error);
        });
        const { email, password } = data;
        const users = await user.findOne({ email });
        const { role } = users;
        if (!users) {
            return this.sendResponse(500, "Wrong Email!");
        }

        if (!users.authenticate(password)) {
            return this.sendResponse(500, "Wrong Password!");
        }

        const token = jwt.sign({ id: users.id }, process.env.JWT_SECRET_KEY, { expiresIn: '11h' });
        const response = { token, email, role };

        return response;

    } catch (err) {
        console.error('Error:', err);
        return this.sendResponse(500, err);
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
