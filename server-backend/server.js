import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import issueRoutes from "./routes/issueRoutes.js";

// ✅ Load environment variables
dotenv.config();

// ✅ Connect MongoDB
connectDB();

const app = express();

// ✅ Enable CORS properly
app.use(
  cors({
    origin: [
      "https://fix-my-town-mern-866q.vercel.app", // ✅ your frontend
    ],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// ✅ Parse JSON requests
app.use(express.json());

// ✅ Routes
app.use("/api/auth", authRoutes);
app.use("/api/issues", issueRoutes);
app.use("/api/admin", adminRoutes);

// ✅ Test route
app.get("/", (req, res) => {
  res.send("API is running successfully ✅");
});

// ❌ Remove app.listen() for Vercel
export default app;
