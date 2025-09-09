import express from "express";
import {
  createTicket, getAllTickets, getMyTickets, getTicketById, updateTicketStatus,
  assignTicket,
  updateInternalNotes,
  getTicketStats,
  fetchAssignedTickets,
  getEmployeeTicketStats,
  getSupportAgentStats,
} from "../controllers/ticketController.js";

import { protect } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";

const router = express.Router();


router.post("/", protect, authorizeRoles("employee"), createTicket);
router.get("/assigned", protect,authorizeRoles("support"),  fetchAssignedTickets);
router.get("/my", protect, authorizeRoles("employee"), getMyTickets);
router.get("/", protect, authorizeRoles("admin", "support"), getAllTickets);
router.get("/stats", protect, authorizeRoles("admin","support","employee"), getTicketStats);
router.get("/:id", protect, getTicketById);
router.patch("/:id/status", protect, authorizeRoles("support", "admin"), updateTicketStatus);
router.patch("/:id/assign", protect, authorizeRoles("admin"), assignTicket);
router.patch("/:id/notes", protect, authorizeRoles("admin", "support"), updateInternalNotes);
router.get("/stats/employee",protect, authorizeRoles("employee"), getEmployeeTicketStats);
router.get("/stats/support-agent",protect, authorizeRoles("support"), getSupportAgentStats);


export default router;
