const { authenticate } = require('../functions/auth');
const {sendResponse, create} = require('../helpers/entity');

module.exports.add_car = async (event) => {
    try {
        const requestBody = JSON.parse(event.body);
        const authResult = await authenticate(event);
        if (authResult.authenticated) {
            const result = await create(requestBody);
            console.log(requestBody);
            console.log(result);

            return sendResponse(200, result, "Car Created Sucessfully");
        } else {
            return { statusCode: 401, body: JSON.stringify({ message: 'Unauthorized.' }) };
        }
    } catch (error) {
        return sendResponse(500, error, "Error While Adding Car");
    }
}