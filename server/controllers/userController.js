import User from '../models/userModel.js';

/**
 * @desc    Search for available donors
 * @route   GET /api/users/donors
 * @access  Private (Hospitals only)
 */
export const searchDonors = async (req, res) => {
  try {
    // Check if the logged-in user is a verified hospital
    if (req.user.role !== 'hospital' || !req.user.isVerified) {
      return res.status(403).json({ message: 'Access denied. Verified hospitals only.' });
    }

    const { city, bloodGroup } = req.query;

    // Build the search query
    const query = {
      role: 'donor',
      availability: 'available',
    };

    if (city) {
      query.city = city;
    }
    if (bloodGroup) {
      query.bloodGroup = bloodGroup;
    }

    // Find donors but only send back non-sensitive info
    const donors = await User.find(query).select(
      'name city bloodGroup phone'
    );

    res.status(200).json(donors);
  } catch (error) {
    res.status(500).json({ message: `Server Error: ${error.message}` });
  }
};

/**
 * @desc    Update donor's own availability
 * @route   PUT /api/users/availability
 * @access  Private (Donors only)
 */
export const updateAvailability = async (req, res) => {
  try {
    // Check if the user is a donor
    if (req.user.role !== 'donor') {
      return res.status(403).json({ message: 'Access denied. Donors only.' });
    }
    
    const { availability } = req.body;

    if (!['available', 'unavailable'].includes(availability)) {
      return res.status(400).json({ message: 'Invalid availability status.' });
    }

    // Find the logged-in user and update their status
    const user = await User.findById(req.user._id);
    user.availability = availability;
    await user.save();

    res.status(200).json({ message: 'Availability updated successfully', user });
  } catch (error) {
    res.status(500).json({ message: `Server Error: ${error.message}` });
  }
};

/**
 * @desc    Get unverified hospitals (for Admin)
 * @route   GET /api/users/unverified-hospitals
 * @access  Private (Admin only)
 */
export const getUnverifiedHospitals = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied. Admin only.' });
    }

    const hospitals = await User.find({
      role: 'hospital',
      isVerified: false,
    }).select('name email phone registrationID');

    res.status(200).json(hospitals);
  } catch (error) {
    res.status(500).json({ message: `Server Error: ${error.message}` });
  }
};

/**
 * @desc    Verify a hospital (for Admin)
 * @route   PUT /api/users/verify-hospital/:id
 * @access  Private (Admin only)
 */
export const verifyHospital = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied. Admin only.' });
    }

    const hospital = await User.findById(req.params.id);

    if (!hospital || hospital.role !== 'hospital') {
      return res.status(404).json({ message: 'Hospital not found.' });
    }

    hospital.isVerified = true;
    await hospital.save();

    res.status(200).json({ message: 'Hospital verified successfully.' });
  } catch (error) {
    res.status(500).json({ message: `Server Error: ${error.message}` });
  }
};