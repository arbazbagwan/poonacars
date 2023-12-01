const { connectionToDatabase } = require('../helpers/connection');
const UserModel = require('../models/usermodel');

module.exports.createRecord = async (user) => {
    try {

        connectionToDatabase().then((data, error)=>{
            if(error){
                return this.sendResponse(500, error);
            }
            console.log('Database connected successfully.');
        }).catch((error)=>{
            this.sendResponse(500, error);
        })

        const User = new UserModel(user);
        const res = await User.save();
        return res;

    } catch (error) {
        this.sendResponse(500, 'Some Error Occured!');
    }

}

module.exports.sendResponse = async (status, data) => {
    return { statusCode: status, body: JSON.stringify({ data: data }) }
}