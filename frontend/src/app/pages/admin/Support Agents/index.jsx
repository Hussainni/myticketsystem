// /pages/admin-dashboard/agents/index.jsx

import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Avatar,
  CircularProgress,
  Button,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  TextField,
  Snackbar,
  Alert,
} from "@mui/material";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";

const AgentsPage = () => {
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newAgent, setNewAgent] = useState({ name: "", email: "", password: "" });
  const [roleChange, setRoleChange] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    fetchAgents();
  }, []);

  const fetchAgents = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/users/support-agents", {
        withCredentials: true,
      });
      setAgents(res.data);
    } catch (err) {
      console.error("Error fetching support agents:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateAgent = async () => {
    try {
      await axios.post("http://localhost:3000/api/auth/create", newAgent, {
        withCredentials: true,
      });
      setSuccessMessage("Support agent created successfully");
      setNewAgent({ name: "", email: "", password: "" });
      fetchAgents();
    } catch (err) {
      console.error("Error creating agent:", err);
    }
  };

  const handleRoleChange = async (id, newRole) => {
    try {
      await axios.patch(
        `http://localhost:3000/api/users/${id}/role`,
        { role: newRole },
        { withCredentials: true }
      );
      setSuccessMessage("Role updated successfully");
      fetchAgents();
    } catch (err) {
      console.error("Role update error:", err);
    }
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Support Agents
      </Typography>

      <Box mb={4}>
        <Typography variant="h6" gutterBottom>
          Create New Support Agent
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={3}>
            <TextField
              fullWidth
              label="Name"
              value={newAgent.name}
              onChange={(e) => setNewAgent({ ...newAgent, name: e.target.value })}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField
              fullWidth
              label="Email"
              value={newAgent.email}
              onChange={(e) => setNewAgent({ ...newAgent, email: e.target.value })}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField
              fullWidth
              type="password"
              label="Password"
              value={newAgent.password}
              onChange={(e) => setNewAgent({ ...newAgent, password: e.target.value })}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              sx={{ height: "100%" }}
              onClick={handleCreateAgent}
            >
              Create Agent
            </Button>
          </Grid>
        </Grid>
      </Box>

      {loading ? (
        <Box display="flex" justifyContent="center" mt={6}>
          <CircularProgress />
        </Box>
      ) : agents.length === 0 ? (
        <Typography variant="h6" align="center" color="text.secondary" sx={{ mt: 4 }}>
          No support agents found.
        </Typography>
      ) : (
        <Grid container spacing={3}>
          {agents.map((agent) => (
            <Grid item xs={12} md={6} lg={4} key={agent._id}>
              <Card
                sx={{
                  borderRadius: 3,
                  boxShadow: 2,
                  border: "1px solid #e0e0e0",
                  p: 2,
                }}
              >
                <CardContent>
                  <Box display="flex" alignItems="center" gap={2}>
                    <Avatar>
                      <SupportAgentIcon />
                    </Avatar>
                    <Box>
                      <Typography variant="h6">{agent.name}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {agent.email}
                      </Typography>
                      <FormControl fullWidth sx={{ mt: 1 }}>
                        <InputLabel>Role</InputLabel>
                        <Select
                          value={roleChange[agent._id] || agent.role}
                          label="Role"
                          onChange={(e) => {
                            setRoleChange({ ...roleChange, [agent._id]: e.target.value });
                            handleRoleChange(agent._id, e.target.value);
                          }}
                        >
                          <MenuItem value="employee">Employee</MenuItem>
                          <MenuItem value="support">Support</MenuItem>
                          <MenuItem value="admin">Admin</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      <Snackbar
        open={!!successMessage}
        autoHideDuration={4000}
        onClose={() => setSuccessMessage("")}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity="success" variant="filled">
          {successMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default AgentsPage;
