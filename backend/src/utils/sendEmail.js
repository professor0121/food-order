import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import {ENV} from '../config/env.js';

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com', 
  port:465,
  secure:true,
  auth: {
    user: 'abhishekak.madquick@gmail.com',
    pass: 'joesbrxzmvmlbacp',
  },
});

/**
 * Send OTP to user's email for verification
 * @param {string} to - recipient email
 * @param {string} otp - One Time Password
 */
export const sendVerificationOtp = async (to, otp) => {
  const mailOptions = {
    from: `"MyApp" <abhishekak.madquick@gmail.com>`,
    to,
    subject: '🔐 Email Verification - OTP Inside',
    html: `
      <h2>Hello 👋</h2>
      <p>Thanks for registering! Please use the OTP below to verify your email:</p>
      <h1 style="letter-spacing: 2px;">${otp}</h1>
      <p>This OTP will expire in 10 minutes.</p>
      <br/>
      <small>If you did not request this, please ignore this email.</small>
    `,
  };

  await transporter.sendMail(mailOptions);
};

/**
 * Send OTP to user's email for password reset
 * @param {string} to - recipient email
 * @param {string} otp - One Time Password
 */
export const sendPasswordResetOtp = async (to, otp) => {
  const mailOptions = {
    from: `"MyApp" <abhishekak.madquick@gmail.com>`,
    to,
    subject: '🔒 Password Reset - OTP Inside',
    html: `
      <h2>Password Reset Request 🔒</h2>
      <p>You have requested to reset your password. Please use the OTP below:</p>
      <h1 style="letter-spacing: 2px; color: #e74c3c;">${otp}</h1>
      <p>This OTP will expire in 10 minutes.</p>
      <p><strong>Important:</strong> If you did not request this password reset, please ignore this email and your password will remain unchanged.</p>
      <br/>
      <small>For security reasons, this OTP can only be used once.</small>
    `,
  };

  await transporter.sendMail(mailOptions);
};


export const sendVerificationAdminOtp = async (to, otp) => {
  const mailOptions = {
    from: `"MyApp" <abhishekak.madquick@gmail.com>`,
    to,
    subject: '🔐 Email Verification - OTP Inside',
    html: `
      <h2>Hello Admin👋</h2>
      <p>Thanks for registering! Please use the OTP below to verify your email:</p>
      <h1 style="letter-spacing: 2px;">${otp}</h1>
      <p>This OTP will expire in 10 minutes.</p>
      <br/>
      <small>If you did not request this, please ignore this email.</small>
    `,
  };

  await transporter.sendMail(mailOptions);
};


export const sendNotificationToAdmin = async (order) => {
  try {
    const mailOptions = {
      from: `"MyApp" <${ENV.EMAIL_USER}>`,
      to: ENV.ADMIN_EMAIL_ID,
      subject: "New Order Placed - Please Check",
      html: `
        <h2>New Order Notification</h2>
        <p>A new order has been placed. Here are the details:</p>
        <ul>
          <li><strong>Order ID:</strong> ${order._id}</li>
          <li><strong>Total Amount:</strong> ₹${order.totalPrice}</li>
          <li><strong>Status:</strong> ${order.status}</li>
          <li><strong>Placed At:</strong> ${new Date(order.createdAt).toLocaleString()}</li>
        </ul>
        <h3>Items:</h3>
        <ul>
          ${order.items
            .map(
              (item) =>
                `<li>${item.name} - Qty: ${item.quantity} - ₹${item.price} each</li>`
            )
            .join("")}
        </ul>
        <p>Please check the admin panel for more details.</p>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log("Admin notified about new order.");
  } catch (error) {
    console.error("Error sending notification email:", error);
  }
};


export const sendNotificationToUser = async (userEmail, order) => {
  try {
    const mailOptions = {
      from: `"MyApp" <${ENV.EMAIL_USER}>`,
      to: userEmail,
      subject: "Order Confirmation - Thank You for Your Purchase",
      html: `
        <h2>Order Confirmation</h2>
        <p>Thank you for your order! Here are the details:</p>
        <ul>
          <li><strong>Order ID:</strong> ${order._id}</li>
          <li><strong>Total Amount:</strong> ₹${order.totalPrice}</li>
          <li><strong>Status:</strong> ${order.status}</li>
          <li><strong>Placed At:</strong> ${new Date(order.createdAt).toLocaleString()}</li>
        </ul>
        <h3>Items:</h3>
        <ul>
          ${order.items
            .map(
              (item) =>
                `<li>${item.name} - Qty: ${item.quantity} - ₹${item.price} each</li>`
            )
            .join("")}
        </ul>
        <p>If you have any questions, feel free to contact our support team.</p>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log("User notified about order confirmation.");
  } catch (error) {
    console.error("Error sending notification email to user:", error);
  }
}
