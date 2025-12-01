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

router.get('/', getAllDonors);
router.get('/:id', getDonorById);

// CHANGE THIS LINE: Remove 'hospital', add 'user'
// This allows Users to add donors, but stops Hospitals from doing so.
router.post('/', authMiddleware, roleMiddleware.allowRoles('admin', 'user'), createDonor);

router.put('/:id', authMiddleware, roleMiddleware.allowRoles('admin', 'hospital', 'user'), updateDonor);
router.patch('/:id', authMiddleware, roleMiddleware.allowRoles('admin', 'hospital', 'user'), patchDonor);
router.delete('/:id', authMiddleware, roleMiddleware.allowRoles('admin', 'hospital', 'user'), deleteDonor);
router.patch('/:id/verify', authMiddleware, roleMiddleware.allowRoles('admin', 'hospital'), verifyDonor);

module.exports = router;