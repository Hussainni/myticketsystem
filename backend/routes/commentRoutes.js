import express from "express";
import {addCommentToTicket,getCommentsByTicket} from "../controllers/commentController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

 
router.post("/:ticketId", protect, addCommentToTicket);
router.get("/:ticketId", protect, getCommentsByTicket);

export default router;
