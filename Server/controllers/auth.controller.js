const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const UserModel = require('../models/user.model');

const userSignup = async (request, response) => {
    try {
        const { name, email, password, confirm_password } = request.body;
        if(!name || !email || !password || !confirm_password) {
            return response.status(400).send({ message: "All fields are required" });
        }
        if(password !== confirm_password) {
            return response.status(400).send({ message: "Password and confirm password must be same" });
        }
        const existingUser = await UserModel.findOne({ email });
        if(existingUser) {
            return response.status(400).send({ message: "Email already registered" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await UserModel.create({
            name,
            email,
            password: hashedPassword
        });
        if(!user) {
            return response.status(400).send({ message: "User not created" });
        }
        return response.status(201).send({ message: "User created successfully" });
    } catch (e) {
        console.log(e);
        return response.status(500).send({ message: e.message });
    }
}

const userLogin = async (request, response) => {
    try {
        const { email, password } = request.body;
        if(!email || !password) {
            return response.status(400).send({ message: "All fields are required" });
        }
        const user = await UserModel.findOne({ email });
        if(!user) {
            return response.status(400).send({ message: "User not found" });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid) {
            return response.status(400).send({ message: "Invalid password" });
        }
        const token = jwt.sign({ user_id: user._id }, process.env.JWT_SECRET, {
            expiresIn: 15 // seconds
        });
        return response.status(200).send({ message: "User logged in successfully", token });
    } catch (e) {
        console.log(e);
        return response.status(500).send({ message: e.message });
    }
}

module.exports = {
    userSignup,
    userLogin
}