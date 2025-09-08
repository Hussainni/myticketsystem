// /src/app/components/CommentSection.jsx

import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Stack,
  Paper,
  Avatar,
  CircularProgress,
} from "@mui/material";
import API from "../admin/api/api";

const CommentSection = ({ ticketId }) => {
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    loadComments();
  }, [ticketId]);

  const loadComments = async () => {
    try {
      const { data } = await API.get(`/api/comments/${ticketId}`);
      setComments(data);
    } catch (err) {
      console.error("Failed to load comments", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!text.trim()) return;
    setSubmitting(true);
    try {
      await API.post(`/api/comments/${ticketId}`, { text });
      setText("");
      loadComments(); // refresh list
    } catch (err) {
      console.error("Failed to submit comment", err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Comments
      </Typography>

      {loading ? (
        <CircularProgress />
      ) : comments.length === 0 ? (
        <Typography>No comments yet.</Typography>
      ) : (
        <Stack spacing={2} sx={{ mb: 3 }}>
          {comments.map((comment) => (
            <Paper key={comment._id} elevation={2} sx={{ p: 2 }}>
              <Box display="flex" alignItems="center" gap={2}>
                <Avatar>{comment.userId?.name?.[0]}</Avatar>
                <Box>
                  <Typography variant="subtitle2">
                    {comment.userId?.name || "User"}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {new Date(comment.createdAt).toLocaleString()}
                  </Typography>
                </Box>
              </Box>
              <Typography sx={{ mt: 1 }}>{comment.text}</Typography>
            </Paper>
          ))}
        </Stack>
      )}

      <TextField
        label="Add a comment"
        multiline
        fullWidth
        rows={3}
        value={text}
        onChange={(e) => setText(e.target.value)}
        sx={{ mb: 2 }}
      />

      <Button
        variant="contained"
        onClick={handleSubmit}
        disabled={submitting}
      >
        {submitting ? "Posting..." : "Post Comment"}
      </Button>
    </Box>
  );
};

export default CommentSection;
