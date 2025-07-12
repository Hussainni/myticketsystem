// // /pages/admin-dashboard/tickets/[ticketId].jsx

// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";
// import {
//   Box,
//   Typography,
//   Card,
//   CardContent,
//   Button,
//   Chip,
//   Divider,
//   CircularProgress,
// } from "@mui/material";

// const TicketDetailPage = () => {
//   const { ticketId } = useParams();
//   const navigate = useNavigate();
//   const [ticket, setTicket] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchTicket = async () => {
//       try {
//         const res = await axios.get(`http://localhost:3000/api/tickets/${ticketId}`, {
//           withCredentials: true,
//         });
//         setTicket(res.data);
//       } catch (err) {
//         console.error("Error fetching ticket:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchTicket();
//   }, [ticketId]);

//   if (loading) {
//     return (
//       <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
//         <CircularProgress />
//       </Box>
//     );
//   }

//   if (!ticket) {
//     return (
//       <Typography variant="h6" color="text.secondary" align="center" sx={{ mt: 5 }}>
//         Ticket not found.
//       </Typography>
//     );
//   }

//   return (
//     <Box sx={{ padding: 4 }}>
//       <Button variant="outlined" onClick={() => navigate(-1)} sx={{ mb: 2 }}>
//         Go Back
//       </Button>

//       <Card variant="outlined" sx={{ borderRadius: 3, boxShadow: 2 }}>
//         <CardContent>
//           <Typography variant="h4" gutterBottom>
//             {ticket.title}
//           </Typography>

//           <Chip
//             label={ticket.status}
//             color="primary"
//             size="small"
//             sx={{ mb: 2 }}
//           />

//           <Divider sx={{ mb: 2 }} />

//           <Typography variant="body1" gutterBottom>
//             <strong>Description:</strong> {ticket.description}
//           </Typography>

//           <Typography variant="body1" gutterBottom>
//             <strong>Priority:</strong> {ticket.priority}
//           </Typography>

//           <Typography variant="body1" gutterBottom>
//             <strong>Category:</strong> {ticket.category}
//           </Typography>

//           <Typography variant="body1" gutterBottom>
//             <strong>Created By:</strong> {ticket.createdBy?.name || "N/A"}
//           </Typography>

//           <Typography variant="body1">
//             <strong>Assigned To:</strong> {ticket.assignedTo?.name || "Not assigned"}
//           </Typography>
//         </CardContent>
//       </Card>
//     </Box>
//   );
// };

// export default TicketDetailPage;
