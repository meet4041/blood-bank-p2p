const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');

const {
  createBloodRequest,
  getAllRequests,
  getRequestById,
  updateBloodRequest,
  patchBloodRequest,
  deleteBloodRequest,
  updateStatus
} = require('../controllers/bloodRequestController'); 
router.get('/', getAllRequests);

router.get('/:id', getRequestById);

router.post('/', authMiddleware, createBloodRequest);

router.put('/:id', authMiddleware, updateBloodRequest);

router.patch('/:id', authMiddleware, patchBloodRequest);

router.patch('/:id/status', authMiddleware, updateStatus);

router.delete('/:id', authMiddleware, deleteBloodRequest);

module.exports = router;
