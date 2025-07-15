// /pages/employee-dashboard/create-tickets.jsx

import React, { useState } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Paper,
  TextField,
  MenuItem,
  Button,
  CircularProgress,
  Stack,
  Alert,
} from "@mui/material";

const categories = ["IT", "HR", "Office"];
const priorities = ["Low", "Medium", "High"];

const CreateTicketPage = () => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    priority: "",
  });
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage("");
    setErrorMessage("");
    try {
      await axios.post("http://localhost:3000/api/tickets", form, {
        withCredentials: true,
      });
      setSuccessMessage("🎉 Ticket created successfully!");
      setForm({ title: "", description: "", category: "", priority: "" });
    } catch (err) {
      setErrorMessage("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, backgroundColor: "#f5f7fa", minHeight: "100vh" }}>
      <Typography variant="h4" mb={3} color="primary.main" fontWeight={600}>
        ✨ Create New Ticket
      </Typography>

      <Paper elevation={3} sx={{ p: 4, borderRadius: 4, maxWidth: 600, mx: "auto" }}>
        <form onSubmit={handleSubmit}>
          <Stack spacing={3}>
            <TextField
              name="title"
              label="Ticket Title"
              fullWidth
              variant="outlined"
              value={form.title}
              onChange={handleChange}
              required
            />

            <TextField
              name="description"
              label="Description"
              fullWidth
              multiline
              rows={4}
              variant="outlined"
              value={form.description}
              onChange={handleChange}
              required
            />

            <TextField
              name="category"
              label="Category"
              select
              fullWidth
              variant="outlined"
              value={form.category}
              onChange={handleChange}
              required
            >
              {categories.map((cat) => (
                <MenuItem key={cat} value={cat}>
                  {cat}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              name="priority"
              label="Priority"
              select
              fullWidth
              variant="outlined"
              value={form.priority}
              onChange={handleChange}
              required
            >
              {priorities.map((prio) => (
                <MenuItem key={prio} value={prio}>
                  {prio}
                </MenuItem>
              ))}
            </TextField>

            {successMessage && <Alert severity="success">{successMessage}</Alert>}
            {errorMessage && <Alert severity="error">{errorMessage}</Alert>}

            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : "Create Ticket"}
            </Button>
          </Stack>
        </form>
      </Paper>
    </Box>
  );
};

export default CreateTicketPage;
