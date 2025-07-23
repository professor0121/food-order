import asyncHandler from "../utils/asyncHandler.js";
import { findUserByEmail } from "../dao/user.dao.js";
import { createNewUser } from "../services/user.service.js";
import {cookieOptions} from "../config/cookie.config.js";
import { comparePassword } from "../utils/bcrypt.js";
import { signToken } from "../utils/jsonWebToken.js";
import  BlacklistToken  from "../models/blacklistToken.model.js";

export const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
        console.log("resdkfjkdfjkdjfkd",req.body);
    if(!name || !email || !password) {
        return res.status(400).json({ message: "all fields are required" })
    }

    const user = await findUserByEmail(email);

    if (user) {
        return res.status(400).json({ message: "user already exist" })
    }

    const {newUser, token }=await createNewUser({ name, email, password });
    res.status(201).json({newUser,token, message: "user created successfully" })

})


export const loginUser = asyncHandler(async (req, res) => {
    const{email,password} = req.body;
    if(!email || !password){
        return res.status(400).json({message:"all fields are required"})
    }
    const user = await findUserByEmail(email);
    if(!user){
        return res.status(400).json({message:"user does not exist"})
    }
    const compairPass=await comparePassword(password,user.password);
    if(!compairPass){
        return res.status(400).json({message:"invalid credentials"})
    }
    const token = await signToken(user.email);
    res.cookie("token", token, cookieOptions)
    res.status(200).json({user,token, message: "user logged in successfully"})
})

export const userProfile = asyncHandler(async (req, res) => {
  const { email } = req.user; // extract email
  const user = await findUserByEmail(email);
  res.status(200).json({
    message: 'User profile fetched successfully',
    user:user
  });
});


export const logoutUser = asyncHandler(async (req, res) => {
  const token =
    req.cookies.token || req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(400).json({ message: "No token provided" });
  }

  // Save token to blacklist
  await BlacklistToken.create({ token });

  // Clear cookie if using cookies
  res.clearCookie("token");

  res.status(200).json({ message: "Logged out successfully" });
});