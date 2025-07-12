import express from "express";
import {
  createTicket, getAllTickets, getMyTickets, getTicketById, updateTicketStatus,
  assignTicket,
  updateInternalNotes,
  getTicketStats,
} from "../controllers/ticketController.js";
// import { upload } from "../middleware/uploadMiddleware.js";

import { protect } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";

const router = express.Router();


router.post("/", protect, authorizeRoles("employee"), createTicket);


router.get("/my", protect, authorizeRoles("employee"), getMyTickets);


router.get("/", protect, authorizeRoles("admin", "support"), getAllTickets);

router.get("/stats", protect, authorizeRoles("admin"), getTicketStats);

router.get("/:id", protect, getTicketById);


router.patch("/:id/status", protect, authorizeRoles("support", "admin"), updateTicketStatus);


router.patch("/:id/assign", protect, authorizeRoles("admin"), assignTicket);


router.patch("/:id/notes", protect, authorizeRoles("admin", "support"), updateInternalNotes);



//optional
// router.post("/", protect, authorizeRoles("employee"), upload.single("attachment"), createTicket
// );

export default router;
