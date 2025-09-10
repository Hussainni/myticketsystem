
import express from "express";
import { getAllUsers, updateUserRole, getCurrentUser, getSupportAgents, updateProfile, changePassword, uploadImage } from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";
import upload from "../middleware/cloudinaryUpload.js";


const router = express.Router();

router.get("/", protect, authorizeRoles("admin"), getAllUsers);
router.patch("/:id/role", protect, authorizeRoles("admin"), updateUserRole);
router.get("/me", getCurrentUser);
router.get("/support-agents", protect,authorizeRoles("admin"), getSupportAgents); // not used in frontend 
router.put("/profile",protect, authorizeRoles("admin","employee","support"), updateProfile);
router.put('/change-password', protect, changePassword);
router.post("/upload-profile-image",protect, upload.single("image"), uploadImage)
export default router;
