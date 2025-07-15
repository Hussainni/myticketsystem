
import express from "express";
import { getAllUsers, updateUserRole, getCurrentUser, getSupportAgents, updateProfile, changePassword } from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.get("/", protect, authorizeRoles("admin"), getAllUsers);
router.patch("/:id/role", protect, authorizeRoles("admin"), updateUserRole);
router.get("/me", protect, getCurrentUser);
router.get("/support-agents", protect,authorizeRoles("admin"), getSupportAgents);
router.put("/profile",protect, authorizeRoles("admin","employee","support"), updateProfile);
router.put('/change-password', protect, changePassword);
export default router;
