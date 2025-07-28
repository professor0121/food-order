import razorpay from 'razorpay';
import { ENV } from './env.js';


console.log("Razorpay Key ID:", ENV.RAZORPAY_KEY_ID);
console.log("Razorpay Key Secret:", ENV.RAZORPAY_KEY_SECRET);
const instance = new razorpay({
  key_id: ENV.RAZORPAY_KEY_ID,
  key_secret: ENV.RAZORPAY_KEY_SECRET,
});

export default instance;
// This file configures Razorpay for payment processing in the application.
// It exports an instance of Razorpay initialized with the key ID and secret from environment variables.