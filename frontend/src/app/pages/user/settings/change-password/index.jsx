import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  JumboForm,
  JumboOutlinedInput,
} from "@jumbo/vendors/react-hook-form";
import { JumboCard } from "@jumbo/components";
import { LoadingButton } from "@mui/lab";
import {
  IconButton,
  InputAdornment,
  Stack,
  Alert,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { SettingHeader } from "@app/_components/user/settings";
import { toast } from "react-toastify";
import * as yup from "yup";
import API from "../../../admin/api/api"; // ✅ use centralized API instance

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

const ChangePassword = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ type: "", message: "" });
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const handlePasswordChange = async (data) => {
    setLoading(true);
    setAlert({ type: "", message: "" });

    try {
      await API.put("/api/users/change-password", data);

      setAlert({ type: "success", message: "Password changed successfully!" });
      toast.success("Password changed successfully!");

      setTimeout(() => navigate("/admin-dashboard/all-tickets"), 2000);
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Failed to change password";
      setAlert({ type: "error", message: errorMessage });
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = (field) => {
    setShowPasswords((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  return (
    <>
      <SettingHeader title="Change Password" />

      <JumboCard
        title="Update Your Password"
        contentWrapper
        sx={{ maxWidth: 600, mx: "auto", mt: 2 }}
      >
        {alert.message && (
          <Alert severity={alert.type} sx={{ mb: 2 }}>
            {alert.message}
          </Alert>
        )}

        <JumboForm
          validationSchema={validationSchema}
          onSubmit={handlePasswordChange}
        >
          <Stack spacing={3}>
            {["currentPassword", "newPassword", "confirmNewPassword"].map(
              (field, idx) => {
                const labels = [
                  "Current Password",
                  "New Password",
                  "Confirm New Password",
                ];
                const keys = ["current", "new", "confirm"];
                return (
                  <JumboOutlinedInput
                    key={field}
                    fieldName={field}
                    label={labels[idx]}
                    type={showPasswords[keys[idx]] ? "text" : "password"}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => togglePasswordVisibility(keys[idx])}
                        >
                          {showPasswords[keys[idx]] ? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                );
              }
            )}

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
      </JumboCard>
    </>
  );
};

export default ChangePassword;
