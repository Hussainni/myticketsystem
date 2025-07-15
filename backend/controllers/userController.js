import User from "../models/User.model.js";
import bcrypt from "bcryptjs"

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

export const updateProfile = async (req, res) => {
  try {
    const userId = req.user._id;
    const { name, email } = req.body;

    if (!name || !email) {
      return res.status(400).json({ message: 'Name and email are required.' });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { name, email }
    ).select('-password');

    res.json({
      message: 'Profile updated successfully.',
      user: updatedUser,
    });
  } catch (err) {
    console.error('Error updating profile:', err);
    res.status(500).json({ message: 'Server error while updating profile.' });
  }
};


export const changePassword = async (req, res) => {
  const userId = req.user._id;
  const { currentPassword, newPassword, confirmNewPassword } = req.body;

  if (!currentPassword || !newPassword || !confirmNewPassword) {
    return res.status(400).json({ message: "All fields are required." });
  }

  if (newPassword !== confirmNewPassword) {
    return res.status(400).json({ message: "New passwords do not match." });
  }

  try {
    const user = await User.findById(userId).select("+password");
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Current password is incorrect." });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    return res.json({ message: "Password updated successfully." });
  } catch (err) {
    console.error("Detailed error changing password:", err);
    return res.status(500).json({ message: "Server error while updating password." });
  }
};
 