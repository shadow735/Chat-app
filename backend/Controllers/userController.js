const express = require("express");
const UserModel = require("../models/userModel.js");
const expressAsyncHandler = require("express-async-handler");
const generateToken = require("../config/generateToken.js");

const loginController = expressAsyncHandler(async (req, res) => {
    console.log(req.body);
    const { name, password } = req.body;

    try {
        const user = await UserModel.findOne({ name });

        console.log("Fetched user data", user);

        if (user && typeof user.matchPassword === 'function' && (await user.matchPassword(password))) {
            const response = {
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                token: generateToken(user._id),
            };

            console.log(response);
            res.json(response);
        } else {
            res.status(400);
            throw new Error("Invalid UserName or Password Error");
        }
    } catch (error) {
        console.error("Error in loginController:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});



const registerController = expressAsyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        res.sendStatus(400); // Corrected to res.sendStatus(400)
        throw new Error("All necessary input fields have not been filled");
    }

    // Check if user already exists with the provided email or name
    const userExist = await UserModel.findOne({ $or: [{ email }, { name }] });

    if (userExist) {
        if (userExist.email === email) {
            throw new Error("User with this email already exists");
        }
        if (userExist.name === name) {
            throw new Error("User with this username already exists");
        }
    }

    // Create a new user
    const user = await UserModel.create({ name, email, password });
    if (user) {
        res.status(201).json({
            _id : user._id,
            name : user.name,
            email : user.email,
            isAdmin : user.isAdmin,
            token : generateToken(user._id),

        });
    }
    else {
        res.status(400);
        throw new Error ("Registration Error")
    }

    // Send a success response
    res.status(201).json({ message: "User registered successfully", user });
});

module.exports = { loginController, registerController };
