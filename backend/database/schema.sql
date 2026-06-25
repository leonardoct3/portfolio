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
INSERT INTO projects (title, description, technologies, github_url, live_url, image_url) VALUES
(
    'ReddiView',
    'A Reddit client that lets you sign in with Reddit, browse and filter by subreddit, and upvote/downvote posts. Built with Create React App (CRA), React, Redux, and the Reddit API.',
    ARRAY['React', 'Redux', 'CRA', 'Reddit API'],
    'https://github.com/leonardoct3/reddiview.git',
    'https://reddiview.netlify.app',
    'https://res.cloudinary.com/dd4ul1s1i/image/upload/v1754616562/67d17810-f495-4819-9014-3353cef8652b.png'
),
(
    'GP I',
    'Platform to appraise and manage Insper Jr.''s selective process, built with React + TypeScript (frontend), FastAPI (backend) and MongoDB. Includes role-based areas (director, coordinator, appraisers) and operational workflows for evaluations.',
    ARRAY['React', 'TypeScript', 'Vite', 'FastAPI', 'MongoDB'],
    NULL,
    'https://gp-front-zeta.vercel.app/director/login',
    'https://res.cloudinary.com/dd4ul1s1i/image/upload/v1754614936/WhatsApp_Image_2025-08-07_at_21.05.50_eaa636a6_c2uoso.jpg'
),
(
    'Jammming',
    'Spotify web helper: search tracks, listen to previews, and create new playlists on Spotify using the Spotify Web API and user token.',
    ARRAY['React', 'CRA', 'Spotify API', 'OAuth'],
    'https://github.com/leonardoct3/jammming',
    'https://unique-beignet-b03e4e.netlify.app',
    'https://res.cloudinary.com/dd4ul1s1i/image/upload/v1754658722/a4e17e43-b83f-4cfa-b3b6-a928a2267c0e.png'
),
(
    'PokeGame',
    'A Pokémon guessing game with scoreboard and Pokédex. Built with React + Vite (frontend) and Django (backend), integrating with the PokeAPI. Data is stored in a PostgreSQL database.',
    ARRAY['React', 'Vite', 'Django', 'PostgreSQL', 'PokeAPI'],
    NULL,
    'https://projeto-2-frontend-felipe-e-leonardo.onrender.com',
    'https://res.cloudinary.com/dd4ul1s1i/image/upload/v1754615041/WhatsApp_Image_2025-08-07_at_20.49.50_97033334_gxd7uu.jpg'
),
(
    'Get-It',
    'Task manager (to-do) with tags for organization. Full CRUD for tasks and tags. Built as a full-stack Django app using SQLite for storage.',
    ARRAY['Django', 'Python', 'SQLite', 'HTML', 'CSS'],
    NULL,
    'https://projeto-1b-leonardoct3-1.onrender.com',
    'https://res.cloudinary.com/dd4ul1s1i/image/upload/v1754615022/WhatsApp_Image_2025-08-07_at_20.59.12_b730d81d_syk0ae.jpg'
);

-- Insert sample experiences data
INSERT INTO experiences (title, company, location, start_date, end_date, description, skills) VALUES
(
    'Trainee → Consultant → Senior Consultant → Projects Manager',
    'Insper Jr.',
    'São Paulo, BR',
    'Mar 2024',
    'Jan 2026',
    'Developed core technical and consulting skills through intensive training and diverse projects spanning web development, data analysis, and dashboard design. Took on growing client-facing and technical responsibility, delivering end-to-end solutions across strategy, design, and implementation. Progressed into leadership, mentoring members, guiding technical decisions, and ensuring delivery quality across projects. Oversaw the Engineering and Tech areas, fostering member growth and building structured Backend and Cloud learning paths with FastAPI, SQLAlchemy, Supabase, and CI/CD deployments to production.',
    ARRAY[]::TEXT[]
),
(
    'Summer Intern',
    'BTG Pactual',
    'São Paulo, BR',
    'Jul 2025',
    'Aug 2025',
    'Developed Java Quarkus AWS Lambdas triggered by EventBridge to integrate internal APIs and microservices, generating financial reports and emergency alerts for officers and bankers. Worked end-to-end, from business context and architecture design to implementation and deployment with CloudFormation. Integrated DynamoDB and internal systems to ensure robust, scalable, and timely communication across critical processes.',
    ARRAY[]::TEXT[]
),
(
    'Software Engineering Intern',
    'BCG X',
    'São Paulo, BR',
    'Jan 2026',
    'Present',
    'Worked across two product teams within BCG X, contributing to full-stack and backend development on internal and client-facing platforms. On an internal staffing platform, helped design and deliver a role-based access control system governing what each user can view and act on based on their profile, built with React, FastAPI, and AWS. Currently a backend engineer on a fleet management SaaS, owning asset maintenance workflows and work order management on Spring Boot. Delivered new API endpoints, resolved production bugs, and refactored existing workflows and service architecture. Designed a dual-bucket S3 architecture with a staging/quarantine bucket and a private bucket to meet security and client requirements, now used across every document workflow on the platform.',
    ARRAY[]::TEXT[]
);

-- Enable Row Level Security (RLS) for better security
-- ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE experiences ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- Grant all local permissions
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO postgres;
