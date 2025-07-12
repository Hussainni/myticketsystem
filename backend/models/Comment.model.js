import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    ticketId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Ticket",
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    text: {
      type: String,
      required: true,
      trim: true,
    },
    attachment: {
      type: String,  
      default: null,
    },
  },
  {
    timestamps: true,  
  }
);

const Comment = mongoose.model("Comment", commentSchema);
export default Comment;
