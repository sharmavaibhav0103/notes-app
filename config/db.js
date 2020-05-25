const mongoose = require('mongoose');
const config = require('config');

const connectDB = async() => {
    try{
        await mongoose.connect(config.get('mongoURI'),{
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true
        },() => console.log('Connected To Database!'))
    }
    catch(err){
        console.log(err.message);
    }
}

module.exports = connectDB;