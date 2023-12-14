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
        if (!users) {
            return { statusCode: 500, data: "Wrong Email!" };
        }

        if (!users.authenticate(password)) {
            return { statusCode: 500, data: "Wrong Password!" };
        }

        const token = jwt.sign({ id: users.id }, process.env.JWT_SECRET_KEY, { expiresIn: '11h' });
        const response = { token, email };

        return response;

    } catch (err) {
        console.error('Error:', err);
        return entity.sendResponse(500, err);
    }
}

module.exports.sendResponse = async (status, data, message) => {
    return {
        statusCode: status,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            status: status == 200 ? "success" : "failed",
            message: message ? message : '',
            data: data,
        })
    }
}
