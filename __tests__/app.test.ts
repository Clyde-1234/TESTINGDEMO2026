import request from 'supertest';
import app from '../src/app';
import pool from '../src/db';

jest.mock('../src/db');

describe('GET /users', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should return users from database', async () => {
        const mockUsers = [
            { id: 1, name: 'John' },
            { id: 2, name: 'Jane' }
        ];

        (pool.query as jest.Mock).mockResolvedValue({ rows: mockUsers });

        const response = await request(app).get('/users');

        expect(response.status).toBe(200);
        expect(response.body).toEqual(mockUsers);
        expect(pool.query).toHaveBeenCalledWith('SELECT * FROM users');
    });

    it('should return 500 error on database failure', async () => {
        (pool.query as jest.Mock).mockRejectedValue(new Error('Database connection failed'));

        const response = await request(app).get('/users');

        expect(response.status).toBe(500);
        expect(response.body).toEqual({ error: 'Database error' });
    });

    it('should return empty array when no users exist', async () => {
        (pool.query as jest.Mock).mockResolvedValue({ rows: [] });

        const response = await request(app).get('/users');

        expect(response.status).toBe(200);
        expect(response.body).toEqual([]);
    });
});