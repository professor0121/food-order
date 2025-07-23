import express from 'express';
import userRoutes from './routes/user.route.js';
import cookieParser from 'cookie-parser';
import rabbitmq from './services/rabbit.js';


rabbitmq.connect();

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

app.use("/api/users",userRoutes);

export default app;