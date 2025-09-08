import Ticket from "../models/Ticket.model.js";

export const createTicket = async (req, res) => {
  const { title, description, category, priority } = req.body;

  try {
    const ticket = new Ticket({
      title,
      description,
      category,
      priority,
      createdBy: req.user._id,
    });

    await ticket.save();
    res.status(201).json(ticket);
  } catch (error) {
    res.status(500).json({ message: "Failed to create ticket", error: error.message });
  }
};

 
export const getMyTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find({ createdBy: req.user._id });
    res.status(200).json(tickets);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch tickets", error: error.message });
  }
};


export const getAllTickets = async (req, res) => {
  try {
    const { status, priority, category, assignedTo, search, dateFrom, dateTo } = req.query;

    const filter = {};

    if (status) filter.status = status;
    if (priority) filter.priority = priority;
    if (category) filter.category = category;
    if (assignedTo) filter.assignedTo = assignedTo;

    if (search) {
      filter.title = { $regex: search, $options: "i" };
    }

    if (dateFrom || dateTo) {
      filter.createdAt = {};
      if (dateFrom) filter.createdAt.$gte = new Date(dateFrom);
      if (dateTo) filter.createdAt.$lte = new Date(dateTo);
    }

    const tickets = await Ticket.find(filter).populate("createdBy", "name email").populate("assignedTo", "name email").sort({ createdAt: -1 });

    res.status(200).json(tickets);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch tickets", error: error.message });
  }
};


export const getTicketById = async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id).populate("createdBy", "name email role").populate("assignedTo", "name email role");

    if (!ticket) return res.status(404).json({ message: "Ticket not found" });

    res.status(200).json(ticket);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving ticket", error: error.message });
  }
};

 
export const updateTicketStatus = async (req, res) => {
  const { status } = req.body;
  const validStatus = ["Open", "In Progress", "Resolved", "Closed"];

  if (!validStatus.includes(status)) {
    return res.status(400).json({ message: "Invalid status" });
  }

  try {
    const ticket = await Ticket.findById(req.params.id);
    if (!ticket) return res.status(404).json({ message: "Ticket not found" });

    ticket.status = status;
    await ticket.save();

    res.status(200).json({ message: "Status updated", ticket });
  } catch (error) {
    res.status(500).json({ message: "Failed to update status", error: error.message });
  }
};

 
export const assignTicket = async (req, res) => {
  const { assignedTo, priority } = req.body;

  try {
    const ticket = await Ticket.findById(req.params.id);
    if (!ticket) return res.status(404).json({ message: "Ticket not found" });

    ticket.assignedTo = assignedTo;
    ticket.priority = priority
    await ticket.save();

    res.status(200).json({ message: "Ticket assigned", ticket });
  } catch (error) {
    res.status(500).json({ message: "Failed to assign ticket", error: error.message });
  }
};


export const updateInternalNotes = async (req, res) => {
  const { internalNotes } = req.body;

  try {
    const ticket = await Ticket.findById(req.params.id);

    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }

    ticket.internalNotes = internalNotes;
    await ticket.save();

    res.status(200).json({ message: "Internal notes updated", ticket });
  } catch (error) {
    res.status(500).json({ message: "Failed to update notes", error: error.message });
  }
};
 

export const getTicketStats = async (req, res) => {
  try {
    const totalTickets = await Ticket.countDocuments();

    const openCount = await Ticket.countDocuments({ status: "Open" });
    const inProgressCount = await Ticket.countDocuments({ status: "In Progress" });
    const resolvedCount = await Ticket.countDocuments({ status: "Resolved" });
    const closedCount = await Ticket.countDocuments({ status: "Closed" });

    const resolvedTickets = await Ticket.find({ status: "Resolved" });

    let totalTime = 0;
    resolvedTickets.forEach(ticket => {
      const created = new Date(ticket.createdAt);
      const updated = new Date(ticket.updatedAt);
      const diffInMs = updated - created;
      const diffInDays = diffInMs / (1000 * 60 * 60 * 24);
      totalTime += diffInDays;
    });

    const avgResolutionTimeInDays = resolvedTickets.length
      ? (totalTime / resolvedTickets.length).toFixed(1)
      : 0;

    // 📊 Tickets by Category
    const categoryAggregation = await Ticket.aggregate([
      { $group: { _id: "$category", count: { $sum: 1 } } },
    ]);
    const categoryCounts = categoryAggregation.map(item => ({
      category: item._id,
      count: item.count,
    }));

    // 📈 Tickets Over Time
    const timelineAggregation = await Ticket.aggregate([
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
          },
          count: { $sum: 1 },
        },
      },
      { $sort: { "_id": 1 } },
    ]);
    const ticketsOverTime = timelineAggregation.map(item => ({
      date: item._id,
      count: item.count,
    }));

    res.status(200).json({
      totalTickets,
      statusCounts: {
        Open: openCount,
        "In Progress": inProgressCount,
        Resolved: resolvedCount,
        Closed: closedCount,
      },
      avgResolutionTimeInDays,
      categoryCounts,
      ticketsOverTime,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to get ticket stats", error: error.message });
  }
};


