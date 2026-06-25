import { pool } from '../config/db.js';
import type { Project, Experience, ContactMessage } from '../models/types.js';

export class DatabaseService {
    async getAllProjects(): Promise<Project[]> {
        try {
            const result = await pool.query('SELECT * FROM projects ORDER BY updated_at DESC');
            return result.rows;
        } catch (error: any) {
            throw new Error(`Failed to fetch projects: ${error.message}`);
        }
    }

    async getProjectById(id: number): Promise<Project | null> {
        try {
            const result = await pool.query('SELECT * FROM projects WHERE id = $1', [id]);
            return result.rows.length ? result.rows[0] : null;
        } catch (error: any) {
            if (error.code === '22P02') return null;
            throw new Error(`Failed to fetch project: ${error.message}`);
        }
    }

    async createProject(project: Omit<Project, 'id' | 'created_at' | 'updated_at'>): Promise<Project> {
        try {
            const result = await pool.query(
                `INSERT INTO projects (title, description, technologies, github_url, live_url, image_url)
                 VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
                [project.title, project.description, project.technologies, project.github_url, project.live_url, project.image_url]
            );
            return result.rows[0];
        } catch (error: any) {
            throw new Error(`Failed to create project: ${error.message}`);
        }
    }

    async updateProject(id: number, updates: Partial<Omit<Project, 'id' | 'created_at'>>): Promise<Project> {
        const keys = Object.keys(updates);
        const values = Object.values(updates);
        if (keys.length === 0) throw new Error('No updates provided');
        
        const setClause = keys.map((key, index) => `${key} = $${index + 2}`).join(', ');

        try {
            const result = await pool.query(
                `UPDATE projects SET ${setClause}, updated_at = NOW() WHERE id = $1 RETURNING *`,
                [id, ...values]
            );
            if (result.rows.length === 0) throw new Error('Project not found');
            return result.rows[0];
        } catch (error: any) {
            throw new Error(`Failed to update project: ${error.message}`);
        }
    }

    async deleteProject(id: number): Promise<void> {
        try {
            await pool.query('DELETE FROM projects WHERE id = $1', [id]);
        } catch (error: any) {
            throw new Error(`Failed to delete project: ${error.message}`);
        }
    }

    async getAllExperiences(): Promise<Experience[]> {
        try {
            // Dates are stored as text like "Mar 2024" (and "Present" for ongoing
            // roles). Sort by end_date, most recent first, treating "Present" as the
            // latest by mapping it to an infinite date.
            const result = await pool.query(
                "SELECT * FROM experiences ORDER BY (CASE WHEN end_date = 'Present' THEN 'infinity'::date ELSE TO_DATE(end_date, 'Mon YYYY') END) DESC"
            );
            return result.rows;
        } catch (error: any) {
            throw new Error(`Failed to fetch experiences: ${error.message}`);
        }
    }

    async getExperienceById(id: number): Promise<Experience | null> {
        try {
            const result = await pool.query('SELECT * FROM experiences WHERE id = $1', [id]);
            return result.rows.length ? result.rows[0] : null;
        } catch (error: any) {
            throw new Error(`Failed to fetch experience: ${error.message}`);
        }
    }

    async createExperience(experience: Omit<Experience, 'id' | 'created_at' | 'updated_at'>): Promise<Experience> {
        try {
            const result = await pool.query(
                `INSERT INTO experiences (title, company, location, start_date, end_date, description, skills)
                 VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
                [experience.title, experience.company, experience.location, experience.start_date, experience.end_date, experience.description, experience.skills]
            );
            return result.rows[0];
        } catch (error: any) {
            throw new Error(`Failed to create experience: ${error.message}`);
        }
    }

    async updateExperience(id: number, updates: Partial<Omit<Experience, 'id' | 'created_at'>>): Promise<Experience> {
        const keys = Object.keys(updates);
        const values = Object.values(updates);
        if (keys.length === 0) throw new Error('No updates provided');

        const setClause = keys.map((key, index) => `${key} = $${index + 2}`).join(', ');

        try {
            const result = await pool.query(
                `UPDATE experiences SET ${setClause}, updated_at = NOW() WHERE id = $1 RETURNING *`,
                [id, ...values]
            );
            if (result.rows.length === 0) throw new Error('Experience not found');
            return result.rows[0];
        } catch (error: any) {
            throw new Error(`Failed to update experience: ${error.message}`);
        }
    }

    async deleteExperience(id: number): Promise<void> {
        try {
            await pool.query('DELETE FROM experiences WHERE id = $1', [id]);
        } catch (error: any) {
            throw new Error(`Failed to delete experience: ${error.message}`);
        }
    }

    async createContactMessage(message: Omit<ContactMessage, 'id' | 'created_at'>): Promise<ContactMessage> {
        try {
            const result = await pool.query(
                `INSERT INTO contact_messages (name, email, subject, message)
                 VALUES ($1, $2, $3, $4) RETURNING *`,
                [message.name, message.email, message.subject, message.message]
            );
            return result.rows[0];
        } catch (error: any) {
            throw new Error(`Failed to create contact message: ${error.message}`);
        }
    }

    async getAllContactMessages(): Promise<ContactMessage[]> {
        try {
            const result = await pool.query('SELECT * FROM contact_messages ORDER BY created_at DESC');
            return result.rows;
        } catch (error: any) {
            throw new Error(`Failed to fetch contact messages: ${error.message}`);
        }
    }

    async deleteContactMessage(id: number): Promise<void> {
        try {
            await pool.query('DELETE FROM contact_messages WHERE id = $1', [id]);
        } catch (error: any) {
            throw new Error(`Failed to delete contact message: ${error.message}`);
        }
    }
}

export const db = new DatabaseService();
