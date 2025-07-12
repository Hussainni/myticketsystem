import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
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

const validationSchema = yup.object({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email format").required("Email is required"),
});

const EditProfile = () => {
  const navigate = useNavigate();
  const { user, updateUser } = useAuth();
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  const [success, setSuccess] = React.useState("");

  const handleProfileUpdate = async (data) => {
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await axios.put(
        "http://localhost:3000/api/user/update-profile",
        {
          name: data.name,
          email: data.email,
        },
        { withCredentials: true }
      );

      if (response.data.success) {
        setSuccess("Profile updated successfully!");
        
        // Update user data in AuthProvider
        updateUser(response.data.user);
        
        // Show success toast
        toast.success("Profile updated successfully!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        
        // Redirect after 2 seconds
        setTimeout(() => {
          navigate("/");
        }, 2000);
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Failed to update profile";
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

  return (
    <>
      <SettingHeader title={"Edit Profile"} />
      
      <JumboCard
        title={"Update Your Profile Information"}
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
              disabled={!user}
            >
              Update Profile
            </LoadingButton>
          </Stack>
        </JumboForm>

        {user && (
          <Stack spacing={1} sx={{ mt: 3, p: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
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