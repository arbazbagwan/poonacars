const { connectionToDatabase } = require('../helpers/connection');
const users = require('../models/user');
var jwt = require("jsonwebtoken");

module.exports.createUser = async (user) => {
    try {
        connectionToDatabase().then((data, error) => {
            if (error) {
                return this.sendResponse(500, error);
            }
        }).catch((error) => {
            this.sendResponse(500, error);
        });
        const User = new users(user);
        const res = await User.save();
        return res;
    } catch (error) {
        this.sendResponse(500, 'Some Error Occured!');
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
        const {email, password} = data;
        const user = await users.findOne({email});
        if (!user) {
            return {statusCode: 500, data:"Wrong Email!"};
        }

        if(!user.authenticate(password)){
            return {statusCode: 500, data:"Wrong Password!"};
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEY, { expiresIn: '11h' });
        const response = {
            token,
            user
        };

        return response;

    } catch (err) {
        console.error('Error:', err);
        return entity.sendResponse(500, err);
    }
}

module.exports.sendResponse = async (status, data) => {
    return { statusCode: status, body: JSON.stringify({ data: data }) }
}
