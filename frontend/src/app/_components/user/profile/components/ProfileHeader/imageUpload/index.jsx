// import { useState } from "react";
// import axios from "axios";
// import { Button, Avatar, Box, Typography, CircularProgress } from "@mui/material";

// export const ProfileImageUpload = ({ currentImage, onUpdate }) => {
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [uploading, setUploading] = useState(false);

//   const handleUpload = async () => {
//     if (!selectedFile) return;

//     const formData = new FormData();
//     formData.append("profileImage", selectedFile);

//     try {
//       setUploading(true);
//       const res = await axios.put("http://localhost:3000/api/users/profile-image", formData, {
//         withCredentials: true,
//         headers: {
//           "Content-Type": "multipart/form-data"
//         }
//       });
//       onUpdate(res.data.imagePath);
//     } catch (err) {
//       console.error("Image upload failed:", err);
//     } finally {
//       setUploading(false);
//     }
//   };

//   return (
//     <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
//       <Avatar src={currentImage} sx={{ width: 100, height: 100 }} />
//       <input
//         type="file"
//         accept="image/*"
//         onChange={(e) => setSelectedFile(e.target.files[0])}
//       />
//       <Button
//         onClick={handleUpload}
//         disabled={!selectedFile || uploading}
//         variant="contained"
//       >
//         {uploading ? <CircularProgress size={20} /> : "Upload Image"}
//       </Button>
//     </Box>
//   );
// };
