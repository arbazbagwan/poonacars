const entity = require('../helpers/entity');
const { authenticate } = require('../functions/auth');

module.exports.signup = async (event) => {
    try {
        const requestBody = JSON.parse(event.body);
        const name = requestBody.name;
        const email = requestBody.email;
        const password = requestBody.password;
        const result = await entity.create({name, email, password});
        return entity.sendResponse(200, result, "User Created Sucessfully");
    } catch (error) {
      return entity.sendResponse(500, error, "Error While Creating User");
    }
}

module.exports.signin = async (event) => {
  try {
      const requestBody = JSON.parse(event.body);
      const result = await entity.signin(requestBody);
      console.log(result)
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

module.exports.getall = async (event) => {
    return { statusCode: 200, body: JSON.stringify({ message: 'Hello SL.' }) };
};


