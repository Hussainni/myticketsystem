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


//   tickets with filters (admin/support)
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

    const tickets = await Ticket.find(filter)
      .populate("createdBy", "name email")
      .populate("assignedTo", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json(tickets);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch tickets", error: error.message });
  }
};



export const getTicketById = async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id)
      .populate("createdBy", "name email")
      .populate("assignedTo", "name email");

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
  const { assignedTo } = req.body;

  try {
    const ticket = await Ticket.findById(req.params.id);
    if (!ticket) return res.status(404).json({ message: "Ticket not found" });

    ticket.assignedTo = assignedTo;
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



// export const getTicketStats = async (req, res) => {
//   try {
//     const totalTickets = await Ticket.countDocuments();

//     const openCount = await Ticket.countDocuments({ status: "Open" });
//     const inProgressCount = await Ticket.countDocuments({ status: "In Progress" });
//     const resolvedCount = await Ticket.countDocuments({ status: "Resolved" });
//     const closedCount = await Ticket.countDocuments({ status: "Closed" });

//     const resolvedTickets = await Ticket.find({ status: "Resolved" });

//     let totalTime = 0;

//     resolvedTickets.forEach(ticket => {
//       const created = new Date(ticket.createdAt);
//       const updated = new Date(ticket.updatedAt);
//       const diffInMs = updated - created;
//       const diffInDays = diffInMs / (1000 * 60 * 60 * 24);
//       totalTime += diffInDays;
//     });

//     const avgResolutionTimeInDays = resolvedTickets.length ? (totalTime / resolvedTickets.length).toFixed(1) : 0;

//     res.status(200).json({
//       totalTickets,
//       statusCounts: {
//         Open: openCount,
//         "In Progress": inProgressCount,
//         Resolved: resolvedCount,
//         Closed: closedCount,
//       },
//       avgResolutionTimeInDays,
//     });
//   } catch (error) {
//     res.status(500).json({ message: "Failed to get ticket stats", error: error.message });
//   }
// };



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
