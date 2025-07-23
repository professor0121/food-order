import mongoose from "mongoose";
import {ENV} from "./env.js"

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(ENV.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;

