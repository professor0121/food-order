import express from "express";
import { testRazorpayConnection } from "../controllers/payment.controller.js";
// import { createPayment, verifyPayment } from "../controllers/payment.controller.js";
// import { isAuthenticated } from "../middleware/user.middleware.js";
const router = express.Router();

// Route to create a payment
// router.post("/create", isAuthenticated, createPayment);

// Route to verify a payment
// router.post("/verify", isAuthenticated, verifyPayment);

router.get("/test-razorpay-connection", testRazorpayConnection);

export default router;