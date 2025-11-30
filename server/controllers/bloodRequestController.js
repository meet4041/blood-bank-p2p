const BloodRequest = require('../models/BloodRequest');

/**************************************
 * CREATE BLOOD REQUEST (User)
 **************************************/
exports.createBloodRequest = async (req, res) => {
  try {
    if (req.user.role !== "user") {
      return res.status(403).json({ success: false, error: "Only users can create requests" });
    }

    const request = new BloodRequest({
      ...req.body,
      requestedBy: req.user.id,
      status: "pending"
    });

    const saved = await request.save();
    res.status(201).json({ success: true, data: saved });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

/**************************************
 * GET ALL REQUESTS
 **************************************/
exports.getAllRequests = async (req, res) => {
  try {
    const filters = {};
    if (req.query.bloodGroup) filters.bloodGroup = req.query.bloodGroup;
    if (req.query.city) filters.city = req.query.city;

    const requests = await BloodRequest.find(filters)
      .populate("requestedBy", "name email");
    
    res.status(200).json({ success: true, data: requests });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

/**************************************
 * GET REQUEST BY ID
 **************************************/
exports.getRequestById = async (req, res) => {
  try {
    const request = await BloodRequest.findById(req.params.id)
      .populate("requestedBy", "name email");

    if (!request) return res.status(404).json({ success: false, error: "Request not found" });

    res.status(200).json({ success: true, data: request });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

/**************************************
 * UPDATE BLOOD REQUEST
 * - Users: own requests, cannot change status
 * - Admin: can update all fields
 **************************************/
exports.updateBloodRequest = async (req, res) => {
  try {
    const request = await BloodRequest.findById(req.params.id);
    if (!request) return res.status(404).json({ success: false, error: "Request not found" });

    if (req.user.role === "user" && request.requestedBy.toString() !== req.user.id) {
      return res.status(403).json({ success: false, error: "Not authorized" });
    }

    // Users cannot modify status
    if (req.user.role === "user") delete req.body.status;

    Object.assign(request, req.body);
    const updated = await request.save();
    res.status(200).json({ success: true, data: updated });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

/**************************************
 * DELETE BLOOD REQUEST
 * - Users: own requests
 * - Admin: can delete
 **************************************/
exports.deleteBloodRequest = async (req, res) => {
  try {
    const request = await BloodRequest.findById(req.params.id);
    if (!request) return res.status(404).json({ success: false, error: "Request not found" });

    if (req.user.role === "user" && request.requestedBy.toString() !== req.user.id) {
      return res.status(403).json({ success: false, error: "Not authorized" });
    }

    await request.deleteOne();
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

/**************************************
 * UPDATE STATUS (Hospital / Admin)
 **************************************/
exports.updateStatus = async (req, res) => {
  try {
    if (!["hospital", "admin"].includes(req.user.role)) {
      return res.status(403).json({ success: false, error: "Only hospital/admin can update status" });
    }

    const { status } = req.body;
    const allowedStatuses = ["pending", "approved", "processing", "fulfilled", "rejected", "closed"];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({ success: false, error: "Invalid status" });
    }

    const request = await BloodRequest.findById(req.params.id);
    if (!request) return res.status(404).json({ success: false, error: "Request not found" });

    request.status = status;
    request.processedBy = req.user.id;
    request.processedAt = new Date();

    const updated = await request.save();
    res.status(200).json({ success: true, data: updated });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

/**************************************
 * PATCH BLOOD REQUEST
 * - Users: partial update of own request (cannot change status)
 * - Admin/Hospital: partial update of any request
 **************************************/
exports.patchBloodRequest = async (req, res) => {
  try {
    const request = await BloodRequest.findById(req.params.id);
    if (!request) return res.status(404).json({ success: false, error: "Request not found" });

    // Ownership check for users
    if (req.user.role === "user" && request.requestedBy.toString() !== req.user.id) {
      return res.status(403).json({ success: false, error: "Not authorized" });
    }

    // Users cannot modify status
    if (req.user.role === "user") delete req.body.status;

    Object.assign(request, req.body); // only updates provided fields
    const updated = await request.save();

    res.status(200).json({ success: true, data: updated });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
