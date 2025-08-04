import { supabaseAdmin } from '../config/supabase.js';
import type { Project, ContactMessage } from '../models/types.js';

export class DatabaseService {
    // Project operations
    async getAllProjects(): Promise<Project[]> {
        const { data, error } = await supabaseAdmin
            .from('projects')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            throw new Error(`Failed to fetch projects: ${error.message}`);
        }

        return data || [];
    }

    async getProjectById(id: number): Promise<Project | null> {
        const { data, error } = await supabaseAdmin
            .from('projects')
            .select('*')
            .eq('id', id)
            .single();

        if (error) {
            if (error.code === 'PGRST116') {
                return null; // Project not found
            }
            throw new Error(`Failed to fetch project: ${error.message}`);
        }

        return data;
    }

    async createProject(project: Omit<Project, 'id' | 'created_at' | 'updated_at'>): Promise<Project> {
        const { data, error } = await supabaseAdmin
            .from('projects')
            .insert([project])
            .select()
            .single();

        if (error) {
            throw new Error(`Failed to create project: ${error.message}`);
        }

        return data;
    }

    async updateProject(id: number, updates: Partial<Omit<Project, 'id' | 'created_at'>>): Promise<Project> {
        const updateData = {
            ...updates,
            updated_at: new Date().toISOString()
        };

        const { data, error } = await supabaseAdmin
            .from('projects')
            .update(updateData)
            .eq('id', id)
            .select()
            .single();

        if (error) {
            throw new Error(`Failed to update project: ${error.message}`);
        }

        return data;
    }

    async deleteProject(id: number): Promise<void> {
        const { error } = await supabaseAdmin
            .from('projects')
            .delete()
            .eq('id', id);

        if (error) {
            throw new Error(`Failed to delete project: ${error.message}`);
        }
    }

    // Contact message operations
    async createContactMessage(message: Omit<ContactMessage, 'id' | 'created_at'>): Promise<ContactMessage> {
        const { data, error } = await supabaseAdmin
            .from('contact_messages')
            .insert([message])
            .select()
            .single();

        if (error) {
            throw new Error(`Failed to create contact message: ${error.message}`);
        }

        return data;
    }

    async getAllContactMessages(): Promise<ContactMessage[]> {
        const { data, error } = await supabaseAdmin
            .from('contact_messages')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            throw new Error(`Failed to fetch contact messages: ${error.message}`);
        }

        return data || [];
    }

    async deleteContactMessage(id: number): Promise<void> {
        const { error } = await supabaseAdmin
            .from('contact_messages')
            .delete()
            .eq('id', id);

        if (error) {
            throw new Error(`Failed to delete contact message: ${error.message}`);
        }
    }
}

export const db = new DatabaseService();
