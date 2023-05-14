let mongoose = require('mongoose');

//The schema for the user stored in mongoose
let userSchema = new mongoose.Schema({
    username: String,
    password: String,
    createdAt: Date,
});

//Export of the UserSchema
module.exports = new mongoose.model('User',userSchema);