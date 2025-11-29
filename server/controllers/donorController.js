const Donor = require('../models/Donor');

exports.getAllDonors = async (req, res) => {
  try {
    const filters = {};
    if (req.query.bloodGroup) filters.bloodGroup = req.query.bloodGroup;
    if (req.query.city) filters.city = req.query.city;

    const donors = await Donor.find(filters);
    res.status(200).json({ success: true, data: donors });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.getDonorById = async (req, res) => {
  try {
    const donor = await Donor.findById(req.params.id);
    if (!donor) return res.status(404).json({ success: false, error: "Donor not found" });
    res.status(200).json({ success: true, data: donor });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.createDonor = async (req, res) => {
  try {
    const donor = new Donor({
      ...req.body,
      addedBy: req.user.id,
    });

    const saved = await donor.save();
    res.status(201).json({ success: true, data: saved });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.updateDonor = async (req, res) => {
  try {
    const donor = await Donor.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!donor) return res.status(404).json({ success: false, error: "Donor not found" });
    res.status(200).json({ success: true, data: donor });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.patchDonor = async (req, res) => {
  try {
    const donor = await Donor.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!donor) return res.status(404).json({ success: false, error: "Donor not found" });
    res.status(200).json({ success: true, data: donor });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.deleteDonor = async (req, res) => {
  try {
    const donor = await Donor.findByIdAndDelete(req.params.id);
    if (!donor) return res.status(404).json({ success: false, error: "Donor not found" });
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
