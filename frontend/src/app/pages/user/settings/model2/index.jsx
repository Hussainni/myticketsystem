import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
  InputAdornment,
  Stack,
  Alert,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { JumboForm, JumboOutlinedInput } from "@jumbo/vendors/react-hook-form";
import * as yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";

// ✅ Validation Schema
const validationSchema = yup.object({
  currentPassword: yup.string().required("Current password is required"),
  newPassword: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("New password is required"),
  confirmNewPassword: yup
    .string()
    .oneOf([yup.ref("newPassword")], "Passwords must match")
    .required("Confirm password is required"),
});

const ChangePasswordModal = ({ open, onClose }) => {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  const [success, setSuccess] = React.useState("");
  const [showPasswords, setShowPasswords] = React.useState({
    current: false,
    new: false,
    confirm: false,
  });

  const togglePasswordVisibility = (field) => {
    setShowPasswords((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleSubmit = async (data) => {
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      await axios.put(
        "http://localhost:3000/api/users/change-password",
        {
          currentPassword: data.currentPassword,
          newPassword: data.newPassword,
        },
        { withCredentials: true }
      );

      setSuccess("Password changed successfully!");

      toast.success("Password changed successfully!", {
        position: "top-right",
        autoClose: 3000,
      });

      setTimeout(() => {
        onClose(); // Close modal
      }, 1500);
    } catch (err) {
      const msg = err.response?.data?.message || "Failed to change password";
      setError(msg);

      toast.error(msg, {
        position: "top-right",
        autoClose: 4000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Change Password</DialogTitle>

      <DialogContent>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

        <JumboForm
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Stack spacing={3}>
            <JumboOutlinedInput
              fieldName="currentPassword"
              label="Current Password"
              type={showPasswords.current ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton onClick={() => togglePasswordVisibility("current")}>
                    {showPasswords.current ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />

            <JumboOutlinedInput
              fieldName="newPassword"
              label="New Password"
              type={showPasswords.new ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton onClick={() => togglePasswordVisibility("new")}>
                    {showPasswords.new ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />

            <JumboOutlinedInput
              fieldName="confirmNewPassword"
              label="Confirm New Password"
              type={showPasswords.confirm ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton onClick={() => togglePasswordVisibility("confirm")}>
                    {showPasswords.confirm ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />

            <LoadingButton
              fullWidth
              type="submit"
              variant="contained"
              size="large"
              loading={loading}
            >
              Change Password
            </LoadingButton>
          </Stack>
        </JumboForm>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} color="secondary">Cancel</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ChangePasswordModal;
