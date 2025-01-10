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
import { initializeSocket } from "./socket/socket.server.js";

import { createServer } from "http";

const port = process.env.PORT;

console.log("this my header");
// console.log("this is my token from env file:",process.env.JWT_SECRET);

////middlewares
//import { defineConfig } from 'vite'
////fucking crazy ups and downs
////// https://vite.dev/config/
////// Increase the payload size limit
const __dirname = path.resolve();
const httpServer = createServer(app);
initializeSocket(httpServer);

app.use(
  cors({
    origin: ["http://localhost:5173"], // Allow both with and without trailing slash

    methods: ["GET", "POST", "PUT", "DELETE"], // Specify allowed HTTP methods
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/matches", matchRoutes);
app.use("/api/messages", messageRoutes);
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/client/dist")));
  app.get("*",(req,res)=>{
    res.sendFile(path.resolve(__dirname,"client","dist","index.html"))
  })
}
httpServer.listen(port, async () => {
  console.log(`server running on and connected port ${port}`);

  await connectDB();
});
