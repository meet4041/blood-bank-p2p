const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const {
  createDonor,
  getAllDonors,
  getDonorById,
  updateDonor,
  patchDonor,
  deleteDonor
} = require('../controllers/donorController'); 

router.get('/', getAllDonors);

router.get('/:id', getDonorById);

router.post('/', authMiddleware, createDonor);

router.put('/:id', authMiddleware, updateDonor);

router.patch('/:id', authMiddleware, patchDonor);

router.delete('/:id', authMiddleware, deleteDonor);

module.exports = router;
