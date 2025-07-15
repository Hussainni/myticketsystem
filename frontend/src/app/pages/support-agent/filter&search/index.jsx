// /pages/support-agent-dashboard/filtering&searching.jsx

import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  TextField,
  MenuItem,
  Paper,
  Grid,
  Chip,
  Stack,
  Button,
} from "@mui/material";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";

const statusOptions = ["Open", "In Progress", "Resolved", "Closed"];
const priorityOptions = ["Low", "Medium", "High"];
const categoryOptions = ["IT", "HR", "Office"];

const statusColors = {
  Open: "primary",
  "In Progress": "warning",
  Resolved: "success",
  Closed: "default",
};

const FilteringAndSearchingPage = () => {
  const [tickets, setTickets] = useState([]);
  const [filters, setFilters] = useState({
    status: "",
    priority: "",
    category: "",
    search: "",
  });
  const [filteredTickets, setFilteredTickets] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/tickets/assigned", {
        withCredentials: true,
      });
      setTickets(res.data);
      setFilteredTickets(res.data);
    } catch (err) {
      console.error("Error fetching tickets:", err);
    }
  };

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleResetFilters = () => {
    setFilters({ status: "", priority: "", category: "", search: "" });
    setFilteredTickets(tickets);
  };

  const applyFilters = () => {
    const results = tickets.filter((ticket) => {
      const matchStatus = filters.status ? ticket.status === filters.status : true;
      const matchPriority = filters.priority ? ticket.priority === filters.priority : true;
      const matchCategory = filters.category ? ticket.category === filters.category : true;
      const matchSearch = filters.search
        ? ticket.title.toLowerCase().includes(filters.search.toLowerCase()) ||
          ticket.description.toLowerCase().includes(filters.search.toLowerCase())
        : true;
      return matchStatus && matchPriority && matchCategory && matchSearch;
    });
    setFilteredTickets(results);
  };

  return (
    <Box sx={{ p: { xs: 2, md: 4 } }}>
      <Typography variant="h4" gutterBottom color="primary">
        🔍 Filter & Search Tickets
      </Typography>

      <Paper elevation={3} sx={{ p: 3, borderRadius: 3, mb: 4 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={3}>
            <TextField
              label="Status"
              name="status"
              select
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
              label="Priority"
              name="priority"
              select
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
              label="Category"
              name="category"
              select
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
              label="Search"
              name="search"
              fullWidth
              value={filters.search}
              onChange={handleFilterChange}
            />
          </Grid>
        </Grid>

        <Stack direction={{ xs: "column", sm: "row" }} spacing={2} mt={3}>
          <Button variant="contained" color="primary" onClick={applyFilters}>
            Apply Filters
          </Button>
          <Button variant="outlined" color="secondary" onClick={handleResetFilters}>
            Reset Filters
          </Button>
        </Stack>
      </Paper>

      {filteredTickets.length === 0 ? (
        <Typography variant="body1" color="text.secondary">
          ❌ No tickets match your current filter criteria.
        </Typography>
      ) : (
        <Grid container spacing={2}>
          {filteredTickets.map((ticket) => (
            <Grid item xs={12} md={6} key={ticket._id}>
              <Paper
                elevation={2}
                sx={{
                  p: 3,
                  borderRadius: 3,
                  transition: "0.2s",
                  ":hover": { boxShadow: 5, cursor: "pointer" },
                }}
                onClick={() => navigate(`/support-agent-dashboard/filter&search/${ticket._id}`)}
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

                <Typography variant="body2"><strong>Priority:</strong> {ticket.priority}</Typography>
                <Typography variant="body2"><strong>Category:</strong> {ticket.category}</Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  <strong>Created:</strong> {dayjs(ticket.createdAt).format("YYYY-MM-DD")}
                </Typography>

                <Typography variant="body2" color="text.secondary">
                  {ticket.description?.slice(0, 100)}...
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default FilteringAndSearchingPage;
