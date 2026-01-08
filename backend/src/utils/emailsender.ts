import nodemailer from 'nodemailer';
import type { ContactMessage } from '../models/types.js';

// Email transporter configuration
const createTransporter = () => {
    return nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        },
        // Increased timeouts for production environments
        connectionTimeout: 20000,
        greetingTimeout: 20000,
        socketTimeout: 20000
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
            <title>New Contact Form Submission - Leonardo Teixeira Portfolio</title>
            <style>
                * {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                }
                
                body {
                    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                    line-height: 1.6;
                    color: #111827;
                    background-color: #f9fafb;
                    padding: 20px;
                }
                
                .email-container {
                    max-width: 600px;
                    margin: 0 auto;
                    background-color: #ffffff;
                    border-radius: 12px;
                    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
                    overflow: hidden;
                    border: 2px solid #e5e7eb;
                }
                
                .header {
                    background: linear-gradient(135deg, #111827 0%, #374151 100%);
                    color: white;
                    padding: 30px;
                    text-align: center;
                    position: relative;
                }
                
                .header::after {
                    content: '';
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    height: 4px;
                    background: linear-gradient(90deg, #dc2626, #ef4444, #dc2626);
                }
                
                .header h1 {
                    font-size: 24px;
                    font-weight: 700;
                    margin-bottom: 8px;
                    letter-spacing: -0.025em;
                }
                
                .header p {
                    font-size: 14px;
                    opacity: 0.9;
                    font-weight: 400;
                }
                
                .content {
                    padding: 30px;
                    background-color: #ffffff;
                }
                
                .field-grid {
                    display: grid;
                    gap: 20px;
                    margin-bottom: 25px;
                }
                
                .field {
                    border: 2px solid #f3f4f6;
                    border-radius: 8px;
                    padding: 16px;
                    background-color: #fafbfc;
                    transition: all 0.2s ease;
                }
                
                .field:hover {
                    border-color: #e5e7eb;
                    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
                }
                
                .field-label {
                    font-weight: 700;
                    color: #374151;
                    font-size: 14px;
                    margin-bottom: 8px;
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                }
                
                .field-value {
                    font-size: 16px;
                    color: #111827;
                    line-height: 1.5;
                }
                
                .field-value a {
                    color: #dc2626;
                    text-decoration: none;
                    font-weight: 600;
                }
                
                .field-value a:hover {
                    text-decoration: underline;
                }
                
                .message-field {
                    border: 2px solid #f3f4f6;
                    border-radius: 8px;
                    padding: 20px;
                    background-color: #ffffff;
                    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
                }
                
                .message-content {
                    background-color: #f9fafb;
                    border: 1px solid #e5e7eb;
                    padding: 16px;
                    border-radius: 6px;
                    white-space: pre-wrap;
                    font-size: 15px;
                    line-height: 1.6;
                    color: #374151;
                    margin-top: 8px;
                }
                
                .footer {
                    background-color: #f9fafb;
                    padding: 20px 30px;
                    text-align: center;
                    border-top: 2px solid #f3f4f6;
                }
                
                .footer p {
                    font-size: 13px;
                    color: #6b7280;
                    margin-bottom: 4px;
                }
                
                .timestamp {
                    font-size: 12px;
                    color: #9ca3af;
                    font-weight: 600;
                    background-color: #ffffff;
                    padding: 8px 12px;
                    border-radius: 6px;
                    display: inline-block;
                    border: 1px solid #e5e7eb;
                    margin-top: 8px;
                }
                
                .brand-accent {
                    color: #dc2626;
                    font-weight: 700;
                }
                
                @media (max-width: 600px) {
                    .email-container {
                        margin: 10px;
                        border-radius: 8px;
                    }
                    
                    .header, .content, .footer {
                        padding: 20px;
                    }
                    
                    .header h1 {
                        font-size: 20px;
                    }
                }
            </style>
        </head>
        <body>
            <div class="email-container">
                <div class="header">
                    <h1>New Portfolio Contact</h1>
                    <p>Someone has reached out through your portfolio website</p>
                </div>
                
                <div class="content">
                    <div class="field-grid">
                        <div class="field">
                            <div class="field-label">Contact Name</div>
                            <div class="field-value">${name}</div>
                        </div>
                        
                        <div class="field">
                            <div class="field-label">Email Address</div>
                            <div class="field-value">
                                <a href="mailto:${email}">${email}</a>
                            </div>
                        </div>
                        
                        <div class="field">
                            <div class="field-label">Subject</div>
                            <div class="field-value">${subject}</div>
                        </div>
                    </div>
                    
                    <div class="message-field">
                        <div class="field-label">Message Content</div>
                        <div class="message-content">${message}</div>
                    </div>
                </div>
                
                <div class="footer">
                    <p>This notification was sent automatically from <span class="brand-accent">Leo</span>nardo Teixeira's portfolio contact form.</p>
                    <div class="timestamp">Received on ${new Date().toLocaleDateString('en-US', { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                    })}</div>
                </div>
            </div>
        </body>
        </html>
    `;

    // Plain text version
    const textContent = `
New Portfolio Contact Submission - Leonardo Teixeira

Contact Details:
Name: ${name}
Email: ${email}
Subject: ${subject}

Message:
${message}

---
This notification was sent automatically from Leonardo Teixeira's portfolio contact form.
Received on ${new Date().toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
})}
    `;

    const emailOptions: EmailOptions = {
        to: process.env.EMAIL_TO || process.env.EMAIL_USER || '',
        subject: `[INTERNAL] Portfolio Contact: ${subject}`,
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
            <title>Thank you for contacting Leonardo Teixeira</title>
            <style>
                * {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                }
                
                body {
                    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                    line-height: 1.6;
                    color: #111827;
                    background-color: #f9fafb;
                    padding: 20px;
                }
                
                .email-container {
                    max-width: 600px;
                    margin: 0 auto;
                    background-color: #ffffff;
                    border-radius: 12px;
                    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
                    overflow: hidden;
                    border: 2px solid #e5e7eb;
                }
                
                .header {
                    background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%);
                    color: white;
                    padding: 40px 30px;
                    text-align: center;
                    position: relative;
                }
                
                .header::after {
                    content: '';
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    height: 4px;
                    background: linear-gradient(90deg, #dc2626, #ef4444, #dc2626);
                }
                
                .header h1 {
                    font-size: 28px;
                    font-weight: 700;
                    margin-bottom: 8px;
                    letter-spacing: -0.025em;
                }
                
                .header p {
                    font-size: 16px;
                    opacity: 0.95;
                    font-weight: 400;
                }
                
                .content {
                    padding: 40px 30px;
                    background-color: #ffffff;
                }
                
                .greeting {
                    font-size: 18px;
                    font-weight: 600;
                    color: #111827;
                    margin-bottom: 20px;
                }
                
                .message-body {
                    font-size: 16px;
                    color: #374151;
                    margin-bottom: 20px;
                }
                
                .subject-highlight {
                    color: #dc2626;
                    font-weight: 600;
                    background-color: #fef2f2;
                    padding: 2px 6px;
                    border-radius: 4px;
                    border: 1px solid #fecaca;
                }
                
                .signature {
                    margin-top: 30px;
                    padding-top: 20px;
                    border-top: 2px solid #f3f4f6;
                }
                
                .signature-name {
                    font-size: 18px;
                    font-weight: 700;
                    color: #111827;
                    margin-bottom: 4px;
                }
                
                .signature-title {
                    font-size: 14px;
                    color: #6b7280;
                    font-weight: 500;
                }
                
                .footer {
                    background-color: #f9fafb;
                    padding: 25px 30px;
                    text-align: center;
                    border-top: 2px solid #f3f4f6;
                }
                
                .footer p {
                    font-size: 13px;
                    color: #6b7280;
                    margin-bottom: 5px;
                }
                
                .footer .timestamp {
                    font-size: 12px;
                    color: #9ca3af;
                    font-weight: 500;
                }
                
                .brand-accent {
                    color: #dc2626;
                    font-weight: 700;
                }
                
                @media (max-width: 600px) {
                    .email-container {
                        margin: 10px;
                        border-radius: 8px;
                    }
                    
                    .header, .content, .footer {
                        padding: 25px 20px;
                    }
                    
                    .header h1 {
                        font-size: 24px;
                    }
                }
            </style>
        </head>
        <body>
            <div class="email-container">
                <div class="header">
                    <h1>Message Received Successfully</h1>
                    <p>Thank you for reaching out through my portfolio</p>
                </div>
                
                <div class="content">
                    <div class="greeting">Hello ${name},</div>
                    
                    <div class="message-body">
                        <p>Thank you for contacting me through my portfolio website. I have successfully received your message regarding <span class="subject-highlight">"${subject}"</span> and I appreciate you taking the time to reach out.</p>
                        <br />
                        <p>I will review your message carefully and respond as soon as possible. Typically, I aim to respond within 24-48 hours.</p>
                        
                    </div>
                    
                    <div class="signature">
                        <div class="signature-name"><span class="brand-accent">Leo</span>nardo Teixeira</div>
                        <div class="signature-title">Software Developer</div>
                    </div>
                </div>
                
                <div class="footer">
                    <p>This is an automated confirmation email from Leonardo Teixeira's portfolio.</p>
                    <p>Please do not reply directly to this email address.</p>
                    <div class="timestamp">Sent on ${new Date().toLocaleDateString('en-US', { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                    })}</div>
                </div>
            </div>
        </body>
        </html>
    `;

    const textContent = `
Thank you for contacting Leonardo Teixeira

Hello ${name},

Thank you for contacting me through my portfolio website. I have successfully received your message regarding "${subject}" and I appreciate you taking the time to reach out.

I will review your message carefully and respond as soon as possible. Typically, I aim to respond within 24-48 hours during business days.

If your inquiry is urgent, please feel free to mention that in your original message, and I will prioritize accordingly.

Best regards,
Leonardo Teixeira
Software Developer

---
This is an automated confirmation email from Leonardo Teixeira's portfolio.
Please do not reply directly to this email address.
Sent on ${new Date().toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
})}
    `;

    const emailOptions: EmailOptions = {
        to: email,
        subject: `Thank you for contacting me - ${subject}`,
        html: htmlContent,
        text: textContent
    };

    await sendEmail(emailOptions);
};