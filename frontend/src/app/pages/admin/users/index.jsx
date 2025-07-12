// /pages/admin-dashboard/users/index.jsx

import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Grid,
  TextField,
  Button,
  Snackbar,
  Alert,
  Card,
  CardContent,
  Avatar,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Paper,
  Stack,
} from "@mui/material";
import GroupIcon from "@mui/icons-material/Group";

const UserPage = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ name: "", email: "", password: "", role: "employee" });
  const [successMessage, setSuccessMessage] = useState("");
  const [roleChange, setRoleChange] = useState({});

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/users", {
        withCredentials: true,
      });
      setUsers(res.data);
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };

  const handleCreateUser = async () => {
    try {
      await axios.post("http://localhost:3000/api/auth/create", newUser, {
        withCredentials: true,
      });
      setSuccessMessage("User created successfully");
      setNewUser({ name: "", email: "", password: "", role: "employee" });
      fetchUsers();
    } catch (err) {
      console.error("Error creating user:", err);
    }
  };

  const handleRoleUpdate = async (userId, newRole) => {
    try {
      await axios.patch(
        `http://localhost:3000/api/users/${userId}/role`,
        { role: newRole },
        { withCredentials: true }
      );
      setSuccessMessage("User role updated successfully");
      fetchUsers();
    } catch (err) {
      console.error("Error updating role:", err);
    }
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Manage Users
      </Typography>

      <Box mb={4} component={Paper} elevation={3} p={3} borderRadius={3}>
        <Typography variant="h6" gutterBottom>
          Create New User
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={3}>
            <TextField
              fullWidth
              label="Name"
              value={newUser.name}
              onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField
              fullWidth
              label="Email"
              value={newUser.email}
              onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            />
          </Grid>
          <Grid item xs={12} md={2}>
            <TextField
              fullWidth
              label="Password"
              type="password"
              value={newUser.password}
              onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
            />
          </Grid>
          <Grid item xs={12} md={2}>
            <FormControl fullWidth>
              <InputLabel>Role</InputLabel>
              <Select
                value={newUser.role}
                label="Role"
                onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
              >
                <MenuItem value="employee">Employee</MenuItem>
                <MenuItem value="support">Support</MenuItem>
                <MenuItem value="admin">Admin</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={2}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              sx={{ height: "100%" }}
              onClick={handleCreateUser}
            >
              Create User
            </Button>
          </Grid>
        </Grid>
      </Box>

      <Grid container spacing={3}>
        {users.map((user) => (
          <Grid item xs={12} md={6} lg={4} key={user._id}>
            <Card sx={{ borderRadius: 4, boxShadow: 3, p: 3, bgcolor: "#f7f7f7" }}>
              <CardContent>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Avatar sx={{ bgcolor: "primary.main" }}>
                    <GroupIcon />
                  </Avatar>
                  <Box>
                    <Typography variant="subtitle1" fontWeight={600}>{user.name}</Typography>
                    <Typography variant="body2" color="text.secondary">{user.email}</Typography>
                    <FormControl fullWidth size="small" sx={{ mt: 1 }}>
                      <InputLabel>Role</InputLabel>
                      <Select
                        value={roleChange[user._id] || user.role}
                        label="Role"
                        onChange={(e) => {
                          const newRole = e.target.value;
                          setRoleChange({ ...roleChange, [user._id]: newRole });
                          handleRoleUpdate(user._id, newRole);
                        }}
                      >
                        <MenuItem value="employee">Employee</MenuItem>
                        <MenuItem value="support">Support</MenuItem>
                        <MenuItem value="admin">Admin</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

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

export default UserPage;
