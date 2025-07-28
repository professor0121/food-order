// middlewares/razorpayConnectionCheck.js
import razorpayInstance from "../config/razorpay.config.js"

const razorpayConnectionCheck = async (req, res, next) => {
  try {
    // Try to fetch a small list of orders to test connection
    await razorpayInstance.orders.all({ count: 1 })
    console.log("✅ Razorpay connection successful")
    next()
  } catch (error) {
    console.error("❌ Razorpay connection failed:", error.message)
    return res.status(503).json({
      success: false,
      message: "Razorpay service unavailable",
      error: error.message,
    })
  }
}

export default razorpayConnectionCheck
