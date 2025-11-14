import Request from '../models/requestModel.js';
import User from '../models/userModel.js';

/**
 * @desc    Create a new donation request
 * @route   POST /api/requests
 * @access  Private (Verified Hospitals only)
 */
export const createRequest = async (req, res) => {
  try {
    // Check if user is a verified hospital
    if (req.user.role !== 'hospital' || !req.user.isVerified) {
      return res.status(403).json({ message: 'Access denied. Verified hospitals only.' });
    }

    const { donorId, bloodGroupNeeded, message } = req.body;

    // Check if the donor exists and is available
    const donor = await User.findById(donorId);
    if (!donor || donor.role !== 'donor' || donor.availability !== 'available') {
      return res.status(404).json({ message: 'Donor not found or is unavailable.' });
    }

    // Create the new request
    const newRequest = new Request({
      hospital: req.user._id, // The logged-in hospital
      donor: donorId,
      bloodGroupNeeded,
      message,
    });

    const savedRequest = await newRequest.save();
    res.status(201).json(savedRequest);
  } catch (error) {
    res.status(500).json({ message: `Server Error: ${error.message}` });
  }
};

/**
 * @desc    Get all requests sent *by* the logged-in hospital
 * @route   GET /api/requests/outgoing
 * @access  Private (Hospitals only)
 */
export const getOutgoingRequests = async (req, res) => {
  try {
    if (req.user.role !== 'hospital') {
      return res.status(403).json({ message: 'Access denied. Hospitals only.' });
    }

    const requests = await Request.find({ hospital: req.user._id })
      .populate('donor', 'name city bloodGroup') // Get donor's info
      .sort({ createdAt: -1 }); // Show newest first

    res.status(200).json(requests);
  } catch (error) {
    res.status(500).json({ message: `Server Error: ${error.message}` });
  }
};

/**
 * @desc    Get all requests sent *to* the logged-in donor
 * @route   GET /api/requests/incoming
 * @access  Private (Donors only)
 */
export const getIncomingRequests = async (req, res) => {
  try {
    if (req.user.role !== 'donor') {
      return res.status(403).json({ message: 'Access denied. Donors only.' });
    }

    const requests = await Request.find({ donor: req.user._id })
      .populate('hospital', 'name city phone') // Get hospital's info
      .sort({ createdAt: -1 });

    res.status(200).json(requests);
  } catch (error) {
    res.status(500).json({ message: `Server Error: ${error.message}` });
  }
};

/**
 * @desc    Update a request status (approve/reject)
 * @route   PUT /api/requests/:id
 * @access  Private (Donors only)
 */
export const updateRequestStatus = async (req, res) => {
  try {
    if (req.user.role !== 'donor') {
      return res.status(403).json({ message: 'Access denied. Donors only.' });
    }

    const { status } = req.body;
    if (!['approved', 'rejected'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status.' });
    }

    const request = await Request.findById(req.params.id);

    if (!request) {
      return res.status(404).json({ message: 'Request not found.' });
    }

    // Check if the logged-in donor is the one this request was sent to
    if (request.donor.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'User not authorized.' });
    }

    // Don't allow updating an already-actioned request
    if (request.status !== 'pending') {
      return res.status(400).json({ message: `Request already ${request.status}.`});
    }

    request.status = status;

    // --- IMPORTANT LOGIC ---
    // If approved, set the donor's availability to 'unavailable'
    if (status === 'approved') {
      await User.findByIdAndUpdate(req.user._id, { availability: 'unavailable' });
    }

    const updatedRequest = await request.save();
    res.status(200).json(updatedRequest);
  } catch (error) {
    res.status(500).json({ message: `Server Error: ${error.message}` });
  }
};