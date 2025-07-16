import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Card,
  CardContent,
  Typography,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Button,
  Grid,
  Snackbar,
  Alert,
  Chip,
  Tooltip,
} from "@mui/material";

const statusColors = {
  Open: "warning",
  "In Progress": "info",
  Resolved: "success",
  Closed: "default",
};

const AssignTicketsPage = () => {
  const [tickets, setTickets] = useState([]);
  const [agents, setAgents] = useState([]);
  const [assigned, setAssigned] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    fetchUnassignedTickets();
    fetchSupportAgents();
  }, []);

  const fetchUnassignedTickets = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/tickets", {
        withCredentials: true,
      });
      const unassigned = res.data.filter((ticket) => !ticket.assignedTo);
      setTickets(unassigned);
    } catch (err) {
      console.error("Error fetching tickets:", err);
    }
  };

  const fetchSupportAgents = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/users/support-agents", {
        withCredentials: true,
      });
      setAgents(res.data);
    } catch (err) {
      console.error("Error fetching agents:", err);
    }
  };

  const handleAssign = async (ticketId) => {
    try {
      const agentId = assigned[ticketId];
      if (!agentId) return;
      await axios.patch(
        `http://localhost:3000/api/tickets/${ticketId}/assign`,
        { assignedTo: agentId },
        { withCredentials: true }
      );
      setSuccessMessage("Ticket assigned successfully");
      setTickets(tickets.filter((t) => t._id !== ticketId));
    } catch (err) {
      console.error("Assignment error:", err);
    }
  };

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: "100%", overflowX: "hidden" }}>
      {/* Page Header */}
      <Typography variant="h4" gutterBottom>
        Assign Tickets
      </Typography>

      {/* No Unassigned Tickets */}
      {tickets.length === 0 ? (
        <Typography
          variant="h6"
          align="center"
          color="text.secondary"
          sx={{ mt: 6 }}
        >
          All tickets are assigned 🎉
        </Typography>
      ) : (
        // Ticket Cards Grid
        <Grid container spacing={3}>
          {tickets.map((ticket) => (
            <Grid item xs={12} md={6} lg={4} key={ticket._id}>
              <Card
                variant="outlined"
                sx={{
                  borderRadius: 3,
                  boxShadow: 2,
                  border: "1px solid #e0e0e0",
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                }}
              >
                <CardContent sx={{ flexGrow: 1 }}>
                  {/* Ticket Title & Status */}
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    mb={1}
                  >
                    <Typography variant="h6" gutterBottom noWrap>
                      {ticket.title}
                    </Typography>
                    <Tooltip title={ticket.status} arrow>
                      <Chip
                        label={ticket.status}
                        color={statusColors[ticket.status] || "default"}
                        size="small"
                      />
                    </Tooltip>
                  </Box>

                  {/* Ticket Meta */}
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    gutterBottom
                  >
                    {ticket.description.slice(0, 100)}...
                  </Typography>
                  <Typography variant="body2">
                    <strong>Category:</strong> {ticket.category}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Priority:</strong> {ticket.priority}
                  </Typography>

                  {/* Assign Dropdown */}
                  <FormControl fullWidth sx={{ mt: 2 }}>
                    <InputLabel>Assign to</InputLabel>
                    <Select
                      value={assigned[ticket._id] || ""}
                      label="Assign to"
                      onChange={(e) =>
                        setAssigned({ ...assigned, [ticket._id]: e.target.value })
                      }
                    >
                      {agents.map((agent) => (
                        <MenuItem key={agent._id} value={agent._id}>
                          {agent.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>

                  {/* Assign Button */}
                  <Button
                    fullWidth
                    variant="contained"
                    sx={{ mt: 2 }}
                    onClick={() => handleAssign(ticket._id)}
                  >
                    Assign Ticket
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Snackbar */}
      <Snackbar
        open={!!successMessage}
        autoHideDuration={4000}
        onClose={() => setSuccessMessage("")}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity="success" variant="filled">
          {successMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default AssignTicketsPage;
