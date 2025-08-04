import nodemailer from 'nodemailer';
import type { ContactMessage } from '../models/types.js';

// Email transporter configuration
const createTransporter = () => {
    return nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });
};

export interface EmailOptions {
    to: string;
    subject: string;
    html: string;
    text?: string;
}

export const sendEmail = async (options: EmailOptions): Promise<void> => {
    try {
        const transporter = createTransporter();
        
        const mailOptions = {
            from: process.env.EMAIL_FROM,
            to: options.to,
            subject: options.subject,
            html: options.html,
            text: options.text
        };

        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully to:', options.to);
    } catch (error) {
        console.error('Error sending email:', error);
        throw new Error('Failed to send email');
    }
};

export const sendContactNotification = async (contactMessage: ContactMessage): Promise<void> => {
    const { name, email, subject, message } = contactMessage;
    
    // HTML email template
    const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            <title>New Contact Form Submission</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    line-height: 1.6;
                    color: #333;
                    max-width: 600px;
                    margin: 0 auto;
                    padding: 20px;
                }
                .header {
                    background-color: #f4f4f4;
                    padding: 20px;
                    border-radius: 5px;
                    margin-bottom: 20px;
                }
                .content {
                    background-color: #fff;
                    padding: 20px;
                    border: 1px solid #ddd;
                    border-radius: 5px;
                }
                .field {
                    margin-bottom: 15px;
                    padding: 10px;
                    background-color: #f9f9f9;
                    border-radius: 3px;
                }
                .field-label {
                    font-weight: bold;
                    color: #555;
                    margin-bottom: 5px;
                }
                .field-value {
                    margin-top: 5px;
                }
                .message-content {
                    background-color: #fff;
                    border: 1px solid #ccc;
                    padding: 15px;
                    border-radius: 3px;
                    white-space: pre-wrap;
                }
                .footer {
                    margin-top: 20px;
                    padding: 15px;
                    background-color: #f4f4f4;
                    border-radius: 5px;
                    font-size: 12px;
                    color: #666;
                }
            </style>
        </head>
        <body>
            <div class="header">
                <h1>📧 New Contact Form Submission</h1>
                <p>You've received a new message through your portfolio contact form.</p>
            </div>
            
            <div class="content">
                <div class="field">
                    <div class="field-label">👤 Name:</div>
                    <div class="field-value">${name}</div>
                </div>
                
                <div class="field">
                    <div class="field-label">📧 Email:</div>
                    <div class="field-value">
                        <a href="mailto:${email}">${email}</a>
                    </div>
                </div>
                
                <div class="field">
                    <div class="field-label">📋 Subject:</div>
                    <div class="field-value">${subject}</div>
                </div>
                
                <div class="field">
                    <div class="field-label">💬 Message:</div>
                    <div class="field-value">
                        <div class="message-content">${message}</div>
                    </div>
                </div>
            </div>
            
            <div class="footer">
                <p>This email was sent automatically from your portfolio contact form.</p>
                <p>Timestamp: ${new Date().toLocaleString()}</p>
            </div>
        </body>
        </html>
    `;

    // Plain text version
    const textContent = `
New Contact Form Submission

Name: ${name}
Email: ${email}
Subject: ${subject}

Message:
${message}

---
This email was sent automatically from your portfolio contact form.
Timestamp: ${new Date().toLocaleString()}
    `;

    const emailOptions: EmailOptions = {
        to: process.env.EMAIL_TO || process.env.EMAIL_USER || '',
        subject: `Portfolio Contact: ${subject}`,
        html: htmlContent,
        text: textContent
    };

    await sendEmail(emailOptions);
};

export const sendContactConfirmation = async (contactMessage: ContactMessage): Promise<void> => {
    const { name, email, subject } = contactMessage;
    
    const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            <title>Thank you for contacting us</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    line-height: 1.6;
                    color: #333;
                    max-width: 600px;
                    margin: 0 auto;
                    padding: 20px;
                }
                .header {
                    background-color: #4CAF50;
                    color: white;
                    padding: 20px;
                    border-radius: 5px;
                    margin-bottom: 20px;
                    text-align: center;
                }
                .content {
                    background-color: #fff;
                    padding: 20px;
                    border: 1px solid #ddd;
                    border-radius: 5px;
                }
                .footer {
                    margin-top: 20px;
                    padding: 15px;
                    background-color: #f4f4f4;
                    border-radius: 5px;
                    font-size: 12px;
                    color: #666;
                    text-align: center;
                }
            </style>
        </head>
        <body>
            <div class="header">
                <h1>✅ Message Received!</h1>
                <p>Thank you for reaching out</p>
            </div>
            
            <div class="content">
                <p>Hi ${name},</p>
                
                <p>Thank you for contacting me through my portfolio! I've received your message about "<strong>${subject}</strong>" and I'll get back to you as soon as possible.</p>
                
                <p>Your message is important to me, and I typically respond within 24-48 hours during business days.</p>
                
                <p>Best regards,<br>
                [Your Name]</p>
            </div>
            
            <div class="footer">
                <p>This is an automated confirmation email.</p>
                <p>Please do not reply to this email.</p>
            </div>
        </body>
        </html>
    `;

    const textContent = `
Thank you for contacting me!

Hi ${name},

Thank you for reaching out through my portfolio! I've received your message about "${subject}" and I'll get back to you as soon as possible.

Your message is important to me, and I typically respond within 24-48 hours during business days.

Best regards,
[Your Name]

---
This is an automated confirmation email.
Please do not reply to this email.
    `;

    const emailOptions: EmailOptions = {
        to: email,
        subject: `Thank you for contacting me - ${subject}`,
        html: htmlContent,
        text: textContent
    };

    await sendEmail(emailOptions);
};