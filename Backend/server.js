import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import connectDB from "./config/MONGODB.js";
import { userRouter } from "./routes/userRoutes.js";
import { requestRouter } from "./routes/requestRoutes.js";
import { adminRouter } from "./routes/adminRoutes.js";

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

// ======================
// CORS CONFIGURATION
// ======================
app.use(cors({
    origin: [
        "https://6a08cddbf76fce7b5d584e83--life-link-admin.netlify.app",
        "https://6a08d726228bf99129d98f0a--life-link243.netlify.app",
        "http://localhost:3000"
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "token"]
}));

// Handle preflight requests
app.options("*", cors());

// ======================
// MIDDLEWARES
// ======================
app.use(express.json());

app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

// ======================
// DATABASE CONNECTION
// ======================
connectDB();

// ======================
// ROUTES
// ======================
app.use("/api/user", userRouter);
app.use("/api/requests", requestRouter);
app.use("/api/admin", adminRouter);

// ======================
// ROOT ROUTE
// ======================
app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Blood Donation Platform API is running",
        version: "2.0.0"
    });
});

// ======================
// ERROR HANDLER
// ======================
app.use((err, req, res, next) => {
    console.error("Server Error:", err);

    res.status(500).json({
        success: false,
        message: "Internal Server Error"
    });
});

// ======================
// START SERVER
// ======================
app.listen(port, () => {
    console.log(`🚀 Server running on port ${port}`);
    console.log(`🌐 API URL: http://localhost:${port}`);

    console.log("\nAvailable Routes:");
    console.log("👉 /api/user/*");
    console.log("👉 /api/requests/*");
    console.log("👉 /api/admin/*");
});