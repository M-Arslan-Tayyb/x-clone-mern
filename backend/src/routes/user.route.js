import express from "express";
import { followUser, getCurrentUser, getUserProfile, syncUser, updateProfile } from "../controllers/user.controller.js";
import { protectedRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/profile/:username", getUserProfile);
router.put("/profile", protectedRoute, updateProfile);
router.post("/sync", protectedRoute, syncUser);
router.get("/me", protectedRoute, getCurrentUser);
router.post("follow/:targetUserId", protectedRoute, followUser);


export default router;
