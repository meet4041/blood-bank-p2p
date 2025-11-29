const BloodRequest = require('../models/BloodRequest');

exports.createBloodRequest = async (req, res) => {
  try {
    const request = new BloodRequest({
      ...req.body,
      requestedBy: req.user.id
    });

    const saved = await request.save();
    res.status(201).json({ success: true, data: saved });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.getAllRequests = async (req, res) => {
  try {
    const filters = {};
    if (req.query.bloodGroup) filters.bloodGroup = req.query.bloodGroup;
    if (req.query.city) filters.city = req.query.city;

    const requests = await BloodRequest.find(filters).populate('requestedBy', 'name email');
    res.status(200).json({ success: true, data: requests });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.getRequestById = async (req, res) => {
  try {
    const request = await BloodRequest.findById(req.params.id);
    if (!request) return res.status(404).json({ success: false, error: "Request not found" });
    res.status(200).json({ success: true, data: request });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.updateBloodRequest = async (req, res) => {
  try {
    const updated = await BloodRequest.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updated) return res.status(404).json({ success: false, error: "Request not found" });

    res.status(200).json({ success: true, data: updated });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.patchBloodRequest = async (req, res) => {
  try {
    const updated = await BloodRequest.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updated) return res.status(404).json({ success: false, error: "Request not found" });

    res.status(200).json({ success: true, data: updated });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.deleteBloodRequest = async (req, res) => {
  try {
    const removed = await BloodRequest.findByIdAndDelete(req.params.id);
    if (!removed) return res.status(404).json({ success: false, error: "Request not found" });
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.updateStatus = async (req, res) => {
  try {
    const { status } = req.body; 

    const updated = await BloodRequest.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!updated) return res.status(404).json({ success: false, error: "Request not found" });

    res.status(200).json({ success: true, data: updated });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
