const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Successfully connect to database 👍');

    } catch (error) {
        console.error(`ERROR : ${error.message}`);
        process.exit(1);
    }
}

module.exports = connectDB;