import http from 'http'
import dotenv from "dotenv";
import app from "./src/app.js";
import { ENV } from "./src/config/env.js";
import connectDB from "./src/config/connectDB.js";
import { Server } from 'socket.io';
import  locationSoket from './src/sokets/locationSocket.js';

dotenv.config();
connectDB();

const server = http.createServer(app);

const io=new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    },
});

locationSoket(io);




server.listen(ENV.PORT, () => {
    console.log(`Server is running on port ${ENV.PORT}`);
});