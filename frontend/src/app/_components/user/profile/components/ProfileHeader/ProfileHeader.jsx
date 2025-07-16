// import React, { useState, useRef } from "react";
// import axios from "axios";
// import SettingsIcon from "@mui/icons-material/Settings";
// import EditIcon from "@mui/icons-material/Edit";
// import LockIcon from "@mui/icons-material/Lock";
// import {
//   Avatar,
//   Button,
//   Divider,
//   List,
//   MenuItem,
//   Stack,
//   styled,
//   Typography,
//   Alert,
// } from "@mui/material";
// import { getAssetPath } from "@app/_utilities/helpers";
// import { ASSET_AVATARS } from "@app/_utilities/constants/paths";
// import { ContentHeader } from "@app/_components/_core";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "@app/_components/_core/AuthProvider/hooks";
// import EditProfileModal from "@app/pages/user/settings/model1";
// import ChangePasswordModal from "@app/pages/user/settings/model2";

// const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
//   padding: theme.spacing(0, 1),
//   "&:hover": {
//     backgroundColor: "transparent",
//   },
//   "& .MuiTouchRipple-root": {
//     display: "none",
//   },
// }));

// const Item = styled("div")({
//   textAlign: "center",
// });

// const ProfileHeader = () => {
//   const [openEdit, setOpenEdit] = useState(false);
//   const [openPassword, setOpenPassword] = useState(false);
//   const [uploadError, setUploadError] = useState("");
//   const [uploadSuccess, setUploadSuccess] = useState("");
//   const fileInputRef = useRef();

//   const navigate = useNavigate();
//   const { loggedInUser, userLoading, refreshUser } = useAuth();

//   React.useEffect(() => {
//     if (!loggedInUser) {
//       refreshUser();
//     }
//   }, [loggedInUser, refreshUser]);

//   const handleImageUpload = async (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     const formData = new FormData();
//     formData.append("image", file);

//     try {
//       setUploadError("");
//       setUploadSuccess("");

//       const res = await axios.post(
//         "http://localhost:3000/api/users/upload-profile-image",
//         formData,
//         {
//           withCredentials: true,
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );

//       setUploadSuccess("Profile image updated successfully ✅");
//       refreshUser(); 
//     } catch (err) {
//       setUploadError("Failed to upload image. Please try again.");
//       console.error("Image upload error:", err);
//     }
//   };

//   if (userLoading) {
//     return (
//       <ContentHeader
//         avatar={
//           <Avatar
//             sx={{ width: { xs: 48, sm: 72 }, height: { xs: 48, sm: 72 } }}
//             alt="User"
//             src={getAssetPath(`${ASSET_AVATARS}/avatar3.jpg`, "72x72")}
//           />
//         }
//         title={<Typography fontSize={18}>Loading...</Typography>}
//         subheader={<Typography fontSize={12}>Please wait</Typography>}
//       />
//     );
//   }

//   return (
//     <ContentHeader
//       avatar={
//         <Stack alignItems="center">
//           <Avatar
//             sx={{ width: { xs: 48, sm: 72 }, height: { xs: 48, sm: 72 }, cursor: "pointer" }}
//             alt={loggedInUser?.name || "User"}
//             src={
//               loggedInUser?.profileImage ||
//               getAssetPath(`${ASSET_AVATARS}/avatar3.jpg`, "72x72")
//             }
//             onClick={() => fileInputRef.current.click()}
//           />
//           <input
//             type="file"
//             accept="image/*"
//             hidden
//             ref={fileInputRef}
//             onChange={handleImageUpload}
//           />
//           {uploadSuccess && (
//             <Typography fontSize={12} color="green">
//               {uploadSuccess}
//             </Typography>
//           )}
//           {uploadError && (
//             <Typography fontSize={12} color="red">
//               {uploadError}
//             </Typography>
//           )}
//         </Stack>
//       }
//       title={<Typography fontSize={18}>{loggedInUser?.name}</Typography>}
//       subheader={<Typography fontSize={12}>{loggedInUser?.email}</Typography>}
//       children={
//         <Stack
//           direction={"row"}
//           justifyContent={"space-evenly"}
//           divider={<Divider orientation="vertical" flexItem />}
//           spacing={2}
//           sx={{ mx: 1 }}
//         >
//         </Stack>
//       }
//       tabs={
//         <List disablePadding sx={{ display: "flex", minWidth: 0 }}>
//           <StyledMenuItem>Profile Info</StyledMenuItem>
//           <StyledMenuItem>Account</StyledMenuItem>
//           <StyledMenuItem>Security</StyledMenuItem>
//         </List>
//       }
//       action={
//         loggedInUser ? (
//           <Stack direction="row" spacing={1}>
//             <Button
//               disableRipple
//               variant="outlined"
//               startIcon={<EditIcon />}
//               onClick={() => setOpenEdit(true)}
//               sx={{
//                 color: "inherit",
//                 borderColor: "inherit",
//                 textTransform: "none",
//               }}
//             >
//               Edit Profile
//             </Button>
//             <Button
//               disableRipple
//               variant="outlined"
//               startIcon={<LockIcon />}
//               onClick={() => setOpenPassword(true)}
//               sx={{
//                 color: "inherit",
//                 borderColor: "inherit",
//                 textTransform: "none",
//               }}
//             >
//               Change Password
//             </Button>

