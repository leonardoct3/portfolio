import { Request, Response, NextFunction } from 'express';

export const requireApiKey = (req: Request, res: Response, next: NextFunction): void => {
    const apiKeyHeader = req.header('X-API-Key');
    const configuredKey = process.env.API_KEY;

    if (!configuredKey) {
        console.warn('API_KEY is not configured in the environment variables.');
        res.status(500).json({ success: false, message: 'Server configuration error' });
        return;
    }

    if (!apiKeyHeader || apiKeyHeader !== configuredKey) {
        res.status(401).json({ success: false, message: 'Unauthorized: Invalid or missing API Key' });
        return;
    }

    next();
};