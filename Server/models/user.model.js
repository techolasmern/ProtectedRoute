const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    otp: {
        value: {
            type: Number
        },
        expire: {
            type: Number
        },
        cooldown: {
            type: Number
        }
    }
}, {
    timestamps: true
});

const UserModel = mongoose.model("User", schema);

module.exports = UserModel;
