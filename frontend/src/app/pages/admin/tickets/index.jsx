// /pages/admin-dashboard/tickets/search-filter.jsx
import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Paper,
  TextField,
  MenuItem,
  Button,
  InputLabel,
  Select,
  FormControl,
  Chip,
} from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import API from "../api/api";

const statusColors = {
  Open: "primary",
  "In Progress": "warning",
  Resolved: "success",
  Closed: "default",
};

const SearchAndFilterPage = () => {
  const [tickets, setTickets] = useState([]);
  const [filteredTickets, setFilteredTickets] = useState([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [category, setCategory] = useState("");
  const [priority, setPriority] = useState("");
  const [assignedUser, setAssignedUser] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [users, setUsers] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    fetchTickets();
    fetchUsers();
  }, []);

  const fetchTickets = async () => {
    try {
      const { data } = await API.get("/api/tickets");
      setTickets(data);
      setFilteredTickets(data);
    } catch (err) {
      console.error("Failed to fetch tickets", err);
    }
  };

  const fetchUsers = async () => {
    try {
      const { data } = await API.get("/api/users");
      setUsers(data);
    } catch (err) {
      console.error("Failed to fetch users", err);
    }
  };

  const handleFilter = () => {
    let temp = [...tickets];

    if (search.trim()) {
      const term = search.toLowerCase();
      temp = temp.filter(
        (ticket) =>
          ticket.title.toLowerCase().includes(term) ||
          ticket._id.toLowerCase().includes(term)
      );
    }

    if (status) temp = temp.filter((ticket) => ticket.status === status);
    if (category) temp = temp.filter((ticket) => ticket.category === category);
    if (priority) temp = temp.filter((ticket) => ticket.priority === priority);
    if (assignedUser)
      temp = temp.filter((ticket) => ticket.assignedTo?._id === assignedUser);

    if (startDate && endDate) {
      const start = dayjs(startDate).startOf("day");
      const end = dayjs(endDate).endOf("day");
      temp = temp.filter((ticket) => {
        const created = dayjs(ticket.createdAt);
        return created.isAfter(start) && created.isBefore(end);
      });
    }

    setFilteredTickets(temp);
  };

  const resetFilters = () => {
    setSearch("");
    setStatus("");
    setCategory("");
    setPriority("");
    setAssignedUser("");
    setStartDate("");
    setEndDate("");
    setFilteredTickets(tickets);
  };

  return (
    <Box sx={{ p: { xs: 2, md: 4 } }}>
      {/* Page Title */}
      <Typography variant="h4" mb={3}>
        Search & Filter Tickets
      </Typography>

      {/* Filters Panel */}
      <Paper elevation={3} sx={{ p: 3, mb: 4, borderRadius: 3 }}>
        <Grid container spacing={2}>
          {/* Search Field */}
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              label="Search by Title or ID"
              fullWidth
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </Grid>

          {/* Status Filter */}
          <Grid item xs={12} sm={6} md={2}>
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                label="Status"
              >
                <MenuItem value="">All</MenuItem>
                <MenuItem value="Open">Open</MenuItem>
                <MenuItem value="In Progress">In Progress</MenuItem>
                <MenuItem value="Resolved">Resolved</MenuItem>
                <MenuItem value="Closed">Closed</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {/* Category Filter */}
          <Grid item xs={12} sm={6} md={2}>
            <FormControl fullWidth>
              <InputLabel>Category</InputLabel>
              <Select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                label="Category"
              >
                <MenuItem value="">All</MenuItem>
                <MenuItem value="IT">IT</MenuItem>
                <MenuItem value="HR">HR</MenuItem>
                <MenuItem value="Office">Office</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {/* Priority Filter */}
          <Grid item xs={12} sm={6} md={2}>
            <FormControl fullWidth>
              <InputLabel>Priority</InputLabel>
              <Select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                label="Priority"
              >
                <MenuItem value="">All</MenuItem>
                <MenuItem value="Low">Low</MenuItem>
                <MenuItem value="Medium">Medium</MenuItem>
                <MenuItem value="High">High</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {/* Assigned User Filter */}
          <Grid item xs={12} sm={6} md={3}>
            <FormControl fullWidth>
              <InputLabel>Assigned To</InputLabel>
              <Select
                value={assignedUser}
                onChange={(e) => setAssignedUser(e.target.value)}
                label="Assigned To"
              >
                <MenuItem value="">All</MenuItem>
                {users.map((user) => (
                  <MenuItem key={user._id} value={user._id}>
                    {user.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {/* Date Range Filters */}
          <Grid item xs={6} sm={6} md={3}>
            <TextField
              type="date"
              label="Start Date"
              InputLabelProps={{ shrink: true }}
              fullWidth
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </Grid>
          <Grid item xs={6} sm={6} md={3}>
            <TextField
              type="date"
              label="End Date"
              InputLabelProps={{ shrink: true }}
              fullWidth
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </Grid>

          {/* Actions */}
          <Grid item xs={12}>
            <Box display="flex" gap={2} flexWrap="wrap">
              <Button variant="contained" onClick={handleFilter}>
                Apply Filters
              </Button>
              <Button
                variant="outlined"
                startIcon={<RefreshIcon />}
                onClick={resetFilters}
              >
                Reset Filters
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {/* Ticket Results */}
      {filteredTickets.length === 0 ? (
        <Typography variant="body1" color="text.secondary">
          No tickets match the filter/search.
        </Typography>
      ) : (
        <Grid container spacing={2}>
          {filteredTickets.map((ticket) => (
            <Grid item xs={12} md={6} lg={4} key={ticket._id}>
              <Paper
                sx={{
                  p: 3,
                  borderRadius: 3,
                  boxShadow: 3,
                  cursor: "pointer",
                  transition: "0.3s",
                  "&:hover": {
                    boxShadow: 6,
                    backgroundColor: "#f9f9f9",
                  },
                }}
                onClick={() =>
                  navigate(`/admin-dashboard/tickets/${ticket._id}`)
                }
              >
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  mb={1}
                >
                  <Typography variant="h6" color="primary" noWrap>
                    {ticket.title}
                  </Typography>
                  <Chip
                    label={ticket.status}
                    color={statusColors[ticket.status] || "default"}
                    size="small"
                  />
                </Box>
                <Typography variant="body2" gutterBottom>
                  <strong>ID:</strong> {ticket._id}
                </Typography>
                <Typography variant="body2">
                  <strong>Category:</strong> {ticket.category}
                </Typography>
                <Typography variant="body2">
                  <strong>Priority:</strong> {ticket.priority}
                </Typography>
                <Typography variant="body2">
                  <strong>Assigned To:</strong>{" "}
                  {ticket.assignedTo?.name || "Unassigned"}
                </Typography>
                <Typography variant="body2">
                  <strong>Created:</strong>{" "}
                  {dayjs(ticket.createdAt).format("YYYY-MM-DD")}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default SearchAndFilterPage;