export const fetchAssignedTickets = async (req, res) => {
  try {
    const userId = req.user?._id;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized: No user ID found" });
    }

    const tickets = await Ticket.find({ assignedTo: userId }).sort({ createdAt: -1 });

    res.status(200).json(tickets);
  } catch (error) {
    console.error("Error fetching assigned tickets:", error);
    res.status(500).json({ message: "Server error while fetching assigned tickets." });
  }
};


export const getEmployeeTicketStats = async (req, res) => {
  try {
    const userId = req.user._id;  

    const tickets = await Ticket.find({ createdBy: userId });

    const totalTickets = tickets.length;

    const statusCounts = tickets.reduce((acc, ticket) => {
      acc[ticket.status] = (acc[ticket.status] || 0) + 1;
      return acc;
    }, {});

    const categoryCountsMap = tickets.reduce((acc, ticket) => {
      acc[ticket.category] = (acc[ticket.category] || 0) + 1;
      return acc;
    }, {});

    const categoryCounts = Object.entries(categoryCountsMap).map(([category, count]) => ({
      category,
      count,
    }));

    const ticketsOverTimeMap = tickets.reduce((acc, ticket) => {
      const date = new Date(ticket.createdAt).toISOString().split("T")[0];
      acc[date] = (acc[date] || 0) + 1;
      return acc;
    }, {});

    const ticketsOverTime = Object.entries(ticketsOverTimeMap).map(([date, count]) => ({
      date,
      count,
    }));

    const resolvedTickets = tickets.filter((t) => t.status === "Resolved" && t.resolvedAt);
    let avgResolutionTimeInDays = null;

    if (resolvedTickets.length > 0) {
      const totalDays = resolvedTickets.reduce((sum, ticket) => {
        const created = new Date(ticket.createdAt);
        const resolved = new Date(ticket.resolvedAt);
        return sum + (resolved - created) / (1000 * 60 * 60 * 24); 
      }, 0);

      avgResolutionTimeInDays = (totalDays / resolvedTickets.length).toFixed(1);
    }

    res.status(200).json({
      totalTickets,
      statusCounts,
      categoryCounts,
      ticketsOverTime,
      avgResolutionTimeInDays,
    });
  } catch (err) {
    console.error("Employee Stats Error:", err);
    res.status(500).json({ error: "Failed to fetch employee stats" });
  }
};


export const getSupportAgentStats = async (req, res) => {
  try {
    const userId = req.user._id;  

    const tickets = await Ticket.find({ assignedTo: userId });

    const statusCounts = {
      Open: 0,
      "In Progress": 0,
      Resolved: 0,
      Closed: 0,
    };

    tickets.forEach((t) => {
      if (statusCounts[t.status] !== undefined) {
        statusCounts[t.status]++;
      }
    });

    const categoryCounts = {};

    tickets.forEach((t) => {
      categoryCounts[t.category] = (categoryCounts[t.category] || 0) + 1;
    });

    const resolvedTickets = tickets.filter((t) => t.status === "Resolved" && t.resolvedAt);
    let avgResolutionTimeInDays = "N/A";
    if (resolvedTickets.length > 0) {
      const totalTime = resolvedTickets.reduce((acc, ticket) => {
        const created = new Date(ticket.createdAt);
        const resolved = new Date(ticket.resolvedAt);
        const timeInDays = (resolved - created) / (1000 * 60 * 60 * 24);
        return acc + timeInDays;
      }, 0);
      avgResolutionTimeInDays = (totalTime / resolvedTickets.length).toFixed(1);
    }

    const ticketsOverTime = {};
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const key = date.toISOString().slice(0, 10); 
      ticketsOverTime[key] = 0;
    }
    tickets.forEach((ticket) => {
      const key = new Date(ticket.createdAt).toISOString().slice(0, 10);
      if (ticketsOverTime[key] !== undefined) {
        ticketsOverTime[key]++;
      }
    });

    const ticketsOverTimeArray = Object.entries(ticketsOverTime).map(([date, count]) => ({
      date,
      count,
    }));

 
    res.json({
      totalTickets: tickets.length,
      statusCounts,
      categoryCounts: Object.entries(categoryCounts).map(([category, count]) => ({
        category,
        count,
      })),
      avgResolutionTimeInDays,
      ticketsOverTime: ticketsOverTimeArray,
    });
  } catch (err) {
    console.error("Error in support-agent stats:", err);
    res.status(500).json({ error: "Server error" });
  }
};
