import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Paper,
  CircularProgress,
  Chip,
  Stack,
  TextField,
  MenuItem,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import API from "../../admin/api/api"; // ✅ use central API instance

// ========================
// Constants
// ========================
const STATUS_COLORS = {
  Open: "primary",
  "In Progress": "warning",
  Resolved: "success",
  Closed: "default",
};

const STATUS_OPTIONS = ["Open", "In Progress", "Resolved", "Closed"];
const CATEGORY_OPTIONS = ["IT", "HR", "Office"];

const initialFilters = {
  status: "",
  category: "",
  search: "",
  startDate: "",
  endDate: "",
};

// ========================
// Component
// ========================
const MyTicketsPage = () => {
  const [tickets, setTickets] = useState([]);
  const [filteredTickets, setFilteredTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState(initialFilters);

  const navigate = useNavigate();

  // ========================
  // Fetch Tickets
  // ========================
  useEffect(() => {
    const fetchMyTickets = async () => {
      try {
        const { data } = await API.get("/api/tickets/my");
        setTickets(data);
        setFilteredTickets(data);
      } catch (err) {
        console.error("Error fetching tickets:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMyTickets();
  }, []);

  // ========================
  // Filtering Logic
  // ========================
  const applyFilters = () => {
    const result = tickets.filter((ticket) => {
      const matchStatus = filters.status ? ticket.status === filters.status : true;
      const matchCategory = filters.category ? ticket.category === filters.category : true;
      const matchSearch = filters.search
        ? ticket.title.toLowerCase().includes(filters.search.toLowerCase()) ||
          ticket._id.toLowerCase().includes(filters.search.toLowerCase())
        : true;
      const matchStartDate = filters.startDate
        ? new Date(ticket.createdAt) >= new Date(filters.startDate)
        : true;
      const matchEndDate = filters.endDate
        ? new Date(ticket.createdAt) <= new Date(filters.endDate)
        : true;

      return matchStatus && matchCategory && matchSearch && matchStartDate && matchEndDate;
    });

    setFilteredTickets(result);
  };

  const resetFilters = () => {
    setFilters(initialFilters);
    setFilteredTickets(tickets);
  };

  // ========================
  // Handlers
  // ========================
  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  // ========================
  // Render
  // ========================
  return (
    <Box p={{ xs: 2, md: 4 }} sx={{ backgroundColor: "#f5f7fa", minHeight: "100vh" }}>
      {/* Heading */}
      <Typography variant="h4" mb={4} fontWeight={600} color="primary.main">
        🎟️ My Tickets
      </Typography>

      {/* =================== */}
      {/* Filters */}
      {/* =================== */}
      <Paper sx={{ p: 3, borderRadius: 3, mb: 4 }}>
        <Grid container spacing={2}>
          {/* Status */}
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              label="Status"
              name="status"
              select
              fullWidth
              value={filters.status}
              onChange={handleFilterChange}
            >
              <MenuItem value="">All</MenuItem>
              {STATUS_OPTIONS.map((status) => (
                <MenuItem key={status} value={status}>
                  {status}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          {/* Category */}
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              label="Category"
              name="category"
              select
              fullWidth
              value={filters.category}
              onChange={handleFilterChange}
            >
              <MenuItem value="">All</MenuItem>
              {CATEGORY_OPTIONS.map((cat) => (
                <MenuItem key={cat} value={cat}>
                  {cat}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          {/* Start Date */}
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              label="Start Date"
              name="startDate"
              type="date"
              fullWidth
              InputLabelProps={{ shrink: true }}
              value={filters.startDate}
              onChange={handleFilterChange}
            />
          </Grid>

          {/* End Date */}
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              label="End Date"
              name="endDate"
              type="date"
              fullWidth
              InputLabelProps={{ shrink: true }}
              value={filters.endDate}
              onChange={handleFilterChange}
            />
          </Grid>

          {/* Search */}
          <Grid item xs={12} sm={6} md={6}>
            <TextField
              label="Search by Title or ID"
              name="search"
              fullWidth
              value={filters.search}
              onChange={handleFilterChange}
            />
          </Grid>

          {/* Buttons */}
          <Grid item xs={12} sm={6} md={6} display="flex" alignItems="center" gap={2}>
            <Button variant="contained" color="primary" onClick={applyFilters}>
              Apply Filters
            </Button>
            <Button variant="outlined" color="secondary" onClick={resetFilters}>
              Reset Filters
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {/* =================== */}
      {/* Ticket Cards */}
      {/* =================== */}
      {loading ? (
        <Box display="flex" justifyContent="center" mt={5}>
          <CircularProgress />
        </Box>
      ) : filteredTickets.length === 0 ? (
        <Typography variant="body1">No tickets match your criteria.</Typography>
      ) : (
        <Grid container spacing={3}>
          {filteredTickets.map((ticket) => (
            <Grid item xs={12} md={6} key={ticket._id}>
              <Paper
                elevation={4}
                sx={{
                  p: 3,
                  borderRadius: 4,
                  cursor: "pointer",
                  transition: "all 0.2s",
                  ":hover": { boxShadow: 6, transform: "scale(1.01)" },
                }}
                onClick={() => navigate(`/employee-dashboard/tickets/${ticket._id}`)}
              >
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                  <Typography variant="h6" color="text.primary">
                    {ticket.title}
                  </Typography>
                  <Chip
                    label={ticket.status}
                    color={STATUS_COLORS[ticket.status] || "default"}
                    size="small"
                  />
                </Box>

                <Stack spacing={1}>
                  <Typography variant="body2">
                    <strong>Category:</strong> {ticket.category}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Priority:</strong> {ticket.priority}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      maxHeight: "4.5em",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      display: "-webkit-box",
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: "vertical",
                    }}
                  >
                    <strong>Description:</strong>{" "}
                    {ticket.description || "No description provided."}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Created:</strong> {dayjs(ticket.createdAt).format("YYYY-MM-DD")}
                  </Typography>
                </Stack>
              </Paper>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default MyTicketsPage;
