const Donor = require('../models/Donor');

/**************************************
 * GET ALL DONORS (Public)
 **************************************/
exports.getAllDonors = async (req, res) => {
  try {
    const filters = {};
    if (req.query.bloodGroup) filters.bloodGroup = req.query.bloodGroup;
    if (req.query.city) filters.city = req.query.city;

    const donors = await Donor.find(filters).populate("addedBy", "name email role");
    res.status(200).json({ success: true, data: donors });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

/**************************************
 * GET DONOR BY ID
 **************************************/
exports.getDonorById = async (req, res) => {
  try {
    const donor = await Donor.findById(req.params.id).populate("addedBy", "name email role");
    if (!donor) return res.status(404).json({ success: false, error: "Donor not found" });

    res.status(200).json({ success: true, data: donor });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

/**************************************
 * CREATE DONOR
 * - Users: unverified
 * - Hospitals: auto-verified for self, can create for others
 **************************************/
exports.createDonor = async (req, res) => {
  try {
    let verified = false;
    let verifiedBy = null;
    let verifiedAt = null;

    let addedBy = req.user.id;

    if (req.user.role === "hospital") {
      if (req.body.addedBy) addedBy = req.body.addedBy;
      if (addedBy.toString() === req.user.id) {
        verified = true;
        verifiedBy = req.user.id;
        verifiedAt = new Date();
      }
    }

    const donor = new Donor({
      ...req.body,
      addedBy,
      verified,
      verifiedBy,
      verifiedAt
    });

    const saved = await donor.save();
    res.status(201).json({ success: true, data: saved });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

/**************************************
 * MODIFY DONOR (PUT/PATCH)
 * - Users: only own donors, cannot modify verified
 * - Admin/Hospital: can update all fields
 **************************************/
const modifyDonor = async (req, res) => {
  try {
    const donor = await Donor.findById(req.params.id);
    if (!donor) return res.status(404).json({ success: false, error: "Donor not found" });

    if (req.user.role === "user") {
      if (donor.addedBy.toString() !== req.user.id) {
        return res.status(403).json({ success: false, error: "Not authorized to update this donor" });
      }
    }

    // PROTECT VERIFICATION FIELDS - No one can modify these directly via update/patch
    // Only the verifyDonor endpoint should change verification status
    delete req.body.verified;
    delete req.body.verifiedBy;
    delete req.body.verifiedAt;

    // Update donor with remaining fields
    Object.keys(req.body).forEach(key => {
      donor[key] = req.body[key];
    });

    const updated = await donor.save();

    res.status(200).json({ success: true, data: updated });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.updateDonor = modifyDonor;
exports.patchDonor = modifyDonor;

/**************************************
 * DELETE DONOR
 * - Users: only own
 * - Admin/Hospital: can delete
 **************************************/
exports.deleteDonor = async (req, res) => {
  try {
    const donor = await Donor.findById(req.params.id);
    if (!donor) return res.status(404).json({ success: false, error: "Donor not found" });

    if (req.user.role === "user" && donor.addedBy.toString() !== req.user.id) {
      return res.status(403).json({ success: false, error: "Not authorized" });
    }

    await donor.deleteOne();
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

/**************************************
 * VERIFY DONOR
 * - Only hospital or admin
 **************************************/
exports.verifyDonor = async (req, res) => {
  try {
    if (!["hospital", "admin"].includes(req.user.role)) {
      return res.status(403).json({ success: false, error: "Only hospital/admin can verify donors" });
    }

    const donor = await Donor.findById(req.params.id);
    if (!donor) return res.status(404).json({ success: false, error: "Donor not found" });

    donor.verified = true;
    donor.verifiedBy = req.user.id;
    donor.verifiedAt = new Date();

    const updated = await donor.save();
    res.status(200).json({ success: true, data: updated });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
