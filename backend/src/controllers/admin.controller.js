import { registerAdminService,loginAdminService,getAllUsersService } from "../services/admin.service.js";
import asyncHandler from "../utils/asyncHandler.js";
import { cookieOptions } from "../config/cookie.config.js";
import {signToken} from "../utils/jsonWebToken.js";

export const registerAdmin = asyncHandler(async (req, res) => {
  const {admin,token} = await registerAdminService(req.body);
  res.status(201).json({
    success: true,
    message: "Admin registered successfully",
    admin,
    token
  });
});


export const loginAdmin =asyncHandler(async(req,res)=>{
  const {admin,token} = await loginAdminService(req.body);
  res.cookie("token",token,cookieOptions);
  res.status(200).json({
    success: true,
    message: "Admin logged in successfully",
    admin,
    token
  });
});

export const logoutAdmin = asyncHandler(async (req, res) => {
  res.cookie("token", null, cookieOptions);
  res.status(200).json({
    success: true,
    message: "Admin logged out successfully",
  });
});

export const getAdminProfile = asyncHandler(async (req, res) => {
  const token = await signToken(req.admin.eamil);
  delete req.admin._doc.password;
  res.status(200).json({
    success: true,
    message: "Admin profile fetched successfully",
    admin: req.admin,
    token
  });
});

export const getAllUsers = asyncHandler(async (req, res) => {
  const users = await getAllUsersService();
  res.status(200).json({
    success: true,
    message: "Users fetched successfully",
    users,
  });
});