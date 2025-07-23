import asyncHandler from "../utils/asyncHandler.js";
import { verifyToken } from "../utils/jsonWebToken.js";
import BlacklistToken from "../models/blacklistToken.model.js";
import { findAdminByEmail } from "../dao/admin.dao.js";

export const adminAuth = asyncHandler(async (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1] || req.cookies.token;
    const validateToken = await verifyToken(token);
    if (!validateToken) {
        return res.status(401).json({
            message: "Unauthorized"
        })
    }
    const isBlacklisted = await BlacklistToken.findOne({ token });
    if (isBlacklisted) {
        return res.status(401).json({
            message: "Unauthorized"
        })
    }
    const admin = await findAdminByEmail(validateToken.email)
    req.admin = admin;
    next();
})