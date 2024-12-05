import express from "express";
import { login, logout, signup, refreshToken, getProfile } from "../controllers/auth.controller.js";
import { protectRoute, roleBasedAccess } from "../middlewares/auth.middleware.js";


const router = express.Router();
// Public routes
router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

// Protected routes
router.post("/refresh-token", refreshToken);
router.get("/profile", protectRoute, getProfile);

// Role-based protected routes
router.get("/chef-dashboard", protectRoute, roleBasedAccess('chef'), (req, res) => {
    // Chef dashboard logic
    res.json({ message: "Welcome to Chef Dashboard" });
});

export default router;
