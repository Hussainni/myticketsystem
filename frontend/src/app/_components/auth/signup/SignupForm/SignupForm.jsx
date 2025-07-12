import LoadingButton from "@mui/lab/LoadingButton";
import { validationSchema } from "../validation";
import { IconButton, InputAdornment, Stack } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  JumboForm,
  JumboInput,
  JumboOutlinedInput,
} from "@jumbo/vendors/react-hook-form";

const SignupForm = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);
  const [values, setValues] = React.useState({
    password: "",
    showPassword: false,
  });

  // const handleSignup = async (data) => {
  //   setLoading(true);
  //   try {
  //     const response = await axios.post("http://localhost:3000/api/auth/register", { email: data.email, name: data.name, password: data.password });
  //     console.log(response)
  //     if (response.status === 200) {
  //       navigate("/auth/login");
  //     }
  //   } catch (error) {
  //     console.log("Signup error:", error.response?.data?.message || error.message);
  //   } finally {
  //     setLoading(false);
  //   }
  // }

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };
  return (
    <JumboForm
      validationSchema={validationSchema}
      onSubmit={handleSignup}
      onChange={() => { }}
    >
      <Stack spacing={3} mb={3}>
        <JumboInput fieldName={"name"} label={"Name"} />
        <JumboInput
          fullWidth
          fieldName={"email"}
          label={"Email"}
        />
        <JumboOutlinedInput
          fieldName={"password"}
          label={"Password"}
          type={values.showPassword ? "text" : "password"}
          margin="none"
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                edge="end"
              >
                {values.showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          sx={{ bgcolor: (theme) => theme.palette.background.paper }}
        />
        <LoadingButton
          fullWidth
          type="submit"
          variant="contained"
          size="large"
          loading={loading}
        >
          Signup
        </LoadingButton>
      </Stack>
    </JumboForm>
  );
};

export { SignupForm };
