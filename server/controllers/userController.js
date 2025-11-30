const User = require('../models/User');

// Get all standard Users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({ role: 'user' }).select('-password').sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: users });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Get all Hospitals
exports.getAllHospitals = async (req, res) => {
  try {
    const hospitals = await User.find({ role: 'hospital' }).select('-password').sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: hospitals });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Delete a User or Hospital
exports.deleteUser = async (req, res) => {
  try {
    const userToDelete = await User.findById(req.params.id);

    if (!userToDelete) {
      return res.status(404).json({ success: false, error: "User not found" });
    }

    // Prevent Admin from deleting themselves (optional safety)
    if (userToDelete._id.toString() === req.user.id) {
       return res.status(400).json({ success: false, error: "You cannot delete your own admin account." });
    }

    await userToDelete.deleteOne();
    res.status(200).json({ success: true, message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};