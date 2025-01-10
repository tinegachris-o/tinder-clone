import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

// Load environment variables from the specified path
dotenv.config({ path: "/home/tinega/Documents/tinderclone/Api/.env" });

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME, // Correct key
  api_key: process.env.CLOUDINARY_API_KEY, // Correct key
  api_secret: process.env.CLOUDINARY_API_SECRET, // Correct key
});

export default cloudinary;
