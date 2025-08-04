import { Router } from 'express';
import { 
    createContactMessage, 
    getContactMessages, 
    deleteContactMessage 
} from '../controllers/contactController.js';

const router = Router();

// POST /api/contact - Create a new contact message
router.post('/', createContactMessage);

// GET /api/contact - Get all contact messages (admin only)
router.get('/', getContactMessages);

// DELETE /api/contact/:id - Delete contact message by ID (admin only)
router.delete('/:id', deleteContactMessage);

export default router;
