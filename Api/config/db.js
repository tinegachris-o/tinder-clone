import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path"
dotenv.config({ path: "Api/.env" });

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGOURL);

            console.log(
              `MongoDB connection was successful! 🎉🌍 Connected to: ${conn.connection.host}`
            );

  } catch (error) {
        console.log("Error connecting to MongoDB ❌", error);

    process.exit(1);
  }
};
