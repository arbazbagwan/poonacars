const entity = require('../helpers/entity');

module.exports.create = async (event) => {
    try {
        const requestBody = JSON.parse(event.body);
        const result = await entity.createRecord(requestBody);
        return entity.sendResponse(200, result)

    } catch (error) {
        console.log(error)
        return { statusCode: 500, body: JSON.stringify({ message: error})}
    }

}