import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import { ENV } from "./config/env.js";
import cors from "cors";
import { clerkMiddleware } from "@clerk/express";
import userRoutes from "./routes/user.route.js";
import postRoutes from "./routes/post.route.js";
import commentRoutes from "./routes/comments.route.js";
import notificationRoutes from "./routes/notifications.route.js";
import { arcjetMiddleware } from "./middleware/arcjet.middleware.js";




dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(clerkMiddleware());
app.use(arcjetMiddleware);

app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/notifications", notificationRoutes);

app.use((err, req, res, next) => {
    console.log("Unhandle Error: ", err)
    res.status(500).json({ error: "Internal server error" || err.message })
})


const PORT = ENV.PORT || 5002;

app.listen(PORT, async () => {
    await connectDB();
    console.log(`Server is running on port ${PORT}`);
});



