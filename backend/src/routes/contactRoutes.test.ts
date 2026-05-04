import { describe, it, expect, vi, beforeEach } from 'vitest';
import request from 'supertest';
import app from '../index.js';
import { pool } from '../config/db.js';

// Mock the email sender
vi.mock('../utils/emailsender.js', () => ({
    sendContactNotification: vi.fn().mockResolvedValue(true),
    sendContactConfirmation: vi.fn().mockResolvedValue(true)
}));

describe('Contact API', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('should successfully create a new contact message and return 201', async () => {
        const mockMessage = {
            id: 1,
            name: 'John Doe',
            email: 'john@example.com',
            subject: 'Test Subject',
            message: 'Hello!',
            created_at: new Date().toISOString()
        };

        // Mock the implementation of the pool.query to return our mock message
        (pool.query as any).mockResolvedValueOnce({
            rows: [mockMessage]
        });

        const response = await request(app)
            .post('/api/contact')
            .send({
                name: 'John Doe',
                email: 'john@example.com',
                subject: 'Test Subject',
                message: 'Hello!'
            });

        expect(response.status).toBe(201);
        expect(response.body.success).toBe(true);
        expect(response.body.data).toEqual(mockMessage);
        
        // Ensure pool.query was called with correct parameters
        expect(pool.query).toHaveBeenCalledTimes(1);
        const queryCall = (pool.query as any).mock.calls[0];
        expect(queryCall[0]).toContain('INSERT INTO contact_messages');
        expect(queryCall[1]).toEqual(['John Doe', 'john@example.com', 'Test Subject', 'Hello!']);
    });
});