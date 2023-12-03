const entity = require('../helpers/entity');
const { authenticate, signin } = require('../functions/auth');

module.exports.signup = async (event) => {
    try {
        const requestBody = JSON.parse(event.body);
        const result = await entity.createUser(requestBody);
        return entity.sendResponse(200, result)
    } catch (error) {
        return { statusCode: 500, body: JSON.stringify({ message: error})}
    }
}

module.exports.signin = async (event) => {
  try {
      const requestBody = JSON.parse(event.body);
      const result = await entity.signin(requestBody);
      if(result.statusCode == 500){
        return entity.sendResponse(500, 'Wrong Email or Password!');
      }
      return entity.sendResponse(200, result);
  } catch (error) {
    return entity.sendResponse(500, error);
  }
}

module.exports.getone = async (event) => {
  const authResult = await authenticate(event);
    console.log(authResult)
  if (authResult.authenticated) {
    return { statusCode: 200, body: JSON.stringify({ message: 'Access granted.' }) };
  } else {
    return { statusCode: 401, body: JSON.stringify({ message: 'Unauthorized.' }) };
  }
};


