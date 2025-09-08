// CreateTicketPage.jsx
import React, { useState } from "react";
import API from "../../admin/api/api"; // adjust path as needed
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
  useMediaQuery,
  useTheme,
} from "@mui/material";

const CATEGORIES = ["IT", "HR", "Office"];
const PRIORITIES = ["Low", "Medium", "High"];

const initialFormState = {
  title: "",
  description: "",
  category: "",
  priority: "",
};

const CreateTicketPage = () => {
  const [form, setForm] = useState(initialFormState);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage("");
    setErrorMessage("");

    try {
      await API.post("/api/tickets", form);
      setSuccessMessage("🎉 Ticket created successfully!");
      setForm(initialFormState);
    } catch (err) {
      setErrorMessage("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, backgroundColor: "#f5f7fa", minHeight: "100vh" }}>
      <Typography
        variant={isMobile ? "h5" : "h4"}
        mb={3}
        fontWeight={600}
        color="primary.main"
      >
        ✨ Create New Ticket
      </Typography>

      <Paper
        elevation={3}
        sx={{
          p: { xs: 3, md: 4 },
          borderRadius: 4,
          maxWidth: 600,
          mx: "auto",
          backgroundColor: "#ffffff",
        }}
      >
        <form onSubmit={handleSubmit}>
          <Stack spacing={3}>
            <TextField
              name="title"
              label="Ticket Title"
              fullWidth
              required
              value={form.title}
              onChange={handleChange}
            />

            <TextField
              name="description"
              label="Description"
              fullWidth
              required
              multiline
              rows={4}
              value={form.description}
              onChange={handleChange}
            />

            <TextField
              name="category"
              label="Category"
              select
              required
              fullWidth
              value={form.category}
              onChange={handleChange}
            >
              {CATEGORIES.map((cat) => (
                <MenuItem key={cat} value={cat}>
                  {cat}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              name="priority"
              label="Priority"
              select
              required
              fullWidth
              value={form.priority}
              onChange={handleChange}
            >
              {PRIORITIES.map((priority) => (
                <MenuItem key={priority} value={priority}>
                  {priority}
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
              fullWidth={isMobile}
              sx={{ py: 1.5 }}
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
