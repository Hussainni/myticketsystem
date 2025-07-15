import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Grid,
  Paper,
  CircularProgress,
  Stack,
  Chip,
} from "@mui/material";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  LineChart,
  Line,
  Legend,
} from "recharts";
import { useAuth } from "@app/_components/_core/AuthProvider/hooks";

// === Constants ===
const COLORS = ["#1976d2", "#ff9800", "#4caf50", "#9e9e9e"];

const statusColorMap = [
  { label: "Open", color: COLORS[0] },
  { label: "In Progress", color: COLORS[1] },
  { label: "Resolved", color: COLORS[2] },
  { label: "Closed", color: COLORS[3] },
];

const SupportAgentOverviewPage = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const { loggedInUser } = useAuth();

  // === Fetch Stats ===
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/tickets/stats/support-agent", {
          withCredentials: true,
        });
        setStats(res.data);
      } catch (err) {
        console.error("Error fetching support agent stats:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  // === Loading State ===
  if (loading || !stats) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="80vh">
        <CircularProgress />
      </Box>
    );
  }

  // === Chart Data ===
  const pieData = statusColorMap.map((item) => ({
    name: item.label,
    value: stats.statusCounts?.[item.label] || 0,
  }));

  const barData = stats.categoryCounts || [];
  const lineData = stats.ticketsOverTime || [];

  return (
    <Box sx={{ p: { xs: 2, md: 4 } }}>
      {/* Header */}
      <Typography variant="h4" gutterBottom color="primary.main">
        🛠️ Support Agent Overview
      </Typography>
      <Typography variant="body1" mb={4}>
        Hello <strong>{loggedInUser.name}</strong>!<br />
        You're logged in as <strong>{loggedInUser.role}</strong>.<br />
        Welcome to your Dashboard — a place to lead, resolve issues efficiently, and grow in your role every day.
      </Typography>

      {/* Stats Cards */}
      <Grid container spacing={3} mb={4}>
        {/* Total Tickets */}
        <Grid item xs={12} sm={6} md={4} lg={2.4}>
          <Paper elevation={3} sx={{ p: 2, borderRadius: 3, textAlign: "center" }}>
            <Typography variant="h6">Total Tickets</Typography>
            <Typography variant="h5" color="primary">{stats.totalTickets}</Typography>
          </Paper>
        </Grid>

        {/* Status Breakdown */}
        {statusColorMap.map((status, index) => (
          <Grid item xs={12} sm={6} md={4} lg={2.4} key={status.label}>
            <Paper elevation={3} sx={{ p: 2, borderRadius: 3, textAlign: "center" }}>
              <Typography variant="subtitle1">{status.label}</Typography>
              <Typography
                variant="h6"
                sx={{ color: status.color, fontWeight: "bold" }}
              >
                {stats.statusCounts?.[status.label] || 0}
              </Typography>
            </Paper>
          </Grid>
        ))}

        {/* Avg. Resolution Time */}
        <Grid item xs={12} sm={6} md={4} lg={2.4}>
          <Paper elevation={3} sx={{ p: 2, borderRadius: 3, textAlign: "center" }}>
            <Typography variant="subtitle1" noWrap>Avg. Resolution Time</Typography>
            <Typography variant="body1">
              {stats.avgResolutionTimeInDays !== "N/A"
                ? `${stats.avgResolutionTimeInDays} days`
                : "N/A"}
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* Charts Section */}
      <Grid container spacing={3}>
        {/* Pie Chart */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3, borderRadius: 3 }}>
            <Typography variant="h6" gutterBottom>Ticket Status Distribution</Typography>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={70}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <Stack direction="row" spacing={2} justifyContent="center" mt={2} flexWrap="wrap">
              {statusColorMap.map((item) => (
                <Chip
                  key={item.label}
                  label={item.label}
                  sx={{
                    backgroundColor: item.color,
                    color: "#fff",
                    mb: 1,
                    fontSize: "0.75rem",
                  }}
                  size="small"
                />
              ))}
            </Stack>
          </Paper>
        </Grid>

        {/* Bar Chart */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3, borderRadius: 3 }}>
            <Typography variant="h6" gutterBottom>Tickets by Category</Typography>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={barData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="category" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="count" fill="#1976d2" barSize={30} />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Line Chart */}
        <Grid item xs={12}>
          <Paper elevation={3} sx={{ p: 3, borderRadius: 3 }}>
            <Typography variant="h6" gutterBottom>Tickets Over Time</Typography>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={lineData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="count" stroke="#1976d2" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SupportAgentOverviewPage;
