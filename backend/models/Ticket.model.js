// models/Ticket.js

import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        category: {
            type: String,
            enum: ["IT", "HR", "Office"],
            required: true
        },
        priority: {
            type: String,
            enum: ["Low", "Medium", "High"],
            required: true
        },
        status: {
            type: String,
            enum: ["Open", "In Progress", "Resolved", "Closed"],
            default: "Open"
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        assignedTo: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        attachment: {
            type: String
        },
        internalNotes: {
            type: String
        },
    },
    { timestamps: true }
);

const Ticket = mongoose.model("Ticket", ticketSchema);
export default Ticket;
