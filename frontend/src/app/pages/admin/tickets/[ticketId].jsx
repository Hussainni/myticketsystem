import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Paper,
  Chip,
  Divider,
  CircularProgress,
  Button,
  Stack,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import axios from "axios";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CommentSection from "../../components/CommentSection";

const statusColors = {
  Open: "warning",
  "In Progress": "info",
  Resolved: "success",
  Closed: "default",
};

const AllTicketDetailsPage = () => {
  const { ticketId } = useParams();
  const navigate = useNavigate();
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("");

  useEffect(() => {
    fetchTicketDetails();
  }, [ticketId]);

  const fetchTicketDetails = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/api/tickets/${ticketId}`, {
        withCredentials: true,
      });
      setTicket(res.data);
      setStatus(res.data.status);
    } catch (error) {
      console.error("Error fetching ticket:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (newStatus) => {
    try {
      await axios.patch(
        `http://localhost:3000/api/tickets/${ticketId}/status`,
        { status: newStatus },
        { withCredentials: true }
      );
      setStatus(newStatus);
    } catch (error) {
      console.error("Failed to update status:", error);
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="80vh">
        <CircularProgress />
      </Box>
    );
  }

  if (!ticket) {
    return (
      <Typography variant="h6" color="error" align="center" mt={5}>
        Ticket not found or failed to load.
      </Typography>
    );
  }

  return (
    <Box sx={{ p: { xs: 2, md: 4 } }}>
      {/* Back Button */}
      <Button
        startIcon={<ArrowBackIcon />}
        variant="outlined"
        onClick={() => navigate(-1)}
        sx={{ mb: 3 }}
      >
        Back
      </Button>

      {/* Ticket Details */}
      <Paper elevation={3} sx={{ p: { xs: 2, md: 4 }, borderRadius: 3, mb: 4 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" flexWrap="wrap">
          <Typography variant="h5" fontWeight={600} sx={{ mr: 2 }}>
            {ticket.title}
          </Typography>
          <Chip
            label={status}
            color={statusColors[status] || "default"}
            size="medium"
            sx={{ mt: { xs: 2, sm: 0 } }}
          />
        </Box>

        <Typography variant="subtitle2" color="text.secondary" sx={{ mt: 1 }}>
          Ticket ID: {ticket._id}
        </Typography>

        <Divider sx={{ my: 2 }} />

        {/* Description */}
        <Typography variant="body1" sx={{ mb: 2 }}>
          {ticket.description}
        </Typography>

        {/* Ticket Info Stack */}
        <Stack spacing={1}>
          <Typography variant="body2">
            <strong>Category:</strong> {ticket.category}
          </Typography>
          <Typography variant="body2">
            <strong>Priority:</strong> {ticket.priority}
          </Typography>
          <Typography variant="body2">
            <strong>Created At:</strong> {new Date(ticket.createdAt).toLocaleString()}
          </Typography>
          <Typography variant="body2">
            <strong>Updated At:</strong> {new Date(ticket.updatedAt).toLocaleString()}
          </Typography>
          <Typography variant="body2">
            <strong>Created By:</strong> {ticket.createdBy?.name || "N/A"}
          </Typography>
          <Typography variant="body2">
            <strong>Assigned To:</strong> {ticket.assignedTo?.name || "Unassigned"}
          </Typography>
        </Stack>

        {/* Status Update */}
        <FormControl fullWidth sx={{ mt: 3 }}>
          <InputLabel>Update Status</InputLabel>
          <Select
            value={status}
            label="Update Status"
            onChange={(e) => handleStatusChange(e.target.value)}
          >
            <MenuItem value="Open">Open</MenuItem>
            <MenuItem value="In Progress">In Progress</MenuItem>
            <MenuItem value="Resolved">Resolved</MenuItem>
            <MenuItem value="Closed">Closed</MenuItem>
          </Select>
        </FormControl>
      </Paper>

      {/* Comment Section */}
      <CommentSection ticketId={ticket._id} />
    </Box>
  );
};

export default AllTicketDetailsPage;
