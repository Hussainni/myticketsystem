// // /pages/admin-dashboard/assign.jsx

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import {
//   Box,
//   Typography,
//   Card,
//   CardContent,
//   MenuItem,
//   Select,
//   FormControl,
//   InputLabel,
//   Button,
//   Grid,
//   CircularProgress,
//   Chip,
//   Tooltip,
//   Snackbar,
//   Alert,
// } from "@mui/material";
// import { useLocation } from "react-router-dom";

// const AssignTickets = () => {
//   const [tickets, setTickets] = useState([]);
//   const [agents, setAgents] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [assignments, setAssignments] = useState({});
//   const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });
//   const location = useLocation();

//   useEffect(() => {
//     fetchSupportAgents();
//   }, []);

//   useEffect(() => {
//     fetchTickets();
//   }, [location.pathname]);

//   const fetchTickets = async () => {
//     setLoading(true);
//     try {
//       const res = await axios.get("http://localhost:3000/api/tickets", {
//         withCredentials: true,
//       });
//       const unassigned = res.data.filter((t) => !t.assignedTo);
//       setTickets(unassigned);
//     } catch (err) {
//       console.error("Error fetching tickets:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchSupportAgents = async () => {
//     try {
//       const res = await axios.get("http://localhost:3000/api/users/support-agents", {
//         withCredentials: true,
//       });
//       setAgents(res.data);
//     } catch (err) {
//       console.error("Error fetching support agents:", err);
//     }
//   };

//   const handleAssign = async (ticketId) => {
//     try {
//       const agentId = assignments[ticketId];
//       if (!agentId) return;

//       await axios.patch(
//         `http://localhost:3000/api/tickets/${ticketId}/assign`,
//         { userId: agentId },
//         { withCredentials: true }
//       );

//       setSnackbar({ open: true, message: "Ticket successfully assigned!", severity: "success" });
//       fetchTickets(); // refresh the ticket list from server after assignment
//     } catch (err) {
//       console.error("Error assigning ticket:", err);
//       setSnackbar({ open: true, message: "Failed to assign ticket.", severity: "error" });
//     }
//   };

//   return (
//     <Box sx={{ padding: 4 }}>
//       <Typography variant="h4" gutterBottom>
//         Assign Tickets to Support Agents
//       </Typography>

//       {loading ? (
//         <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
//           <CircularProgress />
//         </Box>
//       ) : tickets.length === 0 ? (
//         <Typography variant="h6" color="text.secondary" align="center" mt={4}>
//           All tickets are assigned.
//         </Typography>
//       ) : (
//         <Grid container spacing={3}>
//           {tickets.map((ticket) => (
//             <Grid item xs={12} md={6} key={ticket._id}>
//               <Card variant="outlined" sx={{ borderRadius: 3, boxShadow: 2 }}>
//                 <CardContent>
//                   <Box display="flex" justifyContent="space-between" alignItems="center">
//                     <Typography variant="h6">{ticket.title}</Typography>
//                     <Tooltip title={ticket.status}>
//                       <Chip label={ticket.status} color="warning" size="small" />
//                     </Tooltip>
//                   </Box>

//                   <Typography variant="body2" color="text.secondary" sx={{ my: 1 }}>
//                     {ticket.description.length > 80
//                       ? ticket.description.slice(0, 80) + "..."
//                       : ticket.description}
//                   </Typography>

//                   <FormControl fullWidth sx={{ mt: 2 }}>
//                     <InputLabel>Assign to Agent</InputLabel>
//                     <Select
//                       value={assignments[ticket._id] || ""}
//                       label="Assign to Agent"
//                       onChange={(e) =>
//                         setAssignments({ ...assignments, [ticket._id]: e.target.value })
//                       }
//                     >
//                       {agents.map((agent) => (
//                         <MenuItem key={agent._id} value={agent._id}>
//                           {agent.name} ({agent.email})
//                         </MenuItem>
//                       ))}
//                     </Select>
//                   </FormControl>

//                   <Button
//                     variant="contained"
//                     color="primary"
//                     onClick={() => handleAssign(ticket._id)}
//                     disabled={!assignments[ticket._id]}
//                     sx={{ mt: 2 }}
//                   >
//                     Assign Ticket
//                   </Button>
//                 </CardContent>
//               </Card>
//             </Grid>
//           ))}
//         </Grid>
//       )}

//       <Snackbar
//         open={snackbar.open}
//         autoHideDuration={3000}
//         onClose={() => setSnackbar({ ...snackbar, open: false })}
//         anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
//       >
//         <Alert
//           severity={snackbar.severity}
//           variant="filled"
//           sx={{ width: "100%" }}
//           onClose={() => setSnackbar({ ...snackbar, open: false })}
//         >
//           {snackbar.message}
//         </Alert>
//       </Snackbar>
//     </Box>
//   );
// };

// export default AssignTickets;




// /pages/admin-dashboard/assign/index.jsx this is corrected

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import {
//   Box,
//   Card,
//   CardContent,
//   Typography,
//   MenuItem,
//   Select,
//   FormControl,
//   InputLabel,
//   Button,
//   Grid,
//   Snackbar,
//   Alert,
//   Chip,
// } from "@mui/material";

// const AssignTicketsPage = () => {
//   const [tickets, setTickets] = useState([]);
//   const [agents, setAgents] = useState([]);
//   const [assigned, setAssigned] = useState({});
//   const [successMessage, setSuccessMessage] = useState("");

//   useEffect(() => {
//     fetchUnassignedTickets();
//     fetchSupportAgents();
//   }, []);

//   const fetchUnassignedTickets = async () => {
//     try {
//       const res = await axios.get("http://localhost:3000/api/tickets", {
//         withCredentials: true,
//       });
//       const unassigned = res.data.filter((ticket) => !ticket.assignedTo);
//       setTickets(unassigned);
//     } catch (err) {
//       console.error("Error fetching tickets:", err);
//     }
//   };

//   const fetchSupportAgents = async () => {
//     try {
//       const res = await axios.get("http://localhost:3000/api/users/support-agents", {
//         withCredentials: true,
//       });
//       setAgents(res.data);
//     } catch (err) {
//       console.error("Error fetching agents:", err);
//     }
//   };

//   const handleAssign = async (ticketId) => {
//     try {
//       const agentId = assigned[ticketId];
//       if (!agentId) return;
//       await axios.patch(
//         `http://localhost:3000/api/tickets/${ticketId}/assign`,
//         { assignedTo: agentId },
//         { withCredentials: true }
//       );
//       setSuccessMessage("Ticket assigned successfully");
//       setTickets(tickets.filter((t) => t._id !== ticketId));
//     } catch (err) {
//       console.error("Assignment error:", err);
//     }
//   };

//   return (
//     <Box sx={{ p: 4 }}>
//       <Typography variant="h4" gutterBottom>
//         Assign Tickets
//       </Typography>

//       <Grid container spacing={3}>
//         {tickets.map((ticket) => (
//           <Grid item xs={12} md={6} lg={4} key={ticket._id}>
//             <Card
//               variant="outlined"
//               sx={{
//                 borderRadius: 3,
//                 boxShadow: 2,
//                 border: "1px solid #e0e0e0",
//               }}
//             >
//               <CardContent>
//                 <Typography variant="h6" gutterBottom>
//                   {ticket.title}
//                 </Typography>
//                 <Typography variant="body2" color="text.secondary" gutterBottom>
//                   {ticket.description.slice(0, 100)}...
//                 </Typography>
//                 <Typography variant="body2">
//                   <strong>Category:</strong> {ticket.category}
//                 </Typography>
//                 <Typography variant="body2">
//                   <strong>Priority:</strong> {ticket.priority}
//                 </Typography>

//                 <FormControl fullWidth sx={{ mt: 2 }}>
//                   <InputLabel>Assign to</InputLabel>
//                   <Select
//                     value={assigned[ticket._id] || ""}
//                     label="Assign to"
//                     onChange={(e) =>
//                       setAssigned({ ...assigned, [ticket._id]: e.target.value })
//                     }
//                   >
//                     {agents.map((agent) => (
//                       <MenuItem key={agent._id} value={agent._id}>
//                         {agent.name}
//                       </MenuItem>
//                     ))}
//                   </Select>
//                 </FormControl>

//                 <Button
//                   fullWidth
//                   sx={{ mt: 2 }}
//                   variant="contained"
//                   onClick={() => handleAssign(ticket._id)}
//                 >
//                   Assign Ticket
//                 </Button>
//               </CardContent>
//             </Card>
//           </Grid>
//         ))}
//       </Grid>

//       <Snackbar
//         open={!!successMessage}
//         autoHideDuration={4000}
//         onClose={() => setSuccessMessage("")}
//         anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
//       >
//         <Alert severity="success" variant="filled">
//           {successMessage}
//         </Alert>
//       </Snackbar>
//     </Box>
//   );
// };

// export default AssignTicketsPage;



// /pages/admin-dashboard/assign/index.jsx

import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Card,
  CardContent,
  Typography,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Button,
  Grid,
  Snackbar,
  Alert,
  Chip,
  Tooltip,
} from "@mui/material";

const statusColors = {
  Open: "warning",
  "In Progress": "info",
  Resolved: "success",
  Closed: "default",
};

const AssignTicketsPage = () => {
  const [tickets, setTickets] = useState([]);
  const [agents, setAgents] = useState([]);
  const [assigned, setAssigned] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    fetchUnassignedTickets();
    fetchSupportAgents();
  }, []);

  const fetchUnassignedTickets = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/tickets", {
        withCredentials: true,
      });
      const unassigned = res.data.filter((ticket) => !ticket.assignedTo);
      setTickets(unassigned);
    } catch (err) {
      console.error("Error fetching tickets:", err);
    }
  };

  const fetchSupportAgents = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/users/support-agents", {
        withCredentials: true,
      });
      setAgents(res.data);
    } catch (err) {
      console.error("Error fetching agents:", err);
    }
  };

  const handleAssign = async (ticketId) => {
    try {
      const agentId = assigned[ticketId];
      if (!agentId) return;
      await axios.patch(
        `http://localhost:3000/api/tickets/${ticketId}/assign`,
        { assignedTo: agentId },
        { withCredentials: true }
      );
      setSuccessMessage("Ticket assigned successfully");
      setTickets(tickets.filter((t) => t._id !== ticketId));
    } catch (err) {
      console.error("Assignment error:", err);
    }
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Assign Tickets
      </Typography>

      {tickets.length === 0 ? (
        <Typography variant="h6" align="center" color="text.secondary" sx={{ mt: 4 }}>
          All tickets are assigned 🎉
        </Typography>
      ) : (
        <Grid container spacing={3}>
          {tickets.map((ticket) => (
            <Grid item xs={12} md={6} lg={4} key={ticket._id}>
              <Card
                variant="outlined"
                sx={{
                  borderRadius: 3,
                  boxShadow: 2,
                  border: "1px solid #e0e0e0",
                }}
              >
                <CardContent>
                  <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                    <Typography variant="h6" gutterBottom>
                      {ticket.title}
                    </Typography>
                    <Tooltip title={ticket.status} arrow>
                      <Chip
                        label={ticket.status}
                        color={statusColors[ticket.status] || "default"}
                        size="small"
                      />
                    </Tooltip>
                  </Box>

                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    {ticket.description.slice(0, 100)}...
                  </Typography>
                  <Typography variant="body2">
                    <strong>Category:</strong> {ticket.category}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Priority:</strong> {ticket.priority}
                  </Typography>

                  <FormControl fullWidth sx={{ mt: 2 }}>
                    <InputLabel>Assign to</InputLabel>
                    <Select
                      value={assigned[ticket._id] || ""}
                      label="Assign to"
                      onChange={(e) =>
                        setAssigned({ ...assigned, [ticket._id]: e.target.value })
                      }
                    >
                      {agents.map((agent) => (
                        <MenuItem key={agent._id} value={agent._id}>
                          {agent.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>

                  <Button
                    fullWidth
                    sx={{ mt: 2 }}
                    variant="contained"
                    onClick={() => handleAssign(ticket._id)}
                  >
                    Assign Ticket
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      <Snackbar
        open={!!successMessage}
        autoHideDuration={4000}
        onClose={() => setSuccessMessage("")}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity="success" variant="filled">
          {successMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default AssignTicketsPage;
