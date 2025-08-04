# Portfolio Backend - Supabase Integration

This backend has been configured to work with Supabase as the database provider. Follow these steps to set up your Supabase integration.

## Setup Instructions

### 1. Create a Supabase Project

1. Go to [Supabase](https://supabase.com) and create a new account if you don't have one
2. Click "New Project" and create a new project
3. Wait for the project to be provisioned

### 2. Get Your Supabase Credentials

1. In your Supabase dashboard, go to Settings → API
2. Copy the following values:
   - **Project URL** (looks like: `https://your-project-id.supabase.co`)
   - **Public anon key** (starts with `eyJhbGciOi...`)
   - **Service role key** (starts with `eyJhbGciOi...`) - Keep this secret!

### 3. Update Environment Variables

Update your `.env` file with your Supabase credentials and email configuration:

```env
# Supabase Configuration
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_ANON_KEY=your_public_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here

# Email Configuration (Gmail)
EMAIL_USER=your_gmail@gmail.com
EMAIL_PASS=your_16_character_app_password
EMAIL_FROM=your_gmail@gmail.com
EMAIL_TO=your_gmail@gmail.com
```

**Note**: For Gmail setup instructions, see `GMAIL_SETUP.md`

### 4. Set Up Database Tables

1. In your Supabase dashboard, go to the SQL Editor
2. Copy the contents of `database/schema.sql` and run it
3. This will create the necessary tables and policies

### 5. Test the Integration

Start your development server:

```bash
npm run dev
```

Test the API endpoints:

- `GET http://localhost:5000/api/projects` - Get all projects
- `GET http://localhost:5000/api/projects/1` - Get project by ID
- `POST http://localhost:5000/api/projects` - Create a new project
- `PUT http://localhost:5000/api/projects/1` - Update project
- `DELETE http://localhost:5000/api/projects/1` - Delete project
- `POST http://localhost:5000/api/contact` - Send contact message
- `GET http://localhost:5000/api/contact` - Get all contact messages

## API Endpoints

### Projects

- **GET** `/api/projects` - Get all projects
- **GET** `/api/projects/:id` - Get project by ID
- **POST** `/api/projects` - Create new project
- **PUT** `/api/projects/:id` - Update project
- **DELETE** `/api/projects/:id` - Delete project

#### Project Schema
```json
{
  "title": "string (required)",
  "description": "string (required)",
  "technologies": ["array of strings (required)"],
  "github_url": "string (optional)",
  "live_url": "string (optional)",
  "image_url": "string (optional)"
}
```

### Contact Messages

- **POST** `/api/contact` - Send contact message (saves to DB + sends emails)
- **GET** `/api/contact` - Get all contact messages (admin)
- **DELETE** `/api/contact/:id` - Delete contact message (admin)

**Email Notifications**: When a contact message is submitted:
1. The message is saved to the database
2. A notification email is sent to you with the contact details
3. A confirmation email is sent to the person who contacted you

#### Contact Message Schema
```json
{
  "name": "string (required)",
  "email": "string (required)",
  "subject": "string (required)",
  "message": "string (required)"
}
```

## Database Schema

### Projects Table
- `id` - Serial primary key
- `title` - Project title
- `description` - Project description
- `technologies` - Array of technology names
- `github_url` - GitHub repository URL
- `live_url` - Live demo URL
- `image_url` - Project image URL
- `created_at` - Timestamp
- `updated_at` - Timestamp (auto-updated)

### Contact Messages Table
- `id` - Serial primary key
- `name` - Sender name
- `email` - Sender email
- `subject` - Message subject
- `message` - Message content
- `created_at` - Timestamp

## Security

- Row Level Security (RLS) is enabled on all tables
- Public users can only read projects and insert contact messages
- Admin operations require service role authentication
- Environment variables should be kept secure

## Development Notes

- The database service uses the service role key for admin operations
- Type definitions are generated based on the database schema
- Error handling includes detailed logging for debugging
- All timestamps are stored in ISO format with timezone info
