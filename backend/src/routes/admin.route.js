import express from "express";
import { registerAdmin ,loginAdmin,logoutAdmin, getAdminProfile, } from "../controllers/admin.controller.js";
import { adminAuth } from "../middleware/admin.middleware.js";

const route = express.Router();

route.post('/auth/register', registerAdmin);
route.post('/auth/login', loginAdmin);
route.get('/logout',adminAuth,logoutAdmin);
route.get('/profile',adminAuth,getAdminProfile);


export default route;