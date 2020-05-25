const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    notes: [
        {
            note:{
                type: String
            }
        }
    ],
    tokens:[
        {
            token:{
                type: String
            }
        }
    ]
});

module.exports = mongoose.model('son',UserSchema);
