// EditProfile.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  JumboForm,
  JumboInput,
} from "@jumbo/vendors/react-hook-form";
import { JumboCard } from "@jumbo/components";
import { LoadingButton } from "@mui/lab";
import {
  Stack,
  Typography,
  Alert,
} from "@mui/material";
import { SettingHeader } from "@app/_components/user/settings";
import { useAuth } from "@app/_components/_core/AuthProvider/hooks";
import { toast } from "react-toastify";
import * as yup from "yup";
import API from "../../../admin/api/api"; // ✅ use your centralized API

// ✅ Validation schema
const validationSchema = yup.object({
  name: yup.string().required("Name is required"),
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
});

const EditProfile = () => {
  const navigate = useNavigate();
  const { user, updateUser } = useAuth();

  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState({ error: "", success: "" });

  const handleProfileUpdate = async (data) => {
    setLoading(true);
    setFeedback({ error: "", success: "" });

    try {
      const { data: response } = await API.put("/api/users/profile", {
        name: data.name,
        email: data.email,
      });

      const updatedUser = response?.user;

      if (!updatedUser) throw new Error("Invalid response from server.");

      updateUser(updatedUser);
      setFeedback({ success: "Profile updated successfully!", error: "" });

      toast.success("Profile updated successfully!", {
        position: "top-right",
        autoClose: 3000,
      });

      setTimeout(() => navigate("/"), 2000);
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "Failed to update profile";

      setFeedback({ error: errorMessage, success: "" });

      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 4000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SettingHeader title="Edit Profile" />

      <JumboCard
        title="Update Your Profile Information"
        contentWrapper
        sx={{ maxWidth: 600, mx: "auto", mt: 2 }}
      >
        {feedback.error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {feedback.error}
          </Alert>
        )}

        {feedback.success && (
          <Alert severity="success" sx={{ mb: 2 }}>
            {feedback.success}
          </Alert>
        )}

        <JumboForm
          validationSchema={validationSchema}
          onSubmit={handleProfileUpdate}
        >
          <Stack spacing={3}>
            <JumboInput
              fieldName="name"
              label="Full Name"
              placeholder="Enter your full name"
              defaultValue={user?.name || ""}
            />

            <JumboInput
              fieldName="email"
              label="Email Address"
              placeholder="Enter your email address"
              type="email"
              defaultValue={user?.email || ""}
            />

            <LoadingButton
              fullWidth
              type="submit"
              variant="contained"
              size="large"
              loading={loading}
              disabled={loading}
            >
              Update Profile
            </LoadingButton>
          </Stack>
        </JumboForm>

        {user && (
          <Stack
            spacing={1}
            sx={{ mt: 3, p: 2, bgcolor: "grey.50", borderRadius: 1 }}
          >
            <Typography variant="subtitle2" color="text.secondary">
              Current Information:
            </Typography>
            <Typography variant="body2">
              <strong>Name:</strong> {user.name}
            </Typography>
            <Typography variant="body2">
              <strong>Email:</strong> {user.email}
            </Typography>
          </Stack>
        )}
      </JumboCard>
    </>
  );
};

export default EditProfile;
