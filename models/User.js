const mongoose = require('mongoose');

let validateEmail = function (email) {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
};

const userSchema = new mongoose.Schema(
    {
    username: {
        type: String,
        unique: true,
        required: true,
        trimmed: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
        validate: [validateEmail, "Please enter a valid email address."],
    },

    thoughts: [{ type: mongoose.Types.ObjectId, ref: "thoughts" }],
    friends: [{ type: mongoose.Types.ObjectId, ref: "users" }],
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

userSchema
    .virtual('friendCount')
    .get(function(){
        return this.friends.length;
    });
    

const User = mongoose.model("users", userSchema);

module.exports = User; 