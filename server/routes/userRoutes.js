import express from 'express';
import {
  searchDonors,
  updateAvailability,
  getUnverifiedHospitals,
  verifyHospital,
} from '../controllers/userController.js';
import { protect } from '../middlewares/authMiddleware.js'; // Our gatekeeper

const router = express.Router();

// --- Hospital Route ---
// GET /api/users/donors?city=...&bloodGroup=...
router.get('/donors', protect, searchDonors);

// --- Donor Route ---
// PUT /api/users/availability
router.put('/availability', protect, updateAvailability);

// --- Admin Routes ---
// GET /api/users/unverified-hospitals
router.get('/unverified-hospitals', protect, getUnverifiedHospitals);

// PUT /api/users/verify-hospital/60d...
router.put('/verify-hospital/:id', protect, verifyHospital);

export default router;