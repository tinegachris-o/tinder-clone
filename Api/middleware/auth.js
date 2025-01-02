import jwt from "jsonwebtoken";
import User from "../models/User.js";
import dotenv from "dotenv";
////dotenv.config({ path: "Api/.env" });
dotenv.config({ path: "/home/tinega/Documents/tinderclone/Api/.env" });

export const protectRoute = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1]; // Extract token from Bearer

    if (!token) {
      return res.status(400).json({
        success: false,
        message: "No token provided",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    //

    if (!decoded) {
      return res.status(401).json({
        success: false,
        message: "Not Authorized -invalidToken",
      });
    }
    const currentUser = await User.findById(decoded.id);
    req.user = currentUser;
    next();
  } catch (error) {
    console.log("Error in middleeware", error);
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({
        success: false,
        message: "Not Authorized invalid token",
      });
    } else {
      return res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  }
};
