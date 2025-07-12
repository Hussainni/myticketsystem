import User from "../models/User.model.js";


export const getCurrentUser = (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: "Not authenticated" });
  }
  res.status(200).json(req.user);
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch users", error: err.message });
  }
};

export const updateUserRole = async (req, res) => {
  const { role } = req.body;

  const validRoles = ["admin", "employee", "support"];
  if (!validRoles.includes(role)) {
    return res.status(400).json({ message: "Invalid role provided" });
  }

  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.role = role;
    await user.save();

    res.status(200).json({ message: "User role updated successfully", user });
  } catch (err) {
    res.status(500).json({ message: "Failed to update role", error: err.message });
  }
};


export const getSupportAgents = async (req, res) => {
  try {
    const agents = await User.find({ role: "support" }).select("-password");
    res.status(200).json(agents);
  } catch (err) {
    res.status(500).json({ message: "Error fetching support agents", error: err.message });
  }
};