var jwt = require("jsonwebtoken");

module.exports.authenticate = async (event) => {
    try {
        const authorizationHeader = event.headers.Authorization || event.headers.authorization || '';

        if (!authorizationHeader) {
            return { authenticated: false, message: 'No token provided.' };
        }

        const decoded = jwt.verify(authorizationHeader, process.env.JWT_SECRET_KEY);
        console.log(decoded)
        return { authenticated: true, userId: decoded.id };
    } catch (err) {
        console.error('Authentication error:', err);
        return { authenticated: false, message: 'Invalid token.' };
    }
};
