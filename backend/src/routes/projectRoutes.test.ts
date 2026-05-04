import { describe, it, expect, vi, beforeEach } from 'vitest';
import request from 'supertest';
import app from '../index.js';
import { pool } from '../config/db.js';

describe('Project API', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('should successfully get all projects', async () => {
        const mockProjects = [
            {
                id: 1,
                title: 'Project 1',
                description: 'Test Project 1',
                technologies: ['React', 'Node'],
                github_url: null,
                live_url: null,
                image_url: null,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString()
            }
        ];

        (pool.query as any).mockResolvedValueOnce({
            rows: mockProjects
        });

        const response = await request(app).get('/api/projects');

        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.data).toEqual(mockProjects);
    });

    it('should create a project and return 201', async () => {
        const newProject = {
            id: 2,
            title: 'New Project',
            description: 'New Description',
            technologies: ['Express'],
            github_url: null,
            live_url: null,
            image_url: null,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
        };

        (pool.query as any).mockResolvedValueOnce({
            rows: [newProject]
        });

        const response = await request(app)
            .post('/api/projects')
            .set('X-API-Key', 'test_api_key_123')
            .send({
                title: 'New Project',
                description: 'New Description',
                technologies: ['Express'],
                github_url: null,
                live_url: null,
                image_url: null
            });

        expect(response.status).toBe(201);
        expect(response.body.success).toBe(true);
        expect(response.body.data).toEqual(newProject);

        expect(pool.query).toHaveBeenCalledTimes(1);
    });
});