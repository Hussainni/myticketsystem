// /src/app/pages/admin-dashboard/all-tickets/[ticketId].jsx

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
} from "@mui/material";
import axios from "axios";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const statusColors = {
  Open: "warning",
  "In Progress": "info",
  Resolved: "success",
  Closed: "default",
};

const TicketDetailsPage = () => {
  const { ticketId } = useParams();
  const navigate = useNavigate();
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTicketDetails = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/tickets/${ticketId}`, {
          withCredentials: true,
        });
        setTicket(res.data);
      } catch (error) {
        console.error("Error fetching ticket:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTicketDetails();
  }, [ticketId]);

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
    <Box sx={{ p: 4 }}>
      <Button
        startIcon={<ArrowBackIcon />}
        variant="outlined"
        onClick={() => navigate(-1)}
        sx={{ mb: 2 }}
      >
        Back
      </Button>

      <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h5" fontWeight={600}>
            {ticket.title}
          </Typography>
          <Chip
            label={ticket.status}
            color={statusColors[ticket.status] || "default"}
            size="medium"
          />
        </Box>

        <Typography variant="subtitle2" color="text.secondary" sx={{ mt: 1 }}>
          Ticket ID: {ticket._id}
        </Typography>

        <Divider sx={{ my: 2 }} />

        <Typography variant="body1" sx={{ mb: 2 }}>
          {ticket.description}
        </Typography>

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
      </Paper>
    </Box>
  );
};

export default TicketDetailsPage;
