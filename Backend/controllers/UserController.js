const userModel = require("../models/userSchema");
const bcrypt = require('bcrypt');

const registerUser = async (req, res) => {
    try {
        const userExists = await userModel.findOne({ email: req?.body?.email });

        if (userExists) {
            return res.send({
                success: false,
                message: "User Already Exists",
            });
        }

        // hashing the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req?.body?.password, salt);
        req.body.password = hashedPassword;

        const newUser = new userModel(req?.body);
        await newUser.save();

        res.send({
            success: true,
            message: "Registration Success, Please Login",
        });
    } catch (error) {
        console.log(error);
    }
};

const loginUser = async (req, res) => {
    try {
        const user = await userModel.findOne({ email: req?.body?.email });

        if (!user) {
            return res.send({
                success: false,
                message: "User does not exist. Please register",
            });
        }

        const validatePassword = await bcrypt.compare(req?.body?.password, user.password);


        if (!validatePassword) {
            return res.send({
                success: false,
                message: "Please enter valid password",
            });
        }

        res.send({
            success: true,
            message: "You've Successfully Logged In",
        });
    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    registerUser,
    loginUser,
};