import Comment from "../models/Comment.model.js";
import Ticket from "../models/Ticket.model.js";

export const addCommentToTicket = async (req, res) => {
  const { text, attachment } = req.body;
  const ticketId = req.params.ticketId;

  try {

    const ticket = await Ticket.findById(ticketId);
    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }

    const comment = new Comment({
      ticketId,
      userId: req.user._id,
      text,
      attachment: attachment || null,
    });

    await comment.save();
    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({ message: "Failed to add comment", error: error.message });
  }
};


export const getCommentsByTicket = async (req, res) => {
  const ticketId = req.params.ticketId;

  try {
    const comments = await Comment.find({ ticketId })
      .populate("userId", "name email")
      .sort({ createdAt: 1 }); // show in ascending order == 1

    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch comments", error: error.message });
  }
};
