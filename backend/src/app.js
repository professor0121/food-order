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
import path from 'path';
import { fileURLToPath } from 'url';
import mealRoutes from './routes/meal.route.js';
import uploadRoutes from './routes/upload.route.js';

rabbitmq.connect();

const app = express();

// For __dirname (ESM)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Set view engine
app.set('view engine', 'ejs');

// Set views directory (if it's inside 'src/views' for example)
app.use(express.static(path.join(__dirname, '../public')));


app.get('/ejs-test', (req, res) => {
  res.render('index');
});





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

app.use('/api/admin/meals',mealRoutes)

app.use('/api/image/', uploadRoutes);

///route for payment
app.use('/api/payment', paymentRoutes);

export default app;