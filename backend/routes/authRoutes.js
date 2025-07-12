import express from "express"
import { createUserByAdmin, loginUser, logoutUser } from "../controllers/authController.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";
import { protect } from "../middleware/authMiddleware.js";
const router = express.Router();


router.post("/login",loginUser)
router.post("/create",protect,authorizeRoles("admin"),createUserByAdmin)
router.post("/logout",logoutUser)

export default router