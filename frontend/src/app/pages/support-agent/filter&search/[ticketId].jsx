// /pages/support-agent-dashboard/tickets/[ticketId].jsx

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Typography,
  Paper,
  CircularProgress,
  TextField,
  Button,
  Divider,
  Stack,
  Chip,
  MenuItem,
} from "@mui/material";
import dayjs from "dayjs";

const statusOptions = ["Open", "In Progress", "Resolved", "Closed"];

const FilterTicketDetailPage = () => {
  const { ticketId } = useParams();
  const navigate = useNavigate();
  const [ticket, setTicket] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchTicket();
    fetchComments();
  }, [ticketId]);

  const fetchTicket = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/api/tickets/${ticketId}`, {
        withCredentials: true,
      });
      setTicket(res.data);
      setStatus(res.data.status);
    } catch (err) {
      console.error("Error fetching ticket:", err);
    }
  };

  const fetchComments = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/api/comments/${ticketId}`, {
        withCredentials: true,
      });
      setComments(res.data);
    } catch (err) {
      console.error("Error fetching comments:", err);
    }
  };

  const handleStatusChange = async () => {
    try {
      await axios.patch(
        `http://localhost:3000/api/tickets/${ticketId}/status`,
        { status },
        { withCredentials: true }
      );
      fetchTicket();
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  const handleCommentSubmit = async () => {
    if (!newComment.trim()) return;
    try {
      setLoading(true);
      await axios.post(
        `http://localhost:3000/api/comments/${ticketId}`,
        { text: newComment },
        { withCredentials: true }
      );
      setNewComment("");
      fetchComments();
    } catch (err) {
      console.error("Error adding comment:", err);
    } finally {
      setLoading(false);
    }
  };

  if (!ticket) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="80vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, backgroundColor: "#f4f6f8", minHeight: "100vh" }}>
      <Button variant="outlined" onClick={() => navigate(-1)} sx={{ mb: 2 }}>
        ← Go Back
      </Button>

      <Typography variant="h4" gutterBottom color="primary.main" fontWeight={600}>
        🎜️ Ticket Details
      </Typography>

      <Paper sx={{ p: 4, borderRadius: 4, mb: 4 }} elevation={3}>
        <Typography variant="h5" gutterBottom>
          {ticket.title}
        </Typography>

        <Stack direction="row" spacing={1} alignItems="center" mb={2}>
          <Chip label={`Status: ${ticket.status}`} color={
            ticket.status === "Open"
              ? "primary"
              : ticket.status === "In Progress"
              ? "warning"
              : ticket.status === "Resolved"
              ? "success"
              : "default"
          } />
          <Chip label={`Priority: ${ticket.priority}`} variant="outlined" />
          <Chip label={`Category: ${ticket.category}`} variant="outlined" />
        </Stack>

        <Typography variant="body1" gutterBottom>
          <strong>Created:</strong> {dayjs(ticket.createdAt).format("YYYY-MM-DD HH:mm")}
        </Typography>

        <Typography variant="body1">
          <strong>Description:</strong>
          <br />
          {ticket.description || "No description provided."}
        </Typography>

        <Box mt={3}>
          <TextField
            select
            fullWidth
            label="Update Status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            {statusOptions.map((s) => (
              <MenuItem key={s} value={s}>
                {s}
              </MenuItem>
            ))}
          </TextField>
          <Button variant="contained" sx={{ mt: 2 }} onClick={handleStatusChange}>
            Update Status
          </Button>
        </Box>
      </Paper>

      <Typography variant="h5" gutterBottom>
        💬 Comments
      </Typography>

      <Paper sx={{ p: 3, borderRadius: 3 }}>
        <Stack spacing={2}>
          {comments.map((comment) => (
            <Box key={comment._id} sx={{ p: 2, border: "1px solid #ddd", borderRadius: 2 }}>
              <Typography variant="body2" fontWeight="bold">
                {(comment.userId && comment.userId.name) || "Unknown User"} — {dayjs(comment.createdAt).format("YYYY-MM-DD HH:mm")}
              </Typography>
              <Typography variant="body1">{comment.text}</Typography>
              {comment.attachment && (
                <Typography variant="body2" color="text.secondary">
                  📎 Attachment: {comment.attachment}
                </Typography>
              )}
            </Box>
          ))}
        </Stack>

        <Box mt={4}>
          <TextField
            label="Add a comment"
            multiline
            rows={3}
            fullWidth
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <Button
            variant="contained"
            onClick={handleCommentSubmit}
            sx={{ mt: 2 }}
            disabled={loading}
          >
            {loading ? "Posting..." : "Post Comment"}
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default FilterTicketDetailPage;
