const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const connectDB = async () => {
    console.log(process.env.MONGODB_URL)
    try {
        const connectionInstance = await mongoose.connect((`${process.env.MONGODB_URL}`))
        console.log(`\n MongoDB Connected Successfully \n DB Host : ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log("error from db.js file \n Error in MongoDB : ",error);
        process.exit(1);
    }
}

module.exports = connectDB;