//             <EditProfileModal open={openEdit} onClose={() => setOpenEdit(false)} />
//             <ChangePasswordModal open={openPassword} onClose={() => setOpenPassword(false)} />
//           </Stack>
//         ) : (
//           <Button
//             disableRipple
//             variant="outlined"
//             onClick={() => navigate("/auth/login")}
//             sx={{
//               color: "inherit",
//               borderColor: "inherit",
//               textTransform: "none",
//             }}
//           >
//             Login
//           </Button>
//         )
//       }
//       sx={{
//         position: "relative",
//         zIndex: 1,
//         maxWidth: 1320,
//         marginInline: "auto",
//         "& .MuiCardHeader-action": {
//           alignSelf: "center",
//           margin: 0,
//         },
//       }}
//     />
//   );
// };

// export { ProfileHeader };




import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@app/_components/_core/AuthProvider/hooks";

import {
  Avatar,
  Button,
  Divider,
  List,
  MenuItem,
  Stack,
  Typography,
  styled,
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import LockIcon from "@mui/icons-material/Lock";

import { getAssetPath } from "@app/_utilities/helpers";
import { ASSET_AVATARS } from "@app/_utilities/constants/paths";
import { ContentHeader } from "@app/_components/_core";
import EditProfileModal from "@app/pages/user/settings/model1";
import ChangePasswordModal from "@app/pages/user/settings/model2";

// ✅ Styled Components
const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
  padding: theme.spacing(0, 1),
  "&:hover": { backgroundColor: "transparent" },
  "& .MuiTouchRipple-root": { display: "none" },
}));

const ProfileHeader = () => {
  const navigate = useNavigate();
  const { loggedInUser, userLoading, refreshUser } = useAuth();

  const [openEdit, setOpenEdit] = useState(false);
  const [openPassword, setOpenPassword] = useState(false);
  const [previewImage, setPreviewImage] = useState("");

  const fileInputRef = useRef();

  // ✅ Refresh user data on mount
  useEffect(() => {
    if (!loggedInUser) {
      refreshUser();
    }
  }, [loggedInUser, refreshUser]);

  // ✅ Handle Image Upload
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // ✅ Show Preview Immediately
    const previewURL = URL.createObjectURL(file);
    setPreviewImage(previewURL);

    const formData = new FormData();
    formData.append("image", file);

    try {
      await axios.post(
        "http://localhost:3000/api/users/upload-profile-image",
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      // ✅ Refresh user to show new image from server
      refreshUser();
    } catch (err) {
      console.error("Image upload error:", err);
    }
  };

  // ✅ Loading State
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
        title={<Typography fontSize={18}>Loading...</Typography>}
        subheader={<Typography fontSize={12}>Please wait</Typography>}
      />
    );
  }

  return (
    <ContentHeader
      avatar={
        <Stack alignItems="center" spacing={1}>
          <Avatar
            sx={{ width: { xs: 64, sm: 80 }, height: { xs: 64, sm: 80 }, cursor: "pointer" }}
            alt={loggedInUser?.name || "User"}
            src={
              previewImage || loggedInUser?.profileImage || getAssetPath(`${ASSET_AVATARS}/avatar3.jpg`, "72x72")
            }
            onClick={() => fileInputRef.current.click()}
          />
          <input
            type="file"
            accept="image/*"
            hidden
            ref={fileInputRef}
            onChange={handleImageUpload}
          />
        </Stack>
      }
      title={<Typography fontSize={18}>{loggedInUser?.name}</Typography>}
      subheader={<Typography fontSize={12}>{loggedInUser?.email}</Typography>}
      children={
        <Stack
          direction="row"
          justifyContent="space-evenly"
          divider={<Divider orientation="vertical" flexItem />}
          spacing={2}
          sx={{ mx: 1 }}
        ></Stack>
      }
      tabs={
        <List disablePadding sx={{ display: "flex", minWidth: 0 }}>
          <StyledMenuItem>Profile Info</StyledMenuItem>
          <StyledMenuItem>Account</StyledMenuItem>
          <StyledMenuItem>Security</StyledMenuItem>
        </List>
      }
      action={
        loggedInUser ? (
          <Stack direction="row" spacing={1}>
            <Button
              disableRipple
              variant="outlined"
              startIcon={<EditIcon />}
              onClick={() => setOpenEdit(true)}
              sx={{ color: "inherit", borderColor: "inherit", textTransform: "none" }}
            >
              Edit Profile
            </Button>
            <Button
              disableRipple
              variant="outlined"
              startIcon={<LockIcon />}
              onClick={() => setOpenPassword(true)}
              sx={{ color: "inherit", borderColor: "inherit", textTransform: "none" }}
            >
              Change Password
            </Button>
            <EditProfileModal open={openEdit} onClose={() => setOpenEdit(false)} />
            <ChangePasswordModal open={openPassword} onClose={() => setOpenPassword(false)} />
          </Stack>
        ) : (
          <Button
            disableRipple
            variant="outlined"
            onClick={() => navigate("/auth/login")}
            sx={{ color: "inherit", borderColor: "inherit", textTransform: "none" }}
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
        "& .MuiCardHeader-action": { alignSelf: "center", margin: 0 },
      }}
    />
  );
};

export { ProfileHeader };
