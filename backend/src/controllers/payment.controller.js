import asyncHandler from "../utils/asyncHandler.js";

export const testRazorpayConnection = asyncHandler(async (req, res) => {
  try {
    // Try listing orders to test if keys work
    const orders = await razorpayInstance.orders.all({ count: 1 })
    res.status(200).json({ success: true, message: "Razorpay connected!", orders })
  } catch (error) {
    res.status(500).json({ success: false, message: "Connection failed", error: error.message })
  }
})

// export const createPayment=asyncHandler(async (req, res) => {
//   const { amount, currency } = req.body;

//   // Here you would typically create a payment using a payment gateway like Razorpay
//   // For demonstration, we will return a mock payment object
//   const payment = {
//     id: "pay_123456789",
//     amount,
//     currency,
//     status: "created",
//   };

//   res.status(200).json({
//     success: true,
//     data: payment,
//   });
// });


// export const verifyPayment = asyncHandler(async (req, res) => {
//   const { paymentId, signature } = req.body;

//   // Here you would typically verify the payment using a payment gateway like Razorpay
//   // For demonstration, we will assume the verification is successful
//   const isVerified = true; // This should be replaced with actual verification logic

//   if (isVerified) {
//     res.status(200).json({
//       success: true,
//       message: "Payment verified successfully",
//       data: { paymentId, status: "verified" },
//     });
//   } else {
//     res.status(400).json({
//       success: false,
//       message: "Payment verification failed",
//     });
//   }     
// });