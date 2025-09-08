import React, { useState } from "react";
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
import { toast } from "react-toastify";
import API from "../../../admin/api/api"; // ✅ use centralized axios instance

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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPasswords, setShowPasswords] = useState({
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
      await API.put("/api/users/change-password", {
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
      });

      setSuccess("Password changed successfully!");
      toast.success("Password changed successfully!", { autoClose: 3000 });

      setTimeout(() => onClose(), 1500);
    } catch (err) {
      const msg = err.response?.data?.message || "Failed to change password";
      setError(msg);
      toast.error(msg, { autoClose: 4000 });
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

        <JumboForm validationSchema={validationSchema} onSubmit={handleSubmit}>
          <Stack spacing={3}>
            {[
              { name: "currentPassword", label: "Current Password", field: "current" },
              { name: "newPassword", label: "New Password", field: "new" },
              { name: "confirmNewPassword", label: "Confirm New Password", field: "confirm" },
            ].map(({ name, label, field }) => (
              <JumboOutlinedInput
                key={name}
                fieldName={name}
                label={label}
                type={showPasswords[field] ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton onClick={() => togglePasswordVisibility(field)}>
                      {showPasswords[field] ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            ))}

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
