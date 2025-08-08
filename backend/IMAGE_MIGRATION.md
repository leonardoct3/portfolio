# Image Storage Migration: From URL to Binary Data

## Overview
The projects table has been migrated from storing image URLs (`image_url`) to storing binary image data (`image` as BYTEA) directly in the database.

## Changes Made

### Database Schema
- Changed `image_url VARCHAR(500)` to `image BYTEA` in the projects table
- Updated sample data to remove image URL references

### Backend Types
- Updated `Project` interface in `src/models/types.ts` to use `image?: Buffer | null`
- Updated database types in `src/types/database.ts` to reflect the schema change

### Controllers & Services
- **Project Controller** (`src/controllers/projectController.ts`):
  - Added support for handling binary image data
  - Added `multer` for file upload handling
  - Created two endpoints for project creation:
    - `POST /api/projects` - Accepts JSON with base64-encoded images
    - `POST /api/projects/upload` - Accepts multipart/form-data with file upload
  - All GET responses convert binary data to base64 data URLs for frontend consumption

### API Endpoints

#### Get Projects
- `GET /api/projects` - Returns all projects with images as base64 data URLs
- `GET /api/projects/:id` - Returns single project with image as base64 data URL

#### Create Project
- `POST /api/projects` - Create project with JSON body:
  ```json
  {
    "title": "Project Title",
    "description": "Project description",
    "technologies": ["React", "Node.js"],
    "github_url": "https://github.com/...",
    "live_url": "https://...",
    "image": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQ..." // Optional base64 data URL
  }
  ```

- `POST /api/projects/upload` - Create project with multipart form data:
  ```
  Content-Type: multipart/form-data
  
  title: Project Title
  description: Project description
  technologies: ["React", "Node.js"] // JSON string
  github_url: https://github.com/...
  live_url: https://...
  image: [file] // Optional image file
  ```

#### Update Project
- `PUT /api/projects/:id` - Update project (same JSON format as create)

#### Delete Project
- `DELETE /api/projects/:id` - Delete project

### Utility Functions
Added helper functions in `src/utils/helpers.ts`:
- `bufferToBase64DataUrl()` - Convert Buffer to base64 data URL
- `base64DataUrlToBuffer()` - Convert base64 data URL to Buffer
- `isValidBase64DataUrl()` - Validate base64 data URL format
- `getMimeTypeFromDataUrl()` - Extract MIME type from data URL

### File Upload Configuration
- Maximum file size: 5MB
- Allowed file types: Images only (image/*)
- Storage: In-memory (processed immediately and stored in database)

## Frontend Integration
When consuming the API from the frontend:
1. Images are returned as base64 data URLs ready for use in `<img>` tags
2. When creating/updating projects, send images as base64 data URLs or use the upload endpoint with FormData
3. No need to handle separate image file storage or URLs

## Benefits
1. **Simplified deployment** - No need for separate file storage service
2. **Data consistency** - Images are stored with project data
3. **Atomic operations** - Project and image are created/updated together
4. **No broken image links** - Images are always available when project data exists

## Considerations
1. **Database size** - Binary data increases database storage requirements
2. **Performance** - Large images may impact query performance
3. **Memory usage** - Images are loaded into memory during API calls
4. **Backup size** - Database backups will be larger due to binary data

## Migration Notes
If you have existing data with `image_url`, you'll need to:
1. Download images from the URLs
2. Convert them to binary data
3. Update the records with the binary data
4. Drop the old `image_url` column
