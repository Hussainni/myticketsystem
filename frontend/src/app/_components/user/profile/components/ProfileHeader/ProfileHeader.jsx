import SettingsIcon from "@mui/icons-material/Settings";
import EditIcon from "@mui/icons-material/Edit";
import LockIcon from "@mui/icons-material/Lock";
import {
  Avatar,
  Button,
  Divider,
  List,
  MenuItem,
  Stack,
  styled,
  Typography,
  Alert,
} from "@mui/material";
import { getAssetPath } from "@app/_utilities/helpers";
import { ASSET_AVATARS } from "@app/_utilities/constants/paths";
import { ContentHeader } from "@app/_components/_core";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@app/_components/_core/AuthProvider/hooks";

const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
  padding: theme.spacing(0, 1),

  "&:hover": {
    backgroundColor: "transparent",
  },

  "& .MuiTouchRipple-root": {
    display: "none",
  },
}));

const Item = styled("div")({
  textAlign: "center",
});

const ProfileHeader = () => {
  const navigate = useNavigate();
  const { user, userLoading, refreshUser } = useAuth();

  // Refresh user data when component mounts
  React.useEffect(() => {
    if (!user) {
      refreshUser();
    }
  }, [user, refreshUser]);

  // Show loading state
  if (userLoading) {
    return (
      <ContentHeader
        avatar={
          <Avatar
            sx={{ width: { xs: 48, sm: 72 }, height: { xs: 48, sm: 72 } }}
            alt="User"
            src={getAssetPath(`${ASSET_AVATARS}/avatar3.jpg`, "72x72")}
          />
        }
        title={
          <Typography fontSize={18} variant={"body1"} color={"inherit"}>
            Loading...
          </Typography>
        }
        subheader={
          <Typography fontSize={12} variant={"body1"} color={"inherit"} mt={0.5}>
            Please wait
          </Typography>
        }
        sx={{
          position: "relative",
          zIndex: 1,
          maxWidth: 1320,
          marginInline: "auto",
          "& .MuiCardHeader-action": {
            alignSelf: "center",
            margin: 0,
          },
        }}
      />
    );
  }

  return (
    <ContentHeader
      avatar={
        <Avatar
          sx={{ width: { xs: 48, sm: 72 }, height: { xs: 48, sm: 72 } }}
          alt={user?.name || "User"}
          src={user?.profile_pic || getAssetPath(`${ASSET_AVATARS}/avatar3.jpg`, "72x72")}
        />
      }
      title={
        <Typography fontSize={18} variant={"body1"} color={"inherit"}>
          {user?.name || "User Profile"}
        </Typography>
      }
      subheader={
        <Typography fontSize={12} variant={"body1"} color={"inherit"} mt={0.5}>
          {user?.email || "No email available"}
        </Typography>
      }
      children={
        <Stack
          direction={"row"}
          justifyContent={"space-evenly"}
          divider={<Divider orientation="vertical" flexItem />}
          spacing={2}
          sx={{
            mx: 1,
          }}
        >
          <Item>
            <Typography variant={"h6"} color={"inherit"} mb={0}>
              {user?.name ? user.name.length : 0}
            </Typography>
            <Typography variant={"body1"} fontSize={12}>
              Name Length
            </Typography>
          </Item>
          <Item>
            <Typography variant={"h6"} color={"inherit"} mb={0}>
              {user?.email ? user.email.length : 0}
            </Typography>
            <Typography variant={"body1"} fontSize={12}>
              Email Length
            </Typography>
          </Item>
          <Item>
            <Typography variant={"h6"} color={"inherit"} mb={0}>
              {user?.createdAt ? new Date(user.createdAt).getFullYear() : "N/A"}
            </Typography>
            <Typography variant={"body1"} fontSize={12}>
              Joined
            </Typography>
          </Item>
        </Stack>
      }
      tabs={
        <List
          disablePadding
          sx={{
            display: "flex",
            minWidth: 0,
          }}
        >
          <StyledMenuItem>Profile Info</StyledMenuItem>
          <StyledMenuItem>Account</StyledMenuItem>
          <StyledMenuItem>Security</StyledMenuItem>
        </List>
      }
      action={
        user ? (
          <Stack direction="row" spacing={1}>
            <Button
              disableRipple
              variant="outlined"
              startIcon={<EditIcon />}
              onClick={() => navigate('/user/settings/edit-profile')}
              sx={{
                color: "inherit",
                borderColor: "inherit",
                textTransform: "none",
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                  borderColor: "inherit",
                },
              }}
            >
              Edit Profile
            </Button>
            <Button
              disableRipple
              variant="outlined"
              startIcon={<LockIcon />}
              onClick={() => navigate('/user/settings/change-password')}
              sx={{
                color: "inherit",
                borderColor: "inherit",
                textTransform: "none",
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                  borderColor: "inherit",
                },
              }}
            >
              Change Password
            </Button>
            <Button
              disableRipple
              variant="text"
              startIcon={<SettingsIcon />}
              sx={{
                color: "inherit",
                textTransform: "none",
                "&:hover": {
                  backgroundColor: "transparent",
                },
              }}
            >
              Settings
            </Button>
          </Stack>
        ) : (
          <Button
            disableRipple
            variant="outlined"
            onClick={() => navigate('/auth/login')}
            sx={{
              color: "inherit",
              borderColor: "inherit",
              textTransform: "none",
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                borderColor: "inherit",
              },
            }}
          >
            Login
          </Button>
        )
      }
      sx={{
        position: "relative",
        zIndex: 1,
        maxWidth: 1320,
        marginInline: "auto",

        "& .MuiCardHeader-action": {
          alignSelf: "center",
          margin: 0,
        },
      }}
    />
  );
};

export { ProfileHeader };
