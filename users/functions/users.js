const entity = require('../helpers/entity');
const { authenticate } = require('../functions/auth');

module.exports.create = async (event) => {
    try {
        const requestBody = JSON.parse(event.body);
        const result = await entity.createRecord(requestBody);
        return entity.sendResponse(200, result)
    } catch (error) {
        return { statusCode: 500, body: JSON.stringify({ message: error})}
    }
}


module.exports.getOne = async (event) => {
  const authResult = await authenticate(event);
    console.log(authResult)
  if (authResult.authenticated) {
    return { statusCode: 200, body: JSON.stringify({ message: 'Access granted.' }) };
  } else {
    return { statusCode: 401, body: JSON.stringify({ message: 'Unauthorized.' }) };
  }
};


