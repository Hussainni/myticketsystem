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
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CommentSection from "../../components/CommentSection";
import API from "../api/api";

const STATUS_COLORS = {
  Open: "warning",
  "In Progress": "info",
  Resolved: "success",
  Closed: "default",
};

const STATUS_OPTIONS = ["Open", "In Progress", "Resolved", "Closed"];

const AllTicketDetailsPage = () => {
  const { ticketId } = useParams();
  const navigate = useNavigate();

  const [ticket, setTicket] = useState(null);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTicketDetails = async () => {
      try {
        const { data } = await API.get(`/api/tickets/${ticketId}`);
        setTicket(data);
        setStatus(data.status);
      } catch (error) {
        console.error("Error fetching ticket:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTicketDetails();
  }, [ticketId]);

  const handleStatusChange = async (newStatus) => {
    try {
      await API.patch(`/api/tickets/${ticketId}/status`, { status: newStatus });
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
            color={STATUS_COLORS[status] || "default"}
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

        {/* Ticket Info */}
        <Stack spacing={1}>
          {[
            { label: "Category", value: ticket.category },
            { label: "Priority", value: ticket.priority },
            { label: "Created At", value: new Date(ticket.createdAt).toLocaleString() },
            { label: "Updated At", value: new Date(ticket.updatedAt).toLocaleString() },
            { label: "Created By", value: ticket.createdBy?.name || "N/A" },
            { label: "Assigned To", value: ticket.assignedTo?.name || "Unassigned" },
          ].map((info, idx) => (
            <Typography key={idx} variant="body2">
              <strong>{info.label}:</strong> {info.value}
            </Typography>
          ))}
        </Stack>

        {/* Status Update */}
        <FormControl fullWidth sx={{ mt: 3 }}>
          <InputLabel>Update Status</InputLabel>
          <Select
            value={status}
            label="Update Status"
            onChange={(e) => handleStatusChange(e.target.value)}
          >
            {STATUS_OPTIONS.map((s) => (
              <MenuItem key={s} value={s}>
                {s}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Paper>

      {/* Comment Section */}
      <CommentSection ticketId={ticket._id} />
    </Box>
  );
};

export default AllTicketDetailsPage;
