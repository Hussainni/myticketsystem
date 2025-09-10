import LoadingButton from "@mui/lab/LoadingButton";
import {
  JumboCheckbox,
  JumboForm,
  JumboInput,
  JumboOutlinedInput,
} from "@jumbo/vendors/react-hook-form";
import { validationSchema } from "../validation";
import { IconButton, InputAdornment, Stack, Typography } from "@mui/material";
import { Link } from "@jumbo/shared";
import React from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useAuth } from "@app/_components/_core/AuthProvider/hooks";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const LoginForm = () => {
  const { t } = useTranslation();
  const { loading, login, setIsAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [values, setValues] = React.useState({
    password: "",
    showPassword: false,
  });

  async function handleLogin(data) {
    try {
      const response = await login({
        email: data.email,
        password: data.password,
      });
      // console.log("this is login reposne", response);

      // Use response.data.role based on your backend response
      if (response && response.role && response.token) {
        setIsAuthenticated(true)
        const role = response.role;
        const id = response._id;
        localStorage.setItem("userRole", role);
        localStorage.setItem("userID", id);
        setTimeout(() => {
          if (role === "admin") {
            navigate("/admin-dashboard/overview");
          } else if (role === "employee") {
            navigate("/employee-dashboard/overview");
          } else if (role === "support") {
            navigate("/support-agent-dashboard/overview");
          } else {
            navigate("/dashboards/sample");
          }
        }, 0);
      }
    } catch (error) {
      console.error(error);
    }
  }

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  return (
    <JumboForm
      validationSchema={validationSchema}
      onSubmit={handleLogin}
      onChange={() => { }}
    >
      <Stack spacing={3} mb={3}>
        <JumboInput
          fullWidth
          fieldName={"email"}
          label={t("login.email")}
        />
        <JumboOutlinedInput
          fieldName={"password"}
          label={t("login.password")}
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
        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <JumboCheckbox
            fieldName="rememberMe"
            label={t("login.rememberMe")}
            defaultChecked
          />
          {/* <Typography textAlign={"right"} variant={"body1"}>
            <Link underline="none" to={"/auth/forgot-password"}>
              {t("login.forgotPassword")}
            </Link>
          </Typography> */}
        </Stack>
        <LoadingButton
          fullWidth
          type="submit"
          variant="contained"
          size="large"
          loading={loading}
        >
          {t("login.loggedIn")}
        </LoadingButton>
      </Stack>
    </JumboForm>
  );
};

export { LoginForm };
