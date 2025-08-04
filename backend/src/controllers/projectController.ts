import { Request, Response } from 'express';
import { db } from '../services/database.js';

export const getProjects = async (_req: Request, res: Response): Promise<void> => {
    try {
        const projects = await db.getAllProjects();

        res.json({
            success: true,
            data: projects
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

        res.json({
            success: true,
            data: project
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
        const { title, description, technologies, github_url, live_url, image_url } = req.body;

        // Basic validation
        if (!title || !description || !technologies) {
            res.status(400).json({
                success: false,
                message: 'Title, description, and technologies are required'
            });
            return;
        }

        const project = await db.createProject({
            title,
            description,
            technologies,
            github_url,
            live_url,
            image_url
        });

        res.status(201).json({
            success: true,
            data: project
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

        const { title, description, technologies, github_url, live_url, image_url } = req.body;

        const project = await db.updateProject(projectId, {
            title,
            description,
            technologies,
            github_url,
            live_url,
            image_url
        });

        res.json({
            success: true,
            data: project
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
