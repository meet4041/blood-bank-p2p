const express = require('express');
const router = express.Router();

const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

const {
  createDonor,
  getAllDonors,
  getDonorById,
  updateDonor,
  patchDonor,
  deleteDonor,
  verifyDonor
} = require('../controllers/donorController');

// Public — view donors
router.get('/', getAllDonors);
router.get('/:id', getDonorById);

// Protected routes — authenticated + roles

// CHANGED: Removed 'hospital'. Now effectively restricted (or you can add 'admin' back if needed).
// If no roles are passed, roleMiddleware might block all or allow none depending on implementation.
// Assuming we strictly don't want hospitals:
router.post('/', authMiddleware, roleMiddleware.allowRoles('admin'), createDonor); 
// Note: I added 'admin' back as a fallback so the route isn't completely broken/unreachable 
// in case an Admin needs to do it via API tools, but based on your request, Hospital is removed.

router.put('/:id', authMiddleware, roleMiddleware.allowRoles('admin', 'hospital', 'user'), updateDonor);
router.patch('/:id', authMiddleware, roleMiddleware.allowRoles('admin', 'hospital', 'user'), patchDonor);
router.delete('/:id', authMiddleware, roleMiddleware.allowRoles('admin', 'hospital', 'user'), deleteDonor);

// Hospital/Admin only — verify donor
router.patch('/:id/verify', authMiddleware, roleMiddleware.allowRoles('admin', 'hospital'), verifyDonor);

module.exports = router;