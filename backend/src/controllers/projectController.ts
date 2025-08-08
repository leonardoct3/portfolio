import { Request, Response } from 'express';
import { db } from '../services/database.js';
import { bufferToBase64DataUrl, base64DataUrlToBuffer, isValidBase64DataUrl } from '../utils/helpers.js';
import multer from 'multer';

// Configure multer for file uploads
const storage = multer.memoryStorage();
export const upload = multer({ 
    storage,
    limits: {
        fileSize: 5 * 1024 * 1024, // 5MB limit
    },
    fileFilter: (_req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
        if (file.mimetype.startsWith('image/')) {
            cb(null, true);
        } else {
            cb(new Error('Only image files are allowed'));
        }
    }
});

export const getProjects = async (_req: Request, res: Response): Promise<void> => {
    try {
        const projects = await db.getAllProjects();

        // Convert image buffer to base64 for JSON response
        const projectsWithBase64Images = projects.map(project => ({
            ...project,
            image: project.image ? bufferToBase64DataUrl(project.image) : null
        }));

        res.json({
            success: true,
            data: projectsWithBase64Images
        });
    } catch (error) {
        console.error('Error fetching projects:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch projects',
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
};

export const getProjectById = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const projectId = parseInt(id);

        if (isNaN(projectId)) {
            res.status(400).json({
                success: false,
                message: 'Invalid project ID'
            });
            return;
        }

        const project = await db.getProjectById(projectId);

        if (!project) {
            res.status(404).json({
                success: false,
                message: 'Project not found'
            });
            return;
        }

        // Convert image buffer to base64 for JSON response
        const projectWithBase64Image = {
            ...project,
            image: project.image ? bufferToBase64DataUrl(project.image) : null
        };

        res.json({
            success: true,
            data: projectWithBase64Image
        });
    } catch (error) {
        console.error('Error fetching project:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch project',
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
};

export const createProject = async (req: Request, res: Response): Promise<void> => {
    try {
        const { title, description, technologies, github_url, live_url, image } = req.body;

        // Basic validation
        if (!title || !description || !technologies) {
            res.status(400).json({
                success: false,
                message: 'Title, description, and technologies are required'
            });
            return;
        }

        // Convert base64 image to Buffer if provided
        let imageBuffer: Buffer | null = null;
        if (image && typeof image === 'string') {
            if (!isValidBase64DataUrl(image)) {
                res.status(400).json({
                    success: false,
                    message: 'Invalid image format. Expected base64 data URL.'
                });
                return;
            }
            try {
                imageBuffer = base64DataUrlToBuffer(image);
            } catch (error) {
                res.status(400).json({
                    success: false,
                    message: 'Invalid image format'
                });
                return;
            }
        }

        const project = await db.createProject({
            title,
            description,
            technologies,
            github_url,
            live_url,
            image: imageBuffer
        });

        // Convert image buffer back to base64 for response
        const projectResponse = {
            ...project,
            image: project.image ? bufferToBase64DataUrl(project.image) : null
        };

        res.status(201).json({
            success: true,
            data: projectResponse
        });
    } catch (error) {
        console.error('Error creating project:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to create project',
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
};

export const updateProject = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const projectId = parseInt(id);

        if (isNaN(projectId)) {
            res.status(400).json({
                success: false,
                message: 'Invalid project ID'
            });
            return;
        }

        const { title, description, technologies, github_url, live_url, image } = req.body;

        // Convert base64 image to Buffer if provided
        let imageBuffer: Buffer | null = null;
        if (image && typeof image === 'string') {
            if (!isValidBase64DataUrl(image)) {
                res.status(400).json({
                    success: false,
                    message: 'Invalid image format. Expected base64 data URL.'
                });
                return;
            }
            try {
                imageBuffer = base64DataUrlToBuffer(image);
            } catch (error) {
                res.status(400).json({
                    success: false,
                    message: 'Invalid image format'
                });
                return;
            }
        }

        const updateData: any = {};
        if (title !== undefined) updateData.title = title;
        if (description !== undefined) updateData.description = description;
        if (technologies !== undefined) updateData.technologies = technologies;
        if (github_url !== undefined) updateData.github_url = github_url;
        if (live_url !== undefined) updateData.live_url = live_url;
        if (image !== undefined) updateData.image = imageBuffer;

        const project = await db.updateProject(projectId, updateData);

        // Convert image buffer back to base64 for response
        const projectResponse = {
            ...project,
            image: project.image ? bufferToBase64DataUrl(project.image) : null
        };

        res.json({
            success: true,
            data: projectResponse
        });
    } catch (error) {
        console.error('Error updating project:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to update project',
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
};

export const createProjectWithUpload = async (req: Request, res: Response): Promise<void> => {
    try {
        const { title, description, technologies, github_url, live_url } = req.body;
        const file = req.file as Express.Multer.File | undefined;

        // Basic validation
        if (!title || !description || !technologies) {
            res.status(400).json({
                success: false,
                message: 'Title, description, and technologies are required'
            });
            return;
        }

        // Parse technologies if it's a string (from form data)
        let parsedTechnologies: string[];
        try {
            parsedTechnologies = typeof technologies === 'string' 
                ? JSON.parse(technologies) 
                : technologies;
        } catch (error) {
            parsedTechnologies = Array.isArray(technologies) 
                ? technologies 
                : [technologies];
        }

        const project = await db.createProject({
            title,
            description,
            technologies: parsedTechnologies,
            github_url,
            live_url,
            image: file ? file.buffer : null
        });

        // Convert image buffer back to base64 for response
        const projectResponse = {
            ...project,
            image: project.image ? bufferToBase64DataUrl(project.image) : null
        };

        res.status(201).json({
            success: true,
            data: projectResponse
        });
    } catch (error) {
        console.error('Error creating project with upload:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to create project',
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
};

export const deleteProject = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const projectId = parseInt(id);

        if (isNaN(projectId)) {
            res.status(400).json({
                success: false,
                message: 'Invalid project ID'
            });
            return;
        }

        await db.deleteProject(projectId);

        res.json({
            success: true,
            message: 'Project deleted successfully'
        });
    } catch (error) {
        console.error('Error deleting project:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to delete project',
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
};
