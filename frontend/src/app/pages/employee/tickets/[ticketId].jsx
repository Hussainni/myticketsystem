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
  useMediaQuery,
  useTheme,
} from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew"; // ✅ Import back icon
import dayjs from "dayjs";

const TicketDetailPage = () => {
  const { ticketId } = useParams();
  const navigate = useNavigate();
  const [ticket, setTicket] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

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
    <Box
      sx={{
        p: { xs: 2, md: 4 },
        backgroundColor: "#f5f7fa",
        minHeight: "100vh",
      }}
    >
      {/* Go Back Button with Icon */}
      <Button
        variant="outlined"
        onClick={() => navigate(-1)}
        sx={{ mb: 2 }}
        startIcon={<ArrowBackIosNewIcon />} // ✅ Icon here
      >
        Go Back
      </Button>

      <Typography
        variant={isMobile ? "h5" : "h4"}
        gutterBottom
        color="primary.main"
        fontWeight={600}
      >
        🎫 Ticket Details
      </Typography>

      <Paper
        sx={{
          p: { xs: 2, md: 4 },
          borderRadius: 4,
          mb: 4,
          boxShadow: 3,
        }}
      >
        <Typography variant="h6" gutterBottom color="text.primary">
          {ticket.title}
        </Typography>

        <Stack
          direction={isMobile ? "column" : "row"}
          spacing={1}
          alignItems={isMobile ? "flex-start" : "center"}
          mb={2}
        >
          <Chip
            label={`Status: ${ticket.status}`}
            color={
              ticket.status === "Open"
                ? "primary"
                : ticket.status === "In Progress"
                ? "warning"
                : ticket.status === "Resolved"
                ? "success"
                : "default"
            }
          />
          <Chip label={`Priority: ${ticket.priority}`} variant="outlined" />
          <Chip label={`Category: ${ticket.category}`} variant="outlined" />
        </Stack>

        <Typography variant="body2" gutterBottom>
          <strong>Created:</strong> {dayjs(ticket.createdAt).format("YYYY-MM-DD HH:mm")}
        </Typography>

        <Typography variant="body1" mt={2}>
          <strong>Description:</strong>
          <br />
          {ticket.description || "No description provided."}
        </Typography>
      </Paper>

      <Typography
        variant={isMobile ? "h6" : "h5"}
        gutterBottom
        color="text.primary"
      >
        💬 Comments
      </Typography>

      <Paper
        sx={{
          p: { xs: 2, md: 3 },
          borderRadius: 4,
          mb: 4,
          backgroundColor: "#ffffff",
        }}
      >
        <Stack spacing={2}>
          {comments.map((comment) => (
            <Box
              key={comment._id}
              sx={{
                p: 2,
                border: "1px solid #e0e0e0",
                borderRadius: 2,
                backgroundColor: "#f9f9f9",
              }}
            >
              <Typography variant="body2" fontWeight="bold">
                {(comment.userId && comment.userId.name) || "Unknown User"} —{" "}
                {dayjs(comment.createdAt).format("YYYY-MM-DD HH:mm")}
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
            rows={isMobile ? 2 : 3}
            fullWidth
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            variant="outlined"
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleCommentSubmit}
            sx={{ mt: 2, px: 4 }}
            disabled={loading}
            fullWidth={isMobile}
          >
            {loading ? "Posting..." : "Post Comment"}
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default TicketDetailPage;
