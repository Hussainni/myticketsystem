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
  useMediaQuery,
  useTheme,
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

// ===== Constants =====
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
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

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
    <Box sx={{ p: { xs: 2, md: 4 }, backgroundColor: "#f5f7fa", minHeight: "100vh" }}>
      {/* Heading */}
      <Typography
        variant={isMobile ? "h5" : "h4"}
        gutterBottom
        color="primary.main"
        fontWeight={600}
      >
        🛠️ Support Agent Overview
      </Typography>

      <Typography variant="body1" mb={4}>
        Hello <strong>{loggedInUser.name}</strong>!<br />
        You’re logged in as <strong>{loggedInUser.role}</strong>.<br />
        This dashboard helps you manage, resolve, and analyze your assigned tickets efficiently.
      </Typography>

      {/* Stat Cards */}
      <Grid container spacing={2} mb={4}>
        {[{ label: "Total Tickets", value: stats.totalTickets, color: COLORS[0] }]
          .concat(statusColorMap.map((s) => ({
            label: s.label,
            value: stats.statusCounts?.[s.label] || 0,
            color: s.color,
          })))
          .concat([{ label: "Avg. Resolution", value: `${stats.avgResolutionTimeInDays || "N/A"} days`, color: "#000" }])
          .map((item, index) => (
            <Grid item xs={6} sm={4} md={3} lg={2.4} key={index}>
              <Paper
                elevation={3}
                sx={{
                  p: 2,
                  borderRadius: 3,
                  textAlign: "center",
                  height: "100%",
                }}
              >
                <Typography
                  variant="subtitle2"
                  noWrap
                  sx={{ fontSize: isMobile ? "0.8rem" : "0.95rem" }}
                >
                  {item.label}
                </Typography>
                <Typography
                  variant="h6"
                  sx={{ color: item.color, fontWeight: 600, mt: 1 }}
                >
                  {item.value}
                </Typography>
              </Paper>
            </Grid>
          ))}
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
            <Stack direction="row" spacing={1} justifyContent="center" mt={2} flexWrap="wrap">
              {statusColorMap.map((s) => (
                <Chip
                  key={s.label}
                  label={s.label}
                  size="small"
                  sx={{
                    backgroundColor: s.color,
                    color: "#fff",
                    m: 0.5,
                    fontSize: "0.75rem",
                  }}
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
              <BarChart data={barData}>
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
              <LineChart data={lineData}>
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

