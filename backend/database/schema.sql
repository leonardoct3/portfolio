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
    image BYTEA,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create experiences table
CREATE TABLE IF NOT EXISTS experiences (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    company VARCHAR(255) NOT NULL,
    location VARCHAR(255) NOT NULL,
    start_date VARCHAR(50) NOT NULL,
    end_date VARCHAR(50) NOT NULL,
    description TEXT NOT NULL,
    skills TEXT[] DEFAULT '{}',
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

-- Apply trigger to experiences table
DROP TRIGGER IF EXISTS update_experiences_updated_at ON experiences;
CREATE TRIGGER update_experiences_updated_at
    BEFORE UPDATE ON experiences
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Insert some sample data (optional)
INSERT INTO projects (title, description, technologies, github_url, live_url) VALUES
(
    'Portfolio Website',
    'A modern, responsive portfolio website built with React and TypeScript, featuring a clean design and smooth animations.',
    ARRAY['React', 'TypeScript', 'Vite', 'Express', 'Supabase'],
    'https://github.com/yourusername/portfolio',
    'https://yourportfolio.com'
),
(
    'Task Management App',
    'A full-stack task management application with real-time updates, user authentication, and collaborative features.',
    ARRAY['Next.js', 'TypeScript', 'Prisma', 'PostgreSQL', 'NextAuth.js'],
    'https://github.com/yourusername/task-manager',
    'https://taskmanager.example.com'
),
(
    'E-commerce Platform',
    'A scalable e-commerce platform with payment integration, inventory management, and admin dashboard.',
    ARRAY['React', 'Node.js', 'MongoDB', 'Stripe', 'AWS S3'],
    'https://github.com/yourusername/ecommerce',
    'https://shop.example.com'
);

-- Insert sample experiences data
INSERT INTO experiences (title, company, location, start_date, end_date, description, skills) VALUES
(
    'Software Engineer',
    'Pickleball.com',
    'Remote',
    'Jan 2024',
    'Present',
    'Developed full-stack applications with React.js and Next.js. Lead the frontend development team, focusing on creating, improving, and fine-tuning web applications to make them fast and reliable. My job includes planning our technical approaches, guiding the team, and actively coding and reviewing code.',
    ARRAY['React', 'Next.js', 'TypeScript', 'Node.js', 'PostgreSQL', 'AWS']
),
(
    'Junior -> Senior -> Alumni',
    'Bosnia and Herzegovina Futures Foundation',
    'Sarajevo, BA',
    'Sep 2021',
    'Present',
    'Actively engaged in personal development, focusing on enhancing soft skills and public speaking abilities under experienced mentors. Transitioned into a mentorship role, guiding high school students in developing their soft skills and providing guidance in career planning and decision-making.',
    ARRAY['Leadership', 'Mentoring', 'Public Speaking', 'Web Development', 'Career Guidance']
),
(
    'Full Stack Developer',
    'Atlantbh (Internship)',
    'Sarajevo, BA',
    'Feb 2022',
    'May 2022',
    'Developed full-stack applications with React.js and Spring Boot. Implemented essential software development practices such as GitHub for version control, Maven for project management, JUnit for testing, and applied design patterns and MVC architecture.',
    ARRAY['React', 'Spring Boot', 'Java', 'GitHub', 'Maven', 'JUnit']
);

-- Enable Row Level Security (RLS) for better security
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE experiences ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- Create policies for public access to projects (read-only)
CREATE POLICY "Projects are viewable by everyone" ON projects
    FOR SELECT USING (true);

-- Create policies for public access to experiences (read-only)
CREATE POLICY "Experiences are viewable by everyone" ON experiences
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
GRANT SELECT ON experiences TO anon, authenticated;
GRANT INSERT ON contact_messages TO anon, authenticated;
GRANT ALL ON projects TO authenticated;
GRANT ALL ON experiences TO authenticated;
GRANT ALL ON contact_messages TO authenticated;
