// //ceate a user model according to this schem User
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
},
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
    college: {
        type: String,
        required: true,
    },
    branch: {
        type: String,
        required: true,
    },
    year: {
        type: Number,
        required: true,
        min: 1,
        max: 5,

    },
    collegeIdImageUrl: {
        type: String,
        required: true,
    },
    verificationStatus: {
        type: String,
        enum: ["pending", "approved", "rejected"],
        default: "pending",
    },
    role: {
        type: String,
        enum: ["student", "admin"],
        default: "student",
    },
}, { timestamps: true });
const User = mongoose.model("User", userSchema);

module.exports = User;

