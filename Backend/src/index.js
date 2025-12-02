import express from "express";
import dotenv from "dotenv";
dotenv.config();

import authRoutes from "./routes/auth.js";
import profileRoutes from "./routes/profile.js";

const app = express();
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/profile", profileRoutes);

app.listen(process.env.PORT, () =>
    console.log(`Backend running on port ${process.env.PORT}`)
);
