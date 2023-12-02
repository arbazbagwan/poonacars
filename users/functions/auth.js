var jwt = require("jsonwebtoken");

const { connectionToDatabase } = require('../helpers/connection');
const entity = require('../helpers/entity');
const users = require('../models/usermodel');

module.exports.signin = async (event) => {
    try {
        connectionToDatabase();
        const requestBody = JSON.parse(event.body);
        const {emails, password} = requestBody;
        const user = await users.findOne({emails});
        const { _id, firstName, lastName, email } = user;
        if (!user || !user.authenticate(password)) {
            return entity.sendResponse(500, "Wrong Email or Password!");
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEY);

        const response = {
            headers: {
                'Set-Cookie': `token=${token}; HttpOnly; Secure; SameSite=None; Max-Age=3600`,
                'Content-Type': 'application/json',
            },
            user: { token, user: { _id, firstName, lastName, email } },
        };

        return entity.sendResponse(200, response);
    } catch (err) {
        console.error('Error:', err);
        return entity.sendResponse(500, err);
    }
}

module.exports.authenticate = async (event) => {
    try {
        const authorizationHeader = event.headers.Authorization || event.headers.authorization || '';

        if (!authorizationHeader) {
            return { authenticated: false, message: 'No token provided.' };
        }

        const decoded = jwt.verify(authorizationHeader, process.env.JWT_SECRET_KEY);

        return { authenticated: true, userId: decoded.id };
    } catch (err) {
        console.error('Authentication error:', err);
        return { authenticated: false, message: 'Invalid token.' };
    }
};
