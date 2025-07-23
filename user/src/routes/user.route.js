import { Router } from "express";
import {
    registerUser,
    loginUser,
    userProfile,
    logoutUser,
} from "../controllers/user.controller.js";
import { isAuthenticated } from "../middleware/user.middleware.js";

const router = Router()

router.post("/register", registerUser);
router.post('/login', loginUser)
router.get("/profile",isAuthenticated,userProfile)
router.post('/logout', isAuthenticated, logoutUser);

export default router