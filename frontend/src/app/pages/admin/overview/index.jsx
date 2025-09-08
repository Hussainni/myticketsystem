import React, { useEffect, useState } from "react";
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
  Tooltip as RechartTooltip,
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
import API from "../api/api";

const COLORS = ["#1976d2", "#ff9800", "#4caf50", "#9e9e9e"];

const statusColorMap = [
  { label: "Open", color: COLORS[0] },
  { label: "In Progress", color: COLORS[1] },
  { label: "Resolved", color: COLORS[2] },
  { label: "Closed", color: COLORS[3] },
];

const OverviewPage = () => {
  const [stats, setStats] = useState(null);
  const { loggedInUser } = useAuth();

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const { data } = await API.get("/api/tickets/stats");
      setStats(data);
    } catch (err) {
      console.error("Error fetching stats:", err);
    }
  };

  if (!stats) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="80vh">
        <CircularProgress />
      </Box>
    );
  }

  const pieData = statusColorMap.map((item) => ({
    name: item.label,
    value: stats?.statusCounts?.[item.label] || 0,
  }));

  const barData = stats?.categoryCounts || [];
  const lineData = stats?.ticketsOverTime || [];

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: "100%", overflowX: "hidden" }}>
      {/* Header */}
      <Typography variant="h4" gutterBottom>
        Internal Support Ticket & Issue Tracking System
      </Typography>

      {/* Greeting */}
      <Typography variant="body1" mb={4}>
        Hello <strong>{loggedInUser?.name}</strong>!<br />
        You've logged in as <strong>{loggedInUser?.role}</strong>.<br />
        This admin dashboard empowers you to lead the support process — oversee
        tickets, manage teams, and maintain a high standard of efficiency across
        all departments.
      </Typography>

      {/* Stats Summary */}
      <Grid container spacing={3} mb={3}>
        {/* Total Tickets */}
        <Grid item xs={12} sm={6} md={4} lg={2.4}>
          <Paper elevation={3} sx={{ p: 2, borderRadius: 3, textAlign: "center" }}>
            <Typography variant="h6">Total Tickets</Typography>
            <Typography variant="h5" color="primary">
              {stats?.totalTickets}
            </Typography>
          </Paper>
        </Grid>

        {/* Status Counts */}
        {statusColorMap.map((status) => (
          <Grid item xs={12} sm={6} md={4} lg={2.4} key={status.label}>
            <Paper
              elevation={3}
              sx={{ p: 2, borderRadius: 3, textAlign: "center", minWidth: 150 }}
            >
              <Typography variant="subtitle1" noWrap>
                {status.label}
              </Typography>
              <Typography
                variant="h6"
                sx={{ fontWeight: "bold", color: status.color }}
              >
                {stats?.statusCounts?.[status.label] || 0}
              </Typography>
            </Paper>
          </Grid>
        ))}

        {/* Average Resolution Time */}
        <Grid item xs={12} sm={6} md={4} lg={2.4}>
          <Paper elevation={3} sx={{ p: 2, borderRadius: 3, textAlign: "center" }}>
            <Typography variant="subtitle1" noWrap>
              Ag. Res. time
            </Typography>
            <Typography variant="body1">
              {stats?.avgResolutionTimeInDays || "N/A"} days
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* Charts */}
      <Grid container spacing={3}>
        {/* Pie Chart */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3, borderRadius: 3, height: "100%" }}>
            <Typography variant="h6" gutterBottom>
              Ticket Status Distribution
            </Typography>
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
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <RechartTooltip />
              </PieChart>
            </ResponsiveContainer>

            {/* Legend */}
            <Stack
              direction="row"
              spacing={1}
              justifyContent="center"
              mt={2}
              flexWrap="wrap"
            >
              {statusColorMap.map((item) => (
                <Chip
                  key={item.label}
                  label={item.label}
                  sx={{
                    backgroundColor: item.color,
                    color: "#fff",
                    fontWeight: 500,
                    mb: 1,
                  }}
                />
              ))}
            </Stack>
          </Paper>
        </Grid>

        {/* Bar Chart */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3, borderRadius: 3, height: "100%" }}>
            <Typography variant="h6" gutterBottom>
              Tickets by Category
            </Typography>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart
                data={barData}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="category" />
                <YAxis allowDecimals={false} />
                <RechartTooltip />
                <Bar dataKey="count" fill="#1976d2" barSize={30} />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Line Chart */}
        <Grid item xs={12}>
          <Paper elevation={3} sx={{ p: 3, borderRadius: 3 }}>
            <Typography variant="h6" gutterBottom>
              Tickets Over Time
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart
                data={lineData}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis allowDecimals={false} />
                <RechartTooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="count"
                  stroke="#1976d2"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default OverviewPage;
