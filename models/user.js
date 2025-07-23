const mongoose = require("mongoose");
const schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new schema({
    email : {
        type : String,
        required : true
    }
});

//!Adds fields (username, hash, salt) and helpful methods (register, authenticate, etc.) to your user schema so it can handle user authentication easily.
userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User" , userSchema);

