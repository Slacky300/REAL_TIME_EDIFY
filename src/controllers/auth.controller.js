import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {sendVerificationEmail, generateverificationToken} from "../utils/email.js"
import {successFullVerification} from "../utils/emailTemplate.js"


export const me = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        res.status(200).json({user});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const register = async (req, res) => {

    try{
        const {username, email, password} = req.body;
        const existingUser = await User.findOne({email});
        if(existingUser) return res.status(400).json({message: `User with email ${email} already exists`});
        const doesUsernameExists = await User.findOne({username});
        if(doesUsernameExists) return res.status(400).json({message: `Username ${username} already exists`});
        const hashedPassword = await bcrypt.hash(password, 12);
        const verificationToken = generateverificationToken(email);
        await sendVerificationEmail(email.toLowerCase(), verificationToken, username);
        const result = await User.create({email, password: hashedPassword, username, verificationToken});
        res.status(201).json({user: result, message: `Verification email has been sent to ${email}`});
    }catch(error){
        res.status(500).json({message: error.message});
    }

}


export const verifyemail = async (req, res) => {
    try {
        const tokenId = req.params.tokenId;
        const user = await User.findOne({ verificationToken: tokenId });

        if (!user) {
            return res.status(404).json({ error: 'Invalid verification token.' });
        }

        user.isVerified = true;
        user.verificationToken = null;
        await user.save();

        const congratulationContent = successFullVerification(user.username);

        res.send(congratulationContent);

    } catch (error) {
        res.status(500).json({ error: 'An error occurred during email verification.' });
        console.log(error);
    }
};

export const login = async (req, res) => {

    try{
        const {email, password} = req.body;
        const existingUser = await User.findOne({email});
        if(!existingUser) return res.status(404).json({message: "User doesn't exist"});
        if(!existingUser.isVerified) return res.status(400).json({message: `Please verify your ${email} first`});
        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
        if(!isPasswordCorrect) return res.status(400).json({message: "Invalid credentials"});
        const token = jwt.sign({email: existingUser.email, id: existingUser._id}, process.env.JWT_SECRET, {expiresIn: "1h"});
        res.status(200).json({user: existingUser, token: token, message: "Logged in successfully"});
    }catch(error){
        res.status(500).json({message: error.message});
    }

}

export const getUsers = async (req, res) => {
    try{
        const users = await User.find();
        res.status(200).json(users);
    }catch(error){
        res.status(500).json({message: error.message});
    }
}
