import express from "express";
import { registerAdmin ,loginAdmin,logoutAdmin, getAdminProfile,getAllUsers } from "../controllers/admin.controller.js";
import { adminAuth } from "../middleware/admin.middleware.js";

const route = express.Router();

route.post('/register', registerAdmin);
route.post('/login', loginAdmin);
route.get('/logout',adminAuth,logoutAdmin);
route.get('/profile',adminAuth,getAdminProfile);

route.get('/all-users',adminAuth,getAllUsers);


export default route;