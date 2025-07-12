import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  JumboForm,
  JumboInput,
  JumboOutlinedInput,
} from "@jumbo/vendors/react-hook-form";
import { JumboCard } from "@jumbo/components";
import { LoadingButton } from "@mui/lab";
import {
  IconButton,
  InputAdornment,
  Stack,
  Typography,
  Alert,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { SettingHeader } from "@app/_components/user/settings";
import { toast } from "react-toastify";
import * as yup from "yup";

const validationSchema = yup.object({
  currentPassword: yup.string().required("Current password is required"),
  newPassword: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("New password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("newPassword"), null], "Passwords must match")
    .required("Confirm password is required"),
});

const ChangePassword = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  const [success, setSuccess] = React.useState("");
  const [showPasswords, setShowPasswords] = React.useState({
    current: false,
    new: false,
    confirm: false,
  });

  const handlePasswordChange = async (data) => {
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await axios.put(
        "http://localhost:3000/api/user/change-password",
        {
          currentPassword: data.currentPassword,
          newPassword: data.newPassword,
        },
        { withCredentials: true }
      );

      if (response.data.success) {
        setSuccess("Password changed successfully!");
        
        // Show success toast
        toast.success("Password changed successfully!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        
        // Clear form and redirect
        setTimeout(() => {
          navigate("/admin-dashboard/all-tickets");
        }, 2000);
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Failed to change password";
      setError(errorMessage);
      
      // Show error toast
      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = (field) => {
    setShowPasswords(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  return (
    <>
      <SettingHeader title={"Change Password"} />
      
      <JumboCard
        title={"Update Your Password"}
        contentWrapper
        sx={{ maxWidth: 600, mx: "auto", mt: 2 }}
      >
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        
        {success && (
          <Alert severity="success" sx={{ mb: 2 }}>
            {success}
          </Alert>
        )}

        <JumboForm
          validationSchema={validationSchema}
          onSubmit={handlePasswordChange}
          onChange={() => {}}
        >
          <Stack spacing={3}>
            <JumboOutlinedInput
              fieldName="currentPassword"
              label="Current Password"
              type={showPasswords.current ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => togglePasswordVisibility("current")}
                    edge="end"
                  >
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
                  <IconButton
                    onClick={() => togglePasswordVisibility("new")}
                    edge="end"
                  >
                    {showPasswords.new ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />

            <JumboOutlinedInput
              fieldName="confirmPassword"
              label="Confirm New Password"
              type={showPasswords.confirm ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => togglePasswordVisibility("confirm")}
                    edge="end"
                  >
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
      </JumboCard>
    </>
  );
};

export default ChangePassword; 