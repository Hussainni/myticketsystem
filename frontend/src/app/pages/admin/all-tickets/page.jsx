// /pages/admin-dashboard/tickets/index.jsx

import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  CircularProgress,
  Grid,
  Chip,
  Tooltip,
  Divider,
  IconButton,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";

const statusColors = {
  Open: "warning",
  "In Progress": "info",
  Resolved: "success",
  Closed: "default",
};

const AllTicketsPage = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/tickets", {
        withCredentials: true,
      });
      setTickets(res.data);
    } catch (err) {
      console.error("Error fetching tickets:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    setSearch(searchQuery);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const filteredTickets = tickets.filter((ticket) => {
    const titleMatch = ticket.title.toLowerCase().includes(search.toLowerCase());
    const descMatch = ticket.description.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter ? ticket.status === statusFilter : true;
    return (titleMatch || descMatch) && matchStatus;
  });

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>
        All Tickets
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          gap: 2,
          marginBottom: 3,
        }}
      >
        <TextField
          label="Search by title or description"
          variant="outlined"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          fullWidth
          InputProps={{
            endAdornment: (
              <IconButton onClick={handleSearch} edge="end">
                <SearchIcon color="action" />
              </IconButton>
            ),
          }}
        />

        <FormControl fullWidth>
          <InputLabel>Status</InputLabel>
          <Select
            value={statusFilter}
            label="Status"
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="Open">Open</MenuItem>
            <MenuItem value="In Progress">In Progress</MenuItem>
            <MenuItem value="Resolved">Resolved</MenuItem>
            <MenuItem value="Closed">Closed</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
          <CircularProgress />
        </Box>
      ) : filteredTickets.length === 0 ? (
        <Typography variant="h6" align="center" color="text.secondary" sx={{ mt: 4 }}>
          No tickets found matching your filter or search.
        </Typography>
      ) : (
        <Grid container spacing={3}>
          {filteredTickets.map((ticket) => (
            <Grid item xs={12} md={6} lg={4} key={ticket._id}>
              <Card
                variant="outlined"
                sx={{
                  height: "100%",
                  borderRadius: 3,
                  boxShadow: 3,
                  border: "1px solid #e0e0e0",
                  transition: "transform 0.2s",
                  ":hover": { transform: "scale(1.02)", cursor: "pointer" },
                }}
                onClick={() => navigate(`/admin-dashboard/all-tickets/${ticket._id}`)}
              >
                <CardContent>
                  <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                    <Typography variant="h6" component="div" sx={{ fontWeight: 600 }}>
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

                  <Divider sx={{ my: 1 }} />

                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 1, minHeight: 50 }}
                  >
                    {ticket.description.length > 100
                      ? ticket.description.slice(0, 100) + "..."
                      : ticket.description}
                  </Typography>

                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    Priority: <span style={{ fontWeight: 400 }}>{ticket.priority}</span>
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    Category: <span style={{ fontWeight: 400 }}>{ticket.category}</span>
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default AllTicketsPage;






 