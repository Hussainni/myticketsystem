import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Grid,
  Paper,
  CircularProgress,
  Chip,
  TextField,
  MenuItem,
  Stack,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";

const statusColors = {
  Open: "primary",
  "In Progress": "warning",
  Resolved: "success",
  Closed: "default",
};

const statusOptions = ["Open", "In Progress", "Resolved", "Closed"];
const priorityOptions = ["Low", "Medium", "High"];
const categoryOptions = ["IT", "HR", "Office"];

const AssignedTicketsPage = () => {
  const [tickets, setTickets] = useState([]);
  const [filteredTickets, setFilteredTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    status: "",
    priority: "",
    category: "",
    fromDate: "",
    toDate: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    fetchAssignedTickets();
  }, []);

  const fetchAssignedTickets = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/tickets/assigned", {
        withCredentials: true,
      });
      setTickets(res.data);
      setFilteredTickets(res.data);
    } catch (err) {
      console.error("Error fetching assigned tickets:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleResetFilters = () => {
    setFilters({
      status: "",
      priority: "",
      category: "",
      fromDate: "",
      toDate: "",
    });
    setFilteredTickets(tickets);
  };

  const applyFilters = () => {
    const results = tickets.filter((ticket) => {
      const matchStatus = filters.status ? ticket.status === filters.status : true;
      const matchPriority = filters.priority ? ticket.priority === filters.priority : true;
      const matchCategory = filters.category ? ticket.category === filters.category : true;

      const createdDate = dayjs(ticket.createdAt);
      const matchFromDate = filters.fromDate ? createdDate.isAfter(dayjs(filters.fromDate).subtract(1, 'day')) : true;
      const matchToDate = filters.toDate ? createdDate.isBefore(dayjs(filters.toDate).add(1, 'day')) : true;

      return matchStatus && matchPriority && matchCategory && matchFromDate && matchToDate;
    });

    setFilteredTickets(results);
  };

  return (
    <Box p={{ xs: 2, md: 4 }}>
      <Typography variant="h4" mb={3} color="primary.main" fontWeight={600}>
        🧾 Assigned Tickets
      </Typography>

      {/* Filters */}
      <Paper elevation={3} sx={{ p: 3, borderRadius: 3, mb: 4 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={3}>
            <TextField
              select
              label="Status"
              name="status"
              fullWidth
              value={filters.status}
              onChange={handleFilterChange}
            >
              <MenuItem value="">All</MenuItem>
              {statusOptions.map((status) => (
                <MenuItem key={status} value={status}>
                  {status}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={12} md={3}>
            <TextField
              select
              label="Priority"
              name="priority"
              fullWidth
              value={filters.priority}
              onChange={handleFilterChange}
            >
              <MenuItem value="">All</MenuItem>
              {priorityOptions.map((priority) => (
                <MenuItem key={priority} value={priority}>
                  {priority}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={12} md={3}>
            <TextField
              select
              label="Category"
              name="category"
              fullWidth
              value={filters.category}
              onChange={handleFilterChange}
            >
              <MenuItem value="">All</MenuItem>
              {categoryOptions.map((cat) => (
                <MenuItem key={cat} value={cat}>
                  {cat}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={12} md={3}>
            <TextField
              type="date"
              label="From Date"
              name="fromDate"
              fullWidth
              InputLabelProps={{ shrink: true }}
              value={filters.fromDate}
              onChange={handleFilterChange}
            />
          </Grid>

          <Grid item xs={12} md={3}>
            <TextField
              type="date"
              label="To Date"
              name="toDate"
              fullWidth
              InputLabelProps={{ shrink: true }}
              value={filters.toDate}
              onChange={handleFilterChange}
            />
          </Grid>
        </Grid>

        <Stack direction="row" spacing={2} mt={3}>
          <Button variant="contained" color="primary" onClick={applyFilters}>
            Apply Filters
          </Button>
          <Button variant="outlined" color="secondary" onClick={handleResetFilters}>
            Reset Filters
          </Button>
        </Stack>
      </Paper>

      {/* Ticket Cards */}
      {loading ? (
        <Box display="flex" justifyContent="center" mt={5}>
          <CircularProgress />
        </Box>
      ) : filteredTickets.length === 0 ? (
        <Typography variant="body1" color="text.secondary">
          ❌ No tickets found matching your filters.
        </Typography>
      ) : (
        <Grid container spacing={3}>
          {filteredTickets.map((ticket) => (
            <Grid item xs={12} sm={6} md={4} key={ticket._id}>
              <Paper
                elevation={3}
                sx={{
                  p: 3,
                  borderRadius: 3,
                  transition: "0.2s",
                  cursor: "pointer",
                  ":hover": { boxShadow: 6 },
                }}
                onClick={() => navigate(`/support-agent-dashboard/assigned-tickets/${ticket._id}`)}
              >
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                  <Typography variant="h6" color="primary">
                    {ticket.title}
                  </Typography>
                  <Chip
                    label={ticket.status}
                    color={statusColors[ticket.status] || "default"}
                    size="small"
                  />
                </Box>

                <Typography variant="body2" mb={0.5}>
                  <strong>Category:</strong> {ticket.category}
                </Typography>
                <Typography variant="body2" mb={0.5}>
                  <strong>Priority:</strong> {ticket.priority}
                </Typography>
                <Typography
                  variant="body2"
                  mb={0.5}
                  sx={{
                    maxHeight: "4.5em",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    display: "-webkit-box",
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: "vertical",
                  }}
                >
                  <strong>Description:</strong> {ticket.description || "No description provided."}
                </Typography>
                <Typography variant="body2">
                  <strong>Created:</strong> {dayjs(ticket.createdAt).format("YYYY-MM-DD")}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default AssignedTicketsPage;
