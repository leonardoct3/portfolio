import { Request, Response } from 'express';
import { db } from '../services/database.js';

export const getExperiences = async (_req: Request, res: Response): Promise<void> => {
    try {
        const experiences = await db.getAllExperiences();

        res.json({
            success: true,
            data: experiences
        });
    } catch (error) {
        console.error('Error fetching experiences:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch experiences',
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
};

export const getExperienceById = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const experienceId = parseInt(id);

        if (isNaN(experienceId)) {
            res.status(400).json({
                success: false,
                message: 'Invalid experience ID'
            });
            return;
        }

        const experience = await db.getExperienceById(experienceId);

        if (!experience) {
            res.status(404).json({
                success: false,
                message: 'Experience not found'
            });
            return;
        }

        res.json({
            success: true,
            data: experience
        });
    } catch (error) {
        console.error('Error fetching experience:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch experience',
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
};

export const createExperience = async (req: Request, res: Response): Promise<void> => {
    try {
        const { title, company, location, start_date, end_date, description, skills } = req.body;

        // Basic validation
        if (!title || !company || !location || !start_date || !end_date || !description) {
            res.status(400).json({
                success: false,
                message: 'Title, company, location, start_date, end_date, and description are required'
            });
            return;
        }

        const experience = await db.createExperience({
            title,
            company,
            location,
            start_date,
            end_date,
            description,
            skills: skills || []
        });

        res.status(201).json({
            success: true,
            data: experience
        });
    } catch (error) {
        console.error('Error creating experience:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to create experience',
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
};

export const updateExperience = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const experienceId = parseInt(id);

        if (isNaN(experienceId)) {
            res.status(400).json({
                success: false,
                message: 'Invalid experience ID'
            });
            return;
        }

        const { title, company, location, start_date, end_date, description, skills } = req.body;

        const experience = await db.updateExperience(experienceId, {
            title,
            company,
            location,
            start_date,
            end_date,
            description,
            skills
        });

        res.json({
            success: true,
            data: experience
        });
    } catch (error) {
        console.error('Error updating experience:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to update experience',
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
};

export const deleteExperience = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const experienceId = parseInt(id);

        if (isNaN(experienceId)) {
            res.status(400).json({
                success: false,
                message: 'Invalid experience ID'
            });
            return;
        }

        await db.deleteExperience(experienceId);

        res.json({
            success: true,
            message: 'Experience deleted successfully'
        });
    } catch (error) {
        console.error('Error deleting experience:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to delete experience',
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
};
