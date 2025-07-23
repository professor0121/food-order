import express from 'express';
import userRoutes from './routes/user.route.js';
import adminRoutes from './routes/admin.route.js';
import cookieParser from 'cookie-parser';
import rabbitmq from './services/rabbit.js';
import cors from 'cors';


rabbitmq.connect();

const app = express();

app.use(cors({
    origin: '*', // 🛑 change this to your frontend domain
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(

));

app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);

export default app;