import { Router } from 'express';
import { 
    getProjects, 
    getProjectById, 
    createProject, 
    createProjectWithUpload,
    updateProject, 
    deleteProject,
    upload
} from '../controllers/projectController.js';

const router = Router();

// GET /api/projects - Get all projects
router.get('/', getProjects);

// GET /api/projects/:id - Get project by ID
router.get('/:id', getProjectById);

// POST /api/projects - Create a new project (JSON with base64 image)
router.post('/', createProject);

// POST /api/projects/upload - Create a new project with file upload
router.post('/upload', upload.single('image'), createProjectWithUpload);

// PUT /api/projects/:id - Update project by ID
router.put('/:id', updateProject);

// DELETE /api/projects/:id - Delete project by ID
router.delete('/:id', deleteProject);

export default router;
