import express from "express";
const app = express();
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import path from "path";
dotenv.config({ path: "Api/.env" });

import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import matchRoutes from "./routes/matchRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import { connectDB } from "./config/db.js";
import cors from "cors";
const port = process.env.PORT;
//console.log(`Loaded PORT: ${process.env.PORT}`); // Debugging

console.log("this my header");
// console.log("this is my token from env file:",process.env.JWT_SECRET);

////middlewares
//import { defineConfig } from 'vite'

////// https://vite.dev/config/

app.use(
  cors({
    origin: ["http://localhost:5173"], // Allow both with and without trailing slash

    methods: ["GET", "POST", "PUT", "DELETE"], // Specify allowed HTTP methods
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/matches", matchRoutes);
app.use("/api/messages", messageRoutes);

app.listen(port, async () => {
  console.log(`server running on port ${port}`);

  await connectDB();
});
