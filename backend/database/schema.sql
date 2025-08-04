-- Portfolio Database Schema
-- Run this in your Supabase SQL editor to create the necessary tables

-- Create projects table
CREATE TABLE IF NOT EXISTS projects (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    technologies TEXT[] NOT NULL,
    github_url VARCHAR(500),
    live_url VARCHAR(500),
    image_url VARCHAR(500),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create contact_messages table
CREATE TABLE IF NOT EXISTS contact_messages (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    subject VARCHAR(500) NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create trigger to automatically update updated_at column
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply trigger to projects table
DROP TRIGGER IF EXISTS update_projects_updated_at ON projects;
CREATE TRIGGER update_projects_updated_at
    BEFORE UPDATE ON projects
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Insert some sample data (optional)
INSERT INTO projects (title, description, technologies, github_url, live_url, image_url) VALUES
(
    'Portfolio Website',
    'A modern, responsive portfolio website built with React and TypeScript, featuring a clean design and smooth animations.',
    ARRAY['React', 'TypeScript', 'Vite', 'Express', 'Supabase'],
    'https://github.com/yourusername/portfolio',
    'https://yourportfolio.com',
    '/images/portfolio.jpg'
),
(
    'Task Management App',
    'A full-stack task management application with real-time updates, user authentication, and collaborative features.',
    ARRAY['Next.js', 'TypeScript', 'Prisma', 'PostgreSQL', 'NextAuth.js'],
    'https://github.com/yourusername/task-manager',
    'https://taskmanager.example.com',
    '/images/task-manager.jpg'
),
(
    'E-commerce Platform',
    'A scalable e-commerce platform with payment integration, inventory management, and admin dashboard.',
    ARRAY['React', 'Node.js', 'MongoDB', 'Stripe', 'AWS S3'],
    'https://github.com/yourusername/ecommerce',
    'https://shop.example.com',
    '/images/ecommerce.jpg'
);

-- Enable Row Level Security (RLS) for better security
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- Create policies for public access to projects (read-only)
CREATE POLICY "Projects are viewable by everyone" ON projects
    FOR SELECT USING (true);

-- Create policies for contact messages (insert only for public)
CREATE POLICY "Anyone can insert contact messages" ON contact_messages
    FOR INSERT WITH CHECK (true);

-- You may want to create more restrictive policies for admin operations
-- For example, only authenticated users can modify projects:
-- CREATE POLICY "Only authenticated users can modify projects" ON projects
--     FOR ALL USING (auth.role() = 'authenticated');

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT SELECT ON projects TO anon, authenticated;
GRANT INSERT ON contact_messages TO anon, authenticated;
GRANT ALL ON projects TO authenticated;
GRANT ALL ON contact_messages TO authenticated;
