import { Request, Response } from 'express';
import { db } from '../services/database.js';

export const createContactMessage = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, email, subject, message } = req.body;

        // Basic validation
        if (!name || !email || !subject || !message) {
            res.status(400).json({
                success: false,
                message: 'Name, email, subject, and message are required'
            });
            return;
        }

        // Basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            res.status(400).json({
                success: false,
                message: 'Invalid email format'
            });
            return;
        }

        const contactMessage = await db.createContactMessage({
            name,
            email,
            subject,
            message
        });

        res.status(201).json({
            success: true,
            data: contactMessage,
            message: 'Contact message sent successfully'
        });
    } catch (error) {
        console.error('Error creating contact message:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to send contact message',
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
};

export const getContactMessages = async (_req: Request, res: Response): Promise<void> => {
    try {
        const messages = await db.getAllContactMessages();

        res.json({
            success: true,
            data: messages
        });
    } catch (error) {
        console.error('Error fetching contact messages:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch contact messages',
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
};

export const deleteContactMessage = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const messageId = parseInt(id);

        if (isNaN(messageId)) {
            res.status(400).json({
                success: false,
                message: 'Invalid message ID'
            });
            return;
        }

        await db.deleteContactMessage(messageId);

        res.json({
            success: true,
            message: 'Contact message deleted successfully'
        });
    } catch (error) {
        console.error('Error deleting contact message:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to delete contact message',
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
};
