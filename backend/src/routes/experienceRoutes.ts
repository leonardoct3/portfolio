import { Router } from 'express';
import { requireApiKey } from '../middleware/auth.js';
import {
    getExperiences,
    getExperienceById,
    createExperience,
    updateExperience,
    deleteExperience
} from '../controllers/experienceController.js';

const router = Router();

// GET /api/experiences - Get all experiences
router.get('/', getExperiences);

// GET /api/experiences/:id - Get experience by ID
router.get('/:id', getExperienceById);

// POST /api/experiences - Create new experience
router.post('/', requireApiKey, createExperience);

// PUT /api/experiences/:id - Update experience
router.put('/:id', requireApiKey, updateExperience);

// DELETE /api/experiences/:id - Delete experience
router.delete('/:id', requireApiKey, deleteExperience);

export default router;
