import express from 'express';
import {
  createRequest,
  getOutgoingRequests,
  getIncomingRequests,
  updateRequestStatus,
} from '../controllers/requestController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

// All routes here are protected
router.use(protect);

// --- Hospital Route ---
// POST /api/requests
router.post('/', createRequest);

// GET /api/requests/outgoing
router.get('/outgoing', getOutgoingRequests);

// --- Donor Routes ---
// GET /api/requests/incoming
router.get('/incoming', getIncomingRequests);

// PUT /api/requests/60d...
router.put('/:id', updateRequestStatus);

export default router;