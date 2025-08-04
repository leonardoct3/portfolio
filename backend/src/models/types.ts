export interface Project {
    id: number;
    title: string;
    description: string;
    technologies: string[];
    github_url?: string | null;
    live_url?: string | null;
    image_url?: string | null;
    created_at?: string;
    updated_at?: string;
}

export interface ContactMessage {
    id?: number;
    name: string;
    email: string;
    subject: string;
    message: string;
    created_at?: string;
}

export interface ApiResponse<T> {
    success: boolean;
    data?: T;
    message?: string;
    error?: string;
}
