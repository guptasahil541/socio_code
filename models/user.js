const mongoose = require('mongoose');

//Creating a schema for users
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    }
},{
    //For getting user creation and editing dates
    timestamps: true
});

const User = mongoose.model('User', userSchema);

module.exports = User;