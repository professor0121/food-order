import http from 'http'
import dotenv from "dotenv";
import app from "./src/app.js";
import { ENV } from "./src/config/env.js";
import connectDB from "./src/config/connectDB.js";

dotenv.config();
connectDB();

const server = http.createServer(app);
server.listen(ENV.PORT, () => {
    console.log(`Server is running on port ${ENV.PORT}`);
});