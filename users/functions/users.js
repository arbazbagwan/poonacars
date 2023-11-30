const { connectiontodb } = require('../helpers/connection');

module.exports.create = async () => {
    try {
        if (!await connectiontodb()) {
            return { statusCode: 500, body: JSON.stringify({ message: "Error", },), }
        }
        return { statusCode: 200, body: JSON.stringify( { message: "Go SL", }, ), }

    } catch (error) {
        return { statusCode: 500, body: JSON.stringify( { message: error, }, ), }
    }

}