import { describe, it, expect, vi, beforeEach } from 'vitest';
import request from 'supertest';
import app from '../index.js';
import { pool } from '../config/db.js';

describe('Experience API', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('should successfully get all experiences', async () => {
        const mockExperiences = [
            {
                id: 1,
                title: 'Software Engineer',
                company: 'Acme Corp',
                location: 'Remote',
                start_date: '2020-01-01',
                end_date: '2021-01-01',
                description: 'Worked on backend.',
                skills: ['Node.js'],
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString()
            }
        ];

        (pool.query as any).mockResolvedValueOnce({
            rows: mockExperiences
        });

        const response = await request(app).get('/api/experiences');

        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.data).toEqual(mockExperiences);
    });
});