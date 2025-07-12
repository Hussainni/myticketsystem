// /pages/admin-dashboard/search&filter/index.jsx

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
  IconButton,
  Chip,
} from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import axios from "axios";
import dayjs from "dayjs";

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
  const [assignedUser, setAssignedUser] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchTickets();
    fetchUsers();
  }, []);

  const fetchTickets = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/tickets", {
        withCredentials: true,
      });
      setTickets(res.data);
      setFilteredTickets(res.data);
    } catch (err) {
      console.error("Failed to fetch tickets", err);
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/users", {
        withCredentials: true,
      });
      setUsers(res.data);
    } catch (err) {
      console.error("Failed to fetch users", err);
    }
  };

  const handleFilter = () => {
    let temp = [...tickets];

    if (search.trim()) {
      temp = temp.filter(
        (ticket) =>
          ticket.title.toLowerCase().includes(search.toLowerCase()) ||
          ticket._id.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (status) temp = temp.filter((ticket) => ticket.status === status);
    if (category) temp = temp.filter((ticket) => ticket.category === category);
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
    setAssignedUser("");
    setStartDate("");
    setEndDate("");
    setFilteredTickets(tickets);
  };

  return (
    <Box p={4}>
      <Typography variant="h4" mb={3}>
        Search & Filter Tickets
      </Typography>

      <Grid container spacing={2} mb={3} alignItems="center">
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            label="Search by Title or ID"
            fullWidth
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={2}>
          <FormControl fullWidth>
            <InputLabel>Status</InputLabel>
            <Select value={status} onChange={(e) => setStatus(e.target.value)}>
              <MenuItem value="">All</MenuItem>
              <MenuItem value="Open">Open</MenuItem>
              <MenuItem value="In Progress">In Progress</MenuItem>
              <MenuItem value="Resolved">Resolved</MenuItem>
              <MenuItem value="Closed">Closed</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={2}>
          <FormControl fullWidth>
            <InputLabel>Category</InputLabel>
            <Select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="IT">IT</MenuItem>
              <MenuItem value="HR">HR</MenuItem>
              <MenuItem value="Office">Office</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={2}>
          <FormControl fullWidth>
            <InputLabel>Assigned To</InputLabel>
            <Select
              value={assignedUser}
              onChange={(e) => setAssignedUser(e.target.value)}
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
        <Grid item xs={12} sm={6} md={3}>
          <Box display="flex" gap={1}>
            <TextField
              type="date"
              label="Start Date"
              InputLabelProps={{ shrink: true }}
              fullWidth
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
            <TextField
              type="date"
              label="End Date"
              InputLabelProps={{ shrink: true }}
              fullWidth
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box display="flex" gap={2}>
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

      {filteredTickets.length === 0 ? (
        <Typography>No tickets match the filter/search.</Typography>
      ) : (
        <Grid container spacing={2}>
          {filteredTickets.map((ticket) => (
            <Grid item xs={12} md={6} key={ticket._id}>
              <Paper sx={{ p: 3, borderRadius: 3, boxShadow: 3 }}>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Typography variant="h6" color="primary">
                    {ticket.title}
                  </Typography>
                  <Chip
                    label={ticket.status}
                    color={statusColors[ticket.status] || "default"}
                    size="small"
                  />
                </Box>
                <Typography variant="body2" mt={1}>
                  <strong>ID:</strong> {ticket._id}
                </Typography>
                <Typography variant="body2">
                  <strong>Category:</strong> {ticket.category}
                </Typography>
                <Typography variant="body2">
                  <strong>Assigned To:</strong> {ticket.assignedTo?.name || "Unassigned"}
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

export default SearchAndFilterPage;
