# Email Setup Instructions for Gmail

This guide will help you set up Gmail with nodemailer for your portfolio contact form.

## Step 1: Enable 2-Factor Authentication

1. Go to your [Google Account settings](https://myaccount.google.com/)
2. Navigate to **Security**
3. Under "Signing in to Google", click **2-Step Verification**
4. Follow the prompts to enable 2FA if it's not already enabled

## Step 2: Create an App Password

1. In your Google Account Security settings, click **2-Step Verification**
2. Scroll down and click **App passwords**
3. Select "Mail" as the app and "Other (custom name)" as the device
4. Enter a name like "Portfolio Contact Form"
5. Click **Generate**
6. **Copy the 16-character app password** (you won't be able to see it again)

## Step 3: Update Your .env File

Update your `.env` file in the backend folder with your Gmail credentials:

```env
# Email Configuration (Gmail)
EMAIL_USER=your_gmail@gmail.com
EMAIL_PASS=your_16_character_app_password
EMAIL_FROM=your_gmail@gmail.com
EMAIL_TO=your_gmail@gmail.com
```

**Important Notes:**
- `EMAIL_USER`: Your full Gmail address
- `EMAIL_PASS`: The 16-character app password (NOT your regular Gmail password)
- `EMAIL_FROM`: The email address that will appear as the sender
- `EMAIL_TO`: Where you want to receive contact form notifications

## Step 4: Test the Setup

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Test the contact form by sending a POST request to `/api/contact`:
   ```json
   {
     "name": "Test User",
     "email": "test@example.com",
     "subject": "Test Message",
     "message": "This is a test message."
   }
   ```

## What Happens When Someone Contacts You

1. **Database**: The message is saved to your Supabase database
2. **Notification Email**: You receive a formatted email with the contact details
3. **Confirmation Email**: The sender receives a confirmation that their message was received

## Troubleshooting

### "Invalid login" or "Authentication failed"
- Make sure you're using the app password, not your regular Gmail password
- Verify 2FA is enabled on your Google account

### "Less secure app access"
- This is outdated - use app passwords instead
- App passwords are the secure, modern way to authenticate

### Email not sending
- Check your console for error messages
- Verify all environment variables are set correctly
- Test with a simple email first

### Rate limiting
- Gmail has sending limits (500 emails/day for free accounts)
- For high-volume sites, consider using a service like SendGrid or AWS SES

## Security Best Practices

1. **Never commit your .env file** - it's already in .gitignore
2. **Use app passwords**, not your main Gmail password
3. **Regularly rotate your app passwords**
4. **Monitor your sent emails** for any suspicious activity

## Production Deployment

When deploying to production:

1. Set the same environment variables in your hosting platform
2. Consider using a dedicated email service for better deliverability
3. Implement rate limiting to prevent spam
4. Add CAPTCHA to your contact form if needed
