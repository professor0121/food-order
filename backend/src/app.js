import express from 'express';
import userRoutes from './routes/user.route.js';
import adminRoutes from './routes/admin.route.js';
import cookieParser from 'cookie-parser';
import rabbitmq from './services/rabbit.js';
import orderRoutes from './routes/order.route.js';
import userTiffinRoutes from './routes/userTiffin.route.js';
import adminTiffinRoutes from './routes/adminTiffin.route.js';
import adminOrderRoutes from './routes/adminOrder.route.js';
import adminUserRoutes from './routes/adminUser.route.js';
import paymentRoutes from './routes/payment.route.js';
import razorpayConnectionCheck from './middleware/razorpay.middleware.js';
import cors from 'cors';
import morgan from 'morgan';


rabbitmq.connect();

const app = express();

app.use(morgan());

app.use(cors({
  origin: ['http://localhost:5174', 'http://localhost:5173'], 
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(razorpayConnectionCheck);


app.use("/api/auth/users", userRoutes);
app.use("/api/auth/admin", adminRoutes);
app.use('/api/user/order', orderRoutes)
app.use('/api/user/tiffin',userTiffinRoutes);
app.use('/api/admin/tiffin',adminTiffinRoutes);
app.use('/api/admin', adminOrderRoutes);
app.use('/api/admin/users',adminUserRoutes);

///route for payment
app.use('/api/payment', paymentRoutes);

export default app;