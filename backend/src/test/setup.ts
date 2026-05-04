import { vi } from 'vitest';

process.env.API_KEY = 'test_api_key_123';

// Mock the pg module
vi.mock('pg', () => {
    const mockPool = {
        query: vi.fn(),
        on: vi.fn()
    };
    return {
        Pool: vi.fn(() => mockPool)
    };
});