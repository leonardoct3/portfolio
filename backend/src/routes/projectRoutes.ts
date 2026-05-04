import { Router } from 'express';
import { requireApiKey } from '../middleware/auth.js';
import { 
    getProjects, 
    getProjectById, 
    createProject, 
    updateProject, 
    deleteProject,
} from '../controllers/projectController.js';

const router = Router();

// GET /api/projects - Get all projects
router.get('/', getProjects);

// GET /api/projects/:id - Get project by ID
router.get('/:id', getProjectById);

// POST /api/projects - Create a new project
router.post('/', requireApiKey, createProject);

// PUT /api/projects/:id - Update project by ID
router.put('/:id', requireApiKey, updateProject);

// DELETE /api/projects/:id - Delete project by ID
router.delete('/:id', requireApiKey, deleteProject);

export default router;
